import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { button } from "../css/button"
import { cabecera1 } from "../css/cabecera1"
import { cardMascotaHorizontal } from "../css/cardMascotaHorizontal"
import { modoPantalla } from "../../redux/actions/ui";
import { CHAT, CONSULTA, ATRAS } from "../../../assets/icons/icons"
import { mediaConMenu01 } from "../css/mediaConMenu01"

import { enAtencion as reservasEnAtencion, getAtencionDeUnaMascota as getReservasAtencionDeUnaMascota } from "../../redux/actions/reservas";

const MODO_PANTALLA = "ui.timeStampPantalla"
const RESERVASATENCIONDEUNAMASCOTA_TIMESTAMP = "reservas.timeStampAtencionDeUnaMascota"

export class pantallaAtencionesDeUnaMascota extends connect(store, MODO_PANTALLA, RESERVASATENCIONDEUNAMASCOTA_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.item = []
        this.hayReserva = "N";
    }

    static get styles() {
        return css`
        ${label}
        ${button}
        ${cabecera1}
        ${cardMascotaHorizontal}
        ${mediaConMenu01}
        :host{
            position: relative;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            grid-template-rows: 90% 10%;
        }
        :host([hidden]){
            display: none; 
        } 
        :host(:not([media-size="small"])){
            grid-template-rows:100%;
            height:100vh;
        }
        #campana{
            position:relative;
            background-image: var(--icon-campana-con-marca);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 1rem 1rem;
        }
        #gridContenedor{
            position:relative;
            display:grid;
            grid-template-rows: 18% 82%;
        }
        label,button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #cuerpo{
            position: relative;
            display: grid;
            background-color: transparent;
            overflow-y: auto; 
            overflow-x: none; 
            grid-gap:.5rem;
            align-content: flex-start;
            padding: 2vh 0 2vh 0;
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        #avisoConsulta{
            width:95%;
            height:2rem;
        }
        #div-Titulo-02{
            justify-self:center;         
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);  
        }
        #cmhDivEtiqueta{
            width: 90%;
            justify-self:center;
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
                <div style="display:grid;width:100%;grid-template-columns:90% 10%;">
                    <div id="bar">
                        <div @click=${this.clickAtras}>${ATRAS}</div>
                        <div id="lblTitulo">${idiomas[this.idioma].atencionesdeunamascota.titulo}</div>
                    </div>
                    <div id="campana" @click=${this.clickBotonNotificacion}></div>
                </div>    
                <div id="lblLeyenda">${idiomas[this.idioma].atencionesdeunamascota.leyenda}</div>
            </div>
            <div id="cuerpo">
                    ${this.item.map(dato => html`
                        <div id="cmhDivEtiqueta">
                            <div id="cmhDivImagen" style="background-image:url(${dato.Mascota.Foto});grid-row-start:1;grid-row-end:4;"></div>
                            <div id="cmhDivNombre">${dato.Mascota.Nombre}</div>
                            <div id="cmhDivFecha">${this.verFecha(dato.FechaAtencion)}</div>
                            <div id="cmhDivDiagnostico">${dato.Motivo}</div>
                            <div id="cmhDivVerDetalle">
                                <button btn2  @click=${this.clickAtencion} .item=${dato} style="width:4rem;padding:0;text-align:left;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">${idiomas[this.idioma].atencionesdeunamascota.verDetalle}</button>                    
                            </div>
                            <div id="cmhDivChat">${CHAT}</div>              
                        </div>
                    `)}
            </div>
        </div>        
        <pie-componente id="footer" opcion="cero" media-size="${this.mediaSize}">
        </pie-componente>
        `
    }
    verFecha(f) {
        let d = new Date(f);
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }
    clickBotonNotificacion() {
        store.dispatch(modoPantalla("notificacion", "misconsultas"))
    }
    clickAtras() {
        store.dispatch(modoPantalla("atencionmascotas"))
    }
    clickAtencion(e) {
        let arr = e.currentTarget.item;
        var f = ""
        var h = ""
        var d = ""
        if (arr.Atencion) {
            h = ("0" + arr.Atencion.InicioAtencion.toString()).substr(-4, 2) + ":" + arr.Atencion.InicioAtencion.toString().substr(-2);
            f = arr.Atencion.InicioAtencion
            d = arr.Atencion.Diagnostico
        } else {
            h = ("0" + arr.HoraAtencion.toString()).substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2);
            f = arr.FechaAtencion
            d = ""
        }
        let myJson = {
            Id: arr.Id,
            FechaAtencion: f,
            HoraAtencion: h,
            MascotaId: arr.MascotaId,
            MascotaNombre: arr.Mascota.Nombre,
            Motivo: arr.Motivo,
            Diagnostico: d
        }
        store.dispatch(reservasEnAtencion(myJson))
        store.dispatch(modoPantalla("diagnosticosdetalle", "atencionesdeunamascota"))
    }

    stateChanged(state, name) {
        this.style.height = window.innerHeight + "px"
        if (state.ui.quePantalla == "atencionesdeunamascota") {
            if (state.reservas.entitiesAtencionDeUnaMascota) {
                this.item = state.reservas.entitiesAtencionDeUnaMascota;
                this.update();
            }
        }
    }
    firstUpdated() {
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

window.customElements.define("pantalla-atencionesdeunamascota", pantallaAtencionesDeUnaMascota);