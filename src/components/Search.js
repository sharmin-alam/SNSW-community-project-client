import React, { useEffect, useState } from 'react'
import MapView from './MapView'

export default function Search() {
    const [searchProject, setSearchProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/projects/search')
            .then(res => res.json())
            .then(json => setSearchProjects(json))
    })

    return (
        <div>
            {searchProject.map((p) => <MapView key={p.id} p={p}/>)}
            {/* {numbers.map(num => <MapTopProjects num={num}/>)} */}
        </div>
    )
}