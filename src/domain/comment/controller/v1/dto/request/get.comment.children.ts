/**
 * @description
 * 하위 댓글 조회시 limit,offset 기반이 아닌 사용자 액션에 따른 cursor 기반 페이지네이션
 */
export class GetCommentChildrenQuery {
    readonly commentId : number;
    readonly cursor : number;
    readonly limit : number;
}