class ApiResponse {
    constructor(status,message="Success",data){
        this.status = status,
        this.msg = message,
        this.data = data
    }
}
module.exports = ApiResponse