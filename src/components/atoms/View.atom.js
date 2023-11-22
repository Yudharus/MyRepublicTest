import { View as ViewRn } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const View = ({ className, children, ...rest }) => {
  return (
    <ViewRn style={Tailwind`${className}`} {...rest}>
      {children}
    </ViewRn>
  );
};

export default View