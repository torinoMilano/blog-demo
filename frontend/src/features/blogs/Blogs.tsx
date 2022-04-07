import React, {useEffect, useState} from "react";
import {fetchBlogCollection} from "../../app/api";
import {BlogPost, geRelativeCreatedOn} from "../../components/BlogPost";
import styles from "./Blogs.module.css";
import ErrorBoundary from "../../errors/ErrorBoundary";
import {Link} from "react-router-dom";

export function Blogs() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    useEffect(() => {
        fetchBlogCollection()
            .then(_blogs => {
                setBlogs(_blogs.blogPosts);
            }).catch(e => {
            console.log(e);
        })
    }, []);
    return (

        <main className="page">
            <ul className={styles.blogs}>
                {blogs.map((blog) =>
                    <li key={blog.id}>
                        <h3>📢 {blog.title}</h3>
                        <pre>{geRelativeCreatedOn(blog.created_on)}</pre>
                        <div>
                            <p>☢ number of comments: {blog.comments.length}</p>
                            <p>
                                <Link className={styles.navLink} to={{
                                    pathname: `/blog/${blog.id}`,
                                    hash: blog.id,
                                    state: {id: blog.id}
                                }}>
                                    🔎 More...
                                </Link>
                            </p>
                        </div>
                    </li>
                )}
            </ul>
        </main>
    );
}
