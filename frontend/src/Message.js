
function Message({ text, fromUser }) {

  return (
    
    <div className="Message">
      {fromUser === "u1"
      ? <p style={{position: "relative", color: "blue", left: "-100px"}}>{text}</p>
      : <p style={{position: "relative", color: "red", right: "-100px"}}>{text}</p>
      }
      
    </div>
  )
}

export default Message