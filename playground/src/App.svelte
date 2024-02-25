<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
     <div class="flex bg-gray-900 h-600px w-1000px items-center justify-center">
      <div id="canvasEditor" class="bg-gray-700"></div>
      <div id="container"></div>
    </div>
    <!-- <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      svelte
    </a> -->
  </div>
  <!-- <h1>PlayGround</h1> -->

  <div class="card">
    <Counter />
  </div>
</main>

<style>
</style>
