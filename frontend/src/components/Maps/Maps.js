import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
let key
const Maps = ({ allSpots }) => {
    key = useSelector((state) => state.maps.key);
    return (
        <Map style={{ width: "500px", height: "500px" }} zoom={10} initialCenter={{ lat: 40.7831, lng: -73.9712 }} google={window.google}>
            {allSpots.map((item, index) => (
                <Marker key={index} position={{ lat: item.lat, lng: item.lng }} title={item.name} />
            ))}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: key
})(Maps);
