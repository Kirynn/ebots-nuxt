import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseWrapper = {

    install(Vue, options) {

        let app = null
        let appDB = null

        // If firebase app has not been created
        if (!firebase.apps.length) {

            app = firebase.initializeApp({
                apiKey: options.apiKey,
                authDomain: `${options.authDomain}.firebaseapp.com`,
                projectId: options.projectId,
                databaseURL: options.databaseURL
            })

            appDB = firebase.database();
        }


        Vue.prototype.$firebase = firebase
        Vue.prototype.$firebase.db = appDB
    }
}

Vue.use(firebaseWrapper, {
    apiKey: 'AIzaSyC8SkAEKaxOieSTvZHaKa02IFp6fjwVCGQ',
    authDomain: 'ebots-test-database',
    projectId: 'ebots-test-database',
    databaseURL: 'https://ebots-test-database.firebaseio.com/'
})