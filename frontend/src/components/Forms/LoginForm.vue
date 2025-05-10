<script setup lang="ts">
import { checkRules } from '@/composables/validation';
import type { AbstractRule } from '@/lib/interfaces';
import { ref, computed } from 'vue';
import { useAuth } from '@/stores/auth';

// --- stores ---
const auth = useAuth()

// --- states ---
const email = ref<string>('omer.ulas@gmail.com')
const password = ref<string>('Gu192582751')

// --- computed methods ---
const rules = computed<AbstractRule[]>(() => [
    { field: 'email', unwanted: email.value == '', on_error: 'E-posta alanı boş bırakılamaz.' },
    { field: 'email', unwanted: !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)), on_error: 'Geçerli bir e-posta yazınız.' },
    { field: 'password', unwanted: password.value == '', on_error: 'Şifre alanı boş bırakılamaz.' },
])

const submitHandler = async () => {
    try {
        const check = checkRules(rules.value)
        if (check.clear) {
            await auth.login({ email: email.value, password: password.value })
        }
    } catch (error: any) { console.log(error.message) }
}
</script>

<template>
    <form @submit.prevent="submitHandler" class="space-y-2">
        <div>
            <label class="block" for="email">E-posta</label>
            <input v-model="email" type="email" name="email" id="email" class="border p-1" required>
        </div>
        <div>
            <label class="block" for="password">Şifre</label>
            <input v-model="password" type="password" name="password" id="password" class="border p-1" required>
        </div>
        <button type="submit" class="cursor-pointer hover:underline">Gönder</button>
    </form>
</template>
