<script lang="ts">
	import { getDiscordUserInfo } from '$lib/utils/discord';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { user } = $props();

	const discordInfo = getDiscordUserInfo(user);
	const isDiscordUser = discordInfo.providerId !== null;
	const displayText = discordInfo.displayName;
	const userInitials = displayText?.charAt(0).toUpperCase() || 'U';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" class="flex h-auto items-center space-x-1 p-2">
				<Avatar class="h-8 w-8">
					{#if discordInfo.avatar && isDiscordUser}
						<AvatarImage src={discordInfo.avatar} alt={displayText} />
					{/if}
					<AvatarFallback class={isDiscordUser ? 'bg-indigo-600' : 'bg-blue-600'}>
						{userInitials}
					</AvatarFallback>
				</Avatar>
				<span class="hidden text-gray-700 md:block">
					{displayText || user?.email}
				</span>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-64" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-2">
				<p class="text-sm leading-none font-medium">
					{displayText || 'User'}
				</p>
				<p class="text-xs leading-none text-muted-foreground">
					{discordInfo?.providerId}
				</p>
				{#if isDiscordUser && discordInfo.displayName !== discordInfo.mention}
					<p class="text-xs leading-none text-muted-foreground">Discord User</p>
				{/if}
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="hover: cursor-pointer" onclick={() => goto(resolve('/logout'))}
			>Sign out</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
