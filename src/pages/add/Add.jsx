import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { ordersCreate } from "../../apis/order-api";

export default function AddPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmitOrder = async () => {
    const values = form.getFieldsValue();
    setLoading(true);

    try {
      await ordersCreate({ ...values, user_id: currentUser.user_id });
      setLoading(false);
    } catch (error) {
      console.log({ error });
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
    </>
  );
}
