export const state = () => ({
    items: []
});

export const actions = {
    poll({ commit, state }) {
        if (state.items.length > 0) {
            return Promise.resolve(state.items);
        }

        return this.$axios.$get('/v1/proxy')
            .then(response => {
                const items = response
                    .filter(item => {
                        const { iso_code: isoCode } = item;

                        return isoCode;
                    })
                    .map(item => {
                        const { server, port, iso_code: isoCode, country, protocol, ping_time_ms: pingTimeMs } = item;

                        return { isoCode: isoCode.toLowerCase(), server, port, country, protocol, pingTimeMs };
                    });

                commit('setProxies', items);

                return items;
            });
    }
};

export const mutations = {
    setProxies(state, proxies) {
        state.items = proxies;
    }
};
