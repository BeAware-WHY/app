import React from "react";

const sizeClasses = {
  txtPoppinsLight12: "font-light font-poppins",
  txtPoppinsMediumItalic13: "font-medium font-poppins italic",
  txtPoppinsRegular16Gray90001: "font-normal font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsMediumItalic10: "font-medium font-poppins italic",
  txtPoppinsMedium13: "font-medium font-poppins",
  txtRobotoRegular14: "font-normal font-roboto",
  txtPoppinsRegular16Gray900: "font-normal font-poppins",
  txtPoppinsMedium64: "font-medium font-poppins",
  txtPoppinsRegular16Gray600: "font-normal font-poppins",
  txtPoppinsMedium30: "font-medium font-poppins",
  txtPoppinsMedium64WhiteA7007e: "font-medium font-poppins",
  txtPoppinsMedium17: "font-medium font-poppins",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
