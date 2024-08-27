<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Baseball from '$components/Baseball/Baseball.svelte'
	import Footer from '$components/Footer.svelte'

	let value;

	const copy = getContext("copy");
	const data = getContext("data");
</script>

<!-- <WIP /> -->

<Baseball copy={copy}/>

<Footer />

<style>
	.text-blocks{
		max-width:600px;
		margin-left:auto;
		margin-right:auto;
		margin-top:15px;
		margin-bottom:15px;
	}	
</style>

