<script>
	import { onMount, setContext } from "svelte";
	import { browser } from "$app/environment";
	import copy from "$data/copy.json";
	import {scaleLinear, scaleBand} from 'd3-scale';
	import leagueTrends from "$data/league-trends.json";
    import Axis from "./Axis.svelte"
    import Scrolly from "$components/helpers/Scrolly.svelte";
	import {range} from 'd3-array';

	export let section;
    
    let value;

    let innings = [300,300,300,300, 300, 300, 300, 500, 700]

	const preloadFont = [
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
		"https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
		"https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2"
	];

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);

	const chartWidth = 1000;
	const chartHeight = 600;

	const margin = {
		top: 30,
		right: 50,
		bottom: 50,
		left: 50
	}

	const scrollySteps = copy[section].find((e)=>e.type === "barChart").value.steps;

	let xScale = scaleBand()
				.domain(range(1995,2025,1))
				.range([margin.left,chartWidth-margin.right])
				.padding(0.1);

	let yScale = scaleLinear()
				.domain([0,4500])
				.range([chartHeight-margin.bottom,margin.top])

	function handleColor(season,value){
		if (value === 1){
			if(Number(season) < 2007){
				return "red";
			}
			if(Number(season) === 2024){
				return "purple";
			}
		}
		if (value === 2){
			if(Number(season) > 2017 && Number(season) < 2024){
				return "green";
			}
		}
		return "#eee";
	}

	// function handleTransition(pitcher,value){

	// 	if(value===0 || !value || value===1 || value===2){

	// 		let x = Math.round(margin.left+10*(pitcher["ratioCount"]));
	// 		let y = Math.round(yScale(Math.round(100*(Number(pitcher["SD"]))/Number(pitcher["G"]))));
	// 		return `${x}px,${y}px,0`;
	// 	}
	// 	if(value>2){

	// 		let x = xScale(Number(pitcher["pLI"]));
	// 		let y = Math.round(yScale(100*(Number(pitcher["SD"]))/Number(pitcher["G"])));

	// 		return `${x}px,${y}px,0`;
	// 	}
	// 	if(value===scrollySteps.length-3){
	// 		// let circles = selectAll("circle");
	// 		// yScale = scaleLinear()
	// 		// 	.domain([7,0])
	// 		// 	.range([margin.bottom,chartHeight-margin.top])
	// 		// circles.transition()
	// 		// .duration(1000)
	// 		// .attr('cy',function(d,i){
	// 		// 	let pitcher = pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))
	// 		// 	return yScale((Number(pitcher["SD"]))/Number(pitcher["MD"]))
	// 		// });
			
	// 	}
	// }


</script>


<div id="bar-chart">
	{#if leagueTrends}
		<svg class ="chart-svg"
			width={chartWidth+margin.left+margin.right}
			height={chartHeight+margin.top+margin.bottom}
		>
			<Axis {xScale} {yScale} {margin} {chartWidth} {chartHeight}/>
			<g transform="translate({margin.left},{margin.top})">
				<g class="rect-container">
						{#each leagueTrends as year, i}
							<rect
								x={xScale(year['Season'])}
								y={yScale(year['SD'])}
								height={yScale(0)-yScale(year['SD'])}
								width={xScale.bandwidth()}
								fill={handleColor(year['Season'],value)}
							>
							</rect>
						{/each}
					</g>
			</g>
		</svg>
	{/if}
    <div class="spacer" />
	<div class="scrolly-text-container">
		<Scrolly bind:value>
			{#each range(0,scrollySteps.length,1) as step, i}
				{@const active = value === i}
				<div class="step" class:active>
					<div class="step-text">{@html scrollySteps[i]}</div>
				</div>
			{/each}
		</Scrolly>
	</div>
</div>
<style>
	#bar-chart{
		padding-top: 30px;
		padding-bottom: 30px;
	}

	.scrolly-text-container{
		position: relative;
		z-index: 5;
	}
    .step {
		height: 80vh;
		background: none;
		text-align: center;
        width:30%;
        margin-left:auto;
        margin-right:auto;
	}

    .chart-svg{
        display: block;
        margin-left:auto;
		margin-right:auto;
        position: sticky;
		top: 4em;
    }

	.step-text{
		background-color: #333;
		padding: 1rem;
	}

	circle {
		transition: transform 0.5s calc(var(--delay) * 0.0005s), fill 0.5s, opacity 0.5s;

		/* mix-blend-mode: multiply; */
	}

	/* .transition-to-dot{
		border-style: solid;
		border-width: 1px;
		display: block;
		width: 100px;
		height: 100px;
		background-color: #0000ff;
		transition:
			width 2s,
			height 2s,
			background-color 2s,
			rotate 2s;
	}

	.transition-to-scatter{
		border-style: solid;
		border-width: 1px;
		display: block;
		width: 100px;
		height: 100px;
		background-color: #0000ff;
		transition:
			width 2s,
			height 2s,
			background-color 2s,
			rotate 2s;
	} */
</style>