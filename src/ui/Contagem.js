import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
// import ExcellentExport from 'excellentexport'
// import firebase from 'firebase'
import { firebaseApp, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Pin from '../components/Pin'
import './Contagem.css'
import Table from '../components/Table'
// import Papa from 'papaparse'
// import ExcellentExport from 'excellentexport'
// import TableExport from 'tableexport'
// import { excelExportJs } from 'excelExportJs';

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
            marcadores: [], // Array onde serão guardados os estados de cada marcado (posição no eixo X, posição no eixo Y, contador, display)
            counter: 0,
            containerWidth: 0,
            containerHeight: 0,
            numeroEstomatos: 0,
            numeroCelulasEp: 0,
            resultado: 0,
            densidade: 0,
            fotos: {},
            border:[],
            color:[]
        }

        this.contagemEstomatos = this.contagemEstomatos.bind(this)
        this.contagemEpidermicas = this.contagemEpidermicas.bind(this)
        this.calcularIndice = this.calcularIndice.bind(this)
        this.calcularDensidade = this.calcularDensidade.bind(this)
        this.handlePosition = this.handlePosition.bind(this)
        this.salvarDados = this.salvarDados.bind(this)
        this.tableToExcel = this.tableToExcel.bind(this)
        this.apagarPin = this.apagarPin.bind(this)
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
    }

    calcularDensidade() {
        var estomatos = this.state.numeroEstomatos
        var area = this.refs.area.value
        var densidade = estomatos / area
        this.setState({
            densidade: densidade
        })
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
        // var imgKey = firebase.database().ref(uid + '/' + idProjeto + '/imagens/').child(this.state.foto).key;
        // console.log(imgKey)
        // var keyImg
        // {
        //     Object
        //         .keys(this.state.fotos)
        //         .map(key, this.state.fotos[key])
        // }
        base.push(uid + '/' + idProjeto + '/dadosContagem/', {
            data: {
                filename: this.state.foto,
                marcadores: this.state.marcadores,
                numeroEstomatos: this.state.numeroEstomatos,
                numeroCelulasEp: this.state.numeroCelulasEp,
                resultado: this.state.resultado,
                densidade: this.state.densidade
            }
        })
    }

    // tableToExcel(context) {
    //     var sheet = context.workbook.worksheets.getItem("Sample");
    //     var expensesTable = sheet.tables.add("A1:E1", true /*hasHeaders*/);
    //     expensesTable.name = "Dados da Contagem";
    
    //     expensesTable.getHeaderRowRange().values = [["NE", "CE", "IE", "A", "DE"]];
    
    //     expensesTable.rows.add(null /*add rows to the end of the table*/, [
    //         [this.state.numeroEstomatos, this.state.numeroCelulasEp, this.state.resultado, this.refs.area.value, this.state.densidade]
    //     ]);

    //     if (Office.context.requirements.isSetSupported("ExcelApi", 1.2)) {
    //         sheet.getUsedRange().format.autofitColumns();
    //         sheet.getUsedRange().format.autofitRows();
    //     }
    
    //     sheet.activate();
    
    //     return context.sync();
    // }

    tableToExcel() {
        var tabela = <table id="datatable">
        <thead>
          <tr id="cabeca-tabela">
            <th colspan="5">Dados Contagem</th>
          </tr>
        </thead>

        <thead>
          <tr>
            <th>NE</th>
            <th>CE</th>
            <th>IE</th>
            <th>A</th>
            <th>DE</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td id="ne">{this.state.numeroEstomatos}</td>
            <td id="ce">{this.state.numeroCelulasEp}</td>
            <td id="indice">{this.state.resultado}</td>
            <td id="area">{this.refs.area.value}</td>
            <td id="densidade">{this.state.densidade}</td>
          </tr>
        </tbody>	
      </table>
        

        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tabela))


        // var tab_text="<table border='2px'><tr bgcolor='#87AFC6' style='height: 75px; text-align: center; width: 250px'>";
        // var textRange; var j=0;
        // var tab = tabela; // id of table
        // for(j = 0 ; j < tab.rows.length ; j++)
        // {
        //     tab_text=tab_text;
        //     tab_text=tab_text+tab.rows[j].innerHTML.toUpperCase()+"</tr>";
        //     //tab_text=tab_text+"</tr>";
        // }
        // tab_text= tab_text+"</table>";
        
        // var ua = window.navigator.userAgent;
        // var msie = ua.indexOf("MSIE ");
        // var sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
        
        
        // return (sa);

    }
        
        // var downloadLink
        // var dataType = 'applicaiton/vmd.ms-excel'
        // var tableSelect = tabela
        // var tableHTML = tableSelect.outerHTML.replace("/ /g", '%20');
        // downloadLink = document.createElement("a")
        // document.body.appendChild(downloadLink)
        // var filename = "download"
        // if(navigator.msSaveOrOpenBlob){
        //     var blob = new Blob(['\ufeff', tableHTML], {
        //         type: dataType
        //     })
        //     navigator.msSaveOrOpenBlob(blob, filename)
        // } else {
        //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML

        //     downloadLink.download = filename

        //     downloadLink.click()
        // }
        // }
        // <Table id={"datatable"}
        //                     ne={this.state.numeroEstomatos}
        //                     ce={this.state.numeroCelulasEp}
        //                     indice={this.state.resultado}
        //                     area={this.refs.area.value}
        //                     densidade={this.state.densidade} />

        // tabela.convertToRange()

        // const dados = [this.state.numeroEstomatos, this.state.numeroCelulasEp, this.state.resultado, this.refs.area.value, this.state.densidade]
        // tabela = JSON.stringify(tabela.props)
        // // var csv = Papa.unparse(tabela)
        // window.open('data:application/vnd.ms-excel,' + encodeURIComponent(this.state.numeroEstomatos) + encodeURIComponent(this.state.numeroCelulasEp) + encodeURIComponent(this.state.resultado) + encodeURIComponent(this.refs.area.value) + encodeURIComponent(this.state.densidade))

        // ExcellentExport.excel(this, "datatable", 'Dados')

        //  var table = TableExport(tabela)
        //  var exportData = table.getExportData()



        // console.log(csv)
    

        // var blob = new Blob([tabela], { type: "text/plain;charset=utf-8" });
        // blob.saveAs(blob, "filename.txt");


        // tabela.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(VALUE));
        // tabela.setAttribute('download', 'filename.csv');


        // var name = "Dados"
        // var uri = 'data:application/vnd.ms-excel;base64,'
        //     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        //     , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        //     , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        // return function (tabela, name) {
        //     if (!tabela.nodeType) tabela = tabela
        //     var ctx = { worksheet: name || 'Worksheet', tabela: tabela.innerHTML }
        //     window.location.href = uri + base64(format(template, ctx))
        // }


    // ExcellentExport.excel(this, 'tabela', 'Dados');

    // var uri = 'data:application/vnd.ms-excel;base64,'
    //   , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    //   , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    //   , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    // return function(table, name) {
    //   if (!table.nodeType) table = document.getElementById(table)
    //   var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    //   window.location.href = uri + base64(format(template, ctx))
    // }

    apagarPin(key){
        console.log("Aqui", this.state.marcadores[key])
        // this.state.marcadores[key].remove();
    }

    render() {
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
                                <button type="button" className="btn btn-success" style={{ marginTop: "5px", display: "flex", marginLeft: "auto", marginRight: "auto" }} onClick={this.tableToExcel}>Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL */}

            </div>
        );
    }
}
