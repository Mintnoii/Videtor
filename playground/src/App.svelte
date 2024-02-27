<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  import CanvasPlayer from './lib/CanvasPlayer.svelte'
  import Material from './lib/Material.svelte';
</script>

<main>
  <div class="container">
    <div class="material">
      <Material  />
    </div>
    <CanvasPlayer />
    <!-- <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      svelte
    </a> -->
  </div>
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
  }
  .material {
      width: 24vw;
      height: 100%;
      background-color: #f0f0f0;
      display: flex;
    }
</style>
