export class ResponseDto {
    private result : boolean;
    private data? : any;
    private error? : any;

    static Success(data : any) {
        const response = new ResponseDto();
        response.result = true;
        response.data = data;
        return response;
    }

    static Fail(error : any) {
        const response = new ResponseDto();
        response.result = false;
        response.error = error;
        return response;
    }
}