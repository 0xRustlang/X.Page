export const actions = {
    nuxtServerInit({ commit }, { req, app }) {
        const credentials = app.$cookies.get('credentials');

        if (!credentials) {
            return;
        }

        commit('user/setCredentials', { credentials });
    }
};
