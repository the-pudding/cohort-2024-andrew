<script>
    import { onMount, setContext } from "svelte";
    import { range } from 'd3-array';
    import { format } from 'd3-format';
    import data from '$data/table_200.json'
    import Scrolly from '$components/helpers/Scrolly.svelte'
    import copy from "$data/copy.json";
    import '$styles/variables.css';

    export let section;
    export let limit;

    const steps = copy[section].find((e)=>e.type === "table").value.steps

    let value;
    let grid;

    let hoveredPlayer;

    function colorTransition(player){
            if(String(player['career_end']) === "active"){
                return "#A5CDE0";
            }
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['middle_ten']){
                return "#eec518";
            }
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['first_ten']){
                return "#a1850c";
            }
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['last_ten']){
                return "#EFE3A8";
            }
    }

    function hoverEntry(player,rank){
        if (player){
            hoveredPlayer={
                ...player,
                "rank":rank,
            }
        }
    }

    $: gridData = data.sort((a,b) => (a['SD%'] > b['SD%']) ? -1 : 1);

    // $: value, colorTransition();
    // $: value, showRows();
    
</script>

<div class = "grid-scrolly-container">
    <div class="grid-container">
        <div class = "grid-row-container">
            <div class="grid-header">
                <div class="hed">Top 50 relievers in SD% from 1994-2024</div>
                <div class="subhed">Among pitchers with a minimum of 200 innings pitched</div>
                <div style="margin-bottom:5px; transition: opacity 0.25s; transition-delay: 0.10s;">Most active period of play:</div>
                <div class="chart-key" style="transition: opacity 0.25s; transition-delay: 0.10s;">
                    <div style="width: 50px; background-color: #a1850c"></div><div class="key-text">1994-2003</div>
                    <div style="width: 50px; background-color: #eec518"></div><div class="key-text">2004-2013</div>
                    <div style="width: 50px; background-color: #EFE3A8"></div><div class="key-text">2014-2023</div>
                    <div style="width: 50px; background-color: #A5CDE0"></div><div class="key-text">Active</div>
                </div>
            </div>
            <!-- style="grid-template-columns:{gridTransition(value)}; transition: 2s;" -->
            <!-- {#if value < 4} -->
            <div class="grid" bind:this={grid} >
                {#each {length: steps.length} as _, i}
                    <div class="grid-column">
                        {#each gridData.slice(i*10,(i+1)*10) as row, index}
                            <div class = "grid-entry" on:mouseenter={hoverEntry(row,Number(i*10+index+1))} on:mouseleave={hoverEntry(false,false)} data-label={row["PlayerId"]} aria-label={row["Name"]} style="transition: background-color 0.25s; transition-delay: 0.10s; background-color:{colorTransition(row)};">
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
                <div class="tooltip">
                    <div id="#rank">{hoveredPlayer ? `#${hoveredPlayer["rank"]}` : "Hover over a rectangle to learn about the player"}</div>
                    {#if hoveredPlayer}<div id="#profile">{`${hoveredPlayer["Name"]}, ${hoveredPlayer["career_start"]}-${hoveredPlayer["career_end"]}`}</div>{/if}
                    {#if hoveredPlayer}<div id="#stats">{`${format('.3s')(Number(hoveredPlayer['SD%'])*100)}%`}</div>{/if}
                </div>
        </div>
    </div>
</div>

<style>
    .grid-scrolly-container{
        display:block;
        width: 90vw;
        height: 70vh;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .grid-container{
        width: 65%;
        margin-bottom:30px;
        top: calc((100vh - 600px)/2);
        margin-left:auto;
        margin-right:auto;
    }
    .chart-key{
        height: 20px;
        display: flex;
    }
    .key-text{
        margin-left: 15px;
        margin-right: 15px;
        line-height: 20px;
    }
    .grid{
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-gap: 1%;
    }

    .grid-column{
        margin-top: auto;
        margin-bottom: auto;
    }

    .grid-first-column{
        width: 100%;
        transition: width 2s;
    }

    .grid-row-container{
        display: grid;
        grid-template-rows: 25% auto 20%;
        grid-gap: 5%;
    }

    .grid-entry{
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #ddd;
        min-height: 25px;
    }

    .grid-header{
        /* margin-bottom: 20px; */
    }

    .hed{
        font-size: 28px;
    }

    .step {
		height: 80vh;
		background: none;
		text-align: center;
	}

    .first-step{
        margin-top: 40vh;
    }

	.step p {
        max-height:100px;
        margin-left:auto;
        margin-right:auto;
		padding: 1rem;
        background-color:#eee;
        color: #333;
	}

    .step :global(span){
        color: #ddd;
        font-weight: bold;
        border-radius: 3px;
        padding-left: 2px;
        padding-right: 2px;
    }

    .data-grid thead{
        width: 100%;
    }

    .data-grid tr{
        width: 100%;
        height:25px;
    }

    .data-grid td{
        text-align: center;
    }

    :global(.active-row){
        background-color:#d8ecfe;
    }
    
    .subhed{
        margin-bottom:10px;
    }

    .grid-entry:hover{
        opacity: 50%;
    }

    .tooltip {
        font-size: 24px;
    }
</style>