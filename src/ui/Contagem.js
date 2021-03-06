import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import { firebaseApp, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Pin from '../components/Pin'
import './Contagem.css'
import ReactExport from "react-data-export"

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn


const style = {
    foto: {
        width: "100%",
        height: "100%"
    },

    modal: {
        backgroundColor: "#fff",
        opacity: "0.80",
        MozOpacity: "0.80",
        filter: "alpha(opacity=80)",
        display: "flex",
        flexDirection: "column"
    }
}

var uid = null

export default class Contagem extends Component {
    constructor(props) {
        super(props)

        this.pin = 0

        this.state = {
            marcadores: [],
            counter: 0,
            containerWidth: 0,
            containerHeight: 0,
            numeroEstomatos: 0,
            numeroCelulasEp: 0,
            resultado: 0,
            densidade: 0,
            fotos: {},
            border: [],
            color: [],
            dataSet: []
        }

        this.contagemEstomatos = this.contagemEstomatos.bind(this)
        this.contagemEpidermicas = this.contagemEpidermicas.bind(this)
        this.calcularIndice = this.calcularIndice.bind(this)
        this.calcularDensidade = this.calcularDensidade.bind(this)
        this.handlePosition = this.handlePosition.bind(this)
        this.salvarDados = this.salvarDados.bind(this)
        this.tableToExcel = this.tableToExcel.bind(this)
        // this.apagarPin = this.apagarPin.bind(this)
    }

    state = {
        foto: '',
        isUploading: false,
        progress: 0,
        fotoURL: ''
    };

    componentDidMount = () => {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            uid = signedUser.uid
            var uidString = String(uid)
            var keyString = String(idProjeto)
            base.syncState(uidString + '/' + keyString + '/imagens', {
                context: this,
                state: 'fotos',
                asArray: true
            })
        }
        )
    }

    handlePosition = () => {
        const w = (this.img.offsetWidth - this.state.containerWidth) / 3 || 0
        console.log(w)
        const h = (this.img.offsetHeight - this.state.containerHeight) / 2 || 0

        console.log(this.container.offsetHeight, this.img.offsetHeight)
        this.setState({
            posX: this.state.posX + w,
            posY: this.state.posY + (h),
            containerWidth: this.img.offsetWidth,
            containerHeight: this.img.offsetHeight
        })
    }

    mostrarPin = (key_marcador) => {
        console.log(key_marcador)
        return (
            <Pin
                refValue={ref => this.pin = ref}
                border={this.state.border[key_marcador]}
                color={this.state.color[key_marcador]}
                counter={this.state.marcadores[key_marcador].counter}
                posX={`${this.state.marcadores[key_marcador].posX}px`}
                posY={`${this.state.marcadores[key_marcador].posY}px`}
                display={this.state.marcadores[key_marcador].display}
                funcao={() => this.apagarPin(key_marcador)} />
        )
    }


    contagemEstomatos = (e) => {
        e.preventDefault();
        console.log("estomatos")

        const offW = this.pin.offsetWidth || 29
        const offY = this.pin.offsetHeight || 29
        // A cada clique na imagem um objeto é gerado com os dados abaixo relacionados
        const marcador = {
            posX: (e.clientX - (offW / 2)) - 41,
            posY: (e.clientY - (offY / 2)) - 5,
            counter: this.state.numeroEstomatos + 1,
            display: 'block'
        }

        // Altero o estado do array macadores acrescentando o novo objeto e atualizo o contador.
        this.setState({
            counter: this.state.counter + 1,
            marcadores: [...this.state.marcadores, marcador],
            numeroEstomatos: this.state.numeroEstomatos + 1,
            border: [...this.state.border, '3px solid #fc026a'],
            color: [...this.state.color, '#fc026a']
        })


        this.calcularIndice()
        this.tableToExcel()
    }



    contagemEpidermicas = (e) => {
        e.preventDefault();
        console.log("celulas ep")
        const offW = this.pin.offsetWidth || 29
        const offY = this.pin.offsetHeight || 29
        // A cada clique na imagem um objeto é gerado com os dados abaixo relacionados
        const marcador = {
            posX: (e.clientX - (offW / 2)) - 41,
            posY: (e.clientY - (offY / 2)) - 5,
            counter: this.state.numeroCelulasEp + 1,
            display: 'block'
        }

        // Altero o estado do array macadores acrescentando o novo objeto e atualizo o contador.
        this.setState({
            counter: this.state.counter + 1,
            marcadores: [...this.state.marcadores, marcador],
            numeroCelulasEp: this.state.numeroCelulasEp + 1,
            border: [...this.state.border, '3px solid #000000'],
            color: [...this.state.color, '#000000']
        })


        this.calcularIndice()
        this.tableToExcel()
    }



    calcularIndice() {
        var estomatos = this.state.numeroEstomatos
        var celulasep = this.state.numeroCelulasEp
        var soma = estomatos + celulasep
        var divisao = estomatos / soma
        var total = divisao * 100
        this.setState({
            resultado: total
        })
        this.tableToExcel()
    }


    async calcularDensidade() {
        var estomatos = await this.state.numeroEstomatos
        var area = await this.refs.area.value
        var densidade = await estomatos / area
        await this.setState({
            densidade: densidade
        })
        this.tableToExcel()
    }


    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }

    handleUploadSuccess = (filename) => {
        this.setState({ foto: filename, progress: 100, isUploading: false });
        firebaseApp.storage().ref('/imagens').child(filename).getDownloadURL().then(url => this.setState({ fotoURL: url })

        );

        const foto = this.state.foto


        base.push(uid + '/' + idProjeto + '/imagens/', {
            data: {
                filename: foto
            }
        })
    };


    salvarDados() {
        base.push(uid + '/' + idProjeto + '/dadosContagem/', {
            data: {
                filename: this.state.foto,
                // marcadores: this.state.marcadores,
                numeroEstomatos: this.state.numeroEstomatos,
                numeroCelulasEp: this.state.numeroCelulasEp,
                resultado: this.state.resultado,
                area: this.refs.area.value,
                densidade: this.state.densidade
            }
        })
    }


    tableToExcel() {
        console.log("export")
        const dataSet = []
        const objeto = {
            ne: this.state.numeroEstomatos,
            ce: this.state.numeroCelulasEp,
            ie: this.state.resultado,
            area: this.refs.area.value,
            de: this.state.densidade

        }

        dataSet.push(objeto)

        this.setState({
            dataSet
        })
    }



    // apagarPin(key){
    //     console.log("Aqui", this.state.marcadores[key])
    //     // this.state.marcadores[key].remove();
    // }

    render() {
        console.log(this.state.dataSet)
        return (
            <div>
                <div className="container-foto" ref={ref => this.container = ref}>
                    {this.state.isUploading &&
                        <progress>{this.state.progress}</progress>
                    }

                    {this.state.fotoURL &&
                        <img src={this.state.fotoURL}
                            ref={ref => this.img = ref}
                            onClick={this.contagemEstomatos}
                            onContextMenu={this.contagemEpidermicas}
                            style={style.foto}
                            alt="foto" />
                    }


                    {/* Percorre o array de objetos dos marcadores e mostro eles na tela. */}
                    {
                        Object
                            .keys(this.state.marcadores)
                            .map(key => this.mostrarPin(key, this.state.marcadores[key]))
                    }



                    <FileUploader
                        accept="image/*"
                        id="botaoFoto"
                        name="foto"
                        ref={ref => this.img = ref}
                        randomizeFilename
                        storageRef={firebaseApp.storage().ref('/imagens')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </div>

                {/* MODAL */}
                <div className="modal fade col-md-2 ml-auto" id="dadosContagem" tabIndex="-1" role="dialog" aria-labelledby="dadosContagemLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={style.modal}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="dadosContagemLabel">Dados</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ textAlign: "justify" }}>
                                <label className="col-form-label">Estomâtos: {this.state.numeroEstomatos}</label>

                                <label className="col-form-label">C. Epidérmicas: {this.state.numeroCelulasEp}</label>

                                <label className="col-form-label" style={{ marginRight: "30px" }}>Índice: {this.state.resultado}</label>

                                <label className="col-form-label" style={{ marginRight: "5px" }}>Insira a área: </label>
                                <input ref="area" name="area" type="number" style={{ width: "60px" }} />
                                <button type="button" className="btn btn-outline-secondary" style={{ marginTop: "10px", display: "flex", marginLeft: "auto", marginRight: "auto" }} onClick={this.calcularDensidade}>Calcular Densidade</button>
                                <label className="col-form-label">Densidade: {this.state.densidade}</label>
                                <button type="button" className="btn btn-success" style={{ marginTop: "5px", display: "flex", marginLeft: "auto", marginRight: "auto" }} onClick={this.salvarDados}>Salvar Dados</button>
                                {/* <button type="button" className="btn btn-success" style={{ marginTop: "5px", display: "flex", marginLeft: "auto", marginRight: "auto" }} onClick={this.tableToExcel}>Exportar</button> */}

                                    <ExcelFile element={<button type="button" className="btn btn-success" style={{marginTop: "5px", display: "flex", marginLeft: "auto", marginRight: "auto"}}>Exportar</button>}> 
                                        <ExcelSheet data={this.state.dataSet} name="Dados">
                                            <ExcelColumn label="NE" value="ne" />
                                            <ExcelColumn label="CE" value="ce" />
                                            <ExcelColumn label="IE" value="ie" />
                                            <ExcelColumn label="Área" value="area" />
                                            <ExcelColumn label="DE" value="de" />
                                        </ExcelSheet>
                                    </ExcelFile>
                            </div>

                        </div>
                    </div>

                </div>
                {/* MODAL */}

            </div>
        );
    }
}
