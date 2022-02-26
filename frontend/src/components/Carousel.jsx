import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "../images/test.png"

function Carousel() {
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
          <h3>
            <img src={Image} alt="" />
          </h3>
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
