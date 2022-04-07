import {v4 as uuid} from "uuid";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(minMax) // use plugin
dayjs.extend(relativeTime) // use plugin

export class Comment {
    id: string;
    text: string;
    name?: string;

    constructor(text: string, name?: string) {
        this.id = uuid();
        this.text = text;
        this.name = name;
    }
}

export class BlogPost {
    id: string;
    title: string;
    body: string;
    author?: string;
    last_edited: number;
    created_on: number;
    comments: Comment[];

    constructor(title: string, body: string, author?: string) {
        const today_date = Date.now();
        this.comments = [];
        this.id = uuid();
        this.title = title;
        this.body = body;
        this.author = author;
        this.last_edited = today_date;
        this.created_on = today_date;
    }

    getMinDate(): number {
        const {last_edited, created_on} = this;
        return dayjs.min(dayjs(last_edited), dayjs(created_on)).valueOf();
    }

    geRelativeCreatedOn(): string {
        return dayjs().to(dayjs(this.created_on));
    }
    geRelativeLastEdited(): string {
        return dayjs().to(dayjs(this.last_edited));
    }
}

module.exports = {
    BlogPost,
    Comment
};