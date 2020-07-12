import {
    css
} from "lit-element"

export const cardMascotaHorizontal = css`
#cmhDivEtiqueta{
    display: grid; 
    position: relative;
    height:14vh;
    width:100%;
    background-color:var(--color-blanco);
    grid-template-columns: 15vh auto 20%;
    grid-template-rows: 25% 45% 30%;
    grid-gap:0rem;
    border-radius:.4rem ;           
    align-items: center;
    box-shadow: var(--shadow-elevation-4-box);
}  
:host(:not([media-size="small"])) #cmhDivEtiqueta{
    height:14vh;   
    box-shadow: var(--shadow-elevation-2-box);
}
#cmhDivImagen{
    height:14vh;
    width :14vh;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius:.4rem 0 0 .4rem;   
    max-height:14vh;
    max-width :14vh;
}
#cmhDivNombre{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    padding-left: .2rem;
    color: var(--color-gris);
}         
#cmhDivFecha{
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);            
    color: var(--color-gris);
    text-align: right;
    padding-right:.3rem;
} 
#cmhDivDiagnostico{
    font-weight: bold;   
    font-size: .8rem;         
    padding-bottom: .8rem;
    padding-left: .2rem;
    grid-column-start: 2;
	grid-column-end: 4;
} 
#cmhDivVerDetalle{
    padding-left: .2rem;
} 
#cmhDivChat{
    height:1rem;
    width:100%;
    justify-items:center;
} 
`