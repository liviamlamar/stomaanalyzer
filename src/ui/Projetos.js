import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { base, firebaseApp } from '../firebase/Firebase'

var idProjeto = null
var uid = null

export default class Projetos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projetos: {},
            key: null
        }

        this.listItem = this.listItem.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.getThisItem = this.getThisItem.bind(this)
        this.openProject = this.openProject.bind(this)
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            uid = signedUser.uid
            var uidString = String(uid)

            base.syncState(uidString, {
                context: this,
                state: 'projetos',
                asArray: false
            })
        })
    }



    handleRemove(key) {
        base.remove(uid + '/' + key)
            .then(() => {
                console.log('sucesso')
            })
            .catch((error) => {
                console.log(error)
            })

    }

    listItem(key, projeto) {
        console.log(key, projeto)
        return (
            <div className="col-mb-4" style={{ marginRight: "10px" }}>
                <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
                    <div className="card-body">
                        <h5 className="card-title">{projeto.nome}</h5>
                        <p className="card-text">{projeto.descricao}</p>
                        <button type="button" className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={() => this.openProject(key)}>Visualizar</button>
                        <button type="button" className="btn btn-info" data-toggle="modal" style={{ marginRight: "5px" }} onClick={() => this.getThisItem(key)} data-target="#exampleModal">Editar</button>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#confirm" onClick={idProjeto = key}>Excluir</button>
                    </div>
                </div>
            </div>
        )
    }

    getThisItem(key) {

        this.nome.value = this.state.projetos[key].nome
        this.descricao.value = this.state.projetos[key].descricao
        this.setState({
            key
        })
        console.log(key)
    }

    handleSave(event, key) {
        event.preventDefault()

        const nome = this.nome.value
        const descricao = this.descricao.value

        this.state.key ?
            base.update(uid + '/' + this.state.key, {
                data: {
                    nome,
                    descricao
                }
            }).then(() => {
                this.setState({
                    key: null
                })
            }).catch(error => {
                console.log(error)
            })
            :
            base.push(uid, {
                data: {
                    nome,
                    descricao
                }
            }).then(() => {
                console.log(key, this.state.key)
            }).catch(error => {
                console.log(error)
            })
        this.nome.value = ''
        this.descricao.value = ''
    }

    openProject(key) {
        idProjeto = key
        browserHistory.push('/projetos/galeria')
    }

    render() {

        return (
            <div>
                <div>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" style={{ marginTop: "10px", marginBottom: "15px" }}>Criar Projeto</button>
                    <div className="row" style={{ justifyContent: "center" }}>
                        {Object
                            .keys(this.state.projetos)
                            .map(key => this.listItem(key, this.state.projetos[key]))}
                    </div>
                </div>



                {/* MODAL CRIAR PROJETO */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Criar Projeto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nome" className="col-form-label">Nome:</label>
                                        <input ref={ref => this.nome = ref} type="text" className="form-control" id="nome" required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descricao" className="col-form-label">Descrição:</label>
                                        <textarea ref={ref => this.descricao = ref} className="form-control" id="descricao" required="required"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleSave}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
                <div className="modal fade" id="confirm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Tem certeza que deseja excluir este arquivo permanentemente?</label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleRemove(idProjeto)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { idProjeto }