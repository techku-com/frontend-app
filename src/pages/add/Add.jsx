import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { ordersCreate } from "../../apis/order-api";

export default function AddPage() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const successMessage = () => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(form.resetFields())
      .then(message.success("Add Order Success", 2.5));
  };

  const errorMessage = () => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(message.error("Add Order Error", 2.5));
  };

  const handleSubmitOrder = async () => {
    const values = form.getFieldsValue();
    setLoading(true);

    try {
      await ordersCreate({ ...values, user_id: currentUser.user_id });
      setLoading(false);
      successMessage();
    } catch (error) {
      errorMessage();
    }
  };

  return (
    <>
      <h1>Add New Order</h1>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ issues: "", address: "" }}
        style={{ width: "50vw" }}
        onFinish={handleSubmitOrder}
      >
        <Form.Item label="Issue" name="issues">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </>
  );
}
