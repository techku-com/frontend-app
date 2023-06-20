import {
  App,
  Button,
  Form,
  Input,
  List,
  Modal,
  Rate,
  Skeleton,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { ordersList, ordersRate } from "../../apis/order-api";
import { usersOrder } from "../../apis/user-api";

const ORDER_STATUS = [
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
  const [form] = Form.useForm();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
      render: (status) => ORDER_STATUS[status - 1].name,
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
          <Button onClick={handleShowCancelConfirm}>Cancel</Button>
          <Button onClick={() => setShowRating({ state: true, data: record })}>
            Rate
          </Button>
        </Space>
      ),
    },
  ];

  const TECH_HEADER = [
    {
      title: "Name",
      dataIndex: "created_by",
      width: "15%",
    },
    {
      title: "Issues",
      dataIndex: "issues",
      width: "25%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space>
          {record.status === ORDER_STATUS[0].value && (
            <Button onClick={() => handleTakeOrder(record)}>Take Order</Button>
          )}
          {record.status === ORDER_STATUS[1].value && (
            <Button onClick={() => handleFinishOrder(record)}>
              Finish Order
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleShowCancelConfirm = (data) => {
    console.log({ data });
    modal.confirm({
      title: "Do you want to cancel this order?",
      centered: true,
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("cancel");
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
      setShowRating(false);
      await ordersRate(respBody);
      form.resetFields();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleTakeOrder = (data) => {
    try {
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFinishOrder = (data) => {
    try {
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (currentUser.role === "CUSTOMER") {
      try {
        (async () => {
          const {
            data: { data },
          } = await usersOrder(currentUser.user_id);
          setLoading(false);
          setList(data);
        })();
      } catch (error) {
        console.log({ error });
      }
    } else {
      try {
        (async () => {
          const {
            data: { data },
          } = await ordersList();
          setLoading(false);
          setList(data);
        })();
      } catch (error) {
        console.log({ error });
      }
    }
  }, [currentUser.role, currentUser.user_id]);

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
        style={{ width: "70vw", height: "70vh" }}
        // scroll={{ y: "70vh" }}
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
    </App>
  );
}
