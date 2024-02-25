<script lang="ts">
	import { onMount } from 'svelte';
  let list: any[] = []

  onMount(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=10')
      .then(res => res.json())
      .then(data => {
        list = data.map((item: any) => {
          return {
            ...item,
            download_url: `https://picsum.photos/id/${item.id}/200/200`
          }
        })
        console.log(data,'====',list)

      })
  })
</script>

<div>
  素材
  <div class="flex flex-wrap" style="width: 120px; height: 100px">
    {#each list as item}
      <img src={item.download_url} alt={item.author} class="w-1/4" />
    {/each}
  </div>
</div>

