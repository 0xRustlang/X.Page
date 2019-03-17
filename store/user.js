import jwtDecode from 'jwt-decode'

export const state = () => ({
    credentials: {},
    profile: {}
});

export const getters = {
    name(state) {
        const { aud } = jwtDecode(state.credentials.accessToken);

        return aud;
    },
    isExpired(state) {
        const { exp } = jwtDecode(state.credentials.accessToken);

        return Math.floor((new Date().getTime()) / 1e3) >= exp;
    }
};

export const actions = {
    requestAuth({ commit }, provider) {
        return this.$axios.$get(`/auth/${provider}`);
    },
    authenticate({ commit, state }, { provider, query }) {
        return this.$axios
            .$get(`/auth/${provider}/callback`, { params: query })
            .then(credentials => {
                const { access_token: accessToken, refresh_token: refreshToken } = credentials;

                commit('setCredentials', { credentials: { accessToken, refreshToken } });
            })
    },
    refreshToken({ commit, state }) {
        return this.$axios.$post('/auth/refresh', [], { headers: { Authorization: `Bearer ${state.credentials.refreshToken}` } })
            .then(credentials => {
                const { access_token: accessToken, refresh_token: refreshToken } = credentials;

                commit('setCredentials', { credentials: { accessToken, refreshToken } });
            })
            .catch(() => commit('setCredentials', { credentials: {} }));
    },
    profile({ commit }) {
        return this.$axios.$get('/auth/profile').then(profile => commit('setProfile', profile)).catch(() => commit('setProfile', {}));
    }
};

export const mutations = {
    setCredentials(state, credentials) {
        state = Object.assign(state, credentials);
    },
    setProfile(state, profile) {
        state.profile = profile;
    }
};
