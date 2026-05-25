import { defineStore } from "pinia";
import { ref, computed } from 'vue';

const AUTH_KEY  = 'bccshop_auth'
const USERS_KEY = 'bccshop_users'

const seedUsers = () => {
  const existing = localStorage.getItem(USERS_KEY);
  if(existing) return JSON.parse(existing);

  const defaultUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@bbshop.com',
      password: 'admin123',
      role: 'admin',
      status: 'active',
      avatar: 'A',
      createdAt: new Date('2024-01-01').toISOString(),
      orders: 0,
      totalSpent: 0
    },
    {
      id: 2,
      name: 'Sarah Kim',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'customer',
      status: 'active',
      avatar: 'S',
      createdAt: new Date('2024-03-15').toISOString(),
      orders: 4,
      totalSpent: 487.60
    },
    {
      id: 3,
      name: 'Marcus Thompson',
      email: 'marcus@example.com',
      password: 'password123',
      role: 'customer',
      status: 'active',
      avatar: 'M',
      createdAt: new Date('2024-05-02').toISOString(),
      orders: 2,
      totalSpent: 219.98
    },
    {
      id: 4,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'password123',
      role: 'customer',
      status: 'inactive',
      avatar: 'P',
      createdAt: new Date('2024-06-20').toISOString(),
      orders: 1,
      totalSpent: 58.00
    }
  ]
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
}

export const useAuthStore = defineStore('auth', () => {
  const users = ref(seedUsers());
  const currentUser = ref(null);
  const authError = ref('');
  const loading = ref(false);

  const restoreSession = () => {
    const saved = localStorage.getItem(AUTH_KEY);
    if(saved) {
      try {
        currentUser.value = JSON.parse(saved);
      } catch {
        currentUser.value = null;
      }
    }
  }

  const isLoggedIn = computed(() => !!currentUser.value);
  const isAdmin = computed(() => currentUser.value?.role === 'admin');
  const allUsers = computed(() => users.value);

  const login = async (email, password) => {
    loading.value = true;
    authError.value = '';
    await new Promise(r => setTimeout(r, 600));

    users.value = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    const existingUser = users.value.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if(!existingUser) {
      authError.value = 'Invalid email or password';
      loading.value = false;
      return false;
    };

    if(existingUser.status === 'inactive') {
      authError.value = 'Your account is disabled. Contact support.';
      loading.value = false;
      return false;
    };

    const session = {...existingUser, password: undefined};
    currentUser.value = session;
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem(AUTH_KEY);
  }
  return {
      currentUser, users, authError, loading,
      isLoggedIn, isAdmin, allUsers,
      restoreSession, login, logout,
    }
});


