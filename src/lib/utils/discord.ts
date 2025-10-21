import type { UserMetadata, UserProps } from '$lib/types/user';

export interface DiscordUserInfo {
	displayName: string;
	mention: string;
	avatar: string | null;
	providerId: string | null;
}

export function getDiscordUserInfo(user: UserProps): DiscordUserInfo {
	if (!user?.user_metadata) {
		return {
			displayName: user?.email || 'Unknown User',
			mention: user?.email || 'Unknown User',
			avatar: null,
			providerId: null
		};
	}

	const metadata = user.user_metadata as UserMetadata;
	const isDiscord = metadata.provider === 'discord' || metadata.iss?.includes('discord');

	if (!isDiscord) {
		return {
			displayName: user?.email || 'Unknown User',
			mention: user?.email || 'Unknown User',
			avatar: metadata.picture || metadata.avatar_url || null,
			providerId: null
		};
	}

	const discordId = metadata.provider_id || user.id || null;
	const username = metadata.user_name || metadata.name || 'Unknown';
	const displayName = metadata.full_name || username;
	const avatar = metadata.picture || metadata.avatar_url || null;

	return {
		displayName: displayName,
		mention: discordId ? `<@${discordId}>` : 'Unknown User',
		avatar: avatar,
		providerId: discordId
	};
}
