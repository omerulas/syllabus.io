import HttpRequest from "@/composables/request";
import { endpoints } from "@/lib/endpoints";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { AbstractResponse } from "@/lib/interfaces";
import { useMessage } from "./message";
import { useRouter } from "vue-router";

export const useAuth = defineStore('auth', () => {
    
    // --- composables ---
    const message = useMessage()
    const router = useRouter()

    // --- types ---
    interface AbstractCredentials{
        email: string,
        password: string
    }

    // --- states ---
    const user = ref({
        email: '',
        isAuthenticated: false
    })

    // --- methods ---
    const getCookie = (name: string) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const setCsrfToken = async () => {
        try {

            const response = await HttpRequest.get(endpoints.setCSRFToken)

        } catch (error) { 
            console.log(error)
            message.error('CSRF Token can not fetched')
         }
    }

    const checkSession = async () => {
        try {
            
            const data = await HttpRequest.get<AbstractResponse>(endpoints.checkSession)
            
            Object.assign(user.value, data.user)
            
        } catch (error) { console.log(error) }
    }

    const login = async ({ email, password } : AbstractCredentials) => {
        try {
            const data = await HttpRequest.post<AbstractResponse>(
                endpoints.login,
                { email: email, password: password }
            )
            console.log(data)

            Object.assign(user.value, data.user)

            if(data.user.isAuthenticated){
                message.success(data.message)
                router.push({name: 'workspace'})
            }else{
                message.success(data.message)
            }
        } catch (error: any) { 
            message.error(error.message)
         }
    }

    // --- computed ---
    const getCSRFToken = computed(() => getCookie('csrftoken'))

    return {
        user,
        setCsrfToken,
        getCSRFToken,
        checkSession,
        login
    }
})