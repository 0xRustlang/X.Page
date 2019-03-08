const languageKey = 'languageSettings';
let state = {
    lang: "ru"
};

const stateReader = () => {
    let newState = state;

    try { newState = JSON.parse(localStorage.getItem(languageKey)) || newState } catch (_) {}

    return newState;
};

state = stateReader();

const actions = {
    change({ commit }, lang) {
        commit('change', lang);
    }
};

const mutations = {
    change(state, lang) {
        state.lang = lang;
        try {
            localStorage.setItem(languageKey, JSON.stringify(state));
        } catch (_) {}
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};