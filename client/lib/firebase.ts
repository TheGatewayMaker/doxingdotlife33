// Local authentication stub (Firebase removed)
// This provides a fallback when Firebase is not configured

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Mock auth state
let currentUser: User | null = null;
const authStateCallbacks: Array<(user: User | null) => void> = [];

// Authorized email domains/accounts
const AUTHORIZED_EMAILS = import.meta.env.VITE_AUTHORIZED_EMAILS
  ? import.meta.env.VITE_AUTHORIZED_EMAILS.split(",").map((email) =>
      email.trim().toLowerCase(),
    )
  : [];

/**
 * Check if an email is authorized
 */
export const isEmailAuthorized = (email: string): boolean => {
  const lowerEmail = email.toLowerCase();

  if (AUTHORIZED_EMAILS.length === 0) {
    console.warn("No authorized emails configured");
    return false;
  }

  return AUTHORIZED_EMAILS.some((authorizedEmail) => {
    // Support both specific emails and domain wildcards (e.g., "@company.com")
    if (authorizedEmail.startsWith("@")) {
      return lowerEmail.endsWith(authorizedEmail);
    }
    return lowerEmail === authorizedEmail;
  });
};

/**
 * Sign in with Google
 * Returns user data if successful
 */
export const signInWithGoogle = async (): Promise<User> => {
  // Fallback: prompt user for email in demo mode
  const email = prompt("Enter your email:");
  if (!email) {
    throw new Error("Sign in cancelled");
  }

  if (!isEmailAuthorized(email)) {
    throw new Error(
      "Your email is not authorized to access the admin panel. Please contact the administrator.",
    );
  }

  const user: User = {
    uid: Math.random().toString(36).slice(2),
    email: email,
    displayName: email.split("@")[0],
  };

  currentUser = user;
  notifyAuthStateChanged(user);
  return user;
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
  currentUser = null;
  notifyAuthStateChanged(null);
};

/**
 * Get Firebase ID token for backend verification
 */
export const getIdToken = async (): Promise<string | null> => {
  if (!currentUser) return null;
  // Return a mock token
  return btoa(JSON.stringify(currentUser));
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChanged = (
  callback: (user: User | null) => void,
): (() => void) => {
  callback(currentUser);
  authStateCallbacks.push(callback);
  return () => {
    const index = authStateCallbacks.indexOf(callback);
    if (index > -1) {
      authStateCallbacks.splice(index, 1);
    }
  };
};

/**
 * Notify all subscribers of auth state change
 */
const notifyAuthStateChanged = (user: User | null) => {
  authStateCallbacks.forEach((cb) => cb(user));
};

/**
 * Get current auth instance (null for mock auth)
 */
export const auth = null;

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return currentUser;
};
