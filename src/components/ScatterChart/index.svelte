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
    
    let value;
	let circles;

    let innings = [100,100,100,300,700]

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
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	}

	let xScale = scaleLinear()
				.domain([0,2])
				.range([margin.left,chartWidth-margin.right])

	let yScale = scaleLinear()
				.domain([6,0])
				.range([margin.bottom,chartHeight-margin.top])

	const pitchersByRatio = (data) =>{
		var newData = {};
		let useData = data.filter((d)=>d['MD']!==0)
		for (const pitcher of useData){
			let pitcherRatio = pitcher['SD']/pitcher['MD']
			if (newData[pitcherRatio]){
				newData[pitcherRatio].push({
					...pitcher,
					'sd-md': pitcherRatio,
					'count':newData[pitcherRatio].length
				})
			}
			else{
				newData[pitcherRatio]=[{
					...pitcher,
					'sd-md':pitcherRatio,
					'count':0
				}]
			}
		}
		return newData
	}

	function handleTransition(){
		if(value===2){
			let circles = selectAll("circle");
			circles.transition()
			.duration(250)
			.ease(easePolyOut)
			.attr('cx', function(d, i) {
				return xScale(pitchersCleaned.find((e)=>Number(e['PlayerId'])===Number(this.getAttribute("data-label")))["pLI"]);
			});
			
		}
		if(value===1){
			let circles = selectAll("circle");
			circles.transition()
			.duration(250)
			.ease(easePolyOut)
			.attr('cx', function(d, i) {
				return xScale(0.2);
			})
		}
	}

	onMount(()=>{
		// const body = document.querySelector("body")
		// console.log("hello");
		// buildChart(pitchers,body);
	})

	function handleStepEnter(response) {
	// response = { element, direction, index }

	}
	
    $: pitchersCleaned = pitchers.filter((d)=>d['MD']!==0)
	$: pitcherByRatio = pitchersByRatio(pitchersCleaned);
	$: value, handleTransition()
	// $: yTicks = getTicks("y",xScale)

</script>


<div id="dataviz">
	<svg class ="chart-svg"
		width={chartWidth+margin.left+margin.right}
		height={chartHeight+margin.top+margin.bottom}
	>
        <Axis {xScale} {yScale} {margin} {chartWidth} {chartHeight} step={value}/>
		<g transform="translate({margin.left},{margin.top})">
			<g class="circles-container">
                    {#each pitchersCleaned as pitcher}
						<circle
							cx={xScale(0.2)}
							cy={yScale(Number(pitcher["SD"])/Number(pitcher["MD"]))}
							r={5}
							data-label={pitcher['PlayerId']}
							style="opacity:{pitcher["IP"] > (innings[value]??100) ? 1 : 0}"
						>
						</circle>
                    {/each}
				</g>
			<line
				x1={xScale(0)}
				x2={chartWidth}
				y1={yScale(2)}
				y2={yScale(2)}
				stroke="red"
			></line>
			<line
				x1={xScale(1)}
				x2={xScale(1)}
				y1={margin.top}
				y2={yScale(0)}
				stroke="red"
			></line>
		</g>
	</svg>
    <div class="spacer" />
    <Scrolly bind:value>
		{#each [0, 1, 2, 3, 4] as step, i}
			{@const active = value === i}
			<div class="step" class:active>
                {#if step === 0}
                    <p>As we increase the minimum inning threshold, a trend becomes apparent.</p>
                {/if}
                {#if step === 2}
                    <p>The remaining relievers are all employed in high-leverage situations.</p>
                {/if}
                {#if step === 4}
                    <p>And those that fail to perform are gradually filtered out.</p>
                {/if}
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
        max-height:100px;
        width:300px;
        margin-left:auto;
        margin-right:auto;
		padding: 1rem;
        background-color:#ccc;
	}

    .chart-svg{
        display: block;
        margin-left:auto;
		margin-right:auto;
        position: sticky;
		top: 4em;
    }
</style>