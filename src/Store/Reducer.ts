import {Dispatch} from "redux";
import {PicturesType} from "../Api/Types";
import {picturesAPI} from "../Api/pictureAPI";
import {setAppStatusAC} from "./App-reducer";

export type ActionType =
    ReturnType<typeof setAllPhotosAC>
    | ReturnType<typeof deletePictureAC>

export enum ACTION_TYPES {
    GET_PICTURES = "GET_PICTURES",
    DELETE_PICTURE = 'DELETE_PICTURE'
}

const initialState: Array<PicturesType> = []

//reducer
export const picturesReducer = (state: Array<PicturesType> = initialState, action: ActionType): Array<PicturesType> => {
    switch (action.type) {
        case ACTION_TYPES.GET_PICTURES: {
            return action.data;
        }
        case ACTION_TYPES.DELETE_PICTURE: {
            return state.filter(item => item.id !== action.id);
        }
        default:
            return state
    }
}

//action
export const setAllPhotosAC = (data: Array<PicturesType>) => ({type: ACTION_TYPES.GET_PICTURES, data} as const)
export const deletePictureAC = (id: number) => ({type: ACTION_TYPES.DELETE_PICTURE, id} as const)

//thunk
export const getPicturesListTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    picturesAPI.getPictures()
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setAllPhotosAC(res.data))
        })
        .catch(error => {
            alert("Error occurred" + error);
        })
}