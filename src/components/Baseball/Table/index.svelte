<script>
    import { onMount, setContext } from "svelte";
    import { range } from 'd3-array';
    import { format } from 'd3-format';
    import data from '$data/table.json'
    import Scrolly from '$components/helpers/Scrolly.svelte'
    import copy from "$data/copy.json";
    import '$styles/variables.css';

    export let section;
    export let limit;

    const steps = copy[section].find((e)=>e.type === "table").value.steps

    let value;
    let grid;

    let hoveredPlayer;

    function colorTransition(columnIndex, value, player){
        console.log(player);
        if(value < 2 && columnIndex > 0){
            return "transparent";
        }
        if(value > 0){
            if(String(player['career_end']) === "active" && !player['in_mlb']){
                return "#437F91";
            }
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['first_ten']){
                return "#CFAA0F";
            }
        }
        if(value > 1){
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['middle_ten']){
                return "#DEC559";
            }
            if(Math.max(player['last_ten'],Math.max(player['middle_ten'],player['first_ten'])) === player['last_ten']){
                return "#EFE3A8";
            }
        }
        if(columnIndex===0){
            return "#ddd";
        }
        return "transparent";
    }

    function hoverEntry(player,rank){
        if (player){
            hoveredPlayer={
                ...player,
                "rank":rank,
            }
        }
    }

    // onMount(()=>{
    //     oldRows=grid.querySelectorAll("[data-label='2000s']")
    //     newRows=grid.querySelectorAll("[data-label='current']")
    // })

    $: gridData = data.sort((a,b) => (a['SD%'] > b['SD%']) ? -1 : 1);

    // $: value, colorTransition();
    // $: value, showRows();
    
</script>

<div class = "grid-scrolly-container">
    <div class="grid-container">
        <div class = "grid-row-container">
            <div class="grid-header">
                <div class="hed">Top 50 relievers in SD% from 1994-2024</div>
                <div class="subhed">Among pitchers with a minimum of 300 innings pitched</div>
                <div style="margin-bottom:5px; transition: opacity 0.25s; transition-delay: 0.10s; opacity: {value > 1 ? 1 : 0}">Most active period of play:</div>
                <div class="chart-key" style="transition: opacity 0.25s; transition-delay: 0.10s; opacity: {value > 1 ? 1 : 0}">
                    <div style="width: 50px; background-color: #437F91"></div><div class="key-text">Active</div>
                    <div style="width: 50px; background-color: #CFAA0F"></div><div class="key-text">1994-2003</div>
                    <div style="width: 50px; background-color: #DEC559"></div><div class="key-text">2004-2013</div>
                    <div style="width: 50px; background-color: #EFE3A8"></div><div class="key-text">2014-2023</div>
                </div>
            </div>
            <!-- style="grid-template-columns:{gridTransition(value)}; transition: 2s;" -->
            <div class="grid" bind:this={grid} >
                {#each {length: 5} as _, i}
                    <div class="grid-column">
                        {#each gridData.slice(i*10,(i+1)*10) as row, index}
                            <div class = "grid-entry" on:mouseenter={hoverEntry(row,Number(i*10+index+1))} on:mouseleave={hoverEntry(false,false)} data-label={row["PlayerId"]} aria-label={row["Name"]} style="transition: background-color 0.25s; transition-delay: 0.10s; background-color:{colorTransition(i,value,row)}">
                                {#if i === 1 && (value < 2 || !value)}
                                    {#if index === 0}
                                        #1
                                    {:else if index === 9}
                                        #10
                                    {/if}
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
            {#if hoveredPlayer && value > 1}
                <div class="tooltip">
                    <div id="#rank">#{hoveredPlayer["rank"] ?? " "}</div>
                    <div id="#profile">{`${hoveredPlayer["Name"]}, ${hoveredPlayer["career_start"]}-${hoveredPlayer["career_end"]}`}</div>
                    <div id="#stats">{`${format('.3s')(hoveredPlayer['SD%'])}%`}</div>
                </div>
            {/if}
        </div>
    </div>
    <div class="scrolly-text-container">
    <Scrolly bind:value>
        {#each {length: steps.length} as step, i}
			{@const active = value === i}
			<div class="step" class:first-step={i === 0} class:active>
				{@html steps[i]}
			</div>
		{/each}
    </Scrolly> 
    </div>  
</div>

<style>
    .grid-scrolly-container{
        display:grid;
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
        grid-template-columns: auto 25%;
        grid-gap: 10%
    }

    .grid-container{
        position: sticky;
        width: 100%;
        max-height:600px;
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