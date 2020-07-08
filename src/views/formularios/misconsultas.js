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
    modoPantalla,
    cancelarTimer
} from "../../redux/actions/ui";
import {
    idiomas
} from "../../redux/datos/idiomas"

import {
    proximaConsulta
} from "../componentes/proximaconsulta"

import {
    AGENDA,
    HISTORIAL
} from "../../../assets/icons/icons"

import {
    footerComponente
} from "../componentes/footer"

import {
    cabecera1
} from "../css/cabecera1"

import {
    button
} from "../css/button"

import {
    pieComponente
} from "../componentes/pie"

import {
    proxima
} from "../css/proxima"
import { mediaConMenu01 } from "../css/mediaConMenu01"


const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaMisconsultas extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();

        this.idioma = "ES"
        this.titulo = idiomas[this.idioma].misconsultas.titulo
        this.leyenda = idiomas[this.idioma].misconsultas.leyenda
    }

    static get styles() {
        return css`
        ${cabecera1}
        ${button}
        ${proxima}
        ${mediaConMenu01}
        :host{
            position: absolute;
            top: 0;
            left: 0;  
            display: grid;
            background-color:var(--color-gris-fondo);
            height: 100vh;
            width: 100%;   
            grid-template-rows:90% 10%;
        }
        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            grid-template-rows:100%;
        }
        :host(:not([media-size="small"])) #gridContenedor{
            align-content:flex-start;
        }
        #gridContenedor{
            grid-template-rows:18% 10% 72%;           
        }
        .proxima{
            height:3vh;
        }
        .cajas{
           display:flex;
           flex-direction:row;
           align-content:center;
           background-color:transparent;
           justify-content:space-between;
           padding-bottom:5rem;
        }

        .cuerpo{
            position: relative;
            display:grid;
            grid-auto-flow:row;
            width:100%;
            padding-top:.84rem;
            overflow-x: none; 
            overflow-y: auto; 
        }
        .cuerpo::-webkit-scrollbar {
            display: none;
        }
        .cajas{
            display:grid;
            grid-template-columns:50% 50%;
             
        }
        .caja{
            display:grid;
            flex-direction:column;
            align-content:center;
            background-color:var(--color-celeste);
            border-radius:.2rem;
            text-align:center;
            margin-left:.84rem;
            margin-right:0rem;
            height:35vw;
            cursor:pointer;
        }

        div svg {
            height:2.94rem;
            width:3.56rem;
            padding-top:1rem         
        }

        .cajaTexto{
            font-size:.84rem;
            color:#fff;
            padding-right:1rem;
            padding-top:.8rem;
            padding-left:1rem;
            padding-bottom:.8rem;
            text-align:center
        }

        .ayuda{
            display:grid;
            grid-auto-flow:row;
            background-color:var(--color-gris-claro);
            font-size:var(--font-header-h2-family);
            font-weight:var(--font-header-h2-weight);
            color:var(--color-azul-oscuro);
            align-content:center;
            width:100%;
            padding-top:.84rem;
            text-align:center;
            grid-gap:.84rem
        }
        :host(:not([media-size="small"])) .ayuda{
            display:none;
        }
        #footer{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        `
    }

    render() {
        return html`

            <div id="gridContenedor">
                <div id="header">
                    <div id="bar">
                        <div id="lblTitulo">
                            ${idiomas[this.idioma].misconsultas.titulo + (store.getState().cliente.datos.nombre == "" ? "" : ", " + store.getState().cliente.datos.nombre)}
                        </div>
                    </div>
                    <div id="lblLeyenda">${idiomas[this.idioma].misconsultas.leyenda}</div>
                </div>       

                <div class="proxima">
                    <div>
                        ${idiomas[this.idioma].misconsultas.consulta}
                    </div>
                    <div style="text-align:right;text-decoration:underline;padding-right:.8rem">
                        ${idiomas[this.idioma].misconsultas.ingresar}
                    </div>
                </div>
           
                <div class="cuerpo">
                    <div class="cajas">
                        <div class="caja">
                            <div>${HISTORIAL}</div>
                            <div class="cajaTexto">Ver historial de consultas</div>
                        </div>
                        <div class="caja" style="margin-right:.84rem" @click="${this.irAgenda}">
                            <div>${AGENDA}</div>
                            <div class="cajaTexto">Ver próximas consultas</div>
                        </div>
                    </div>
                    <div class="ayuda">
                        <div>
                            <div>
                            ${idiomas[this.idioma].misconsultas.footerTitulo1}
                            </div>
                            <div>
                            ${idiomas[this.idioma].misconsultas.footerTitulo2}
                            </div>
                        </div>

                        <div style="padding-left:.84rem;padding-right: .84rem;padding-bottom: .84rem;">
                            <button style="width: 100%;padding:.84rem;" id="asistencia" btn1 >${idiomas[this.idioma].misconsultas.footerLeyenda}</button>
                        </div>
                    </div>
                </div>
            </div>
            <pie-componente  id="footer" opcion="uno"  media-size="${this.mediaSize}"></pie-componente>

        `
    }

    irAgenda(e) {
        store.dispatch(modoPantalla("agenda"))
    }

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "misconsultas") {
            store.dispatch(cancelarTimer())
        }
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }

}
window.customElements.define("pantalla-misconsulta", pantallaMisconsultas);