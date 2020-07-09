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
import {
    modoPantalla
} from "../../redux/actions/ui";
import {
    idiomas
} from "../../redux/datos/idiomas"
import { ARCHIVO, TRASH } from "../../../assets/icons/icons";
import { cardArchivo } from "../css/cardArchivo"


export class diagnosticoComponente extends connect(store)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.archivo = [{ nombre: "Documento.jpg" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" }]
    }

    static get styles() {
        return css`
        ${button}
        ${cardArchivo}
        :host{
            display: grid;
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0; 
            background-color: transparent;
            grid-template-rows: 8% 32% 38% 10% 12%;
            overflow-x:none;
            overflow-y:none;
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        #divTitulo{
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            align-self:center;
        }
        #txtDiagnostico{
            width: 100%;
            height:95%;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRecetas{
            display:grid;
            position:relative;
            grid-gap:2vh;
            overflow-x:none;
            overflow-y:auto;
            margin : 1vh 0 1vh 0;
            align-content: baseline;
        }
        #divRecetas::-webkit-scrollbar {
            display: none;
        }
        #divAdjuntar{
            align-self:center;
        }
        #divBtn{
            display:grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2rem;
            align-self:center;
        }
        .btn{
            width: 100%;
            max-height: 1.5rem;
            min-height: 6vh;
         }
        `
    }


    render() {
        return html`
            <div id="divTitulo">
                ${idiomas[this.idioma].diagnosticocomponente.titulo}
            </div>
            <div id="divDiagnostico">
                <textarea id="txtDiagnostico" rows="8" ></textarea>
            </div>
            <div id="divRecetas">
                ${this.archivo.map(dato => html`
                    <div id="ciDivEtiqueta">
                        <div id="ciDivContenido">
                            <div id="ciDivIcomo">${ARCHIVO}</div>
                            <div id="ciDivNombre">${dato.nombre}</div>
                        </div>
                        <div id="ciDivDelete">${TRASH}</div>
                    </div>
                `)} 
            </div>
            <div id="divAdjuntar">
                <button id="btnAdjuntar" class="btn" btn3 >${idiomas[this.idioma].diagnosticocomponente.btnAdjuntar}</button>
            </div>
            <div id="divBtn">
                <button id="btnAceptar" class="btn" btn1 >${idiomas[this.idioma].diagnosticocomponente.btnAceptar}</button>
                <button id="btnCancelar" class="btn" btn1 >${idiomas[this.idioma].diagnosticocomponente.btnCancelar}</button>
            </div>
        `
    }
    stateChanged(state, name) {

    }
    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }
}

window.customElements.define("diagnostico-componente", diagnosticoComponente);