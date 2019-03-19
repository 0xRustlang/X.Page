export const state = () => ({
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
});

export const mutations = {
    updateCountries(state, countries) {
        state.countries = countries
            .map(item => {
                const { isoCode, country } = item;

                return { isoCode, country };
            })
            .sort((optionA, optionB) => optionA.country.localeCompare(optionB.country));
    },
    setCountryFilter(state, countryFilter) {
        state.countryFilter = countryFilter;
    },
    setProtocolFilter(state, protocolFilter) {
        state.protocolFilter = protocolFilter;
    }
};
