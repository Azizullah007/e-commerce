import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCmhDbeNgbQ69oHRD4kkQOO_vbbQ5JT7SQ",
    authDomain: "morningflowerdb.firebaseapp.com",
    databaseURL: "https://morningflowerdb.firebaseio.com",
    projectId: "morningflowerdb",
    storageBucket: "morningflowerdb.appspot.com",
    messagingSenderId: "706555551860",
    appId: "1:706555551860:web:4adeb18ee1b9b01dcc7121",
    measurementId: "G-30Z0XPD91E"
  }

export const createUserProfileDocument = async (userAuth, addtionalData) =>{
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  
  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch (error){
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase