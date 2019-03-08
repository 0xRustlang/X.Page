import api from '@/api.js'

const state = {
    items: []
};

const actions = {
    setProxies({ commit }, proxies) {
        commit('setProxies', proxies);
    },
    poll({ commit }) {
        commit('setProxies', []);

        return api
            .get('/v1/proxy')
            .then(response => response.data)
            .then(response => {
                const items = response
                    .filter(item => {
                        const { iso_code: isoCode } = item;
                        return isoCode
                    })
                    .map(item => {
                        const {
                            server,
                            port,
                            iso_code: isoCode,
                            country,
                            protocol,
                            ping_time_ms: pingTimeMs
                        } = item;

                        return {
                            isoCode: isoCode.toLowerCase(),
                            server: server,
                            port: port,
                            country: country,
                            protocol: protocol,
                            pingTimeMs: pingTimeMs
                        };
                    });

                commit('setProxies', items);

                return items;
            });
    }
};

const mutations = {
    setProxies(state, proxies) {
        state.items = proxies;
    }
};

export default {
    state,
    actions,
    mutations
}
