import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Rate,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ordersRate, ordersUpdate } from "../../apis/order-api";
import { usersOrder } from "../../apis/user-api";

const ORDER_STATUS = [
  {
    name: "Canceled",
    value: 0,
  },
  {
    name: "Available",
    value: 1,
  },
  {
    name: "On Process",
    value: 2,
  },
  {
    name: "Done",
    value: 3,
  },
];

export default function ListPage() {
  const { modal } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showRating, setShowRating] = useState({ state: false, data: {} });
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const successMessage = (text) => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(form.resetFields())
      .then(message.success(text, 2.5));
  };

  const errorMessage = (text) => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
      .then(message.error(text, 2.5));
  };

  const requestMyOrder = async (id) => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await usersOrder(id);
      setLoading(false);
      setList(data);
    } catch (error) {}
  };

  const requestUpdateOrder = async (body) => {
    try {
      await ordersUpdate(body);
      requestMyOrder(currentUser.user_id);
      successMessage("Update Order Success");
    } catch (error) {
      errorMessage("Update Order Error");
    }
  };

  const CUSTOMER_HEADER = [
    {
      title: "Name",
      dataIndex: "created_by_name",
      key: "created_by",
      width: "14%",
    },
    {
      title: "Issues",
      dataIndex: "issues",
      key: "issues",
      width: "20%",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "12%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => ORDER_STATUS[status].name,
    },
    {
      title: "Taken By",
      dataIndex: "taken_by_name",
      key: "taken_by",
      width: "14%",
      render: (name) => name || "-",
    },
    {
      title: "Rating",
      dataIndex: "order_rating",
      key: "rating",
      width: "15%",
      render: (rate) => <Rate disabled count={6} defaultValue={rate.rating} />,
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space>
          <Button
            disabled={record.status !== ORDER_STATUS[1].value}
            onClick={() => handleShowCancelConfirm(record)}
          >
            Cancel
          </Button>
          <Button
            disabled={
              record.status !== ORDER_STATUS[3].value ||
              record.order_rating.rating
            }
            onClick={() => setShowRating({ state: true, data: record })}
          >
            Rate
          </Button>
        </Space>
      ),
    },
  ];

  const TECH_HEADER = [
    {
      title: "Name",
      dataIndex: "created_by_name",
      key: "created_by",
      width: "15%",
    },
    {
      title: "Issues",
      dataIndex: "issues",
      key: "issues",
      width: "25%",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => ORDER_STATUS[status].name,
    },
    {
      title: "Rating",
      dataIndex: "order_rating",
      key: "rating",
      width: "15%",
      render: (rate) => <Rate disabled count={6} defaultValue={rate.rating} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          disabled={record.status === ORDER_STATUS[3].value}
          onClick={() => handleFinishOrder(record)}
        >
          Finish Order
        </Button>
      ),
    },
  ];

  const handleShowCancelConfirm = (data) => {
    modal.confirm({
      title: "Do you want to cancel this order?",
      centered: true,
      onOk() {
        const bodyRequest = {
          order_id: data.order_id,
          user_id: data.created_by,
          taken_by: currentUser.user_id,
          new_status: 0,
        };
        requestUpdateOrder(bodyRequest);
      },
    });
  };

  const handleSubmitRate = async () => {
    const values = form.getFieldsValue();
    const { order_id, taken_by } = showRating.data;
    const respBody = {
      ...values,
      user_id: currentUser.user_id,
      tech_id: taken_by,
      order_id,
    };

    try {
      await ordersRate(respBody);
      setShowRating(false);
      form.resetFields();
      requestMyOrder(currentUser.user_id);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFinishOrder = (data) => {
    const bodyRequest = {
      order_id: data.order_id,
      user_id: data.created_by,
      taken_by: currentUser.user_id,
      new_status: data.status + 1,
    };
    requestUpdateOrder(bodyRequest);
  };

  useEffect(() => {
    requestMyOrder(currentUser.user_id);
  }, [currentUser.user_id]);

  return (
    <App>
      <Table
        bordered
        loading={loading}
        pagination={false}
        rowKey={(record) => `${record.created_by}-${record.issues}`}
        columns={
          currentUser.role === "CUSTOMER" ? CUSTOMER_HEADER : TECH_HEADER
        }
        dataSource={list}
        style={{ width: "70vw", height: "100%" }}
      />
      <Modal
        title="Give Rate"
        centered
        open={showRating.state}
        okText={"Submit"}
        onOk={handleSubmitRate}
        onCancel={() => setShowRating(false)}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Rate" name="rating">
            <Rate count={6} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </App>
  );
}
