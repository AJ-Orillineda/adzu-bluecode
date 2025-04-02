<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    letter: { type: String, required: true },
    canvasHeight: { type: Number, required: true },
    canvasWidth: { type: Number, required: true },
    progression: { type: Number, required: true, default: 0 },
});

const canvas = ref(null);
const ctx = ref(null);
const flag = ref(false);
const prevX = ref(0);
const currX = ref(0);
const prevY = ref(0);
const currY = ref(0);
const dot_flag = ref(false);
const w = ref(0);
const h = ref(0);
const x = ref("green");
const defaultBrushSize = ref(30);
const y = ref(30); // brush size

// score properties
const baseScore = ref(0);
const score = ref(baseScore.value);

//background color of the canvas
const canvasBackgroundColor = ref("#222222");

const emit = defineEmits(['scoreChange']);

//removed the color picker because it is not used for the canvas

const draw = () => {
    const brushSize = defaultBrushSize.value;
    const halfBrushSize = Math.floor(brushSize / 2); //round down to that the halfBrushSize is an integer
    const canvasWidthVal = props.canvasWidth;
    const canvasHeightVal = props.canvasHeight;

    
    let correctPixels = 0; //count the number of pixels within the area that are close to stencil color
    let backgroundPixels = 0;  //count the number of pixels within the area that is a background color
    let totalPixels = 0; //total number of pixels within the area but still within the bounds of the canvas 

    const imageData = ctx.value.getImageData(0, 0, canvasWidthVal, canvasHeightVal).data;

    //helper function that helps in calculating whether the RGB given being passed is within the tolerance or forgiveness
    const isColorWithinTolerance = (r, g, b, targetColor, tolerance) => {
        return (
            r >= targetColor - tolerance &&
            r <= targetColor + tolerance &&
            g >= targetColor - tolerance &&
            g <= targetColor + tolerance &&
            b >= targetColor - tolerance &&
            b <= targetColor + tolerance
        );
    };


    //adjusted the loops. now it starts with negative of the halfBrushSize instead of 0, looping through the entire quarants 
    for (let i = -halfBrushSize; i <= halfBrushSize; i++) { 
        for (let j = -halfBrushSize; j <= halfBrushSize; j++) {
            const xCoord = currX.value + i; // x coordinate of the pixel checked with the horizontal offset
            const yCoord = currY.value + j; //y coordinate of the pixel checke with the vertical offset

            if (xCoord >= 0 && xCoord < canvasWidthVal && yCoord >= 0 && yCoord < canvasHeightVal) {
                totalPixels++; //if inside of the canvas, the totalpixel is added

                /* calculates the inde of the pixel's red component in the imageData array above.
                    since each pixel is represented by 4 bytes, multiply the linear position of the pixel by 4
                */
                const pixelIndex = (yCoord * canvasWidthVal + xCoord) * 4; 
                const r = imageData[pixelIndex];
                const g = imageData[pixelIndex + 1];
                const b = imageData[pixelIndex + 2];

                const stencilColor = 223; // grayscale value of the stencil
                const stencilTolerance = 40; // forgiveness of the grayscale of the pixel fetched 

                const backgroundColor = 34; //grayscale value of the background
                const backgroundTolerance = 15; //forgiveness of the grayscale of the pixel fetched

                if (isColorWithinTolerance(r,g,b,stencilColor,stencilTolerance)) {
                    correctPixels++;
                } else if (isColorWithinTolerance(r,g,b,backgroundColor,backgroundTolerance)) {
                    backgroundPixels++;
                }
            }
        }
    }

    // percentages of the correct pixels and background pixels fetched
    const percentageCorrect = totalPixels > 0 ? correctPixels / totalPixels : 0;
    const percentageBackground = totalPixels > 0 ? backgroundPixels / totalPixels : 0;

    // accuracy grade calculation. the weight could be adjusted based on the prioritization of accuracy or avoding the background
    let accuracyGrade = percentageCorrect * 0.6 - percentageBackground * 0.4; 
    accuracyGrade = Math.max(0, accuracyGrade); //no negative accuracy allowed


    
    let scoreMultiplier = 4;

    // here to simply balance things as it could easily ramp up way too quickly. but it could be interchanged 
    if (accuracyGrade > 0.7) {
        scoreMultiplier = 1.5; 
    }


    // increase base score
    let scoreIncrement = accuracyGrade * 2 * scoreMultiplier // could be adjusted 

    const deductionAmount = backgroundPixels * 0.01; // deduction based on the background pixels fetched

    score.value += scoreIncrement;
    score.value -= deductionAmount;

    // score is only within 0 to 100
    score.value = Math.max(0, Math.min(100, score.value));
    emit('scoreChange', score.value);

    ctx.value.beginPath();
    ctx.value.lineCap = "round";
    ctx.value.lineJoin = "round";
    ctx.value.moveTo(prevX.value, prevY.value);
    ctx.value.lineTo(currX.value, currY.value);
    ctx.value.strokeStyle = x.value;
    ctx.value.lineWidth = y.value;
    ctx.value.stroke();
    ctx.value.closePath();

}

const findxy = (res, e) => {
    if (res === 'down') {
        prevX.value = currX.value;
        prevY.value = currY.value;
        currX.value = e.clientX - canvas.value.offsetLeft;
        currY.value = e.clientY - canvas.value.offsetTop;

        flag.value = true;
        dot_flag.value = true;
        if (dot_flag.value) {
            ctx.value.beginPath();
            ctx.value.fillStyle = x.value;
            ctx.value.fillRect(currX.value, currY.value, 2, 2);
            ctx.value.closePath();
            dot_flag.value = false;
        }
    }
    if (res === 'up' || res === "out") {
        flag.value = false;
    }
    if (res === 'move' && flag.value) {
        prevX.value = currX.value;
        prevY.value = currY.value;
        currX.value = e.clientX - canvas.value.offsetLeft;
        currY.value = e.clientY - canvas.value.offsetTop;
        draw();
    }
}

const init = () => {
    canvas.value = document.getElementById('can');
    ctx.value = canvas.value.getContext("2d");
    w.value = canvas.value.width;
    h.value = canvas.value.height;

    setStencil();

    canvas.value.addEventListener("mousemove", (e) => findxy('move', e), false);
    canvas.value.addEventListener("mousedown", (e) => findxy('down', e), false);
    canvas.value.addEventListener("mouseup", (e) => findxy('up', e), false);
    canvas.value.addEventListener("mouseout", (e) => findxy('out', e), false);
}

const setStencil = async () => {
    await document.fonts.load('28rem "Coming Soon"');
    ctx.value.fillStyle = "#222222";

    ctx.value.rect(0, 0, props.canvasWidth, props.canvasHeight);
    ctx.value.fill();

    ctx.value.fillStyle = "#dfdfdf";
    ctx.value.font = 'bold 28rem "Coming Soon"';
    ctx.value.lineWidth = "10";
    ctx.value.fillText(props.letter, props.canvasWidth / 2 - 120, props.canvasHeight / 2 + 135);
}

const eraseCanvas = () => {
    ctx.value.clearRect(0, 0, w.value, h.value);
    document.getElementById("canvasimg").style.display = "none";

    score.value = baseScore.value; 
    setStencil();
    emit('scoreChange', score.value);
}

watch(() => props.progression, (progression) => {
  if (ctx.value) {
    eraseCanvas();
  }
});

watch(() => props.letter, (newLetter) => {
  // Only redraw if the canvas is initialized
  if (ctx.value) {
    eraseCanvas();
  }
});

onMounted(() => {
    init();
    emit('scoreChange', score.value);
});

// expose erasecanvas function so outside components can access it
defineExpose({
    eraseCanvas,
});
</script>

<template>
    <div onload="init()">
        <div class="flex flex-row gap-4">
            <canvas id="can" :width="canvasWidth" :height="canvasHeight" class="bg-white"></canvas>

            <div class="flex flex-col gap-2">
                <img id="canvasimg">
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Coming+Soon&family=Patrick+Hand&display=swap');

.coming-soon-regular {
  font-family: "Coming Soon", cursive;
  font-weight: 400;
  font-style: normal;
}

.comic-neue-light {
  font-family: "Comic Neue", cursive;
  font-weight: 300;
  font-style: normal;
}

.comic-neue-regular {
  font-family: "Comic Neue", cursive;
  font-weight: 400;
  font-style: normal;
}

.comic-neue-bold {
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: normal;
}

.comic-neue-light-italic {
  font-family: "Comic Neue", cursive;
  font-weight: 300;
  font-style: italic;
}

.comic-neue-regular-italic {
  font-family: "Comic Neue", cursive;
  font-weight: 400;
  font-style: italic;
}

.comic-neue-bold-italic {
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: italic;
}
</style>