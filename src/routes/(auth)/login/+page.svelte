<script lang="ts">
	import LoginForm from '$lib/components/organisms/form/login-form.svelte';

	let { form, data } = $props();
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<LoginForm {form} {data} />
	</div>
</div>
