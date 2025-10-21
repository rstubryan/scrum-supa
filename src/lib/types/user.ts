export interface UserProps {
	id?: string;
	email?: string;
	user_metadata?: UserMetadata;
	app_metadata?: AppMetadata;
}

export interface UserMetadata {
	provider?: string;
	user_name?: string;
	name?: string;
	picture?: string;
	avatar_url?: string;
	full_name?: string;
	iss?: string;
	provider_id?: string;
}

export interface AppMetadata {
	provider?: string;
}

export interface DiscordUserProps {
	id: string;
	username: string;
	display_name: string | null;
	global_name: string | null;
	avatar: string | null;
	discriminator: string;
}
