import React from 'react'

const Pin = (props) => {
  
  return (
    <span ref={ props.refValue } 
    style={{ width: 25, 
             height: 25, 
             textAlign: 'center', 
             fontSize:'1em', 
             lineHeight: '1.7em', 
             border: props.border, 
             borderRadius: '50%', 
             position:'absolute', 
             top:`${ props.posY }`, 
             left:`${props.posX}`, 
             color: props.color, 
             display:`${props.display}` }}
             onDoubleClick={props.funcao}>
      { props.counter }
    </span>
  )

}

export default Pin