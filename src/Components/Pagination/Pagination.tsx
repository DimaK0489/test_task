import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {PicturesType} from "../../Api/Types";
import {usePagination} from "./UsePagination";
import {deletePictureAC} from "../../Store/Reducer";
import {Pagination} from "@material-ui/lab";
import style from "./Pagination.module.css"

export const PaginationControlled: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector<AppRootStateType, PicturesType[]>(state => state.photos);

    const [page, setPage] = useState(1);

    const PER_PAGE = 5;
    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        _DATA.jump(value);
    };

    const deletePicture = useCallback(function (id: number) {
        dispatch(deletePictureAC(id))
    }, [dispatch])

    return (
        <div className={style.container}>
            {
                _DATA.currentData().map((item) => {
                    return <div className={style.item} key={item.id}>
                        <div> ID: {item.id} </div>
                        <img className={style.zoom} src={item.url} width={100} height={100} alt={"url"} />
                        <div> TITLE: {item.title} </div>
                        <img className={style.zoom} src={item.thumbnailUrl} width={30} height={30} alt={"picture"} />
                        <button className={style.deleteButton} onClick={() => {
                            deletePicture(item.id)
                        }}>Delete
                        </button>
                    </div>
                })
            }
            <Pagination className={style.pagination} color={"secondary"} count={count} page={page}
                        onChange={handleChange} />
        </div>
    );
}

