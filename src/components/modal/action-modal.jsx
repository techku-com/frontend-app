import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/provider/modal.provider";
import { Form, Input, Modal, Radio } from "antd";
import { usersLogin, usersRegistration } from "../../apis/user-api";

export default function ActionModal() {
  const { modalState, setModalState } = useContext(ModalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

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
        setIsLoading(false);
        setModalState((prev) => ({ ...prev, state: false }));
        localStorage.setItem("currentUser", JSON.stringify(data));
        form.resetFields();
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
      }
    } else {
      try {
        await usersRegistration({ ...values, role: !!values.role });
        setIsLoading(false);
        setModalState((prev) => ({ ...prev, type: "Login" }));
        form.resetFields();
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
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
    </Modal>
  );
}
