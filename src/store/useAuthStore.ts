import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null, token: string | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, token: null });
      },
    }),
    { name: "auth-storage" } 
  )
);

// Listen for auth state changes and update Zustand store
supabase.auth.onAuthStateChange((_, session) => {
  if (session) {
    useAuthStore.getState().setUser(
      { id: session.user.id, email: session.user.email },
      session.access_token
    );
  } else {
    useAuthStore.getState().setUser(null, null);
  }
});
