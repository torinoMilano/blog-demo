import express from "express";
import * as blogPostApi from "./blogposts";

const router = express.Router();

router.get("/blog", blogPostApi.list); // list
router.get("/blog/title", blogPostApi.listByTitle); // list
router.post("/blog", blogPostApi.create); // create
router.get("/blog/:id", blogPostApi.read); // read
router.post("/blog/:id", blogPostApi.update); // update
router.delete("/blog/:id", blogPostApi.deleteBlogPost); // delete

//comments
router.get("/blog/:id/comment/:id_comment", blogPostApi.readComment); // get a comment
router.get("/blog/:id/comment", blogPostApi.comments); // get all the comments
router.post("/blog/:id/comment", blogPostApi.createComment); // create a comment with blog id :id
router.post("/blog/:id/comment/:id_comment", blogPostApi.updateComment); // update the comment
router.get("/blog/:id/comments/count", blogPostApi.commentsCounts); // get comment count
export default router;