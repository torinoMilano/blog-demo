import MapStore from "./lib/mapstore";
import {BlogPost, Comment} from "./classes/BlogPost";
import {logger} from "./classes/Logger";

const BLOG_POSTS = new Map<string, BlogPost>();
const mapStore = new MapStore("blog-posts.json");


interface BlogPostRequest {
    title: string,
    body: string
}

interface BlogPostCommentRequest {
    blogId: string,
    commentId: string,
    text: string,
    name?: string
}

mapStore.read()
    .then(
        (blogPosts) => {
            for (const [id, blogPost] of blogPosts) {
                BLOG_POSTS.set(id, blogPost);
            }
        },
        (err) => {
            logger.error(`error reading map store: ${err}`, err);
        }
    );

export const getBlogPosts = async (sort: string) => {
    const blogPosts = Array.from(BLOG_POSTS.values());
    blogPosts.sort((a, b) => {
        if (sort === "asc") {
            return a.last_edited - b.last_edited;
        } else {
            return b.last_edited - a.last_edited;
        }
    });
    return blogPosts;
}

export const createBlogPost = async (title: string, body: string, author: string) => {
    const blog_post = new BlogPost(title, body, author);
    BLOG_POSTS.set(blog_post.id, blog_post);
    await mapStore.save(BLOG_POSTS);
    return blog_post;
}

export const createBlogPostComment = async (id: string, text: string, name?: string) => {
    const blogPost = BLOG_POSTS.get(id);
    if (typeof blogPost !== undefined && blogPost) {
        logger.info(`id found ${id} and blog post == [${blogPost}]`)
        const blogComment = new Comment(text, name);
        blogPost.comments.push(blogComment)
        await mapStore.save(BLOG_POSTS);
        return {...blogPost};
    }
    return null;
}

export const updateBlogPost = async (id: string, request: BlogPostRequest) => {
    const blogPost = await getBlogPost(id);
    if (typeof blogPost !== 'undefined' && blogPost) {
        blogPost.title = request.title ?? blogPost.title;
        blogPost.body = request.body ?? blogPost.body;
        blogPost.last_edited = Date.now();
        await mapStore.save(BLOG_POSTS);
        return {...blogPost};
    }
    return null
}

export const updateComment = async (request: BlogPostCommentRequest) => {
    const blogPost = await getBlogPost(request.blogId);
    if (typeof blogPost !== 'undefined' && blogPost) {
        if (typeof blogPost.comments === 'undefined'
            || (Array.isArray(blogPost.comments) && !blogPost.comments.length)) {

            blogPost.comments = [];
        }
        const comment = blogPost.comments.find(c => c.id == request.commentId) || new Comment(request.text, request.name);
        comment.text = request.text ?? comment.text;
        comment.name = request.name ?? comment.name;
        blogPost.last_edited = Date.now();
        await mapStore.save(BLOG_POSTS);
        return {...comment};
    }
    return null;
}

export const getBlogPost = async (id: string) => {
    if (!BLOG_POSTS.has(id)) {
        return null;
    }
    const blogPost = BLOG_POSTS.get(id);
    return {...blogPost};
}

export const deleteBlogPost = async (id: string) => {
    const success = BLOG_POSTS.delete(id);
    await mapStore.save(BLOG_POSTS);
    return success;
}
