// --- importing ---
import type { AbstractRule } from "@/lib/interfaces"

// --- methods ---
export const checkRules = (rules: AbstractRule[]): { clear: boolean } => {
    // // --- stores ---
    // const message = useMessage()
    
    // // Clear message store
    // message.clearMessages()

    // Loop in rules
    for (const rule of rules) {
        // If there is any unwanted situation
        if (rule.unwanted) {
            // Throw a error that contains AbstractRule.on_error as message
            throw new Error(rule.on_error)
        }
    }

    return { clear: true }
}