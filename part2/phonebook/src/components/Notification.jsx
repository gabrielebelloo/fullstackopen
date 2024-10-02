const Notification = ({ message }) => {    
    const notificationStyle = {
        color: 'green'
    }

    const errorStyle = {
        color: 'red'
    }

  if (!message.content) {
    return null;
  }

  if (message.isError) {
    return <div style={errorStyle} className="notification">{message.content}</div>;
  } else {
    return <div style={notificationStyle} className="notification">{message.content}</div>
  }
};

export default Notification;
