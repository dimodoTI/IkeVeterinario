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
    button
} from "../css/button"
import {
    ikeInput
} from "../css/ikeInput"
import {
    cabecera1
} from "../css/cabecera1"
import {
    miCheckbox
} from "../componentes/checkbox"
import {
    ATRAS
} from "../../../assets/icons/icons";

const MODO_PANTALLA = "ui.timeStampPantalla"
export class pantallaBienvenidos extends connect(store, MODO_PANTALLA)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${button}
        ${ikeInput}
        ${cabecera1}
        :host{ 
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            grid-template-rows:2fr 8fr
        }
        :host([hidden]){
            display: none; 
        }
        #cuerpo{
            background-color: transparent;
            display:grid;
            padding-top: 18rem;
            align-items: center;
            justify-items: center;
            grid-auto-flow:row;
            grid-gap:.84rem;
            padding-right:1.68rem;
            padding-left:1.68rem;
            
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }

        .cartel{
            display:grid;
            font-size:var(--font-header-h1-size);
            font-weight:var(--font-header-h1-weight);
            grid-auto-flow:row;
            justify-items: center;
            

        }
        .bajada{
            display:grid;
            font-size:var(--font-bajada-size);
            font-weight:var(--font-bajada-weight);
            margin-left:1.68rem;
            margin-right:1.68rem;
            grid-auto-flow:row;
            justify-items: center;
            text-align:center;
        }
        `
    }

    render() {
        return html `

        <div id="cuerpo">
            <div class="cartel">
                <div>${idiomas[this.idioma].bienvenidos.titulo}</div>
                <div>${idiomas[this.idioma].bienvenidos.titulo2}</div>
            </div>

            <div class="bajada">
               ${idiomas[this.idioma].bienvenidos.leyenda}
            </div>

           
           
            <button id="soyCliente" btn1 style="width: 100%;margin-top:.84rem;"  @click=${this.clickBoton1}>
            ${idiomas[this.idioma].bienvenidos.boton1}
            </button>
           
            <button id="soyVete" style="width:100%" reverse @click=${this.clickBoton2}>
            ${idiomas[this.idioma].bienvenidos.boton2}
            </button>
           
        </div>
        `
    }



    clickBoton1() {

        store.dispatch(modoPantalla("iniciosesion"));

    }

    stateChanged(state, name) {}
    firstUpdated() {}

    stateChanged(state, name) {
        if (name == MODO_PANTALLA && state.ui.quePantalla == "bienvenidos") {
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
window.customElements.define("pantalla-bienvenidos", pantallaBienvenidos);