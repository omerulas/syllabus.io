import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessage = defineStore("message", () => {
    const messages = ref<object[]>([]);

    const c = {
        SUCCES: 'bg-green-500 border-l-green-700',
        ERROR: 'bg-red-500 border-l-red-700',
        INFO: 'bg-sky-500 border-l-sky-700',
    }

    function createMessageObj(c: string, m: string) { return { class: c, message: m } }

    function success(message: string) {
        messages.value.push(createMessageObj(c.SUCCES, message))
        setTimeout(() => messages.value.shift(), 3000);
    }

    function error(message: string) {
        messages.value.push(createMessageObj(c.ERROR, message))
        setTimeout(() => messages.value.shift(), 3000);
    }

    function info(message: string) {
        messages.value.push(createMessageObj(c.INFO, message))
        setTimeout(() => messages.value.shift(), 3000);
    }

    function clearMessages() {
        messages.value = [];
    }

    return {
        messages,
        success,
        error,
        info,
        clearMessages
    };
});