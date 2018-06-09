import React, { Component } from 'react'
import { auth, storage, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Card from '../components/Card'


export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: [],
            user: '',
            url: []
        }

        this.listItem = this.listItem.bind(this)



    }




    async componentWillMount() {
        await auth.onAuthStateChanged( (user) => {
            console.log('setUser', user)

            this.setState({
                user
            })
        })

        
        const keyString = await String(idProjeto)
        console.log('user', this.state.user.uid)
        await base.syncState(this.state.user.uid + '/' + keyString + '/imagens', {
            context: this,
            state: 'fotos',
            asArray: true,
            then: () => {
                let url = []
            
                this.state.fotos.forEach(foto => {

                    storage.child(`imagens/${foto.filename}`).getDownloadURL().then((snap) => {
                        let dados = {
                            url: snap,
                            key: foto.key
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
        console.log('list')

        return (
            <Card chave={chave} endereco={endereco.url} />
        )

    }


    render() {

        return (
            <div className="galeria">
                <h1>Galeria</h1>
                <div className="imagens row" style={{ marginLeft:"55px" }}>
                    { 
                        Object
                            .keys(this.state.url)
                            .map(key => this.listItem(key, this.state.url[key]))
                    }


                </div>

            </div>
        );
    }
}
