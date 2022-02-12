import React from 'react';
import style from "./App.module.css";
import {PicturesList} from "./Components/PicturesList/PicturesList";
import {AppRootStateType} from "./Store/Store";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./Store/App-reducer";
import {CircularProgress} from "@material-ui/core";

export const App: React.FC = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div className={style.App}>
            {status === "loading" && <CircularProgress className={style.preloader} color={"secondary"}/>}
            <PicturesList/>
        </div>
    );
}
