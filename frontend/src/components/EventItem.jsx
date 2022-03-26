import "./EventItem.css"

function EventItem() {
  return (
    <div className="event-container">
      <div className="event-header">
        <img
          className="event-image"
          src="https://www.pcgamesn.com/wp-content/uploads/2021/04/final-fantasy-xiv-endless-nights-nightclub-1.jpg"
          alt="Event"
        />
        <h3 className="event-title">Test Event</h3>
      </div>
      <div className="event-details">
        <div className="event-content">
          <h4 className="event-detail">Description</h4>
          <p className="event-text">Test Description</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Server</h4>
          <p className="event-text">Excalibur</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Location</h4>
          <p className="event-text">Mist, W24, P5</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Date</h4>
          <p className="event-text">03/28/2022</p>
        </div>
      </div>
    </div>
  )
}

export default EventItem
