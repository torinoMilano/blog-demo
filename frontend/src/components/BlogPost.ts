import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax"
import relativeTime from "dayjs/plugin/relativeTime"
import {Blog} from "../features/blog/Blog";

dayjs.extend(minMax) // use plugin
dayjs.extend(relativeTime) // use plugin

export interface Comment {
    id: string;
    text: string;
    name?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    body: string;
    author?: string;
    last_edited: number;
    created_on: number;
    comments: Comment[];
}

export function geRelativeCreatedOn(created_on: number): string {
    return dayjs().to(dayjs(created_on));
}

export function geRelativeLastEdited(last_edited: number): string {
    return dayjs().to(dayjs(last_edited));
}

