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

import {
    pieComponente
} from "../componentes/pie"

import {
    proxima
} from "../css/proxima"

import { get as getPuesto } from "../../redux/actions/puestos";
import { get as getReservas, patch as patchReservas, add as addReservas } from "../../redux/actions/reservas";

const PUESTO_TIMESTAMP = "puesto.timeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"
const RESERVAS_TIMESTAMP = "reservas.timeStamp"
const RESERVAS_UPDATETIMESTAMP = "reservas.updateTimeStamp"
const RESERVAS_ADDTIMESTAMP = "reservas.addTimeStamp"
const RESERVAS_ERRORGETTIMESTAMP = "reservas.errorTimeStamp"
const RESERVAS_ERROROTROSTIMESTAMP = "reservas.commandErrorTimeStamp"

export class pantallaAgenda extends connect(store, PUESTO_TIMESTAMP, MODO_PANTALLA, RESERVAS_TIMESTAMP, RESERVAS_UPDATETIMESTAMP, RESERVAS_ADDTIMESTAMP, RESERVAS_ERRORGETTIMESTAMP, RESERVAS_ERROROTROSTIMESTAMP)(LitElement) {
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
        ${proxima}
        ${mediaConMenu01}

        :host{
            display: grid;
            background-color:var(--color-gris-fondo);
            height: 100vh;
            width: 100%;   
            padding:0;
            margin:0;
            grid-template-rows: 90% 10%;
            /* grid-template-rows: 19% 60% 12%; */
        }

        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            grid-template-rows:100%;
        }
        #gridContenedor{
            grid-template-rows:18% 82%;           
        }
        .proxima{
            height:3vh;
        }
        #cuerpo{           
            display:grid;
            grid-template-rows: 12% 88%;            
            border: 1px solid red;
        }

        .contenedorLista{
            display:grid;
            background-color:transparent;
            display:grid;
            grid-template-rows: 6% 94%;            
            padding-top:.84rem;
        }
        .tituloLista{
            padding-left:0.84rem;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h2-size);
            font-weight:var(--font-header-h2-weight);
            text-justify:left;
            background-color:transparent;
            display:flex;
            padding-bottom:.84rem;           
        }
        .grillaLista{
            display:grid;
            overflow-x:none;
            overflow-y:auto;
            align-content: flex-start;
        }
        .grillaLista::-webkit-scrollbar {
            display: none;
        }
        .row{
            display:grid;
            grid-auto-flow:column;
            grid-template-columns:1fr 5fr;
            color:var(--color-azul-oscuro);
            padding-bottom:.42rem;
            width:90%;
            height:12vh;
            padding-left:1.2rem;
        }
        .fecha{
            border-top: 1px solid var(--color-gris-claro);
            border-left: 1px solid var(--color-gris-claro);
            border-bottom: 1px solid var(--color-gris-claro);
        }
        .row .fecha{
            display:grid;
            grid-auto-flow:row;
            grid-template-rows:2fr ;
            align-self:center;
            background-color:transparent;
            padding-right:.42rem;
            justify-items:center;
        }

        .row .nroDia{
            font-size:var(--font-header-h1-size);
            font-weight:var(--font-header-h1-weight);
        }

        .row .dow {
            font-weight:var(--font-label-weight);
            font-size:var(--font-label-size);
        }

        .row .agenda{
            display:grid;
            grid-template-rows:1f 1f;
            background-color:var(--color-celeste-muy-claro);
            border: 1px solid var(-color-celeste-claro);
            padding-left:.42rem;
            width:100%;
            border-radius:.3rem;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }

        .row .paciente{
            display:grid;
            grid-template-columns:auto 1fr 

        }
        #divPuestoSelect{
            display:grid;
            height:100%;
            align-content: center;
            padding:0 .5rem 0 1rem;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            align-self:stretch;
        }
        #footer{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        #seleccionPuesto{
            display:grid;
            grid-template-columns: 9fr 1fr;          
            background-color:var(--color-celeste-muy-claro);
        }
        #divBuscar{
            align-self: center;
            cursor: pointer;
        }
        #divBuscar svg{
            height:1.5rem;
            width: 1.5rem;
        }
        #selectPuesto{
            width:100%;
            height:4vh;
            border: 1px solid var(--color-gris);
            cursor:default;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divVideo{
            display:grid;
            grid-template-columns: 80% 20%;
        }
        #divImgVideo{
            align-self:center;
            justify-self:center;
            cursor:pointer;
        }
        #divImgVideo svg{
            height:1.5rem;
            width: 1.5rem;
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
                    <div id="seleccionPuesto">
                        <div id="divPuestoSelect"> 
                            <label class="labelPuesto">${idiomas[this.idioma].misconsultas.lblFiltro}</label>
                            <select id="selectPuesto" @change=${this.clickMostrarDatos}>          
                                ${!this.puestos ? "" : this.puestos.map(dato => html`
                                    <option value="${dato.Id}" .selected="${this.puestoSeleccionado == dato.Id}">${dato.Descripcion}</option>                               
                                `)}
                            </select>
                        </div>
                        <div id="divBuscar"  @click=${this.clickBucar}>
                            ${REFRESH}
                        </div>
                    </div>
                    <div class="contenedorLista">
                        <div class="tituloLista">
                            ${idiomas[this.idioma].agenda.tituloLista}
                        </div>
                        <div class="grillaLista">
                            ${!this.reservas ? "" : this.reservas.filter(item => { return item.Tramo.PuestoId == this.puestoSeleccionado }).map((item) => {
            return html`
                                    <div class="row" .item=${item} @click=${this.editar}>
                                        <div class="fecha">
                                            <div class="dow">${this.queMes(item.FechaAtencion)}</div>
                                            <div class="nroDia">${this.nroDia(item.FechaAtencion)}</div>
                                            <div class="dow">${this.dow(item.FechaAtencion)}</div>
                                        </div>

                                        <div class="agenda">
                                            <div id="divVideo">
                                                <div style="align-self: center;">${this.queHora(item.HoraAtencion) + " hs"}</div>
                                                <div id="divImgVideo"  @click=${this.clickVideo}>${VIDEO}</div>
                                            </div>
                                            <div class="paciente">
                                                <div style="padding-right:.7rem">${item.Mascota.Nombre}</div>
                                                <div>${" - " + item.Motivo}</div>
                                            </div>
                                        </div>
                                    </div>`})}                                              
                        </div>
                    </div>
                </div>
            </div>
            <pie-componente  id="footer" opcion="dos" media-size="${this.mediaSize}"></pie-componente>

        `
    }


    nroDia(fecha) {
        let d = new Date(fecha).getUTCDate()
        return ("0" + d).substr(-2)
    }
    dow(fecha) {
        let d = new Date(fecha);
        let dia = d.getUTCDay()
        return idiomas[this.idioma].diasCorto[dia]
        //        return this.dias[dia]
    }
    queHora(hora) {
        let miHora = ("0" + hora).substr(-4, 2)
        let miMin = hora.toString().substr(-2)
        return miHora + ":" + miMin
    }
    queMes(fecha) {
        let d = new Date(fecha);
        let mes = d.getUTCMonth()
        return idiomas[this.idioma].mesCorto[mes]
    }
    editar(e) {
        return true
    }
    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "agenda") {
            let miToken = store.getState().cliente.datos.token
            this.reservasJson.token = miToken
            let d = new Date()
            let filtroFecha = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
            this.reservasJson.filter = "FechaAtencion ge " + filtroFecha
            store.dispatch(getReservas(this.reservasJson))
            if (state.puestos.entities) {
                this.puestos = state.puestos.entities
                this.puestoSeleccionado = this.puestos[0].Id
            } else {
                store.dispatch(getPuesto({}))
            }
        }
        if (name == RESERVAS_TIMESTAMP && state.ui.quePantalla == "agenda") {
            if (state.reservas.entities) {
                this.reservas = state.reservas.entities
                if (this.puestos) {
                    this.update()
                }
            }
        }
        if (name == PUESTO_TIMESTAMP && state.ui.quePantalla == "agenda") {
            if (state.puestos.entities) {
                this.puestos = state.puestos.entities
                if (this.puestoSeleccionado == -1) { this.puestoSeleccionado = this.puestos[0].Id }
                if (this.reservas) {
                    this.update()
                }
            }
        }
    }
    clickVideo() {
        store.dispatch(modoPantalla("video", "agenda"))
    }
    clickMostrarDatos() {
        this.puestoSeleccionado = this.shadowRoot.querySelector("#selectPuesto").value
        this.update()
        //        let miToken = store.getState().cliente.datos.token
        //        store.dispatch(getReservas({ token: miToken, filter: "FechaAtencion ge now() and Tramo/PuestoId eq " + this.puestoSeleccionado, expand: "Mascota($select = Nombre), Tramo", orderby: "FechaAtencion,HoraAtencion" }))
    }
    clickBucar() {
        let miToken = store.getState().cliente.datos.token
        store.dispatch(getReservas(this.reservasJson))
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
window.customElements.define("pantalla-agenda", pantallaAgenda);