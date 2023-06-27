import {
  App,
  Button,
  Form,
  Input,
  InputNumber,
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
  const [showPrice, setShowPrice] = useState({
    state: false,
    data: {},
    isReadOnly: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [rateForm] = Form.useForm();
  const [priceForm] = Form.useForm();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const successMessage = (text) => {
    messageApi
      .open({
        type: "loading",
        content: "Loading",
        duration: 2.5,
      })
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
      title: "Technician Phone Number",
      dataIndex: "technician_phone",
      key: "technician_phone",
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
      render: (_, record) =>
        record.status === ORDER_STATUS[1].value ? (
          <Button onClick={() => handleShowCancelConfirm(record)}>
            Cancel
          </Button>
        ) : (
          <Space>
            <Button
              disabled={
                record.status !== ORDER_STATUS[3].value ||
                record.order_rating.rating
              }
              onClick={() => setShowRating({ state: true, data: record })}
            >
              Rate
            </Button>
            <Button onClick={() => handleShowDetail(record)}>Detail</Button>
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
      title: "Customer Number",
      dataIndex: "customer_phone",
      key: "customer_phone",
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
          onClick={() => handleOpenFinishOrder(record)}
        >
          Finish Order
        </Button>
      ),
    },
  ];

  const handleShowDetail = (data) => {
    priceForm.setFieldsValue({
      price: `Rp. ${data.price},-`.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      description: data.description,
    });
    setShowPrice({ state: true, data, isReadOnly: true });
  };

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
    const values = rateForm.getFieldsValue();
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
      rateForm.resetFields();
      requestMyOrder(currentUser.user_id);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleOpenFinishOrder = (data) => {
    setShowPrice({ state: true, data, isReadOnly: false });
  };

  const handleSubmitFinishOrder = () => {
    const values = priceForm.getFieldsValue();
    const { data } = showPrice;
    const bodyRequest = {
      order_id: data.order_id,
      user_id: data.created_by,
      taken_by: currentUser.user_id,
      new_status: 3,
      price: values.price,
      description: values.description,
    };
    requestUpdateOrder(bodyRequest);
    setShowPrice({ state: false, data: {}, isReadOnly: false });
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
        rowKey={(record) => record.order_id}
        columns={
          currentUser.role === "CUSTOMER" ? CUSTOMER_HEADER : TECH_HEADER
        }
        dataSource={list}
        style={{ width: "80vw", height: "100%" }}
      />
      <Modal
        title="Give Rate"
        centered
        open={showRating.state}
        okText={"Submit"}
        onOk={handleSubmitRate}
        onCancel={() => setShowRating({ data: {}, state: false })}
      >
        <Form layout="vertical" form={rateForm}>
          <Form.Item label="Rate" name="rating">
            <Rate count={6} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Finish Order"
        centered
        open={showPrice.state && !showPrice.isReadOnly}
        okText={"Submit"}
        onOk={handleSubmitFinishOrder}
        onCancel={() => {
          priceForm.resetFields();
          setShowPrice((prev) => ({ ...prev, data: {}, state: false }));
        }}
      >
        <Form layout="vertical" form={priceForm}>
          <Form.Item label="Price" name="price">
            <InputNumber
              prefix="Rp"
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Detail Order"
        centered
        open={showPrice.state && showPrice.isReadOnly}
        onCancel={() => {
          priceForm.resetFields();
          setShowPrice((prev) => ({ ...prev, data: {}, state: false }));
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              priceForm.resetFields();
              setShowPrice((prev) => ({ ...prev, data: {}, state: false }));
            }}
          >
            Ok
          </Button>,
        ]}
      >
        <Form layout="vertical" form={priceForm}>
          <Form.Item label="Price" name="price">
            <Input readOnly style={{ cursor: "default" }} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} readOnly style={{ cursor: "default" }} />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </App>
  );
}
