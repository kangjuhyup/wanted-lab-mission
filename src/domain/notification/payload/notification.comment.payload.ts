export class NotificationCommentPayload {
    private readonly _postId : number;
    private readonly _commentId : number;
    private readonly _text : string;

    constructor(postId : number, commentId : number, text : string) {
        this._postId = postId;
        this._commentId = commentId;
        this._text = text;
    }

    get postId() {
        return this.postId;
    }

    get commentId() {
        return this.commentId;
    }

    get text() {
        return this.text;
    }
}