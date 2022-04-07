import sleep from "sleep-promise";
import {BlogPost} from "../components/BlogPost";

const PENDING: string = "pending";
const SUCCESS: string = "success";
const ERROR: string = "error";
const BLOG_POST_API: string = "http://localhost/blogpost/v1/api/blog";

export const suspense = (promise: Promise<any>) => {
    let status = PENDING;
    let result: Promise<any>;
    let suspender = promise.then(
        response => {
            status = SUCCESS;
            result = response;
        },
        error => {
            status = ERROR;
            result = error;
        }
    );

    return {
        read() {
            if (status === PENDING) throw suspender;
            if (status === ERROR) throw result;
            if (status === SUCCESS) return result;
        }
    };
}

export const fetchBlogPost = async (id: string):Promise<any> => {
    return fetch(`${BLOG_POST_API}/${id}`)
        .then(res => res.json())
        .then(sleep(500));
}

export const fetchBlogCollection = async () => {
    return fetch(`${BLOG_POST_API}`)
        .then(res => res.json())
        .catch(e => console.log(e));
}