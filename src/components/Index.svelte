<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import ScatterChart from "$components/ScatterChart/index.svelte"
	// import Footer from "$components/Footer.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	let value;

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<WIP />
<!-- <Demo /> -->

<body>
	<div class="text-blocks">
		<p>Think about closers.</p>
		<p>Mariano Rivera is great.</p>
	</div>
	<!-- <VideoContainer url={}> -->
	<ScatterChart />
</body>

<style>
	.text-blocks{
		max-width:600px;
		margin-left:auto;
		margin-right:auto;
	}
</style>

