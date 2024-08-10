<script>
import { transition } from 'd3-transition';

export let xScale;
export let yScale;
export let step;
export let margin;
export let chartHeight;
export let chartWidth;

$:xTicks=xScale.ticks();
$:yTicks=yScale.ticks();


</script>

<g class="axis-container">
    <g class="x-axis" transform="translate({margin.left},{margin.top})">
        <line x1={xScale(0)-20} x2={chartWidth} y1={yScale(0)} y2={yScale(0)} stroke="black"></line>
        {#each xTicks as tick, index}
            <line x1={xScale(tick)} x2={xScale(tick)} y1={yScale(0)} y2={yScale(0)-10} stroke="black"></line>
                <text x={xScale(tick)} y={chartHeight} text-anchor="middle">{tick!==0 ? tick : ""}</text>
        {/each}
    </g>
    <g class="y-axis" transform="translate({margin.left},{margin.top})">
        <line x1={xScale(0)} x2={xScale(0)} y1={margin.top} y2={yScale(0)+20} stroke="black"></line>
        {#each yTicks as tick, index}
            <line x1={margin.left} x2={margin.left+10} y1={yScale(tick)} y2={yScale(tick)} stroke="black"></line>
            {#if tick*10%10===0}
                <text x={margin.left-5} y={yScale(tick)} dominant-baseline="middle" text-anchor="end">{tick!==0 ? tick : ""}</text>
            {/if}
        {/each}
    </g>
</g>