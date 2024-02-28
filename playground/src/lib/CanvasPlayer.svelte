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
    children: [{
      nid:'121212',
      data: {
        type: 'widget_image',
    url: 'https://picsum.photos/200/300',
      }
      
  }]
  },1)
  })
</script>

<div id="container"></div>
<!-- <button on:click={increment}>
  count is {count}
</button> -->
