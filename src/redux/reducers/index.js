import {
  combineReducers
} from "redux";
import {
  reducer as uiReducer
} from "./ui"
import {
  reducer as autorizacionReducer
} from "./autorizacion"
import {
  reducer as clienteReducer
} from "./cliente"
import {
  reducer as usuarioReducer
} from "./usuario"
import {
  reducer as puestosReducer
} from "./puestos"
import {
  reducer as reservasReducer
} from "./reservas"

export const rootReducer = (state = {}, action) => {

  return {
    ui: uiReducer(state.ui, action),
    autorizacion: autorizacionReducer(state.autorizacion, action),
    cliente: clienteReducer(state.cliente, action),
    usuario: usuarioReducer(state.usuario, action),
    puestos: puestosReducer(state.puestos, action),
    reservas: reservasReducer(state.reservas, action)

  };
};