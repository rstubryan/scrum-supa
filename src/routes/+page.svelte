<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getDiscordUserInfo } from '$lib/utils/discord';
	import { page } from '$app/state';

	let { data } = $props();

	const discordInfo = data.user ? getDiscordUserInfo(data.user) : null;
	const isDiscordUser = discordInfo?.providerId !== null;
	const searchParams = page.url.searchParams;
	const error = searchParams.get('error');
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">Welcome to ScrumSupa</h1>
			<p class="mx-auto mt-6 max-w-2xl text-xl text-gray-500">
				Manage your scrum projects with ease using SvelteKit and Supabase.
			</p>

			{#if error === 'discord_required'}
				<div class="mx-auto mt-4 max-w-md rounded-md border border-amber-200 bg-amber-50 p-4">
					<p class="text-sm font-medium text-amber-800">
						⚠️ Discord Required: The page you tried to access requires Discord authentication.
						Please sign in with Discord to continue.
					</p>
				</div>
			{/if}

			{#if data.user}
				<div class="mt-8 space-y-4">
					<div class="mx-auto max-w-md rounded-md border border-green-200 bg-green-50 p-4">
						{#if isDiscordUser}
							<div class="mb-3 flex items-center justify-center">
								{#if discordInfo?.avatar}
									<img
										src={discordInfo.avatar}
										alt={discordInfo.displayName}
										class="h-12 w-12 rounded-full object-cover"
									/>
								{:else}
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white"
									>
										{discordInfo?.displayName?.charAt(0).toUpperCase() || 'D'}
									</div>
								{/if}
							</div>
							<h2 class="text-lg font-medium text-green-800">
								Welcome back, {discordInfo?.providerId}!
							</h2>
							{#if discordInfo?.displayName !== discordInfo?.mention}
								<p class="mt-1 text-sm font-medium text-green-700">
									{discordInfo?.displayName}
								</p>
							{/if}
							<p class="mt-1 text-sm text-green-700">Successfully signed in via Discord</p>
						{:else}
							<h2 class="text-lg font-medium text-green-800">
								Welcome back, {data.user.email}!
							</h2>
							<p class="mt-1 text-sm text-green-700">You are successfully signed in.</p>
						{/if}
					</div>
					<div class="space-x-4">
	<a href="/dashboard">
		<Button>Go to Dashboard</Button>
	</a>
	<a href="/auth/logout">
		<Button variant="outline">Sign Out</Button>
	</a>
					</div>
				</div>
			{:else}
			<div class="mt-8">
				<a href="/auth/login">
					<Button size="lg">Get Started</Button>
				</a>
				<p class="mt-4 text-sm text-gray-600">Sign in with Discord to continue</p>
			</div>
			{/if}
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<div class="overflow-hidden rounded-lg bg-white shadow">
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<div class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
								<svg
									class="h-5 w-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900">Secure Authentication</h3>
							<p class="mt-1 text-sm text-gray-500">
								Authentication powered by Supabase with JWT tokens
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg bg-white shadow">
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<div class="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
								<svg
									class="h-5 w-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900">Fast & Modern</h3>
							<p class="mt-1 text-sm text-gray-500">
								Built with SvelteKit and Tailwind CSS for optimal performance
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg bg-white shadow">
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<div class="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500">
								<svg
									class="h-5 w-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
									/>
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900">Easy Setup</h3>
							<p class="mt-1 text-sm text-gray-500">Quick authentication with OAuth providers</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
