import React from "react";

import { Img, Line, Text } from "components";

const FPLightOneColumnTwo = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-start justify-start w-full">
          <Text
            className="italic text-[13px] text-black-900"
            size="txtPoppinsMediumItalic13"
          >
            {props?.emailFive}
          </Text>
          <div className="flex flex-row sm:gap-10 items-start justify-between mt-[11px] w-[99%] md:w-full">
            <div className="flex flex-row gap-3 items-start justify-start">
              {!!props?.padlockone ? (
                <Img
                  className="h-[17px] w-[17px]"
                  alt="padlockOne"
                  src={props?.padlockone}
                />
              ) : null}
              {!!props?.password ? (
                <Text
                  className="text-base text-gray-900"
                  size="txtPoppinsRegular16Gray900"
                >
                  {props?.password}
                </Text>
              ) : null}
            </div>
            {!!props?.showpassword ? (
              <Img className="h-3" alt="eye" src={props?.showpassword} />
            ) : null}
          </div>
          {!!props?.rectangleeightFour ? (
            <Line className="bg-indigo-900 h-0.5 mt-1.5 w-full" />
          ) : null}
        </div>
      </div>
    </>
  );
};

FPLightOneColumnTwo.defaultProps = { emailFive: "Email" };

export default FPLightOneColumnTwo;
