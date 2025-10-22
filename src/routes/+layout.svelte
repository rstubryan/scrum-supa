<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import AuthButton from '$lib/components/auth/AuthButton.svelte';
	import { onMount } from 'svelte';

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

<nav class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-gray-900"> ScrumSupa </a>
				{#if data.user}
					<div class="ml-6 flex items-center space-x-4">
						<a href="/debug/discord" class="text-sm text-gray-600 hover:text-gray-900"> Debug </a>
					</div>
				{/if}
			</div>
			<div class="flex items-center">
				<AuthButton user={data.user} />
			</div>
		</div>
	</div>
</nav>

<main>
	{@render children?.()}
</main>
