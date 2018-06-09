import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ItemLista extends Component{
    render(props){
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className={this.props.classNameLink} to={this.props.link} data-toggle={this.props.datatoggle} data-target={this.props.datatarget}>
                        <img className={this.props.imgClassName} 
                             src={this.props.imgSrc} 
                             alt={this.props.imgAlt}/>
                        {this.props.texto}
                    </Link>
                </li>
            </ul>
        )
    }
}