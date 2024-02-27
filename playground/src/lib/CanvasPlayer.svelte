<script lang="ts">
import { Renderer} from '@videtor/renderer'
	import { onMount } from 'svelte';
  onMount(() => {
    const container = document.getElementById('container')
  const renderer = new Renderer()
  renderer.init(container as HTMLDivElement)
  renderer.render({
    url: 'https://picsum.photos/200/300'
  })
  })
</script>

<div>
  画布
      <div id="container"></div>
</div>
<!-- <button on:click={increment}>
  count is {count}
</button> -->
