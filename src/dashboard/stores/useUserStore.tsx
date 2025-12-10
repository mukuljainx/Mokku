// import { createSelectors, type ErrorState, type LoadingState } from "@/dashboard/lib";
// import { type Session, type User } from "@supabase/supabase-js";
// import { create } from "zustand";

// export interface UserStoreState extends LoadingState, ErrorState {
//     session: Session | null;
//     user: User | null;
//     setSession: (session: Session | null) => void;
// }

// export const useUserStoreBase = create<UserStoreState>()((set) => ({
//     setLoading: (x) => set({ loading: x }),
//     setError: (x) => set({ error: x }),
//     error: "",
//     loading: true,
//     session: null,
//     user: null,
//     setSession: (session) => set({ session, user: session?.user || null }),
// }));

// export const useUserStore = createSelectors(useUserStoreBase);
