import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";

export default function MapView(props) {
    const [showMoreDetails, setShowMoreDetails] = useState(false)
    const [showSuccessfulVote, setShowSuccessfulVote] = useState(false)
    const [hideButton, setHideButton] = useState(false)

    function sendVote() {
        fetch('http://localhost:4000/projects/approved/vote', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.p),
        })
            .then((response) => response.json())
            .then(json => {
                if (json.status == 200) {
                    setHideButton(true)
                    setShowSuccessfulVote(true)
                }
            })
    }
    return (

        <div className="border border-primary rounded-lg float-none p-3 mt-3">
            <p><b>Title: </b>{props.p.title}</p>
            <p><b>Postcode: </b>{props.p.postcode}</p>
            <p><b>Description: </b>{props.p.description}</p>
            <p><b>Votes: </b>{props.p.voteCount}</p>
            <button className='btn btn-primary' style={{ display: hideButton ? 'none' : 'block' }} onClick={sendVote}>Vote</button>
            {showSuccessfulVote && <Alert variant='success' onClose={() => setShowSuccessfulVote(false)} dismissible><Alert.Heading>Success!</Alert.Heading>You have successfully voted {props.p.title}</Alert>}
        </div>
    )

}


