<script lang="ts">
	import { getDiscordUserInfo } from '$lib/utils/discord';

	let { user } = $props();

	let isOpen = $state(false);

	const discordInfo = getDiscordUserInfo(user);
	const isDiscordUser = discordInfo.providerId !== null;
	const displayText = discordInfo.displayName;
	const userInitials = displayText?.charAt(0).toUpperCase() || 'U';
</script>

<div class="relative">
	<button
		onclick={() => (isOpen = !isOpen)}
		class="flex items-center space-x-3 rounded-full p-2 text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	>
		{#if discordInfo.avatar && isDiscordUser}
			<img src={discordInfo.avatar} alt={displayText} class="h-8 w-8 rounded-full object-cover" />
		{:else}
			<div
				class="h-8 w-8 rounded-full {isDiscordUser
					? 'bg-indigo-600'
					: 'bg-blue-600'} flex items-center justify-center font-medium text-white"
			>
				{userInitials}
			</div>
		{/if}
		<span class="hidden text-gray-700 md:block">
			{isDiscordUser ? discordInfo?.providerId : user?.email}
		</span>
		<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="ring-opacity-5 absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
		>
			<div class="py-1">
				<div class="border-b border-gray-100 px-4 py-3 text-sm">
					<div class="font-medium text-gray-900">
						{isDiscordUser ? 'Discord User' : 'Email User'}
					</div>
					<div class="mt-1 truncate font-semibold text-gray-900">
						{isDiscordUser ? discordInfo?.providerId : user?.email}
					</div>
					{#if isDiscordUser && discordInfo.displayName !== discordInfo.mention}
						<div class="mt-1 truncate text-xs text-gray-500">
							{discordInfo.displayName}
						</div>
					{/if}
					{#if !isDiscordUser}
						<div class="mt-1 text-xs text-gray-500">
							{user?.email}
						</div>
					{/if}
				</div>
				<a
					href="/logout"
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
				>
					Sign out
				</a>
			</div>
		</div>
	{/if}

	{#if isOpen}
		<div
			class="fixed inset-0 z-40"
			onclick={() => (isOpen = false)}
			onkeydown={(e) => e.key === 'Escape' && (isOpen = false)}
			role="button"
			tabindex="0"
			aria-label="Close menu"
		></div>
	{/if}
</div>
