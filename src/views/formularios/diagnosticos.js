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
    headerComponente
} from "../componentes/header"
import { mediaConMenu01 } from "../css/mediaConMenu01"

import {
    VIDEO, REFRESH
} from "../../../assets/icons/icons"

import {
    cabecera1
} from "../css/cabecera1"

import { pieComponente } from "../componentes/pie"
import { proxima } from "../css/proxima"
import { diagnosticoComponente } from "../componentes/diagnostico"

import { get as getPuesto } from "../../redux/actions/puestos";
import { get as getReservas, patch as patchReservas, add as addReservas } from "../../redux/actions/reservas";

const PUESTO_TIMESTAMP = "puesto.timeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"
const RESERVAS_TIMESTAMP = "reservas.timeStamp"
const RESERVAS_UPDATETIMESTAMP = "reservas.updateTimeStamp"
const RESERVAS_ADDTIMESTAMP = "reservas.addTimeStamp"
const RESERVAS_ERRORGETTIMESTAMP = "reservas.errorTimeStamp"
const RESERVAS_ERROROTROSTIMESTAMP = "reservas.commandErrorTimeStamp"

export class pantallaDiagnosticos extends connect(store, PUESTO_TIMESTAMP, MODO_PANTALLA, RESERVAS_TIMESTAMP, RESERVAS_UPDATETIMESTAMP, RESERVAS_ADDTIMESTAMP, RESERVAS_ERRORGETTIMESTAMP, RESERVAS_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();

        this.idioma = "ES"
        this.titulo = idiomas[this.idioma].misconsultas.titulo
        this.leyenda = idiomas[this.idioma].misconsultas.leyenda
        this.puestoSeleccionado = -1
        this.puestos = null
        this.reservas = null
        this.reservasJson = { token: "", filter: "", expand: "Mascota($select = Nombre), Tramo", orderby: "FechaAtencion,HoraAtencion" }
        //this.reservasJson = { token: "", expand: "Mascota($select = Nombre), Tramo", orderby: "FechaAtencion,HoraAtencion" }

    }

    static get styles() {
        return css`
        ${cabecera1}
        ${mediaConMenu01}

        :host{
            display: grid;
            background-color:var(--color-gris-fondo);
            height: 100vh;
            width: 100%;   
            padding:0;
            margin:0;
        }

        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            grid-template-rows: 100%;
        }
        :host([media-size="small"]){
            grid-template-rows: 9fr 1fr;
        }
        #gridContenedor{
            display:grid;
            grid-template-rows:18fr 82fr;           
        }
        #cuerpo{           
            display:grid;
            position:relative;
            border: 1px solid red;
        }
        #footer{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        #control{
            padding: 0 1rem 0 1rem;
        }
        :host([media-size="small"]) #control{
            height:calc((100vh * .82) * .9);
        }
        :host(:not([media-size="small"])) #control{
            height:calc(100vh * .82);
        }
        `
    }

    render() {
        return html`
            <div id="gridContenedor">
                <div id="header">
                    <div id="bar">
                        <div id="lblTitulo">${idiomas[this.idioma].agenda.titulo}</div>
                    </div>
                    <div id="lblLeyenda">${idiomas[this.idioma].agenda.leyenda}</div>
                </div>       
                <div id="cuerpo">
                    <diagnostico-componente id="control">
                    </diagnostico-componente>
                </div>
            </div>
            <pie-componente  id="footer" opcion="cero" media-size="${this.mediaSize}"></pie-componente>

        `
    }
    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "diagnosticos") {
            // let miToken = store.getState().cliente.datos.token
            // this.reservasJson.token = miToken
            // let d = new Date()
            // let filtroFecha = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
            // this.reservasJson.filter = "FechaAtencion ge " + filtroFecha
            // store.dispatch(getReservas(this.reservasJson))
            // if (state.puestos.entities) {
            //     this.puestos = state.puestos.entities
            //     this.puestoSeleccionado = this.puestos[0].Id
            // } else {
            //     store.dispatch(getPuesto({}))
            // }
        }
        if (name == RESERVAS_TIMESTAMP && state.ui.quePantalla == "diagnosticos") {
            if (state.reservas.entities) {
                this.reservas = state.reservas.entities
                if (this.puestos) {
                    this.update()
                }
            }
        }
        if (name == PUESTO_TIMESTAMP && state.ui.quePantalla == "diagnosticos") {
            if (state.puestos.entities) {
                this.puestos = state.puestos.entities
                if (this.puestoSeleccionado == -1) { this.puestoSeleccionado = this.puestos[0].Id }
                if (this.reservas) {
                    this.update()
                }
            }
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
window.customElements.define("pantalla-diagnosticos", pantallaDiagnosticos);