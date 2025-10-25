<script lang="ts">
	import '../app.css';
	import MainContent from '@/components/templates/main-content.svelte';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const error = urlParams.get('error');

		if (error === 'discord_required') {
			console.error('Discord authentication required for this page');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<MainContent {data}>
	{@render children?.()}
</MainContent>
