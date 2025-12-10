// import { useCallback } from "react";
// import { useUserStore } from "@/dashboard/stores/useUserStore";
// import { supabase } from "@/dashboard/service/supabase";

// export const useUserManager = () => {
//     const { session, setError, setLoading, setSession, error, loading } =
//         useUserStore();

//     return {
//         session,
//         error,
//         loading,
//         googleLogin: useCallback(() => {
//             supabase.auth.signInWithOAuth({
//                 provider: "google",
//             });
//         }, []),
//         logout: useCallback(() => {
//             supabase.auth.signOut();
//         }, []),
//         setSession,
//         setError,
//         setLoading,
//     };
// };
