import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {PicturesType} from "../../Api/Types";
import {getPicturesListTC} from "../../Store/Reducer";
import {PaginationControlled} from "../Pagination/Pagination";
import {Search} from "../Search/Search";

export const PicturesList: React.FC = () => {
    const dispatch = useDispatch();
    const pictures = useSelector<AppRootStateType, PicturesType[]>(state => state.photos);

    const [foundPhotos, setFoundPhotos] = useState<PicturesType[]>(pictures);

    useEffect(() => {
        dispatch(getPicturesListTC())
    }, [dispatch]);
    useEffect(() => {
        setFoundPhotos(pictures)
    }, [pictures]);

    const onSearchHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const value = ev.currentTarget.value
        const results = pictures.filter((item) => {
            return `${item.id}`.indexOf(value) > -1
                || item.title.toLowerCase().indexOf(value) > -1
        })
        setFoundPhotos(results);
    }

    const searchList = () => {
        return foundPhotos.map(photoId => {
            return <div key={photoId.id}>
                <br/>
                <span>{photoId.id}</span>
                <br/>
                <a href={photoId.url}>{photoId.url}</a>
            </div>
        })
    }

    return (
        <div>
            <Search searchHandler={onSearchHandler}/>
            {searchList()}
            <PaginationControlled/>
        </div>
    );
};
