<script>
    import { onMount, setContext } from "svelte";
    import { range } from 'd3-array';
    import { format } from 'd3-format';
    import tableData from '$data/table.json'
    import Scrolly from '$components/helpers/Scrolly.svelte'
    import copy from "$data/copy.json";

    export let section;
    export let limit;

    let value;
    let table;
    let newRows;
    let oldRows;

    function tableTransition(){
        if(value===0){
            oldRows.forEach((el)=>{
                el.classList.remove("active-row");
            })
        }
		if(value===1){
            newRows.forEach((el)=>{
                el.classList.remove("active-row");
            })
            oldRows.forEach((el)=>{
                el.classList.add("active-row");
            })
		}
		if(value===2){
            oldRows.forEach((el)=>{
                el.classList.remove("active-row");
            })
            newRows.forEach((el)=>{
                el.classList.add("active-row");
            })
		}
        if(value===3){
            for (const row of newRows){
                row.classList.remove("active-row");
            }
        }
	}

    onMount(()=>{
        oldRows=table.querySelectorAll("[data-label='2000s']")
        newRows=table.querySelectorAll("[data-label='current']")
    })

    $: value, tableTransition()
    
</script>

<div class = "table-scrolly-container">
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <td style="width:25%;">Player</td>
                    <td>IP</td>
                    <td>SD%</td>
                    <td>MD%</td>
                    <td>SD%-MD%</td>
                    <td>pLI</td>
                </tr>
            </thead>
            <tbody bind:this={table}>
                {#each tableData as row, index}
                    {#if index < limit}
                        <tr class="player-row" data-label={row['type']}>
                            <td>{row['Name']}</td>
                            <td>{row['IP']}</td>
                            <td>{format('.3s')(row["SD%"])}%</td>
                            <td>{format('.3s')(row["MD%"])}%</td>
                            <td>{format('.3s')(row["SD%"]-row["MD%"])}%</td>
                            <td>{row['pLI']}</td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
    <Scrolly bind:value>
        {#each [0, 1, 2] as step, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{copy[section].find((e)=>e.type === "table").value.steps[i]}</p>
			</div>
		{/each}
    </Scrolly>
</div>

<style>
    .table-scrolly-container{
        display:grid;
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
        grid-template-columns: auto 30%;
        grid-gap: 10%
    }

    .table-container{
        position: sticky;
        max-height:600px;
        margin-bottom:30px;
        top: calc((100vh - 600px)/2);
        margin-left:auto;
        margin-right:auto;
    }

    .step {
		height: 80vh;
		background: none;
		text-align: center;
	}

	.step p {
        max-height:100px;
        margin-left:auto;
        margin-right:auto;
		padding: 1rem;
        background-color:#eee;
	}

    .step p:first-child{
        margin-top: 40vh;
    }

    table{
        display: table;
        margin: auto;
        width: 100%;
    }

    .data-table thead{
        width: 100%;
    }

    .data-table tr{
        width: 100%;
        height:25px;
    }

    .data-table td{
        text-align: center;
    }

    :global(.active-row){
        background-color:#d8ecfe;
    }

    /* table{
        max-width:600px;
        margin-left:auto;
        margin-right:auto;
    } */
</style>