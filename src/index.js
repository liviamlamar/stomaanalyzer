import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Login from './ui/Login'
import Reset from './ui/RedefinirSenha'
import Estomatos from './ui/Estomatos'
import Projetos from './ui/Projetos'
import Sobre from './ui/Sobre'
import Galeria from './ui/Galeria'
import Contagem from './ui/Contagem'
import { Router, Route, browserHistory } from 'react-router'
import { firebaseApp } from './firebase/Firebase'


// FUNÇÃO DE MUDANÇA DE ESTADO NA AUTENTICAÇÃO
firebaseApp.auth().onAuthStateChanged((signedUser)=> {
  if (signedUser.emailVerified) {
    console.log('Email is verified');
    browserHistory.push('/projetos');
    console.log("Usuário autenticado.")
    console.log (signedUser.email, '-', signedUser.uid);
  }
  else {
    console.log('Email is not verified');
    var user = firebaseApp.auth().currentUser;
    user.sendEmailVerification().then(function () {
      console.log("E-mail de verificação enviado!")
    }).catch(function (error) {
      console.log("email nao enviado")
    }); 
  }
});


ReactDOM.render(
<Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='/reset' component={Reset} />
    <Route path='/app' component={App}>
      {/* <IndexRoute component={Projetos} /> */}
      {/* <Route path='/home' component={Home} /> */}
      <Route path='/projetos' component={Projetos} />
      <Route path='/estomatos' component={Estomatos} />
      <Route path='/sobre' component={Sobre} />
      <Route path='/projetos/galeria' component={Galeria} />
      <Route path='/projetos/contagem' component={Contagem} />
    </Route>
  </Router>
    , document.getElementById('root'));
registerServiceWorker();
