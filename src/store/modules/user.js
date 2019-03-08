import jwtDecode from 'jwt-decode'
import api from '@/api.js'

let state = {
    accessToken: "",
    refreshToken: "",
    profile: {}
};

const stateReader = () => {
    let newState = state;

    try { newState = JSON.parse(localStorage.getItem('credentials')) || newState } catch (_) {}

    return newState;
};

state = stateReader();

const getters = {
    name(state) {
        const { accessToken } = state;
        const { aud } = jwtDecode(accessToken);

        return aud;
    }
};

const actions = {
    requestAuth({ commit }, provider) {
        return api.get(`/auth/${provider}`, { withCredentials: true }).then(response => response.data);
    },
    sync({ commit, state }) {
        commit('setCredentials', stateReader());
    },
    logout({ commit }) {
        commit('reset');
    },
    authenticate({ commit, state }, { provider, query }) {
        return api
            .get(`/auth/${provider}/callback`, {
                params: query,
                withCredentials: true
            })
            .then(response => response.data)
            .then(credentials => {
                const { access_token: accessToken, refresh_token: refreshToken } = credentials;
                commit('setCredentials', { accessToken, refreshToken });
            })
    },
    isExpired({ commit, state }) {
        const { accessToken } = state;
        const { exp } = jwtDecode(accessToken);

        return Math.floor((new Date().getTime()) / 1e3) >= exp;
    },
    refreshToken({ commit, state }) {
        const { refreshToken } = state;

        return api
            .post('/auth/refresh', null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            })
            .then(response => response.data)
            .then(credentials => {
                const { access_token: accessToken, refresh_token: refreshToken } = credentials;
                commit('setCredentials', { accessToken, refreshToken });
            })
            .catch(() => commit('setCredentials', { accessToken: '', refreshToken: '' }));
    },
    profile({ commit, state }) {
        const { accessToken } = state;

        return api
            .get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => response.data)
            .then(profile => commit('setProfile', profile))
            .catch(() => commit('setProfile', {}));
    }
};

const mutations = {
    setCredentials(state, credentials) {
        state = Object.assign(state, credentials);
        localStorage.setItem('credentials', JSON.stringify(state));
    },
    setProfile(state, profile) {
        state.profile = profile;
    },
    reset(state) {
        state = Object.assign(state, {
            accessToken: "",
            refreshToken: "",
            profile: {}
        });

        localStorage.setItem('credentials', JSON.stringify(state));
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
