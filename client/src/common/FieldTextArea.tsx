import React from "react";
import {FieldRenderProps} from "react-final-form";
import {Form, Input} from "antd";

interface IProps extends FieldRenderProps<string, HTMLElement>{
    placeholder: string;
}
const FieldTextArea: React.FC<IProps> = ({meta:{touched, error}, placeholder}) => {
    return(
        <Form.Item hasFeedback validateStatus={touched && !!error ? "error" : "success"} help={touched && error && error}>
            <Input.TextArea rows={4} allowClear={true} placeholder={placeholder}/>
        </Form.Item>
    )
}

export default FieldTextArea;