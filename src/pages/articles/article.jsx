import React, { useContext } from "react";
import { Breadcrumb, Image, Space, Typography } from "antd";
import { ArticleContext } from "../../context/provider/article.provider";
import { Link } from "react-router-dom";

export default function Article() {
  const { Title, Paragraph } = Typography;
  const { article } = useContext(ArticleContext);

  return (
    <div style={{ width: "80%", height: "100%" }}>
      <Breadcrumb
        items={[
          {
            title: <Link to={"/article"}>Article</Link>,
          },
          {
            title: article.title,
          },
        ]}
      />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <Title level={2}>{article.title}</Title>
          <Space size={"large"} align="start">
            <Paragraph>{article.description}</Paragraph>
            <Image
              src={article.image}
              preview={false}
              style={{
                height: 300,
                width: 400,
                objectFit: "cover",
                marginBottom: 20,
              }}
            />
          </Space>
        </div>
      </section>
    </div>
  );
}
