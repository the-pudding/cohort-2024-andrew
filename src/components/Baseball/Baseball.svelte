<script>
	import { getContext } from "svelte";
	import ScatterChart from "$components/Baseball/ScatterChart/index.svelte";
    import Table from "$components/Baseball/Table/index.svelte";
    import VideoContainer from "$components/Baseball/VideoContainer/index.svelte"

    export let copy;
</script>

<div class="article">
{#each Object.keys(copy) as section, idx}
    <div class="section-{section}">
        {#each copy[section] as block, index}
            {#if block.type === "list"}
                <ul class ='text-blocks'>
                    {#each block.value.items as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            {/if}
            {#if block.type === "text"}
                <p class="text-blocks">{block.value}</p>
            {/if}
            {#if block.type === "video"}
                <VideoContainer url={block.value.url} videoId={block.value.videoId} />
            {/if}
            {#if block.type === "scatterChart"}
                <ScatterChart {section} />
            {/if}
            {#if block.type === "table"}
                <Table {section} limit={15}/>
            {/if}
        {/each}
    </div>
{/each}
</div>


<style>
	.text-blocks{
		max-width:600px;
		margin-left:auto;
		margin-right:auto;
	}
    .article{
        background-color: #333;
    }
    .article > * {
        color: #eee;
    }
</style>

