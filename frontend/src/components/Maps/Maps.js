import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
let key
const Maps = ({ allSpots }) => {
    key = useSelector((state) => state.maps.key);
    return (
        <Map zoom={12.5} containerStyle={{ width: "25%", marginRight: "-655px", height: "100%" }} style={{ width: "663px", height: "700px" }} initialCenter={{ lat: 40.6991, lng: -73.9712 }} google={window.google}>
            {allSpots.map((item, index) => (
                <Marker key={index} position={{ lat: item.lat, lng: item.lng }} title={item.name} />
            ))}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: key
})(Maps);
