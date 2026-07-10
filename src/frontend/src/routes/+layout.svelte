<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../../global.css';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children()}
