import {
    html,
    LitElement,
    css
} from "lit-element";

import {
    store
} from "../../redux/store";

import {
    connect
} from "@brunomon/helpers";

import {
    button
} from "../css/button"

export class footerComponente extends connect(store)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.item = []
        this.tituloHeader = ""
        this.leyendaHeader = ""

    }


    static get styles() {
        return css `
            ${button}
            :host(){
                position:absolute;
                top:0;
                left:0;
                height: 20%;
                width: 100%;
                background-color: var(--color-gris-claro);
                border:none;
     
            }

            .contenedor{            
        
                width: 100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                box-sizing: border-box;
                background-color:var(--color-gris-claro);   
               }

            .labelTitulo{
               width:100%;
                background-color: transparent;
                display: flex;
                align-items:center; 
                justify-content:left;
                text-align: center;
                font-size: var(--font-header-h2-size);
                font-weight: var(--font-header-h2-weight)   ;
                color:var(--color-azul-oscuro);
                padding-top: 0.84rem;
                padding-left: 0.84rem;
                padding-bottom: 0.84rem;
                text-justify:center;
                padding:.84rem;
            }

            .labelLeyenda{

                width: 80%;                
                display: flex;
                justify-content:center;
                text-align: center;
                background-color:#FFFFFF;
                color:var(--color-azul-oscuro);
                padding-bottom:.84rem
            }

            .boton{
                width:90%;
                margin-bottom:.84rem
            }

        `
    }

    render() {
        return html `
            <div id="footer" class="contenedor">
                
                     <label class="labelTitulo" id="lblTitulo">${this.titulo}</label>
          

                     <button role="button" id="botonFooter" ctah2 class="boton" >${this.leyenda}</button>

            </div>`
    }

    stateChanged(state, name) {

    }

    static get properties() {
        return {
            titulo: {
                type: String,
                reflect: true,
                attribute: 'titulo'
            },
            leyenda: {
                type: String,
                reflect: true,
                attribute: 'leyenda'

            }

        }
    }
}


window.customElements.define("footer-componente", footerComponente);