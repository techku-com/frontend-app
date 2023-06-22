import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/provider/modal.provider";
import { Form, Input, Modal, Radio, message } from "antd";
import { usersLogin, usersRegistration } from "../../apis/user-api";

export default function ActionModal() {
  const { modalState, setModalState } = useContext(ModalContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const successMessage = () => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(message.success(`${modalState.type} Success`, 2.5))
      .then(
        setModalState((prev) => ({
          ...prev,
          type: modalState.type === "Login" ? prev.type : "Login",
          state: modalState.type === "Login" ? false : prev.state,
        }))
      )
      .then(setIsLoading(false))
      .then(form.resetFields());
  };

  const errorMessage = () => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(message.error(`${modalState.type} Error`, 2.5))
      .then(setIsLoading(false));
  };

  const handleReset = () => {
    setModalState((prev) => ({ ...prev, state: false }));
    form.resetFields();
  };

  const handleFinish = async () => {
    setIsLoading(true);
    const values = form.getFieldsValue();

    if (modalState.type === "Login") {
      try {
        const {
          data: { data },
        } = await usersLogin(values);
        successMessage();
        localStorage.setItem("currentUser", JSON.stringify(data));
      } catch (error) {
        errorMessage();
      }
    } else {
      try {
        await usersRegistration({ ...values, role: !!values.role });
        successMessage();
      } catch (error) {
        errorMessage();
      }
    }
  };

  return (
    <Modal
      title={modalState.type}
      centered
      width={400}
      open={modalState.state}
      okText={modalState.type === "Login" ? "Login" : "Register"}
      confirmLoading={isLoading}
      onOk={handleFinish}
      onCancel={handleReset}
    >
      <Form form={form} layout="vertical" initialValues={{ role: 0 }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {modalState.type === "Register" && (
          <>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="role">
              <Radio.Group>
                <Radio value={0}>Customer</Radio>
                <Radio value={1}>Technician</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
      </Form>
      {contextHolder}
    </Modal>
  );
}
