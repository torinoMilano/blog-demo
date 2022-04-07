import * as BlogPostApi from "../blogpost_api";
import {Request, Response} from "express/ts4.0";
import {logger} from "../classes/Logger";
import {Comment} from "../classes/BlogPost";

const ERROR_STATUS: number = 400;
const SORT_ASC: string = "asc";
const SORT_DESC: string = "desc";

export const errorResponse = async (req: Request, res: Response, message: string) => {
    return res
        .status(ERROR_STATUS)
        .json({error: `${message}`});
}

export const list = async (req: Request, res: Response) => {
    let {sort} = req.query;
    sort = sort ? sort : "desc";
    if (!(sort === SORT_ASC || sort === SORT_DESC)) {
        return errorResponse(req, res, "Invalid sort Params");
    }
    const blogPosts = await BlogPostApi.getBlogPosts(sort);
    res.json({blogPosts});
}

export const listByTitle = async (req: Request, res: Response) => {
    let {sort} = req.query;
    sort = sort ? sort : SORT_DESC;
    if (!(sort === SORT_ASC || sort === SORT_DESC)) {
        return errorResponse(req, res, "Invalid sort Params");
    }
    const blogPosts = await BlogPostApi.getBlogPosts(sort);

    res.json(blogPosts.map(({id: id, title: title}) => ({id, title})));
}

export const create = async (req: Request, res: Response) => {
    const {title, body, author} = req.body;
    if (typeof title === 'undefined' || typeof body === 'undefined') {
        return errorResponse(req, res, "Missing title or body");
    }
    const blogPost = await BlogPostApi.createBlogPost(title, body, author);
    logger.info(`blog post created ${blogPost}"`, blogPost)
    res.send("ok");
}

export const createComment = async (req: Request, res: Response) => {
    const {id} = req.params || undefined;
    const {text, name} = req.body || undefined;
    if (typeof id === 'undefined' || typeof text === 'undefined') {
        return errorResponse(req, res, "Missing comment text or id of Blog to update");
    }
    const blogPost = await BlogPostApi.createBlogPostComment(id, text, name);
    logger.info(`comment created ${blogPost}"`, blogPost)
    res.send("ok");
}

export const read = async (req: Request, res: Response) => {
    // blog/:id
    const {id} = req.params;
    const blogPost = await BlogPostApi.getBlogPost(id);
    res.json({blogPost});
}

export const readComment = async (req: Request, res: Response) => {
    // comment/:id
    const emptyComment = {};
    const {id, id_comment} = req.params;
    const blogPost = await BlogPostApi.getBlogPost(id);
    if (typeof blogPost !== 'undefined' && blogPost) {
        let comments = blogPost.comments || [];
        const filterCommentWithId = (comment: Comment) => comment.id === id_comment;
        const comment = comments.find(filterCommentWithId) || emptyComment;
        logger.info(`finding comment with id ${id_comment} ${comments.find(filterCommentWithId)}`)
        return res.json({...comment});
    }
    return res.json({...emptyComment});
}

export const comments = async (req: Request, res: Response) => {
    // blog/:id/comments
    const {id} = req.params;
    const blogPost = await BlogPostApi.getBlogPost(id);
    let blogComments = blogPost?.comments || [];
    res.json({comments: blogComments});
}

export const commentsCounts = async (req: Request, res: Response) => {
    // blog/:id/comments/count
    const {id} = req.params;
    const blogPost = await BlogPostApi.getBlogPost(id);
    let blogComments = blogPost?.comments || [];
    res.json({count: blogComments.length});
}

export const update = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, body} = req.body;
    if (typeof title !== 'undefined' && typeof body !== undefined && body && title) {
        const blogPost = await BlogPostApi.updateBlogPost(id, {title, body});
        logger.info(`updating blogpost ${blogPost?.id} with ${blogPost?.title} and ${blogPost?.body}`)
        res.json({...blogPost});
    }
    return errorResponse(req, res, "Missing title and body");

}

export const updateComment = async (req: Request, res: Response) => {
    const {id, id_comment} = req.params || {};
    const {text, name} = req.body || {};
    if (typeof text !== 'undefined' && text) {
        const commentUpdated = await BlogPostApi.updateComment({blogId: id, commentId: id_comment, text, name});
        logger.info(`updated comment id ${id_comment} with "${text}" and "${name}"`, commentUpdated)
        res.json({...commentUpdated});
    } else {
        logger.error(`text is undefined ${text}`)
        return errorResponse(req, res, `Missing id, id of comment or comment text`);
    }
}

export const deleteBlogPost = async (req: Request, res: Response) => {
    const {id} = req.params;
    const success = await BlogPostApi.deleteBlogPost(id);
    logger.info(`deleting ${id}`, success);
    res.send("ok");
}