import React from 'react'
import {Map as LeafLetMap , TileLayer} from './node_modules/react-leaflet'
import {showDataOnMap} from './util'
import './map.css'
function Map({countries,casesType,center,zoom}) {
    return (
        <div className="map">
            <LeafLetMap center={center} zoom={zoom}>
                <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Contributors'
                />
                {showDataOnMap(countries,casesType)}
            </LeafLetMap>          
        </div>
    );
}


export default Map
