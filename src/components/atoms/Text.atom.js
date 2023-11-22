import { Text as TextRn } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const Text = ({ className, children, fontFamily, ...rest }) => {
  return (
    <TextRn
      style={[
        { fontFamily: "roboto-regular" },
        { fontFamily: fontFamily },
        Tailwind`${className}`,
      ]}
      {...rest}>
      {children}
    </TextRn>
  );
};

export default Text