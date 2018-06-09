import React from 'react'

const Table = (props) => {

    return (
        <div>
            <table id={props.id}>
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

          <tfoot>
            <tr>
              <td id="ne">{props.ne}</td>
              <td id="ce">{props.ce}</td>
              <td id="indice">{props.indice}</td>
              <td id="area">{props.area}</td>
              <td id="densidade">{props.densidade}</td>
            </tr>
          </tfoot>	
        </table>
        </div>
    )
}

export default Table