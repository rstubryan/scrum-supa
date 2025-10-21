import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url, locals: { safeGetSession } }) => {
	const { user, session } = await safeGetSession();

	const protectedRoutes = ['/dashboard', '/debug'];
	const discordOnlyRoutes = ['/dashboard'];

	const currentPath = url.pathname;

	if (!session?.user) {
		if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
			throw redirect(303, `/auth/login?redirect=${encodeURIComponent(currentPath)}`);
		}
	} else {
		const discordInfo = session.user.user_metadata;
		const isDiscordUser =
			discordInfo?.provider === 'discord' || discordInfo?.iss?.includes('discord');

		if (discordOnlyRoutes.some((route) => currentPath.startsWith(route)) && !isDiscordUser) {
			throw redirect(303, '/?error=discord_required');
		}

		if (currentPath.startsWith('/auth/login')) {
			throw redirect(303, '/dashboard');
		}
	}

	return {
		user,
		session
	};
}) satisfies LayoutServerLoad;
