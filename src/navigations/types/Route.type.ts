import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { RootStackParams } from "./RootStackParams.type";

type Route = {
  name: keyof RootStackParams;
  component: React.ComponentType<{}>;
  options?: StackNavigationOptions;
};

export type { Route };
