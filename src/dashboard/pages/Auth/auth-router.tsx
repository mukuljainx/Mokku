import { Navigate, Outlet, useLocation } from "react-router";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { DelayedLoader } from "@/dashboard/components/ui/delayed-loader";
import { useUserStore } from "@/dashboard/stores/useUserStore";

export const AuthRouter = () => {
    const { loading, session } = useUserStore();
    const { search } = useLocation();

    if (loading && !session) {
        return (
            <DelayedLoader
                delay={700}
                loader={
                    <div className="h-full w-full flex justify-center items-center">
                        <Spinner />
                    </div>
                }
            >
                <></>
            </DelayedLoader>
        );
    }

    return session ? <Outlet /> : <Navigate to={`/sign-in${search}`} />;
};
