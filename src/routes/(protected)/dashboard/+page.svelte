<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { getDiscordUserInfo } from '@/utils/discord';

	let { data } = $props();

	const discordInfo = data.user ? getDiscordUserInfo(data.user) : null;
	const isDiscordUser = discordInfo?.providerId !== null;
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
		<div class="px-4 py-6 sm:px-0">
			<div class="rounded-lg border-4 border-dashed border-gray-200 p-8">
				<div class="text-center">
					<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
					<div class="mt-2">
						{#if isDiscordUser}
							<div class="flex items-center justify-center space-x-3">
								{#if discordInfo?.avatar}
									<img
										src={discordInfo.avatar}
										alt={discordInfo.displayName}
										class="h-10 w-10 rounded-full object-cover"
									/>
								{:else}
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white"
									>
										{discordInfo?.displayName?.charAt(0).toUpperCase() || 'D'}
									</div>
								{/if}
								<p class="text-lg text-gray-600">
									Welcome to your dashboard, {discordInfo?.providerId}!
								</p>
							</div>
							{#if discordInfo?.displayName !== discordInfo?.mention}
								<p class="mt-1 text-sm text-gray-500">
									{discordInfo?.displayName}
								</p>
							{/if}
						{:else}
							<p class="text-lg text-gray-600">
								Welcome to your dashboard, {data.user?.email}!
							</p>
						{/if}
					</div>

					<div class="mt-8">
						<div class="rounded-md border border-blue-200 bg-blue-50 p-6">
							<h2 class="mb-4 text-xl font-medium text-blue-900">Your Scrum Projects</h2>
							<p class="mb-6 text-blue-700">
								This is where your scrum projects will appear. Start by creating your first project!
							</p>

							<div class="space-y-4">
								<Button>
									<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										/>
									</svg>
									Create New Project
								</Button>

								<div class="text-sm text-gray-600">
									Or <a href="/logout" class="text-blue-600 hover:text-blue-500">sign out</a> to exit
								</div>
							</div>
						</div>
					</div>

					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<div class="rounded-lg bg-white p-6 shadow">
							<h3 class="text-lg font-medium text-gray-900">Active Sprints</h3>
							<p class="mt-2 text-3xl font-bold text-blue-600">0</p>
						</div>
						<div class="rounded-lg bg-white p-6 shadow">
							<h3 class="text-lg font-medium text-gray-900">Total Tasks</h3>
							<p class="mt-2 text-3xl font-bold text-green-600">0</p>
						</div>
						<div class="rounded-lg bg-white p-6 shadow">
							<h3 class="text-lg font-medium text-gray-900">Team Members</h3>
							<p class="mt-2 text-3xl font-bold text-purple-600">0</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
