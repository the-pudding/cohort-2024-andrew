<script>
import { transition } from 'd3-transition';

export let xScale;
export let yScale;
export let step = 0;
export let margin;
export let chartHeight;
export let chartWidth;
export let innings;



$:xTicks=xScale.ticks();
$:yTicks=yScale.ticks();


</script>

<g class="axis-container">
    <g class="x-axis" transform="translate({margin.left},{margin.top})" class:hide-axis={step < 2}>
        <line x1={xScale(xTicks[0])-20} x2={chartWidth} y1={yScale(yTicks[yTicks.length-1])} y2={yScale(yTicks[yTicks.length-1])} stroke="#ddd"></line>
        {#each xTicks as tick, index}
            <line x1={xScale(tick)} x2={xScale(tick)} y1={yScale(yTicks[yTicks.length-1])} y2={yScale(yTicks[yTicks.length-1])-10} stroke="#ddd"></line>
            <text x={xScale(tick)} y={chartHeight+10} text-anchor="middle">{tick!==0 ? tick : ""}</text>
        {/each}
    </g>
    <g class="y-axis" transform="translate({margin.left},{margin.top})">
        <line x1={xScale(xTicks[0])} x2={xScale(xTicks[0])} y1={margin.top} y2={yScale(yTicks[yTicks.length-1])+20} stroke="#ddd"></line>
        {#each yTicks as tick, index}
            <line x1={margin.left} x2={margin.left+10} y1={yScale(tick)} y2={yScale(tick)} stroke="#ddd"></line>
            {#if tick*10%10===0}
                <text x={margin.left-5} y={yScale(tick)} dominant-baseline="middle" text-anchor="end">{tick!==0 ? tick : ""}</text>
            {/if}
        {/each}
    </g>
    <text
        text-anchor="end"
        x={xScale(xTicks[xTicks.length-1])}
        y={yScale(5)}
        font-size="18px"
    >
        MLB Relievers 1994-2024, min. 300 IP
    </text>
</g>

<style>
    .hide-axis{
        display:none
    }
    .axis-container{
        fill: #ddd;
    }
</style>