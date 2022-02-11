export type RequestStatusType = "loading" | "succeeded"

const initialState = {
    status: 'loading' as RequestStatusType,
}

type InitialStateType = typeof initialState
type ActionsType = SetAppStatusActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)




