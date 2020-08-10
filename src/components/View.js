import React, { useState, useEffect } from 'react'
import  Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import MapView from './MapView';




export default function Search(props) {
  
    const [searchterm, setSearchTerm] = useState('');
    const [showFailAlert, setShowFailAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [hideButton, setHideButton] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

 
    function SendSearchTerm(e) {
        e.preventDefault(); 
        let searchTerm = {
            searchterm 
        };
        //console.log(searchTerm);
        fetch('http://localhost:4000/projects/search', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchTerm),
        })
            .then((response) => response.json())
            .then((json) => {
                 console.log(json);
                 setSearchResult(json);
       

                // if (json.status === 200) {
                //   setSearchResult(json);
                //   //  json.data.map((p)=><MapView p={p}/>);
                //     setShowFailAlert(false)
                //     setShowSuccessMessage(true)
                    

                // } else {
                //     setShowSuccessMessage(false)
                //     setShowFailAlert(true)
                //     setErrorMessage(json.message)
                // }
               
            })
    }


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item className="breadcrumb-item text-body" > <Link to="/">Home</Link> </ Breadcrumb.Item>
                <Breadcrumb.Item active className="breadcrumb-item text-body font-weight-bolder"> My Community Project Proposal </ Breadcrumb.Item>
            </ Breadcrumb>


            <h1><strong>My Community Project Proposals</strong></h1>
            <br />
            <InputGroup size="lg">
            <div className="form-group">
                       <textarea id='search' onChange={(e) => setSearchTerm(e.target.value)} value={searchterm} className="form-control" />
                    </div>
                <InputGroup.Append>
                    <Button variant='!important btn btn-danger'style={{ display: hideButton ? 'none' : 'block' }} onClick={SendSearchTerm}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
           <div>
             {searchResult.map((p)=><MapView p={p}/>)}
           </div>
        </div>





    )
}



//  {projects.map(p => <MapView p={p} key={p.id} />)}