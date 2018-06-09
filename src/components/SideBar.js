import React, { Component } from 'react'
import * as firebase from 'firebase';

import { browserHistory } from 'react-router';

import Logo from '../imgs/logo.png'
import SobreIcon from '../imgs/abouticon.svg'
import EstomatosIcon from '../imgs/leaficon.svg'
import GaleriaIcon from '../imgs/galleryicon.svg'
import ContagemIcon from '../imgs/conticon.svg'
import Sair from '../imgs/signout.svg'

import './SideBar.css'
import ItemLista from './ItemLista.js'

export default class SideBar extends Component {

    render() {
        const path = window.location.pathname;

        const logout = () => {
            firebase.auth().signOut();
            localStorage.clear();
            browserHistory.push('/');
        }

        return (
            <div>
                <nav className="navbar fixed left">
                    <a className="navbar-brand" href="/projetos">
                        <img className="logo fixed top left" src={Logo} alt="logo" />
                        <div className="div-logo">
                            <p className="text-logo">Stoma</p>
                            <p className="text-logo">Analyzer</p>
                        </div>
                    </a>

                    {path === "/projetos" &&
                        <div>
                            <ItemLista
                            classNameLink="nav-link"
                                link="/sobre"
                                imgClassName="icon"
                                imgSrc={SobreIcon}
                                imgAlt="sobreicon"
                                texto="Sobre"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/estomatos"
                                imgClassName="icon"
                                imgSrc={EstomatosIcon}
                                imgAlt="estomatosicon"
                                texto="Estômatos"
                            />

                            <ItemLista
                            classNameLink="nav-link fixed bottom marginLeft"
                                link="/"
                                imgClassName="icon-sair"
                                imgSrc={Sair}
                                imgAlt="sairicon"
                                texto="Sair"
                                onClick={logout}
                            />
                        </div>
                    }

                    {path === "/sobre" &&
                        <div>
                            <ItemLista
                            classNameLink="nav-link"
                                link="/sobre"
                                imgClassName="icon"
                                imgSrc={SobreIcon}
                                imgAlt="sobreicon"
                                texto="Sobre"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/estomatos"
                                imgClassName="icon"
                                imgSrc={EstomatosIcon}
                                imgAlt="estomatosicon"
                                texto="Estômatos"
                            />
                            <ItemLista
                            classNameLink="nav-link fixed bottom marginLeft"
                                link="/"
                                imgClassName="icon-sair"
                                imgSrc={Sair}
                                imgAlt="sairicon"
                                texto="Sair"
                                onClick={logout}
                            />
                        </div>
                    }

                    {path === "/estomatos" &&
                        <div>
                            <ItemLista
                            classNameLink="nav-link"
                                link="/sobre"
                                imgClassName="icon"
                                imgSrc={SobreIcon}
                                imgAlt="sobreicon"
                                texto="Sobre"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/estomatos"
                                imgClassName="icon"
                                imgSrc={EstomatosIcon}
                                imgAlt="estomatosicon"
                                texto="Estômatos"
                            />
                            <ItemLista
                            classNameLink="nav-link fixed bottom marginLeft"
                                link="/"
                                imgClassName="icon-sair"
                                imgSrc={Sair}
                                imgAlt="sairicon"
                                texto="Sair"
                                onClick={logout}
                            />
                        </div>
                    }

                    {path === "/projetos/galeria" &&
                        <div>
                            <ItemLista
                            classNameLink="nav-link"
                                link="/projetos/galeria"
                                imgClassName="icon"
                                imgSrc={GaleriaIcon}
                                imgAlt="galeriaicon"
                                texto="Galeria"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/projetos/contagem"
                                imgClassName="icon"
                                imgSrc={ContagemIcon}
                                imgAlt="contagemicon"
                                texto="Contagem"
                            />
                            <ItemLista
                            classNameLink="nav-link fixed bottom marginLeft"
                                link="/"
                                imgClassName="icon-sair"
                                imgSrc={Sair}
                                imgAlt="sairicon"
                                texto="Sair"
                                onClick={logout}
                            />
                        </div>
                    }

                    {path === "/projetos/contagem" &&
                        <div>
                            <ItemLista
                            classNameLink="nav-link"
                                link="/projetos/galeria"
                                imgClassName="icon"
                                imgSrc={GaleriaIcon}
                                imgAlt="galeriaicon"
                                texto="Galeria"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/projetos/contagem"
                                imgClassName="icon"
                                imgSrc={ContagemIcon}
                                imgAlt="contagemicon"
                                texto="Contagem"
                            />

                            <ItemLista
                            classNameLink="nav-link"
                                link="/projetos/contagem"
                                texto="Mostrar Dados"
                                datatoggle="modal"
                                datatarget="#dadosContagem"
                            />

                            <ItemLista
                            classNameLink="nav-link fixed bottom marginLeft"
                                link="/"
                                imgClassName="icon-sair"
                                imgSrc={Sair}
                                imgAlt="sairicon"
                                texto="Sair"
                                onClick={logout}
                            />
                        </div>
                    }
                </nav>

                

            </div>
        )
    }
}