import React from 'react'

const Card = (props) => {
    console.log(props.endereco)
    return (
        <div key={props.chave} className="col-mb-3" style={{ marginRight: '10px' }}>
            <div className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
                <div className="card-body">
                    <img src={props.endereco} alt='imagem' style={{ width: "16rem" }} />
                </div>
            </div>
        </div>
    )

}

export default Card