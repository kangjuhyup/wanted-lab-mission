export class NotificationPostPayload {
    private readonly _postId : number;
    private readonly _text : string;

    constructor(postId : number, text : string) {
        this._postId = postId;
        this._text = text;
    }

    get postId() {
        return this._postId;
    }

    get text() {
        return this._text;
    }
}
