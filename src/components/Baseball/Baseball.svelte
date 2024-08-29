<script>
	import { onDestroy } from "svelte";
    import { getContext } from "svelte";
    import { get } from "svelte/store";
	import ScatterChart from "$components/Baseball/ScatterChart/index.svelte";
    import Table from "$components/Baseball/Table/index.svelte";
    import TableTwo from "$components/Baseball/TableTwo/index.svelte";
    import BarChart from "$components/Baseball/BarChart/index.svelte";
    import VideoContainer from "$components/Baseball/VideoContainer/index.svelte"
    import { videoSound } from './stores.js'

    function changeMute(){
        autoplayClicked = true;
        videoSound.set(!get(videoSound));
    }
    
    let muteOption=true;
    let autoplayClicked=false;

    const unsubscribe = videoSound.subscribe((value)=>(muteOption=value));
    onDestroy(unsubscribe);

    export let copy;
</script>

<div class="article">
<div on:click={changeMute} class="click-sound" style="display: block; width: 10%; min-width: 100px; max-height: 100px; background-color: #ddd; color: #333; text-align: center; margin:auto;">
    {muteOption ? (autoplayClicked ? "Click to mute" : "Click to allow video to play (with sound)") : "Click for sound"}
</div>
{#each Object.keys(copy) as section, idx}
    <div class="section-{section}">
        {#each copy[section] as block, index}
            {#if block.type === "text"}
                <p class="text-blocks">{@html block.value}</p>
            {/if}
            {#if block.type === "video"}
                <VideoContainer url={block.value.url} videoId={block.value.videoId} />
            {/if}
            {#if block.type === "scatterChart"}
                <ScatterChart {section} />
            {/if}
            {#if block.type === "table"}
                <Table {section}/>
            {/if}
            {#if block.type === "tableTwo"}
                <TableTwo {section} />
            {/if}
            {#if block.type === "barChart"}
                <BarChart {section} />
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
    .article > * {
        color: #eee;
    }
</style>

