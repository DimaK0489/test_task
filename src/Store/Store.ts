import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import {picturesReducer} from "./Reducer";
import {appReducer} from "./App-reducer";

const rootReducer = combineReducers({
    photos: picturesReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

