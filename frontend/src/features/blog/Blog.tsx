import React, {useEffect, useState} from "react";
import {fetchBlogPost} from "../../app/api";
import {BlogPost, Comment, geRelativeCreatedOn} from "../../components/BlogPost";
import ErrorBoundary from "../../errors/ErrorBoundary";
import {useParams} from "react-router-dom";
import styles from "./Blog.module.css";

const initialBlog: BlogPost = {
    id: "",
    title: "No blog found",
    body: "",
    created_on: Date.now(),
    last_edited: Date.now(),
    comments: []
}

type BlogParams = {
    id: string;
};

export const Blog = () => {
    const [blog, setBlog] = useState<BlogPost>(initialBlog);
    let {id} = useParams<BlogParams>();
    useEffect(() => {
        fetchBlogPost(id)
            .then(_blog => {
                setBlog(_blog.blogPost);
            }).catch(e => {
            console.log(e);
        })
    }, []);
    let comments: Comment[] = blog.comments || [];

    return (
        <main className="page">
            <h1 className={styles.h1}>{blog.title}</h1>
            <textarea rows={10} cols={300} className={styles.blog} readOnly={true} value={blog.body}
                      defaultValue="no text has  submitted"/>
            <div className={styles.blog}> 😻 &lt;{blog.author}&gt;</div>
            <div className={styles.blog}> ⏲ <small>{geRelativeCreatedOn(blog.created_on)}</small></div>


            {comments.map(comment =>
                <div className={styles.dialogbox} key={comment.id}>
                    <div className={styles.body}>
                        <div className={styles.message}>
                            <span>{comment.text}</span>
                        </div>
                        👤 {comment.name || <i><small>anonymous</small></i>}
                    </div>
                </div>
            )}

        </main>
    );
}
