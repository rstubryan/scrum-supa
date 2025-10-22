<script lang="ts">
	import UserMenu from './UserMenu.svelte'
	import { Button } from '$lib/components/ui/button'

	let { user } = $props()
</script>

{#if user}
	<UserMenu {user} />
{:else}
	<div class="flex items-center space-x-4">
		<a href="/auth/login">
			<Button variant="outline">Sign in</Button>
		</a>
		<a href="/auth/login">
			<Button>Get started</Button>
		</a>
	</div>
{/if}