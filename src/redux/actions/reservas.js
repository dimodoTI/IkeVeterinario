export const GET = "[reservas] GET";
export const GET_VETERINARIO = "[reservas] GET_VETERINARIO";
export const GET_ATENCIONDEUNAMASCOTA = "[reservas] GET_ATENCIONDEUNAMASCOTA";
export const ADD = "[reservas] ADD";
export const PATCH = "[reservas] PATCH";
export const UPDATE = "[reservas] UPDATE";
export const REMOVE = "[reservas] REMOVE";
export const EDIT = "[reservas] EDIT"
export const EN_ATENCION = "[reservas] EN_ATENCION"


export const GET_SUCCESS = "[reservas] GET success";
export const GET_VETERINARIO_SUCCESS = "[reservas] GET_VETERINARIO success";
export const GET_ATENCIONDEUNAMASCOTA_SUCCESS = "[reservas] GET_ATENCIONDEUNAMASCOTA success";
export const ADD_SUCCESS = "[reservas] ADD success";
export const PATCH_SUCCESS = "[reservas] PATCH success";
export const UPDATE_SUCCESS = "[reservas] UPDATE success";
export const REMOVE_SUCCESS = "[reservas] REMOVE success";

export const GET_ERROR = "[reservas] GET error";
export const ADD_ERROR = "[reservas] ADD error";
export const PATCH_ERROR = "[reservas] PATCH error";
export const UPDATE_ERROR = "[reservas] UPDATE error";
export const REMOVE_ERROR = "[reservas] REMOVE error";




export const get = (options) => ({
    type: GET,
    options: options
});

export const getVeterinario = (token, filter) => ({
    type: GET_VETERINARIO,
    options: { token: token, filter: filter, expand: "Mascota($select = Nombre), Tramo, Atencion", orderby: "FechaAtencion,HoraAtencion" }
});

export const getAtencionDeUnaMascota = (token, filter) => ({
    type: GET_ATENCIONDEUNAMASCOTA,
    options: { token: token, filter: filter, expand: "Mascota($select = Nombre, Foto), Atencion", orderby: "FechaAtencion,HoraAtencion" }
});

export const enAtencion = (registro) => ({
    type: EN_ATENCION,
    registro: registro
});

export const add = (body, token) => ({
    type: ADD,
    body: body,
    token: token
});

export const update = (id, body, token) => ({
    type: UPDATE,
    id: id,
    body: body,
    token: token
});

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});

export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

export const edit = (modo, item) => ({
    type: EDIT,
    item: item || {
        TramoId: 0,
        MascotaId: 0,
        UsuarioId: 0,
        FechaAtencion: "",
        HoraAtencion: 0,
        FechaGeneracion: "",
        Motivo: "",
        Estdo: 0,
        Activo: 1
    },
    modo: modo,
});

