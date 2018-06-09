import React, { Component } from 'react'
import { auth, firebaseApp, storage, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Card from '../components/Card'

/*
var uid = null
const vetor_url = []
const vetor_key = []
*/
export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: [],
            key: [],
            url: []
        }

        this.listItem = this.listItem.bind(this)



    }




    async componentWillMount() {
        const user = await auth.currentUser
        // console.log(user)
        const keyString = await String(idProjeto)
        await base.syncState(user.uid + '/' + keyString + '/imagens', {
            context: this,
            state: 'fotos',
            asArray: true,
            then: () => {
                const vetor_url = []
                const dados = {}
                this.state.fotos.forEach(foto => {

                    storage.child(`imagens/${foto.filename}`).getDownloadURL().then((snap) => {
                        dados.url = snap
                        dados.key = foto.key
                        vetor_url.push(dados)
                        this.state.url.push(dados)
                        // this.setState({
                        //     url: vetor_url
                        // })
                    });

                })

            }
        })
    }

    // async componentWillMount() {
    //     const vetor_url = []
    //     const vetor_key = []
    //     console.log('will', this.state.fotos)
    //     await this.state.fotos.forEach(foto => {
    //         console.log('fotos', foto.filename, foto.key)

    //         storage.child(`imagens/${foto.filename}`).getDownloadURL().then((snap) => {
    //             console.log('snap', snap)
    //             vetor_url.push(snap)
    //             vetor_key.push(foto.key)

    //         });
    //     })
    //     await this.setState({
    //         url: vetor_url,
    //         key: vetor_key
    //     })
    // }

    listItem(chave, endereco) {
        console.log('list')

        return (
            <Card chave={chave} endereco={endereco} />
        )

    }



    // console.log(fotos.foto)
    // firebaseApp.storage().ref('/imagens').child(fotos.foto).getDownloadURL()
    //     .then(url => this.setState({
    //         url
    //     })
    //     );
    //     this.state.urlVetor.push(this.state.url)


    //    storage.child(`imagens/${fotos.foto}`).getDownloadURL()
    //         .then( url => {
    //             console.log(url)
    //             return (
    //                 <div className="col-mb-3" style={{marginRight:'10px'}}>
    //                 <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom:"10px" }}>
    //                     <div className="card-body">
    //                         <img src={url} alt='imagem' style={{width: "16rem"}}/>
    //                     </div>
    //                 </div>
    //                 </div>
    //             )
    //         } )

    // storage.child(`imagens/${fotos.foto}`).getDownloadURL()
    // .then( url => this.setState({url}))
    // return (
    //     <div className="col-mb-3" style={{marginRight:'10px'}}>
    //     <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom:"10px" }}>
    //         <div className="card-body">
    //             <img src={this.state.url} alt='imagem' style={{width: "16rem"}}/>
    //         </div>
    //     </div>
    //     </div>
    // )


    // return (
    //     <div className="col-mb-3" style={{ marginRight: '10px' }}>
    //         <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
    //             <div className="card-body">
    //                 <img src={snapshot.downloadURL} alt='imagem' style={{ width: "16rem" }} />
    //             </div>
    //         </div>
    //     </div>
    // )
    //add it to firestore


    //}

    render() {
        console.log('url', this.state.url);

        // if(this.state.url!=null){
        //    console.log("nulo") 
        // }else{
        // this.state.url.forEach(elem => {
        //     console.log("aqui")
        //     console.log(elem.key, elem.url)})}

        return (
            <div className="galeria">
                <h1>Galeria</h1>
                <div className="imagens row" style={{ marginLeft: '45px' }}>
                    { 
                        this.state.url.forEach(elem => {
                        console.log("aqui")
                        console.log(elem.key, elem.url)
                        return (
                            <Card chave={elem.key} endereco={elem.url} />
                        )
                    })}


                </div>

            </div>
        );
    }
}