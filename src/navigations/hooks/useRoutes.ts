import index from "@app/features/MainScreens/screens/MainScreen";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "login",
      component: index,
      options: {
        headerShown: false,
      },
    },
  ];

  return routes;
};

export default useRoutes;
