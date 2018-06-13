import React, { Component } from 'react'
import { auth, storage, base, ref } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Card from '../components/Card'
import firebase from 'firebase'

const style = {
    modal: {
        backgroundColor: "#fff",
        opacity: "0.80",
        MozOpacity: "0.80",
        filter: "alpha(opacity=80)",
        display: "flex",
        flexDirection: "column"
    }
}

export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: [],
            user: '',
            url: [],
            estomatos: '',
            celepidermicas: '',
            indice: '',
            area: '',
            densidade: '',
            chave: ''
        }

        this.listItem = this.listItem.bind(this)
        this.getChave = this.getChave.bind(this)
        this.showData = this.showData.bind(this)



    }




    async componentWillMount() {
        await auth.onAuthStateChanged((user) => {
            // console.log('setUser', user)

            this.setState({
                user
            })
        })


        const keyString = await String(idProjeto)
        // console.log('user', this.state.user.uid)
        await base.syncState(this.state.user.uid + '/' + keyString + '/imagens', {
            context: this,
            state: 'fotos',
            asArray: true,
            then: () => {
                let url = []

                this.state.fotos.forEach(foto => {
                    let nome = foto.filename
                    storage.child(`imagens/${foto.filename}`).getDownloadURL().then((snap) => {
                        let dados = {
                            url: snap,
                            key: foto.key,
                            filename: nome
                        }

                        url.push(dados)
                        this.setState({
                            url
                        })
                    });

                })

            }
        })
    }


    listItem(chave, endereco) {
        // console.log('list', endereco.filename)

        return (
            <Card chave={chave} endereco={endereco.url} dataToggle="modal" dataTarget="#showDataModal" funcao={() => { this.getChave(endereco.filename) }} />
        )

    }

    async getChave(filename) {

        const child = await ref.child(this.state.user.uid + '/' + idProjeto + '/dadosContagem/')
        const query = await child.orderByChild("filename").equalTo(filename)
        await query.once('value', snap => {
            snap.forEach(val => {
                this.setState({
                    chave: val.key
                })
                console.log('chave', this.state.chave)
            })
        })

        if (this.state.chave !== '') {
            this.showData()
        }


    }

    async showData() {
        await console.log("aqui")

        await firebase.database().ref(this.state.user.uid + '/' + idProjeto + '/dadosContagem/' + this.state.chave).on('value', (snapshot) => {

            this.setState({
                estomatos: snapshot.val().numeroEstomatos,
                celepidermicas: snapshot.val().numeroCelulasEp,
                indice: snapshot.val().resultado,
                area: snapshot.val().area,
                densidade: snapshot.val().densidade
            })
        });



        console.log("teste", this.state.estomatos, "teste", this.state.celepidermicas, "teste", this.state.indice, "teste", this.state.area, "teste", this.state.densidade)




    }


    render() {

        return (
            <div className="galeria">
                <h1>Galeria</h1>
                <div className="imagens row" style={{ marginLeft: "55px" }}>
                    {
                        Object
                            .keys(this.state.url)
                            .map(key => this.listItem(key, this.state.url[key]))
                    }


                    {/* MODAL */}
                    <div className="modal fade col-md-2 ml-auto" id="showDataModal" tabIndex="-1" role="dialog" aria-labelledby="showDataModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={style.modal}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="showDataModalLabel">Dados</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ textAlign: "justify" }}>
                                    <label>Estômatos: {this.state.estomatos}</label>
                                    <label>Células Epidérmicas: {this.state.celepidermicas}</label>
                                    <label>Índice: {this.state.indice} </label>
                                    <label>Área Analisada: {this.state.area}</label>
                                    <label>Densidade: {this.state.densidade} </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MODAL */}


                </div>

            </div>
        );
    }
}
