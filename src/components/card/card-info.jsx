import { Image, Typography } from "antd";
import React from "react";

export default function CardInfo({ image, title, text }) {
  const { Title, Paragraph } = Typography;

  return (
    <div style={{ overflow: "hidden" }}>
      <Image
        src={image}
        preview={false}
        style={{
          height: 300,
          width: 500,
          objectFit: "cover",
        }}
      />
      <Title level={4}>{title}</Title>
      <Paragraph ellipsis={{ rows: 5, expandable: true }}>{text}</Paragraph>
    </div>
  );
}
