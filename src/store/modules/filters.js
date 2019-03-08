const state = {
    countries: [],
    protocols: [
        'SOCKS5',
        'HTTP'
    ],
    countryFilter: [],
    protocolFilter: [
        'SOCKS5',
        'HTTP'
    ]
};

const actions = {
    updateCountries({ commit, state }, newProxies) {
        let countries = newProxies.map(item => {
            const { isoCode, country } = item;

            return {
                isoCode: isoCode,
                country: country
            }
        });

        commit('updateCountries', countries);
    }
};

const mutations = {
    updateCountries(state, countries) {
        state.countries = countries;
    },
    setCountryFilter(state, countryFilter) {
        state.countryFilter = countryFilter;
    },
    setProtocolFilter(state, protocolFilter) {
        state.protocolFilter = protocolFilter;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
