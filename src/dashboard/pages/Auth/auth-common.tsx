// import { Button } from "@/dashboard/components/ui/button";
// import GoogleIcon from "./google-icon.svg";
// import { useUserManager } from "@/dashboard/manager/useUserManager";
// import { Link } from "react-router";
// import { Logo } from "@/dashboard/components/ui/logo";

// export const AuthCommon = () => {
//     const { googleLogin } = useUserManager();
//     console.log("AuthCommon rendered");
//     return (
//         <div className="flex h-full w-full bg-gradient-to-br from-white via-gray-200 to-gray-300 justify-center pt-44">
//             <div className="flex flex-col">
//                 <div className="mb-24">
//                     <Logo />
//                 </div>
//                 <h4 className="text-3xl font-medium">Welcome!</h4>
//                 <p>Login to Mokku app to continue</p>
//                 <div className="mt-6 flex flex-col gap-2">
//                     <Button
//                         onClick={googleLogin}
//                         className="w-[24rem] cursor-pointer"
//                     >
//                         <img className="size-6" src={GoogleIcon} />
//                         Sign in with Google
//                     </Button>
//                     <Link to="/projects/local" className=" w-[24rem]">
//                         <Button className="w-full cursor-pointer">
//                             Continue as Guest
//                         </Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
