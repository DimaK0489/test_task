import React, { useState } from "react";
import {PicturesType} from "../../Api/Types";

export const usePagination = (data: PicturesType[], itemsPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPage;
        const end = begin + itemsPage;
        return data.slice(begin, end);
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    return { jump, currentData, currentPage, maxPage };
}
