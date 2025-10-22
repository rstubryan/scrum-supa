import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url, locals: { safeGetSession } }) => {
	const { user, session } = await safeGetSession();

	const protectedRoutes = ['/dashboard', '/debug'];
	const discordOnlyRoutes = ['/dashboard'];
	const authRoutes = ['/login', '/register'];

	const currentPath = url.pathname;

	if (!session?.user) {
		if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
			throw redirect(303, `/login?redirect=${encodeURIComponent(currentPath)}`);
		}
	} else {
		const discordInfo = session.user.user_metadata;
		const isDiscordUser =
			discordInfo?.provider === 'discord' || discordInfo?.iss?.includes('discord');

		if (discordOnlyRoutes.some((route) => currentPath.startsWith(route)) && !isDiscordUser) {
			throw redirect(303, '/?error=discord_required');
		}

		// Redirect authenticated users away from auth routes
		if (authRoutes.some((route) => currentPath.startsWith(route))) {
			throw redirect(303, '/dashboard');
		}
	}

	return {
		user,
		session
	};
}) satisfies LayoutServerLoad;
