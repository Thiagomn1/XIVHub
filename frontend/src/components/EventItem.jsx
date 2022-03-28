import "./EventItem.css"

function EventItem({ event }) {
  return (
    <div className="event-container">
      <div className="event-header">
        <img className="event-image" src={event.image} alt="Event" />
        <h3 className="event-title">{event.title}</h3>
      </div>
      <div className="event-details">
        <div className="event-content span-2">
          <h4 className="event-detail">Description</h4>
          <p className="event-text">{event.description}</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Server</h4>
          <p className="event-text">{event.server}</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Location</h4>
          <p className="event-text">{event.location}</p>
        </div>
        <div className="event-content">
          <h4 className="event-detail">Date</h4>
          <p className="event-text">{event.date}</p>
        </div>
      </div>
    </div>
  )
}

export default EventItem
