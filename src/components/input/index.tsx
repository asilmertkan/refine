import React from "react";
import { Input as AntdInput } from "antd";
import { InputProps, TextAreaProps } from "antd/lib/input";

export const Input: React.FC<InputProps> = ({ ...rest }) => {
    return <AntdInput {...rest} />;
};

export const Textarea: React.FC<TextAreaProps> = ({ ...rest }) => {
    return <AntdInput.TextArea {...rest} />;
};