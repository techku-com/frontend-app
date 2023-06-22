import { App, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ordersList, ordersUpdate } from "../../apis/order-api";

export default function TechListPage() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const requestTechList = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await ordersList();
      setLoading(false);
      setList(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const TECH_HEADER = [
    {
      title: "Name",
      dataIndex: "created_by",
      width: "15%",
    },
    {
      title: "Issues",
      dataIndex: "issues",
      width: "35%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "35%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleTakeOrder(record)}>Take Order</Button>
      ),
    },
  ];

  const handleTakeOrder = async (data) => {
    const bodyRequest = {
      order_id: data.order_id,
      user_id: data.created_by_id,
      taken_by: currentUser.user_id,
      new_status: data.status + 1,
    };

    try {
      await ordersUpdate(bodyRequest);
      requestTechList();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    requestTechList();
  }, []);

  return (
    <App>
      <Table
        bordered
        loading={loading}
        pagination={false}
        rowKey={(record) => `${record.created_by}-${record.issues}`}
        columns={TECH_HEADER}
        dataSource={list}
        style={{ width: "70vw", height: "100%" }}
      />
    </App>
  );
}
