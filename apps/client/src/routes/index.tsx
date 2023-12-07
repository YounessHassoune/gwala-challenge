import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useAuthStore } from "@/store/auth";

export const AppRoutes = () => {
  const { status } = useAuthStore();

  const routes = status === "signIn" ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
