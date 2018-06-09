import * as firebase from 'firebase'
import Rebase from 're-base'

const config = {
  apiKey: "AIzaSyC_nxPOvIhTV-oYAjxNVMf8CId6fFpbMEg",
  authDomain: "stomaanalyzer.firebaseapp.com",
  databaseURL: "https://stomaanalyzer.firebaseio.com",
  projectId: "stomaanalyzer",
  storageBucket: "stomaanalyzer.appspot.com",
  messagingSenderId: "693168284522"
};

const firebaseApp = firebase.initializeApp(config);


const base = Rebase.createClass(firebaseApp.database())

const ref = firebase.database().ref();

const addCadastro = (pasta, objeto) => {
  ref.child(pasta).push(objeto);
}

const storage = firebase.storage().ref();
const auth = firebase.auth()

export { auth, firebaseApp, addCadastro, base, storage, ref };
