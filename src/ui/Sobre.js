import React, { Component } from 'react'

import criarProjeto1 from '../imgs/passo1.png'
import criarProjeto2 from '../imgs/passo2.png'
import visualizarProjeto from '../imgs/passo3.png'
import editarProjeto from '../imgs/passo4.png'
import excluirProjeto from '../imgs/passo5.png'
import mostrarDados from '../imgs/mostrardados.png'
import modal from '../imgs/modal.png'

import './Texto.css'

const style = {
    imagem: {
        width: "500px"
    },
    menor: {
        width:"350px"
    }
}

export default class Sobre extends Component {
    render() {
        return (
            <div className="container">
                <h1 id="title">Sobre</h1>
                <div id="texto">
                    <p> O Stoma Analyzer é uma ferramenta para auxiliar pesquisadores em análises estomáticas quantitativas, permitindo ao usuário a realização de contagens de estômatos, células epidérmicas e a realização dos cálculos de indíce e densidade estomática. Esta ferramenta foi desenvolvida em 2018, como Trabalho de Conclusão de Curso, pelas estudantes do curso Técnico Integrado em Informática do IFMS (Instituto Federal de Mato Grosso do Sul), Campus Nova Andradina, Danielli Santos Siqueira e Lívia de Morais Lamar.</p>
                    <h2 id="sub-title">Modo de uso:</h2>
                    <h2 id="sub-title">Criação de projeto:</h2>
                    <img id="imagem" src={criarProjeto1} alt="figura1" style={style.imagem}></img>
                    <img id="imagem" src={criarProjeto2} alt="figura2" style={style.imagem}></img>
                    <p>Após a criação, é possível visualizar, editar e excluir um projeto.</p>
                    <img id="imagem" src={visualizarProjeto} alt="figura3" style={style.menor}></img>
                    <img id="imagem" src={editarProjeto} alt="figura4" style={style.menor}></img>
                    <img id="imagem" src={excluirProjeto} alt="figura5" style={style.menor}></img>
                    <h2 id="sub-title">Como realizar contagens:</h2>
                    <p>Para contar estômatos: clique com o lado esquerdo do mouse.</p>
                    <p>Para contar células epidérmicas: clique com o lado direito do mouse.</p>
                    <p>Para visualizar os dados da contagem: clique em "Mostrar Dados", na barra lateral</p>
                    <img id="imagem" src={mostrarDados} alt="figura6" style={style.imagem}></img>
                    <p>Ao clicar, um modal será aberto exibindo os dados da contagem. </p>
                    <img id="imagem" src={modal} alt="figura7" style={style.imagem}></img>
                    <p>Caso deseje calcular a densidade estomática, basta informar a área utilizada para a contagem de estômatos e clicar em "Calcular Densidade" para gerar o resultado.</p>
                </div>
            </div>
        )
    }
}