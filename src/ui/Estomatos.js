import React, { Component } from 'react'

import './Texto.css'

import EsquemaEstomato from '../imgs/representacaoestomato.png'
import TiposEstomatos from '../imgs/tiposestomatos.jpg'
import Estomatosimg from '../imgs/figura1-estomatos.jpg'

export default class Estomatos extends Component{
    render(){
        return(
                <div className="container">
                    <h1 id="title">Estômatos</h1>
                    <div id="texto">
                        <p>Entre as estruturas que formam o tecido epidérmico, estão os estômatos (Figura 1), formados por um ostíolo  rodeado por células oclusivas de forma arredondada, denominadas células-guardas, as quais podem ou não estar acompanhadas por outras células epidérmicas estrutural e fisiologicamente associadas aos estômatos, que recebem o nome de subsidiárias. (RUIZ et al., 1962; LINDORFF et al., 1991, FLORES-VINDAS, 1999).</p>
                        <div id="div-imagem">
                            <img id="imagem" src={EsquemaEstomato} alt="figura1"></img>
                            <p id="legenda">Figura 1. Representação esquemática do estômato. Fonte: Só Biologia.</p>
                        </div>
                        <p>Com base na disposição das células subsidiárias, este complexo estomático pode ser classificado em: anomocítico (a célula subsidiária ocorre, mas não é identificada), anisocítico (ocorrem três células subsidiárias ao redor do estômato com tamanho e formato diferentes), paracítico (com uma ou duas células subsidiárias paralelas ao maior eixo do estômato), diacítico (a parede comum às células subsidiárias dispõem-se perpendicularmente ao maior eixo do estômato), ciclocítico (as células subsidiárias envolvem o estômato, descrevendo um círculo ou semicírculo) e tetracítico (ocorre em quatro células subsidiárias, duas paralelas ao estômato e uma em cada um de seus polos) (SOUZA, 2016) (Figura 2).</p>
                        <div id="div-imagem">
                            <img id="imagem" src={TiposEstomatos} alt="figura2"></img>
                            <p id="legenda">Figura 2. Representação dos tipos de estômatos: A – paracítico, B – diacítico, C – anisocítico, D – anomocítico, E – tetracítico, F – actinocítico, G – ciclocítico.</p>
                        </div>
                        <p>Quanto à presença de estômato, as folhas, por sua vez, também podem ser classificadas, sendo denominadas de folhas anfiestomáticas, aquelas que possuem complexos estomáticos na epiderme de ambas as faces; folhas epiestomáticas, as que os possuem somente na epiderme adaxial (superior); e folhas hipoestomática, as folhas que possuem estômatos apenas na face abaxial (inferior) (SOUZA, 2016), como ocorre com Ormosia arborea, uma espécie arbórea nativa da Mata Atlântica e do Cerrado (Figura 3).</p>
                        <div id="div-imagem">
                            <img id="imagem" src={Estomatosimg} alt="figura3"></img>
                            <p id="legenda">Figura 3. Seção paradérmica de folhas de Ormosia arborea. Face adaxial (a), face abaxial (b). Abreviaturas: CE= células epidérmicas; EST= estômatos. Escala: 10µm. Fotos: Fernanda Soares Junglos.</p>
                        </div>
                        <p>Nas plantas, os estômatos desempenham um papel importante na troca de gases (respiração e fotossíntese) e na transpiração (perda de água na forma de vapor), influenciando todo o funcionamento da planta. As células-guarda, que apresentam um formato diferenciado, disposição radial das microfibrilas de celulose na parede e espessamento maior nas porções voltadas para o ostíolo, têm a função de controlar a abertura e o fechamento dos estômatos por meio da variação da turgescência. Na maioria das plantas, os estômatos se abrem pela manhã quando há presença de luz e os solutos são acumulados ativamente nas células-guarda, causando um movimento osmótico de água para dentro delas. Por outro lado, os estômatos se fecham com a diminuição da luminosidade ao final do dia por um processo inverso: redução da concentração de solutos nas células-guarda e consequente saída da água, reduzindo a pressão de turgor que é exercida sobre a parede celular. Essa pressão exercida é uma resistência da membrana à entrada de água na célula, ou seja, a célula se incha devido à pressão exercida pelos fluidos e o conteúdo celular nas paredes da célula (RAVEN et al., 2014).</p>
                    </div>
                </div>
        )
    }
}