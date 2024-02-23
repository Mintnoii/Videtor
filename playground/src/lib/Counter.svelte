<script lang="ts">
import {add} from '@videtor/renderer'

  let count: number = 0
  const increment = () => {
    count += 1
    console.log(add(1,2),'=====',add)
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
