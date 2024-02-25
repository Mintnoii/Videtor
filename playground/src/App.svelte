<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Material from './lib/Material.svelte';
</script>

<main>
  <div>
     <Material/>
    <Counter />
     <div class="flex bg-gray-900 h-600px w-1000px items-center justify-center">
      <div id="container"></div>
    </div>
    <!-- <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      svelte
    </a> -->
  </div>
</main>

<style>
</style>
