// constants.ts
import { useBreakpointValue } from "native-base";

const useSize = (): { iconSize: string; fontSize: string } => {
  const iconSize =
    useBreakpointValue({
      base: "md",
      md: "lg",
      lg: "xl",
    }) || "sm";

  const fontSize =
    useBreakpointValue({
      base: "md",
      md: "lg",
      lg: "xl",
    }) || "sm";

  return { iconSize, fontSize };
};

export default useSize;
