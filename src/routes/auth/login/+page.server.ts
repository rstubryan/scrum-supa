import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const redirect = url.searchParams.get('redirect') || '/';
	const error = url.searchParams.get('error');
	return { redirect, error };
};

export const actions: Actions = {
	discord: async ({ url, locals: { supabase } }) => {
		const redirectTo = url.searchParams.get('redirect') || '/dashboard';

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
			}
		});

		if (error) {
			return fail(400, { message: error.message });
		}

		throw redirect(303, data.url);
	}
};
