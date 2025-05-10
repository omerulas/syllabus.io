<script setup>
import { useMessage } from '@/stores/message';

const messageStore = useMessage()
</script>

<template>
    <div v-if="messageStore.messages.length > 0"
        class="fixed bottom-3 right-3 flex flex-col space-y-1">
        <div v-for="(message, index) in messageStore.messages" :key="index"
            :class="message.class"
            class="w-full border-l-4 text-white px-5 py-3 text-sm rounded-md font-semibold flex justify-between items-center gap-x-12 cursor-pointer">
            <p>{{ message.message }}</p>
        </div>
    </div>
</template>