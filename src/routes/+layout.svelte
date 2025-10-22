<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import AuthButton from '$lib/components/auth/auth-button.svelte';
	import { onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

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
			</div>
			<div class="flex items-center">
				<AuthButton user={data.user} />
			</div>
		</div>
	</div>
</nav>

<main>
	<Toaster />
	{@render children?.()}
</main>
