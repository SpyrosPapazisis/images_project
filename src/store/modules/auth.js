import api from '../../api/imgur';
import qs from 'qs';

const state = {
    token: window.localStorage.getItem('imgur_token')
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token
    }
};

const actions = {
    login: () => {
        api.login();
    },
    finalizeLogin(context, hash) {
        const query = qs.parse(hash.replace('#',''));

        context.commit('setToken', query.access_token);

        window.localStorage.setItem('imgur_token', query.access_token);
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem('imgur_token');
    },
};

const mutations = {
    setToken: (state, value) => {
        state.token = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}