import Vue from 'vue'

export const state = () => ({

    list: []
})

export const mutations = {

    getChildren(state) {

        return state.children
    },

    updateChildren(state, data) {

        state.children.push(data)
    }
}

export const actions = {

    getChildren({commit}, ids) {

        ids.forEach(id => {
            
            this.$firebase.db.ref(`/children/${id}`).once('value').then((s) => {
                
                commit('updateChildren', s.val())
            })
        });
    },

    setChildren({commit}, child) {

        this._vm.$firebase.db.ref(`children/${child.id}`).set({

            firstName: child.firstName,
            lastName: child.lastName,
            date: child.date,
            grade: child.grade,
            notes: [],
            parent: this._vm.$data.$$state.id
        })
    },

    async test ({commit}) {

        return await commit('getChildren')
    }
}

export const getters = {

    list: state => {

        return state.list
    }
}