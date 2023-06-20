import { Carousel } from "antd";
import { gigs } from "../../data";

export default function TopCarousel() {
  return (
    <Carousel autoplay style={{ height: "80vh", overflow: "hidden" }}>
      {gigs.map(({ img }, idx) => (
        <div key={idx}>
          <img
            src={img}
            style={{ width: "100%", height: "100%" }}
            alt="img carousel"
          />
        </div>
      ))}
    </Carousel>
  );
}
