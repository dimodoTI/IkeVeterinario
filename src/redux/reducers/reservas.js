import {
    GET_SUCCESS,
    GET_VETERINARIO_SUCCESS,
    GET_ATENCIONDEUNAMASCOTA_SUCCESS,
    EN_ATENCION,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    ADD_SUCCESS,
    ADD_ERROR,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    EDIT
} from "../actions/reservas";


const initialState = {
    entities: null,
    entitiesVeterinario: null,
    entitiesAtencionDeUnaMascota: null,
    entitiesEnAtencion: null,
    timeStamp: null,
    timeStampVeterinario: null,
    timeStampEnAtencion: null,
    removeTimeStamp: null,
    updateTimeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    editTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_VETERINARIO_SUCCESS:
            newState.entitiesVeterinario = action.payload.receive
            newState.timeStampVeterinario = (new Date()).getTime();
            break;
        case GET_ATENCIONDEUNAMASCOTA_SUCCESS:
            newState.entitiesAtencionDeUnaMascota = action.payload.receive
            newState.timeStampAtencionDeUnaMascota = (new Date()).getTime();
            break;
        case EN_ATENCION:
            newState.entitiesEnAtencion = action.registro
            newState.timeStampEnAtencion = (new Date()).getTime();
            break;
        case EDIT:
            newState.editTimeStamp = (new Date()).getTime();
            newState.entities.currentItem = action.item
            newState.modo = action.modo;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = (new Date()).getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_ERROR || REMOVE_ERROR || PATCH_ERROR || ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};