<template>
  <div class="min-h-screen bg-white-600 flex items-center justify-center p-4">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md animate-slide-up">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 group">
          <div class="w-10 h-10 bg-primary-600 backdrop-blur rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-all">
            <span class="text-white font-logo font-bold text-lg">CBC</span>
          </div>
          <span class="font-logo font-bold text-2xl dark:text-gray-400 text-gray-700">CBCShop</span>
        </RouterLink>
          <h1 class="mt-2 font-display text-3xl dark:text-gray-400 font-bold text-gray-700">Create account</h1>
          <p class="text-primary-600 mt-1 text-sm">Join thousands of happy shoppers</p>
      </div>
      <div class="bg-white dark:bg-surface-800 rounded-3xl shadow-card-lg p-8">
        <div v-if="authStore.authError"
          class="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700 flex items-center gap-2">
          <span><i class="ri-error-warning-line text-red-700"></i></span> {{ authStore.authError }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="label">Full Name</label>
            <input v-model="form.name" type="text" class="input" :class="{'input-error': errors.name}" placeholder="Enter first name" autocomplete="name" />
            <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
          </div>
          <div>
            <label class="label">Email Address</label>
            <input v-model="form.email" type="email" class="input" :class="{'input-error': errors.email}" placeholder="Enter your email" autocomplete="email" />
            <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          </div>
          <div>
            <label class="label">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                class="input"
                :class="{'input-error': errors.password}"
                placeholder="Enter your password"
                autocomplete="new-password"
              />
              <button type="button" @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <i v-if="!showPass" class="ri-eye-line"></i>
                <i v-else class="ri-eye-off-line"></i>
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ strengthLabel }}</p>
            <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
          </div>

          <div>
            <label class="label">Confirm Password</label>
            <input v-model="form.confirm" :type="showPass ? 'text' : 'password'" class="input" :class="{'input-error': errors.confirm}" placeholder="Repeat password" autocomplete="new-password" />
            <p v-if="errors.confirm" class="error-msg">{{ errors.confirm }}</p>
          </div>

          <label class="flex items-start gap-3 cursor-pointer">
            <input v-model="agreedToTerms" type="checkbox" class="mt-0.5 w-4 h-4 rounded accent-primary-600 " />
            <span class="text-sm text-gray-600">
              I agree to the <a href="#" class="text-primary-600 font-medium">Terms of Service</a> and
              <a href="#" class="text-primary-600 font-medium">Privacy Policy</a>
            </span>
          </label>
          <p v-if="errors.terms" class="error-msg">{{ errors.terms }}</p>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full py-2 text-base flex items-center justify-center gap-2 mt-2"
          >
            <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-primary-600 font-semibold hover:text-primary-700">Sign in</RouterLink>
        </p>
      </div>
      <p class="text-center text-primary-400 text-xs mt-6">
        <RouterLink to="/" class="hover:text-white transition-colors">← Back to Store</RouterLink>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/atuh'

const router    = useRouter()
const authStore = useAuthStore()

const form = reactive({ name: '', email: '', password: '', confirm: '' })
const agreedToTerms = ref(false)
const errors        = reactive({})
const showPass      = ref(false)
const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

onMounted(() => { authStore.authError = '' })

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  const rules = [
    /^.{6,}$/,
    /^.{10,}$/,
    /(?=.*[A-Z])(?=.*\d)/,
    /[^A-Za-z0-9]/
  ]
  return rules.filter(regex => regex.test(p)).length
})

const strengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value] || ''
})

const handleRegister = async () => {
  Object.keys(errors).forEach(e => delete errors[e])

  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Name is required'; valid = false
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'; valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email'; valid = false
  }
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'; valid = false
  }
  if (form.password !== form.confirm) {
    errors.confirm = 'Passwords do not match'; valid = false
  }
  if (!agreedToTerms.value) {
    errors.terms = 'You must agree to the terms'; valid = false
  }
  if (!valid) return

  const registerSuccess = await authStore.register(form.name, form.email, form.password)
  if (registerSuccess) {
    router.push('/')
  }
}
</script>
