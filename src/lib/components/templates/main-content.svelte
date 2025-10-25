<script lang="ts">
	import AuthButton from '@/components/molecules/auth-button.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import type { UserProps } from '$lib/types/user';

	interface DataProps {
		user?: UserProps;
	}

	interface Props {
		children: import('svelte').Snippet;
		data?: DataProps;
		showNavbar?: boolean;
	}

	let { children, data = {}, showNavbar = true }: Props = $props();
</script>

{#if showNavbar}
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
{/if}

<main>
	<Toaster />
	{@render children?.()}
</main>
