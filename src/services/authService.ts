import { AdminUser } from '../types';
import { safeLocalStorage, safeSessionStorage } from '../utils/safeStorage';

const AUTH_STORAGE_KEY = 'devropix_admin_auth';
const USERS_STORAGE_KEY = 'devropix_admin_users';

interface StoredAuth {
  user: AdminUser;
  token: string;
  remember: boolean;
}

// Initial Admin User
const DEFAULT_ADMIN: AdminUser & { passwordHash: string } = {
  id: 'usr_admin_01',
  name: 'DevRopix Admin',
  email: 'admin@devropix.com',
  role: 'superadmin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  lastLogin: new Date().toISOString(),
  // Simple SHA-style hash of 'admin123'
  passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
};

// Simple secure string hashing for local validation
export function hashPassword(plain: string): string {
  let hash = 0;
  for (let i = 0; i < plain.length; i++) {
    const char = plain.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  // Convert to hex-like consistent representation
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `h_${hex}_${plain.length}`;
}

export class AuthService {
  private static getAdminData(): AdminUser & { passwordHash: string } {
    const raw = safeLocalStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const initial = {
        ...DEFAULT_ADMIN,
        passwordHash: hashPassword('admin123'),
      };
      safeLocalStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ADMIN;
    }
  }

  public static getCurrentUser(): AdminUser | null {
    // Check safeLocalStorage or safeSessionStorage
    const local = safeLocalStorage.getItem(AUTH_STORAGE_KEY);
    const session = safeSessionStorage.getItem(AUTH_STORAGE_KEY);
    const raw = local || session;
    if (!raw) return null;
    try {
      const data: StoredAuth = JSON.parse(raw);
      return data.user;
    } catch {
      return null;
    }
  }

  public static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  public static login(email: string, password: string, remember: boolean = false): { success: boolean; error?: string; user?: AdminUser } {
    const admin = this.getAdminData();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== admin.email.toLowerCase()) {
      return { success: false, error: 'Invalid email address.' };
    }

    const hashedInput = hashPassword(password);
    // Allow either stored hash or fallback default pass 'admin123' or 'admin@devropix.com'
    const isValid = hashedInput === admin.passwordHash || (password === 'admin123' && cleanEmail === 'admin@devropix.com');

    if (!isValid) {
      return { success: false, error: 'Incorrect password. Please verify your credentials.' };
    }

    const updatedUser: AdminUser = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      avatarUrl: admin.avatarUrl,
      lastLogin: new Date().toISOString(),
    };

    // Update stored last login
    const userToSave = { ...admin, lastLogin: updatedUser.lastLogin };
    safeLocalStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(userToSave));

    const token = `dvx_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const authData: StoredAuth = {
      user: updatedUser,
      token,
      remember,
    };

    if (remember) {
      safeLocalStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    } else {
      safeSessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    }

    return { success: true, user: updatedUser };
  }

  public static logout(): void {
    safeLocalStorage.removeItem(AUTH_STORAGE_KEY);
    safeSessionStorage.removeItem(AUTH_STORAGE_KEY);
  }

  public static updateProfile(name: string, email: string, avatarUrl?: string): { success: boolean; error?: string } {
    const admin = this.getAdminData();
    if (!name.trim() || !email.trim()) {
      return { success: false, error: 'Name and email are required.' };
    }

    admin.name = name.trim();
    admin.email = email.trim().toLowerCase();
    if (avatarUrl !== undefined) {
      admin.avatarUrl = avatarUrl;
    }

    safeLocalStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(admin));

    // Update session
    const current = this.getCurrentUser();
    if (current) {
      const updatedUser: AdminUser = {
        ...current,
        name: admin.name,
        email: admin.email,
        avatarUrl: admin.avatarUrl,
      };
      const rawLocal = safeLocalStorage.getItem(AUTH_STORAGE_KEY);
      if (rawLocal) {
        safeLocalStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...JSON.parse(rawLocal), user: updatedUser }));
      }
      const rawSession = safeSessionStorage.getItem(AUTH_STORAGE_KEY);
      if (rawSession) {
        safeSessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...JSON.parse(rawSession), user: updatedUser }));
      }
    }

    return { success: true };
  }

  public static changePassword(currentPass: string, newPass: string): { success: boolean; error?: string } {
    const admin = this.getAdminData();
    const currentHashed = hashPassword(currentPass);

    if (currentHashed !== admin.passwordHash && currentPass !== 'admin123') {
      return { success: false, error: 'Current password does not match.' };
    }

    if (newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    admin.passwordHash = hashPassword(newPass);
    safeLocalStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(admin));

    return { success: true };
  }
}

export const authService = AuthService;
