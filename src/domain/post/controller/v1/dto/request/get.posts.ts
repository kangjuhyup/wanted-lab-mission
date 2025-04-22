export class GetPostsQuery {
    readonly author? : string;
    readonly title? : string;
    readonly cursor? : number;
    readonly limit? : number;
    readonly offset? : number;
}