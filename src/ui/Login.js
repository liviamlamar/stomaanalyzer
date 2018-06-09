import React, { Component } from 'react'
import * as firebase from 'firebase'
import { firebaseApp } from '../firebase/Firebase'
import Lock from '../imgs/lock.svg'
import EmailIcon from '../imgs/email.svg'
import './Login.css'
var provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
firebase.auth().languageCode = 'pt'


export default class Login extends Component {
    constructor() {
        super();

        // BIND
        this.authenticate = this.authenticate.bind(this);
        this.create = this.create.bind(this);
        this.authenticateWithGoogleAccount = this.authenticateWithGoogleAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // BIND

        this.state = {
            email: "",
            uid: ""
            // handle: this.handleSave
        }
        localStorage.clear();

    }

    // METODO QUE TRATA A MUDANÇA DE DADOS NOS INPUTS
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        // SETANDO O ESTADO
        this.setState({
            [name]: target.value
        })
    }


    // AUTENTICANDO COM EMAIL E SENHA
    authenticate(e) {
        e.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(signedUser => {
            this.setState({
                user: signedUser,
                uid: signedUser.uid
            })
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }


    // AUTENTICANDO COM CONTA DO GOOGLE
    authenticateWithGoogleAccount() {
        firebaseApp.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(token, user);

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.log(errorCode, errorMessage, email, credential);
        });
    }


    // CRIANDO AUTH COM EMAIL E SENHA
    create(e) {
        e.preventDefault();
        firebaseApp.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value)
            .then(signedUser => {
                this.setState({
                    user: signedUser,
                    email: this.refs.email.value
                }
                );
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });

        // const email = this.refs.email.value
        // base.push('usuario/', {
        //     data: {
        //         email
        //     }
        // }).then(() => {
        //     console.log("inserido com sucesso")
        // })
    }


    render() {
        return (
            <div className="main-container">
                <header id="logo"></header>

                {/* SESSÃO DE LOGIN E CADASTRO */}

                <section id="acesso">

                    <form id="loginscreen">
                        <div className="quadro-login">
                            <h1 id="title">Login</h1>

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><img id="img-email" src={EmailIcon} alt="emailicon" /></span>
                                </div>
                                <input name="email" ref="email" type="email" className="form-control" placeholder="Endereço de e-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2"><img src={Lock} id="img-lock" alt="lock" /></span>
                                </div>
                                <input name="password" ref="password" type="password" className="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="basic-addon2" />
                            </div>

                            <div className="remember-forgot">

                                <div className="forgot">
                                    <a className="reset" href="/reset">Esqueceu a senha?</a>
                                </div>
                            </div>

                            {/* <div id="recaptcha-box">
                                <form action="" method="get">
                                    <div className="g-recaptcha" data-sitekey="6Lc3zFsUAAAAABV3k96g3xOthug8--QAcF3xoi9a"></div>
                                </form>
                            </div> */}

                            <div id="botoes">
                                <div className="btn-group">
                                    <button type="submit" id="btn-entrar" onClick={this.authenticate} className="btn btn-outline-secondary">Entrar</button>

                                    <div className="btn-group">
                                        <a className="btn btn-outline-secondary" id="btn" onClick={this.authenticateWithGoogleAccount}>Google</a>
                                    </div>

                                    <div className="btn-group">
                                        <button type="submit" id="btn-cadastrar" onClick={this.create} className="btn btn-outline-secondary">Cadastrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </section>
                {/* FIM SESSAO LOGIN E CADASTRO  */}

            </div>
        );
    }
}