import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { homeArticles } from "../../apis/home-api";
import { ArticleContext } from "../../context/provider/article.provider";
import { useNavigate } from "react-router-dom";

export default function ArticleList() {
  const { Title, Paragraph } = Typography;
  const { setArticle } = useContext(ArticleContext);
  const [articles, setArticles] = useState([]);
  const navigation = useNavigate();

  const handleRedirectArticle = (data, idx) => {
    setArticle(data);
    navigation(`/article/${idx + 1}`);
  };

  useEffect(() => {
    try {
      (async () => {
        const {
          data: { data },
        } = await homeArticles();
        setArticles(data);
      })();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <Space direction="vertical" size="large" style={{ width: "80%" }}>
          <Row gutter={16}>
            {articles.map((card, idx) => {
              return (
                <Col span={8} style={{ padding: 20 }} key={idx}>
                  <div style={{ overflow: "hidden" }}>
                    <Image
                      src={card.image}
                      preview={false}
                      style={{
                        height: 300,
                        width: 500,
                        objectFit: "cover",
                      }}
                    />
                    <Title level={4}>{card.title}</Title>
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {card.description}
                    </Paragraph>
                    <Button onClick={() => handleRedirectArticle(card, idx)}>
                      More Detail
                    </Button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Space>
      </section>
    </div>
  );
}
