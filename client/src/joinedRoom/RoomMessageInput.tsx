import React, {useContext} from "react";
import {Button, Form, Input, Space} from "antd";
import { SendOutlined } from "@ant-design/icons";
import {Formik} from "formik";
import * as yup from "yup";
import {IRoom} from "../models/room";
import rootStoreContext from "../stores/rootStore";
import {observer} from "mobx-react-lite";

const validate = yup.object().shape({
    body: yup.string().required("A message is required")
})

const RoomMessageInput: React.FC<{room: IRoom}> = ({room}) => {
    const {sendMessage} = useContext(rootStoreContext).roomStore;
    return (
        <div className="clearfix">
            <Formik validationSchema={validate} initialValues={{body: "", username: localStorage.getItem("username"), createdAt: Date.now(), roomId: room && room.id}} onSubmit={sendMessage}>
                {({handleSubmit, values, errors, touched, isValid, dirty, isSubmitting, handleBlur, handleChange, setSubmitting, handleReset}) => (
                    <Form onFinish={() => {
                        handleSubmit();
                        setSubmitting(false);
                        handleReset();
                    }}>
                        <Space>
                            <Form.Item name={"body"} hasFeedback validateStatus={touched.body && errors.body ? "error" : undefined} >
                                <Input.TextArea cols={400} name={"body"} value={values.body} onChange={handleChange} onBlur={handleBlur} placeholder={"Type your message here"} />
                            </Form.Item>

                            <Button type={"primary"} htmlType={"submit"} disabled={!isValid}  shape="round" icon={<SendOutlined />} loading={isSubmitting}>Send</Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default observer(RoomMessageInput);