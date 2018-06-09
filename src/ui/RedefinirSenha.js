import React, { Component } from 'react';
import { firebaseApp } from '../firebase/Firebase';
import EmailIcon from '../imgs/email.svg';
import './RedefinirSenha.css';
import { browserHistory } from 'react-router';

var emailAddress;

export default class Forgot extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this)

        this.state = {
            email: ""
        }
        emailAddress = this.state.email;
        console.log(emailAddress);
    }

    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        })
    }
    

    // FUNÇÃO QUE ENVIA UM EMAIL AO USUARIO PARA RESETAR SENHA
    resetPassword(event) {
        event.preventDefault();
        var auth = firebaseApp.auth();
        auth.sendPasswordResetEmail(this.refs.email.value).then(function () {
            console.log("reset email enviado")
        }).catch(function (error) {
            console.log(error)
        });
    }

    // FUNÇÃO QUE VOLTA PARA A TELA DE LOGIN
    voltar() {
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="reset-container">
                <header id="logo"></header>
                <section id="recuperarAcesso">
                    <form id="reset" >
                        <div className="quadro-reset">
                            <h4>Podemos redefinir sua senha, só precisamos do seu endereço de e-mail:</h4>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><img src={EmailIcon} alt="emailicon" id="img-email"/></span>
                                </div>
                                <input id="input" name="email" ref="email" type="email" className="form-control" placeholder="E-mail" onChange={this.handleChange} aria-label="E-mail" aria-describedby="basic-addon1" />
                            </div>
                            <button type="button" id="btn-reset" onClick={this.resetPassword} className="btn btn-outline-secondary">Redefinir</button>
                            <button type="button" id="btn-reset" className="btn btn-outline-secondary" onClick={this.voltar}>Voltar</button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}