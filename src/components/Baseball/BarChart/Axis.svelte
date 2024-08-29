<script>
import { range } from 'd3-array';

export let xScale;
export let yScale;
export let step = 0;
export let margin;
export let chartHeight;
export let chartWidth;
export let innings;



$:xTicks=[1995,2000,2005,2010,2015,2020];
$:yTicks=[1000,2000,3000,4000];


</script>

<g class="axis-container">
    <g class="x-axis" transform="translate({margin.left},{margin.top})">
        <line x1={xScale(xTicks[0])-20} x2={chartWidth-margin.right} y1={chartHeight-margin.bottom} y2={chartHeight-margin.bottom} stroke="#ddd"></line>
        {#each xTicks as tick, index}
            <line x1={xScale(tick)+(xScale.bandwidth()/2)} x2={xScale(tick)+(xScale.bandwidth()/2)} y1={chartHeight-margin.bottom} y2={chartHeight-margin.bottom+10} stroke="#ddd"></line>
            <text x={xScale(tick)+(xScale.bandwidth()/2)} y={chartHeight-margin.bottom+25} text-anchor="middle">{tick!==0 ? tick : ""}</text>
        {/each}
    </g>
    <g class="y-axis" transform="translate({margin.left},{margin.top})">
        <line x1={xScale(xTicks[0])} x2={xScale(xTicks[0])} y1={margin.top} y2={chartHeight-margin.bottom} stroke="#ddd"></line>
        {#each yTicks as tick, index}
            <line x1={margin.left} x2={margin.left-10} y1={yScale(tick)} y2={yScale(tick)} stroke="#ddd"></line>
            <text x={margin.left-15} y={yScale(tick)} dominant-baseline="middle" text-anchor="end">{tick!==0 ? tick : ""}</text>

        {/each}
    </g>
</g>

<style>
    .hide-axis{
        display:none
    }
    .axis-container{
        fill: #ddd;
    }
</style>