import MainScreens from "@app/features";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "TaskList",
      component: MainScreens.TaskListScreen,
      options: { headerShown: false },
    },
    {
      name: "AddEditTask",
      component: MainScreens.AddTaskScreen,
    },
  ];

  return routes;
};

export default useRoutes;
