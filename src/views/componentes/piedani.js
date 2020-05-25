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
    label
} from "../css/label"

import {
    HOME,
    MASCOTA,
    VACUNA,
    CONSULTA,
    FOTO
} from "../../../assets/icons/icons";

import {
    modoPantalla
} from "../../redux/actions/ui";
import {
    idiomas
} from "../../redux/datos/idiomas"

export class pieComponentedani extends connect(store)(LitElement) {
    constructor() {
        super();
        this.opcion = ""
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${label}
        
        :host{
            display:grid;
            grid-auto-flow:column;
            grid-gap:.3rem;
            background-color: var(--color-blanco);
            align-items:center;
            justify-items:center;
            padding: 1rem;   
        }

        .menu{
            display:grid;
            grid-row: 2fr 1fr;
            font-size: var(--font-pie-size);
            font-weight:var(--font-pie-weight);
            grid-gap:.3rem;
            justify-items:center;
            align-items:center;
            color:var(--color-gris);
        }

        .menu div svg{
            fill:var(--color-gris);
            stroke:var(--color-gris);
            height:1rem;
            width:1.1rem;
        }


        .menu[opcion="select"] {
            cursor: not-allowed;
            pointer-events: none;  
            color:var(--color-azul-oscuro);
            font-weight:var(--font-pie-select-weight);
            font-size:var(--font-pie-select-size);
            
        }

        .menu[opcion="select"] div svg{
            fill:var(--color-azul-oscuro);
            stroke:var(--color-azul-oscuro);
        }`
    }
    attributeChangedCallback(name, oldVal, newVal) {
        console.log('attribute change: ', name, newVal);
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    render() {
        return html `

            <div id="img-home"  @click="${this.clickBoton1}" class="menu"  opcion="${this.opcion=='uno'? 'select' : ''}">
                <div>
                    ${HOME}
                </div>
                <div id="lbl-home">
                    ${idiomas[this.idioma].pie.inicio}
                </div>
            </div>

            <div id="img-mascota"  @click="${this.clickBoton2}" class="menu" opcion="${this.opcion=='dos'? 'select' : ''}">
                <div>
                    ${MASCOTA}
                </div>
                <div id="lbl-mascota">
                    ${idiomas[this.idioma].pie.mascota}
                </div>
            </div>  

            <div id="img-consulta"  @click="${this.clickBoton3}" class="menu" opcion="${this.opcion=='tres'? 'select' : ''}">
                <div>
                    ${CONSULTA}
                </div>
                <div id="lbl-consulta">
                    ${idiomas[this.idioma].pie.consulta}
                </div>
            </div>

            <div id="img-vacuna"  @click="${this.clickBoton3}" class="menu" opcion="${this.opcion=='cuatro'? 'select' : ''}">
                <div>
                    ${VACUNA}
                </div>
                <div id="lbl-vacuna">
                    ${idiomas[this.idioma].pie.vacuna}
                </div>
            </div>     
            
            <div id="img-foto"  @click="${this.clickBoton3}" class="menu" opcion="${this.opcion=='cinco'? 'select' : ''}">
                <div>
                    ${FOTO}
                </div>
                <div id="lbl-foto">
                    ${idiomas[this.idioma].pie.foto}
                </div>
            </div>            
        `
    }

    clickBoton1() {
        store.dispatch(modoPantalla("principal"))
    }
    clickBoton2() {
        store.dispatch(modoPantalla("mascota"))
    }
    clickBoton3() {
        store.dispatch(modoPantalla("misconsultas"))
    }
    clickBoton4() {
        store.dispatch(modoPantalla("calendario"))
    }
    clickBoton5() {
        store.dispatch(modoPantalla("fotogaleria"))
    }


    static get properties() {
        return {
            opcion: {
                type: String,
                reflect: true,
                atributte: "opcion"
            }
        }
    }
}

window.customElements.define("pie-componentedani", pieComponentedani);