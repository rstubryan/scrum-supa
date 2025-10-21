<script lang="ts">
	import UserMenu from './UserMenu.svelte'
	import { Button } from '$lib/components/ui'

	let { user, session } = $props()
</script>

{#if user}
	<UserMenu {user} {session} />
{:else}
	<div class="flex items-center space-x-4">
		<a href="/auth/login">
			<Button class="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Sign in</Button>
		</a>
		<a href="/auth/login">
			<Button>Get started</Button>
		</a>
	</div>
{/if}