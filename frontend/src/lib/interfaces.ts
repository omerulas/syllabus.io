export interface AbstractRule{
    unwanted: boolean
    on_error: string
}
export interface RequestOptions {
    url: string,
    method: string,
    body?: object
}

export interface AbstractResponse {
    [x: string]: any
    data: object,
    message: string
}
