import {Button, Form, Input, Modal, Space} from "antd";
import {Formik} from "formik";
import React, {useContext} from "react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import rootStoreContext from "../stores/rootStore";
import {v4 as uuid} from "uuid";


const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username is too short!").required("Username is required!"),
    about: Yup.string().required("Description is required!"),
    title: Yup.string().min(3, "Title is too short for a room name!").required("Title of your room is required!")
});

const CreateRoomModal = () => {
    const {visible, cancelModal} = useContext(rootStoreContext).commonStore;
    const {CreateRoom} = useContext(rootStoreContext).roomStore;
    return (
        <Modal visible={visible} title={"Create a room"} footer={null} onCancel={() => cancelModal()}>
            <Formik initialValues={{id: uuid() ,username: "", about: "", title: "", createdAt: Date.now()}} validationSchema={validationSchema}
                    onSubmit={(values: any) => CreateRoom(values).then(() => cancelModal())}>
                {({values, errors, isSubmitting, handleSubmit, handleBlur, touched, handleChange, isValid, dirty, handleReset, setSubmitting}) => (
                    <Form onFinish={handleSubmit}>
                        <Form.Item hasFeedback name={"username"}
                                   validateStatus={touched.username && errors.username ? "error" : undefined}
                                   help={touched.username && errors.username && errors.username}>
                            <Input name={"username"} onChange={handleChange} value={values.username}
                                   placeholder={"Unique username for the room"} onBlur={handleBlur}/>
                        </Form.Item>
                        <Form.Item hasFeedback name={"title"} validateStatus={touched.title && errors.title ? "error" : undefined} help={touched.title && errors.title && errors.title}>
                            <Input name={"title"} placeholder={"Title of your room"} value={values.title} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Item>
                        <Form.Item hasFeedback name={"about"} validateStatus={touched.about && errors.about ? "error" : undefined} help={touched.about && errors.about && errors.about}>
                            <Input.TextArea name={"about"} placeholder={"Give a description of your room"} value={values.about} onChange={handleChange} onBlur={handleBlur} rows={4} />
                        </Form.Item>
                        <Space>
                        <Button type={"primary"} onClick={() => {handleReset(); cancelModal();}} danger>Cancel</Button>
                        <Button type={"primary"} htmlType={"submit"} disabled={!isValid || !dirty} loading={isSubmitting}>Create Room</Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default observer(CreateRoomModal);
