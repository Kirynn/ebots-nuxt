export const state = () => {

    email: ''
    firstName: ''
    lastName: ''
    isLoggedIn: false
    id: ''
}
export const mutations = {

    logUserIn(state, data) {

        state.email = data.email
        state.lastName = data.lastName
        state.firstName = data.firstName
        state.id = data.id
        state.isLoggedIn = true
    },

    logUserOut(state) {

        state.email = ''
        state.firstName = ''
        state.lastName = ''
        state.isLoggedIn = false
    }
}