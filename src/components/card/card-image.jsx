import { Button, Image } from "antd";
import React, { useState } from "react";

export default function CardImage({ image, title }) {
  const [onHover, setOnHover] = useState(false);

  return (
    <>
      <div
        onMouseOver={() => setOnHover(true)}
        onMouseOut={() => setOnHover(false)}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          preview={false}
          style={{
            transition: "transform .2s",
            transform: onHover ? "scale(1.2)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            content: "",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#343434",
            opacity: onHover ? 0.9 : 0,
            transition: "opacity 0.45s ease 0s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              right: "10%",
              bottom: "10%",
              color: "#fff",
              transform: onHover ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.45s ease 0s",
              opacity: onHover ? 1 : 0,
            }}
          >
            <p style={{ color: "white", fontSize: 17, fontWeight: 400 }}>
              {title}
            </p>
            <Button>View Project</Button>
          </div>
        </div>
      </div>
    </>
  );
}
