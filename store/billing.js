export const CURRENCY_RUB = 'RUB';
export const CURRENCY_USD = 'USD';

export const state = () => ({
    currency: CURRENCY_RUB,
    gateway: '',
    redirectTo: {}
});

export const actions = {
    purchase({ commit, state }) {
        const { currency } = state;

        return this.$axios.$get('/api/purchase', { params: { currency } })
            .then(response => {
                const { redirect_to: redirectTo } = response;

                commit('setRedirectTo', { [currency]: redirectTo });

                return redirectTo;
            })
    }
};

export const mutations = {
    setCurrency(state, currency) {
        state.currency = currency;
    },
    setGateway(state, gateway) {
        state.gateway = gateway;
    },
    setRedirectTo(state, redirectTo) {
        state.redirectTo = { ...state.redirectTo, ...redirectTo };
    }
};
