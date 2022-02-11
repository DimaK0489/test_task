import React, { useState } from "react";
import {PicturesType} from "../../Api/Types";

export const usePagination = (data: PicturesType[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    return { jump, currentData, currentPage, maxPage };
}
