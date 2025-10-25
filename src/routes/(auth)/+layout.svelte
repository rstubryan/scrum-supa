<script lang="ts">
	import AuthContent from '@/components/templates/auth-content.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<AuthContent>
	{@render children?.()}
</AuthContent>