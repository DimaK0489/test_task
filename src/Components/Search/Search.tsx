import React, {ChangeEvent, useCallback} from 'react';
import style from "./Search.module.css"
import {useDispatch} from "react-redux";
import {getPicturesListTC} from "../../Store/Reducer";

type Props = {
    searchHandler: (ev: ChangeEvent<HTMLInputElement>) => void
}

export const Search: React.FC<Props> = ({searchHandler}) => {
    const dispatch = useDispatch()

    const resetSettings = useCallback(function () {
        dispatch(getPicturesListTC())
    }, [dispatch])

    return (
        <>
            <input
                type="search"
                className={style.input}
                placeholder="Search for list"
                onChange={searchHandler}
            />
            <button className={style.button} onClick={resetSettings}>Reset</button>
        </>
    );
}




