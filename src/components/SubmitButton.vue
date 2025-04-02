


<script>
  import WModalComponent from '../components/WModalComponent.vue';
  import confetti from 'canvas-confetti';
  
  export default {
    components: {
      WModalComponent,
    },
    data() {
      return {
        isHovered: false,
        isModalVisible: false,
      };
    },
    methods: {
      openModal() {
        this.isModalVisible = true;
      },
      triggerConfetti() {
        confetti({
          particleCount: 100,
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff0', '#ff6347', '#32cd32', '#1e90ff'],
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .cursor-stencil {
    cursor: pointer;
  }
  
  .custom-text-border {
    -webkit-text-stroke: 3px black;
  }
  
  </style>
  