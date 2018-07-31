import firebase from 'firebase'

export default function ({context, redirect, route}) {

    firebase.auth().onAuthStateChanged(user => {

        console.log(user)

        if (!user) return redirect('')
    })
}