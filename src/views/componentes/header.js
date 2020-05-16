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

export class headerComponente extends connect(store)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.item = []
        this.tituloHeader = ""
        this.leyendaHeader = ""

    }


    static get styles() {
        return css `
        
            :host(){
                position:absolute;
                top:0;
                left:0;
                height: 20%;
                width: 100%;
                background-color: var(--color-blanco);
                border-bottom-left-radius:.5rem;
                border-bottom-right-radius:.5rem;       
            }

            .contenedor{            
        
                width: 100%;
                display:flex;
                flex-direction:column;
                background-color: var(--color-blanco);
                box-sizing: border-box;
                border-bottom-left-radius:.8rem;
                border-bottom-right-radius:.8rem;}

            .labelTitulo{
               
                background-color: transparent;
                display: flex;
                align-items:center; 
                justify-content:left;
                text-align: left;
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight)   ;
                padding-top: 1.1rem;
                padding-left: 1.2rem;
                padding-bottom: .4rem;
            }

            .labelLeyenda{

                width: 80%;                
                display: flex;
                justify-content:left;
                text-align: left;
                font-size:var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
                padding-top:0;
                padding-left:1.2rem;
                padding-bottom:0.84rem;
            }

        `
    }

    render() {
        return html `
            <div id="header" class="contenedor">
                <div>
                     <label class="labelTitulo" id="lblTitulo">${this.titulo}</label>
                </div>
                <div>
                     <label id="lblLeyenda" class="labelLeyenda">${this.leyenda}</label>
                </div>
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


window.customElements.define("header-componente", headerComponente);