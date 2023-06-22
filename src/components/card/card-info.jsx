import { Image, Typography } from "antd";
import React, { useState } from "react";

export default function CardInfo({ image, title, text }) {
  const { Title, Paragraph } = Typography;
  // const [onHover, setOnHover] = useState(false);

  return (
    <div
      style={{ overflow: "hidden" }}
      // onMouseOver={() => setOnHover(true)}
      // onMouseOut={() => setOnHover(false)}
    >
      <Image
        src={image}
        preview={false}
        style={{
          height: 300,
          width: 500,
          objectFit: "cover",
          marginBottom: 40,
          // opacity: onHover ? 0.6 : 1,
        }}
      />
      <Title level={4}>{title}</Title>
      <Paragraph ellipsis={{ rows: 5, expandable: true }}>{text}</Paragraph>
    </div>
  );
}
