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

<div class="container">
  <div class="header">素材</div>
  <div class="list" >
    {#each list as item}
      <img style="width: 120px; height: 100px; margin: 10px" src={item.download_url} alt={item.author} />
    {/each}
  </div>
</div>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.header {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #f0f0f0;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
</style>