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
    inicioSesionComponente
} from "../componentes/iniciosesioncomponente"

import {
    headerComponente
} from "../componentes/header"

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

const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaMisconsultas extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();

        this.idioma = "ES"
        this.titulo = idiomas[this.idioma].misconsultas.titulo
        this.leyenda = idiomas[this.idioma].misconsultas.leyenda
    }

    static get styles() {
        return css `
        :host{
            display: flex;
            background-color:var(--color-gris-fondo);
            height: 100%;
            width: 100%;   
            flex-direction:column
        }
        :host([hidden]){
            display: none; 
        }

        .cajas{
           display:flex;
           flex-direction:row;
           align-content:center;
           background-color:transparent;
           justify-content:space-between;
           padding-bottom:5rem;
        }

        .caja{
            display:flex;
            flex-direction:column;
            align-content:center;
            background-color:var(--color-celeste);
            border-radius:.2rem;
            text-align:center;
            margin-left:.84rem;
            margin-right:0rem;
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
        `
    }

    render() {
        return html `
            <div style="display:flex;flex-direction:column">
            <header-componente titulo=${idiomas[this.idioma].misconsultas.titulo} leyenda="${idiomas[this.idioma].misconsultas.leyenda}" ></header-componente>
            <proxima-consulta  style="padding:.84rem;justify-self:center" id="proxima"></proxima-consulta>
            </div>
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
            <footer-componente titulo="${idiomas[this.idioma].misconsultas.footerTitulo}" leyenda="${idiomas[this.idioma].misconsultas.footerLeyenda}"></footer-componente>
            <div class="ayuda">

            </div>

            

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
            }
        }
    }

}
window.customElements.define("pantalla-misconsulta", pantallaMisconsultas);