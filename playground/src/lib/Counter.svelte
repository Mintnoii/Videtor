<script lang="ts">
import { Renderer} from '@videtor/renderer'
	import { onMount } from 'svelte';

  let count: number = 0
  const increment = () => {
    count += 1
  }

  onMount(() => {
  const renderer = new Renderer()
  renderer.render()
  })
</script>

<button on:click={increment}>
  count is {count}
</button>
