import {
  loadState,
  saveState
} from "../libs/localStorage"
import {
  applyMiddleware,
  createStore,
  compose
} from "redux";
import {
  logger
} from "redux-logger";
import {
  rootReducer as reducers
} from "./reducers";
import {
  middleware as ui
} from "./middleware/ui";
import {
  middleware as api
} from "./middleware/api";
import {
  middleware as autorizacion
} from "./middleware/autorizacion";
import {
  middleware as rest
} from "./middleware/REST";
import {
  middleware as usuario
} from "./middleware/usuario";
import {
  middleware as puestos
} from "./middleware/puestos";
import {
  middleware as reservas
} from "./middleware/reservas";
import {
  middleware as atenciones
} from "./middleware/atenciones";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [
  api,
  rest,
  ...ui,
  ...autorizacion,
  ...usuario,
  ...puestos,
  ...reservas,
  ...atenciones
]

if (process.env.NODE_ENV !== 'production') {
  mdw = [...mdw, logger]
}

const initialData = loadState()

export const store = createStore(
  reducers,
  initialData,
  composeEnhancers(applyMiddleware(...mdw))
);


store.subscribe(function () {
  saveState(store.getState())
})