export class PostIdParam {
    readonly postId: number;
}

export class CreatePostBody {
    readonly title: string;
    readonly content: string;
    readonly author: string;
    readonly password: string;
}