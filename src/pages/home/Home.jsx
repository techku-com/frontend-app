import React, { useEffect, useState } from "react";
import TopCarousel from "../../components/carousel/carousel";
import { Col, Divider, Row, Space } from "antd";
import {
  ProfileFilled,
  ShopFilled,
  SkinFilled,
  StarFilled,
  ToolFilled,
} from "@ant-design/icons";
// import CardImage from "../../components/card/card-image";
import CardInfo from "../../components/card/card-info";
import { homeArticles, homeStatus } from "../../apis/home-api";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const {
          data: { data },
        } = await homeArticles();
        const sliceData = data.slice(0, 3);
        setArticles(sliceData);
      })();
      (async () => {
        const {
          data: { data },
        } = await homeStatus();
        setStatus(data);
      })();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div style={{ width: "97.5vw" }}>
        <TopCarousel />
      </div>
      <Space size="large" direction="vertical">
        <Divider />
        <section style={{ display: "flex", justifyContent: "center" }}>
          <Space direction="vertical" size="large" style={{ width: "80%" }}>
            <Row gutter={16}>
              {articles.map((card, idx) => {
                return (
                  <Col span={8} style={{ padding: 20 }} key={idx}>
                    <CardInfo
                      image={card.img || card.image}
                      title={card.title}
                      text={card.desc || card.description}
                    />
                  </Col>
                );
              })}
            </Row>
          </Space>
        </section>
        {/* <Divider />
            <section style={{ display: "flex", justifyContent: "center" }}>
              <Space direction="vertical" size="large" style={{ width: "80%" }}>
                <Row gutter={16}>
                  {projects.map((project) => {
                    return (
                      <Col span={8} style={{ padding: 20 }} key={project.id}>
                        <CardImage image={project.img} title={project.cat} />
                      </Col>
                    );
                  })}
                </Row>
              </Space>
            </section> */}
        <Divider />
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            backgroundColor: "#009cff",
          }}
        >
          <Row gutter={16} style={{ width: "100%", justifyContent: "center" }}>
            <Col span={4} style={{ padding: 40, textAlign: "center" }}>
              <ProfileFilled style={{ fontSize: 24 }} />
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>
                {status.registered_user || 0}
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
                REGISTERED USER
              </p>
            </Col>
            <Col span={4} style={{ padding: 40, textAlign: "center" }}>
              <ShopFilled style={{ fontSize: 24 }} />
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>
                {status.total_order || 0}
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
                TOTAL ORDER
              </p>
            </Col>
            <Col span={4} style={{ padding: 40, textAlign: "center" }}>
              <StarFilled style={{ fontSize: 24 }} />
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>
                {status.total_rating || 0}
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
                TOTAL RATING
              </p>
            </Col>
            <Col span={4} style={{ padding: 40, textAlign: "center" }}>
              <SkinFilled style={{ fontSize: 24 }} />
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>
                {status.total_customer || 0}
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
                TOTAL CUSTOMER
              </p>
            </Col>
            <Col span={4} style={{ padding: 40, textAlign: "center" }}>
              <ToolFilled style={{ fontSize: 24 }} />
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>
                {status.total_technician || 0}
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
                TOTAL TECHNICIAN
              </p>
            </Col>
          </Row>
        </section>
      </Space>
    </div>
  );
}
