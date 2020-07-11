import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../redux/store";

import {
    splashScreen
} from "../views/componentes/splashscreen";
/* import {onboardingComponente} from "../views/componentes/onboardingcomponente"; */
import {
    pantallaSplash
} from "../views/formularios/splash";
// import { pantallaOnboarding } from "../views/formularios/onboarding";
import {
    pantallaInicioSesion
} from "../views/formularios/iniciosesion";
import {
    pantallaRecuperaClave
} from "../views/formularios/recuperaclave";
import {
    pantallaRecuperaClaveMesg
} from "../views/formularios/recuperaclavemsg";
import {
    pantallaCrearClave
} from "../views/formularios/crearclave";
import {
    pantallaCrearClaveMsg
} from "../views/formularios/crearclavemsg";
import {
    pantallaAccespPlan
} from "../views/formularios/accesoplan";
import {
    pantallaVErCobertuta
} from "../views/formularios/vercobertura";

import {
    pantallaMisconsultas
} from "../views/formularios/misconsultas"

import {
    pantallaAgenda
} from "../views/formularios/agenda"

import { pantallaBienvenidos } from "../views/formularios/bienvenidos"
import { pantallaVideo } from "../views/formularios/video"
import { pantallaDiagnosticos } from "../views/formularios/diagnosticos"
import { pantallaDiagnosticosDetalles } from "../views/formularios/diagnosticoDetalles"

const MEDIA_CHANGE = "ui.media.timeStamp"
const QUEPANTALLA = "ui.timeStampPantalla";
export class viewManager extends connect(store, MEDIA_CHANGE, QUEPANTALLA)(LitElement) {
    constructor() {
        super();
        this.current = "IKE-Mascotas";
    }

    static get styles() {
        return css`
        :host{
            display: grid;                 
            grid-gap:1rem;
            height:100vh;
            width: 100vw;
            padding:0;
            background-color:var(--color-blanco);
        }
        #splash{
            align-self: top;
            height: 100%;
            width: 100%;
          }
        `
    }
    render() {
        return html`
        <pantalla-splash id='splash' media-size="${this.mediaSize}"></pantalla-splash>
        <!-- <pantalla-onboarding id="onboarding"></pantalla-onboarding> -->
        <pantalla-iniciosesion id="iniciosesion" media-size="${this.mediaSize}"></pantalla-iniciosesion>
        <pantalla-bienvenidos id="bienvenidos" media-size="${this.mediaSize}"></pantalla-bienvenidos>
        <pantalla-recuperaclave id="recuperaclave" media-size="${this.mediaSize}"></pantalla-recuperaclave>
        <pantalla-recuperaclavemsg id="recuperaclavemsg" media-size="${this.mediaSize}"></pantalla-recuperaclavemsg>
        <pantalla-crearclave id="crearclave" media-size="${this.mediaSize}"></pantalla-crearclave>
        <pantalla-crearclavemsg id="crearclavemsg" media-size="${this.mediaSize}"></pantalla-crearclavemsg>
        <pantalla-accesoplan id="accesoplan" media-size="${this.mediaSize}"></pantalla-accesoplan>
        <pantalla-vercobertura id="vercobertura" media-size="${this.mediaSize}"></pantalla-vercobertura>
        <pantalla-misconsulta id="misconsultas" media-size="${this.mediaSize}"></pantalla-misconsulta>
        <pantalla-agenda id="agenda" media-size="${this.mediaSize}"></pantalla-agenda>
        <pantalla-video id="video" media-size="${this.mediaSize}"></pantalla-video>
        <pantalla-diagnosticos id="diagnosticos" media-size="${this.mediaSize}"></pantalla-diagnosticos>
        <pantalla-diagnosticosdetalles id="diagnosticosdetalle" media-size="${this.mediaSize}"></pantalla-diagnosticosdetalles>
        `;
    }

    stateChanged(state, name) {
        if (name == QUEPANTALLA || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size
            if (this.shadowRoot.children.length > 0) {
                this.shadowRoot.querySelector("#splash").hidden = state.ui.quePantalla != "splash";
                // this.shadowRoot.querySelector("#onboarding").hidden = state.ui.quePantalla != "onboarding";
                this.shadowRoot.querySelector("#iniciosesion").hidden = state.ui.quePantalla != "iniciosesion";
                this.shadowRoot.querySelector("#bienvenidos").hidden = state.ui.quePantalla != "bienvenidos";
                this.shadowRoot.querySelector("#recuperaclave").hidden = state.ui.quePantalla != "recuperaclave";
                this.shadowRoot.querySelector("#recuperaclavemsg").hidden = state.ui.quePantalla != "recuperaclavemsg";
                this.shadowRoot.querySelector("#crearclave").hidden = state.ui.quePantalla != "crearclave";
                this.shadowRoot.querySelector("#crearclavemsg").hidden = state.ui.quePantalla != "crearclavemsg";
                this.shadowRoot.querySelector("#accesoplan").hidden = state.ui.quePantalla != "accesoplan";
                this.shadowRoot.querySelector("#vercobertura").hidden = state.ui.quePantalla != "vercobertura";
                this.shadowRoot.querySelector("#misconsultas").hidden = state.ui.quePantalla != "misconsultas";
                this.shadowRoot.querySelector("#agenda").hidden = state.ui.quePantalla != "agenda";
                this.shadowRoot.querySelector("#video").hidden = state.ui.quePantalla != "video";
                this.shadowRoot.querySelector("#diagnosticos").hidden = state.ui.quePantalla != "diagnosticos";
                this.shadowRoot.querySelector("#diagnosticosdetalle").hidden = state.ui.quePantalla != "diagnosticosdetalle";
            }
        }

        this.update();
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
window.customElements.define("view-manager", viewManager);