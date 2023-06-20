import { Descriptions, Image } from "antd";
import React, { useState } from "react";

export default function CardInfo({ image, title, text }) {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      style={{ overflow: "hidden" }}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      <Image
        src={image}
        preview={false}
        style={{
          height: 300,
          width: 500,
          objectFit: "cover",
          marginBottom: 40,
          opacity: onHover ? 0.6 : 1,
        }}
      />
      <Descriptions title={title} style={{ fontSize: 16 }}>
        <Descriptions.Item>{text}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
