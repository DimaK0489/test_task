import axios from "axios";
import {PicturesType} from "./Types";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    withCredentials: true
})
export const pictureAPI = {
    getPictures() {
        return instance.get<[PicturesType]>("photos")
    }
}