import React from "react";

const ErrorMessage = ({message}) => {
    return(<div className="error">
        <p>{message}</p>
    </div>)
}

export default ErrorMessage
