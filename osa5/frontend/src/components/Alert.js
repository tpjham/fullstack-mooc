import React from "react"

const Alert = ({ message, alertStyle }) => {
  if (message === null && alertStyle === null) {
    return (
      null
    )
  }

  return (
    <div className={alertStyle}>
      {message}
    </div>
  )
}

export default Alert