import { expect } from 'chai';
import {BlogPost} from "../src/classes/BlogPost";


describe("testing anatomy of a blogpost", function () {
    const title = "this is a blog";
    const body = "it is really a blog";
    const post:BlogPost = new BlogPost(title, body)
    const {author, last_edited, created_on, comments} = post;
    it(`should get title equal to "${title}"`, () => {
        expect(title, "title checking").to.be.equal(post.title)
    });
    it(`should get body equal to "${body}"`, () => {
        expect(body, "body checking").to.be.equal(post.body)
    });
    it(`should get undefined as author"`, () => {
        expect(author).to.be.undefined
    });
    it(`should get created_on equal to last_edited"`, () => {
        expect(created_on).to.be.equal(last_edited)
    });
    it(`should get comment is an empty array"`, () => {
        expect(comments).to.be.empty
    });
    it(`should get min date equal to created_on or last_edited"`, () => {
        expect(post.getMinDate()).to.be.equal(created_on)
        expect(post.getMinDate()).to.be.equal(last_edited)
    });
    it(`should get created_on or last_edited a few seconds ago"`, () => {
        expect(post.geRelativeLastEdited()).to.be.equal("a few seconds ago")
        expect(post.geRelativeCreatedOn()).to.be.equal("a few seconds ago")
    });
    it('should work', () => {
        expect(true).to.be.true;
    })
})