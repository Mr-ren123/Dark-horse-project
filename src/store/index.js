import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        // 用户的登录状态信息
        user: JSON.parse(getItem(TOKEN_KEY))
        // user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {
    },
    modules: {
    }
})