<script>
	import { onMount, setContext } from "svelte";
	import { browser } from "$app/environment";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";
	import {scaleLinear} from 'd3-scale';
	import pitchers from "$data/pitchers.json";
    import Axis from "./Axis.svelte"
    import Scrolly from "$components/helpers/Scrolly.svelte";
	import { select, selectAll } from "d3-selection";
	import { transition } from 'd3-transition';
	import { easeLinear, easePolyOut } from 'd3-ease'
	import {range} from 'd3-array';

	export let section;
    
    let value;
	let circles;
	

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
		top: 5,
		right: 5,
		bottom: 15,
		left: 15
	}

	const scrollySteps = copy[section].find((e)=>e.type === "scatterChart").value.steps;

	let xScale = scaleLinear()
				.domain([0,2.2])
				.range([margin.left,chartWidth-margin.right])

	let yScale = scaleLinear()
				.domain([60,0])
				.range([margin.bottom,chartHeight-margin.top])

	const assignRatioPosition = (data) =>{
		var ratioCounts = {};
		var newData = [];
		for (const pitcher of data){
			let pitcherRatio = Math.round(100*pitcher['SD']/pitcher['G'])
			if (ratioCounts[pitcherRatio]){
				ratioCounts[pitcherRatio]+=1
			}
			else{
				ratioCounts[pitcherRatio]=1
			}
			newData.push({
				...pitcher,
				"ratioCount":ratioCounts[pitcherRatio]
			})
		}
		return newData;
	}

	

	function handleTransition(pitcher,value){

		console.log(value)

		if(value===0 || !value){

			let x = Math.round(margin.left+10*(pitcher["ratioCount"]));
			let y = Math.round(yScale(Math.round(100*(Number(pitcher["SD"]))/Number(pitcher["G"]))));
			return `${x}px,${y}px,0`;
		}
		if(value===1){

			let x = Math.round(margin.left+10*(pitcher["ratioCount"]));
			let y = Math.round(yScale(Math.round(100*(Number(pitcher["SD"]))/Number(pitcher["G"]))));
			return `${x}px,${y}px,0`;


			// let circles = selectAll("circle");
			// circles.transition()
			// .duration(250)
			// .attr('cx', function(d, i) {
			// 	let pitcher = pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))
			// 	return margin.left+10*pitcher["ratioCount"];
			// })
			// .attr('cy',function(d,i){
			// 	let pitcher = pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))
			// 	return 
			// });
		}
		if(value===2){

			let x = Math.round(margin.left+10*(pitcher["pLI"]));
			let y = Math.round(yScale(100*(Number(pitcher["SD"]))/Number(pitcher["G"])));

			return `${x}px,${y}px,0`;

			// let circles = selectAll("circle");
			// circles.transition()
			// .duration(1000)
			// .attr('cx', function(d, i) {
			// 	return xScale(pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))["pLI"]);
			// })
			// .attr('cy',function(d,i){
			// 	let pitcher = pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))
			// 	return yScale(100*(Number(pitcher["SD"]))/Number(pitcher["G"]))
			// });
		}
		if(value===scrollySteps.length-3){
			// let circles = selectAll("circle");
			// yScale = scaleLinear()
			// 	.domain([7,0])
			// 	.range([margin.bottom,chartHeight-margin.top])
			// circles.transition()
			// .duration(1000)
			// .attr('cy',function(d,i){
			// 	let pitcher = pitchersFinal.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))
			// 	return yScale((Number(pitcher["SD"]))/Number(pitcher["MD"]))
			// });
			
		}
	}

	onMount(()=>{
		// const body = document.querySelector("body")
		// console.log("hello");
		// buildChart(pitchers,body);
	})


	$: console.log(value)
	
    $: pitchersCleaned = pitchers.filter((d)=>d['MD']!==0).filter((d)=>d['IP']>300)
	$: pitchersFinal = assignRatioPosition(pitchersCleaned);
	// $: value, handleTransition()
	// $: yTicks = getTicks("y",xScale)

</script>


<div id="dataviz">
	{#if pitchersFinal}
	<svg class ="chart-svg"
		width={chartWidth+margin.left+margin.right}
		height={chartHeight+margin.top+margin.bottom}
	>
        <Axis {xScale} {yScale} {margin} {chartWidth} {chartHeight} step={value} {innings}/>
		<g transform="translate({margin.left},{margin.top})">
			<g class="circles-container">
                    {#each pitchersFinal as pitcher, i (pitcher.PlayerId)}
						<circle
							r={5}
							data-label={pitcher['PlayerId']}
							fill="blue"

							style="
								--delay: {i};
								transform:translate3d({handleTransition(pitcher,value)});
							"
						>
						</circle>
                    {/each}
				</g>
			<line
				x1={xScale(0)}
				x2={chartWidth}
				y1={yScale(20)}
				y2={yScale(20)}
				stroke="red"
			></line>
			<line
				x1={xScale(0)}
				x2={chartWidth}
				y1={yScale(40)}
				y2={yScale(40)}
				stroke="red"
			></line>
			<!-- <line
				x1={xScale(1)}
				x2={xScale(1)}
				y1={margin.top}
				y2={yScale(0)}
				stroke="red"
			></line> -->
		</g>
	</svg>
	{/if}
    <div class="spacer" />
    <Scrolly bind:value>
		{#each range(0,scrollySteps.length,1) as step, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{scrollySteps[i]}</p>
			</div>
		{/each}
	</Scrolly>
</div>

<style>
    .step {
		height: 80vh;
		background: none;
		text-align: center;
	}

	.step p {
        width:30%;
        margin-left:auto;
        margin-right:auto;
		padding: 1rem;
        background-color:#ddd;
		opacity: 1 !important;
	}

    .chart-svg{
        display: block;
        margin-left:auto;
		margin-right:auto;
        position: sticky;
		top: 4em;
    }

	circle {
		transition: transform 0.5s calc(var(--delay) * 0.0005s);

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