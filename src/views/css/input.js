import {
    css
} from "lit-element"

export const input = css `

input{
    background-color:var(--color-blanco);
    outline:none;
    padding-top:.1rem;
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);
    color: var(--color-azul-oscuro);
    background: #FFFF;
    font-size: var(--font-label-size);
    padding: 1rem;
    border: .1rem solid var(--color-gris-claro);
    border-radius: .4rem;
    font-family:'quicksand'
}

input[es-error="S"]{
    border:.1rem solid var(--color-rojo)
}

input:focus{
    border: .1rem solid var(--color-azul-oscuro);
    background-color: var(--color-blanco)

}

input::placeholder{
    font-size:.8rem;
    color:var(--color-placeholder);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance:textfield;
}

::-webkit-input-placeholder { /* Edge */
    color: rgba(255,255,255,.6)
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255,255,255,.6);
}

::placeholder {
    color: rgba(255,255,255,.6);
}
`