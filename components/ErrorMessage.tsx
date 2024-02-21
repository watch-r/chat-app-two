import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
    return <p className='text-red-500 text-xs pb-2'>{children}</p>;
};

export default ErrorMessage;
