import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "../images/test.png"
import "../components/EventItem.css"

function Carousel({ events }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div>
          <img src={events[0].image} alt="" />
          <div className="event-carousel">
            <h3 className="event-title">{events[0].title}</h3>
            <p className="event-text">{events[0].description}</p>
          </div>
        </div>
        <div>
          <h3>
            <img src={Image} alt="" />
          </h3>
        </div>
        <div>
          <h3>
            <img src={Image} alt="" />
          </h3>
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
