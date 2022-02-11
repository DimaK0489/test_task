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

    return (
        <div className={"container"}>
            <Search searchHandler={onSearchHandler}/>
            {foundPhotos.map(photo => {
                return <div key={photo.id}>
                    <span>{photo.id}</span>
                    <a href={photo.url}>{photo.url}</a>
                    <span>{photo.title}</span>
                    <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>

                </div>
            })}
            <PaginationControlled/>
        </div>
    );
};
