<script>
	import "$styles/app.css";
	import "$styles/variables.css";
	import Header from "$components/Header.svelte";
</script>

<Header />
<main id="content">
	<slot />
</main>
