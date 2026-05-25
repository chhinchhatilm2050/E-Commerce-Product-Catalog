<template>
  <div class="min-h-screen bg-white-600 flex items-center justify-center p-4">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
    </div>
    <div class="relative w-full max-w-md animate-slide-up">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 group">
          <div class="w-10 h-10 bg-primary-600 backdrop-blur rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-all">
            <span class="text-white font-logo font-bold text-lg">CBC</span>
          </div>
          <span class="font-logo font-bold text-2xl text-gray-500">CBCShop</span>
        </RouterLink>
          <h1 class="mt-2 font-display text-3xl font-bold text-gray-500">Welcome back</h1>
          <p class="text-primary-600 mt-1 text-sm">Sign in to your account</p>
      </div>

      <div class="bg-white dark:bg-surface-800 rounded-3xl shadow-card-lg p-8">
        <div v-if="authStore.authError"
          class="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700 flex items-center gap-2"
        >
          <span><i class="ri-error-warning-line text-red-700"></i></span> {{ authStore.authError }}
        </div>

        <form @submit.prevent="handleLogin">
          <div>
            <label class="label">Email Address</label>
            <input type="text" v-model="email" class="input" :class="{'input-error': errors.email}" placeholder="you@example.com" autocomplete="email"/>
            <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          </div>
          <div>
            <div class="flex mt-3 items-center justify-between mb-1.5">
              <label class="label mb-0">Password</label>
              <a href="#" class="text-xs text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
            </div>
            <div class="relative">
              <input v-model="password" :type="showPass ? 'text' : 'password'" :class="{'input-error': errors.password}"
                placeholder="........." autocomplete="current-password" class="input"
              />
              <button type="button" @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i v-if="!showPass" class="ri-eye-line"></i>
                <i v-else class="ri-eye-off-line"></i>
              </button>
            </div>
            <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full py-3 mt-4 text-base flex items-center justify-center gap-2"
          >
            <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <RouterLink to="/register" class="text-primary-500 font-semibold hover:text-primary-700">Sign up</RouterLink>
        </p>
      </div>
      <p class="text-center text-primary-400 text-xs mt-6">
        <RouterLink to="/" class="hover:text-white transition-colors">← Back to Store</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/atuh';

  const router = useRouter();
  const authStore = useAuthStore();
  const email    = ref('');
  const password = ref('');
  const showPass = ref(false);
  const errors   = reactive({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  onMounted(() => { authStore.authError = ''});

  const handleLogin = async () => {
    Object.keys(errors).forEach(k => delete errors[k])
    if (!email.value.trim()){
      errors.email = 'Email is required';
      return
    }
    if (!emailRegex.test(email.value)){
      errors.email = 'Enter a valid email';
      return
    }
    if (!password.value.trim()){
      errors.password = 'Password is required';
      return
    }

    const ok = await authStore.login(email.value, password.value)
    if (ok) {
      router.push(authStore.isAdmin ? '/admin' : '/')
    }
  }
</script>
