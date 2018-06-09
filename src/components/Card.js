import React from 'react'

const Card = (props) => {
    console.log(props.endereco)
    return (
        <div key={props.chave} className="col-mb-3" style={{ marginRight: '10px' }}>
            <div className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
                <img src={props.endereco} alt='imagem' style={{ width: "250px", height: "200px" }} />
            </div>
        </div>
    )

}

export default Card
