import { Image, useTheme } from "@aws-amplify/ui-react";
import titan_logo from "../Images/Titan_logo.png";

export function Header() {
  const { tokens } = useTheme();

  return (
    <Image
      alt="logo"
      src={titan_logo}
      padding={tokens.space.medium}
    />
  );
}
