import Vue from "vue"
import Vuex from "vuex"

import { getItem, setItem } from "@/utils/storage"

Vue.use(Vuex)

const TOUTIAO_USERNAME = "TOUTIAO_USERNAME"

export default new Vuex.Store({
    state: {
        user:getItem(TOUTIAO_USERNAME)
    },
    mutations: {
        setUser(state, data) { 
            state.user = data

            //防止数据刷新丢失，我们需要把数据备份到本地存储
            // window.localStorage.setItem(TOUTIAO_USERNAME, JSON.stringify(state.user))
            setItem(TOUTIAO_USERNAME,state.user )
        }
    },
    actions: {

    },
    modules: {

    }
})
