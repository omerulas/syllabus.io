import type { RequestOptions } from "@/lib/interfaces"
import { HttMethods } from "@/lib/enums"
import { useAuth } from "@/stores/auth"
import { useMessage } from "@/stores/message"

export default class HttpRequest {

    private static async create<T>({ url, method, body }: RequestOptions) {

        const auth = useAuth()

        const headers: HeadersInit = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        const csrfToken = auth.getCSRFToken

        csrfToken ? headers['X-CSRFToken'] = csrfToken : false

        const fetchOptions: RequestInit = {
            method,
            headers,
            credentials: 'include'
        }

        if (body && (method !== HttMethods.GET)) { fetchOptions.body = JSON.stringify(body) }

        try {
            const response = await window.fetch(url, fetchOptions)
            const data = await response.json()

            // if (response.ok) {
            //     // throw new Error(typeof data === 'string' ? data : (data?.error || 'Bir hata oluştu.'))
            //     HttpRequest.message({ msg: data?.message, success: true })
            // }else{
            //     HttpRequest.message({ msg: data?.message, success: false })
            // }

            return data
        } catch (error: any) {
            console.error(error.message)
        }
    }

    static async get<T>(url: string): Promise<T> {
        return await HttpRequest.create<T>({ url, method: HttMethods.GET })
    }

    static async post<T>(url: string, body: object): Promise<T> {
        return await HttpRequest.create<T>({ url, method: HttMethods.POST, body: body })
    }
}