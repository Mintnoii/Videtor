<script lang="ts">
import { Renderer } from '@videtor/renderer'
	import { onMount } from 'svelte';
  onMount(() => {
    const container = document.getElementById('container')
  const renderer = new Renderer()
  renderer.init(container as HTMLDivElement, {
    viewPortSize: {
      width: 420,
      height: 630
    }
  })
  renderer.render({
    elements: [{
      nid:'121212',
      data: {
      type: 'widget_image',
      url: 'https://picsum.photos/200/300',
      width: 200,
      height: 300,
      }
      
  }]
  },1)
  })
</script>

<div id="container"></div>
<!-- <button on:click={increment}>
  count is {count}
</button> -->
