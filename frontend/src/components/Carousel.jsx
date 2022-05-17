import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
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
        {events &&
          events.map(event => (
            <div key={event._id}>
              <img src={event.image} alt="" />
              <div className="event-carousel">
                <div className="event-wrapper">
                  <div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-text">{event.description}</p>
                  </div>
                  <div className="event-date">
                    <p className="event-text">{event.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default Carousel
