import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal'
const Maps = ({ allSpots, spots }) => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const onMarkerClick = (marker, location) => {
        setActiveMarker(marker);
        setSelectedLocation(location);
    };

    const onInfoWindowClose = () => {
        setActiveMarker(null);
        setSelectedLocation(null);
    };
    console.log("SPOTS", spots)
    const apiKey = process.env.REACT_APP_API_KEY
    if (allSpots && !spots) {
        return (
            <Map apiKey={apiKey} zoom={13} containerStyle={{ width: "25%", position: "static" }} style={{ width: "37%", height: "700px", marginLeft: "100px", marginTop: "130px" }} initialCenter={{ lat: 40.75237519025471, lng: -73.98409806945087 }} google={window.google}>
                {allSpots.map((item, index) => (
                    <Marker onClick={(e, marker) => onMarkerClick(marker, item)} key={index} position={{ lat: item.lat, lng: item.lng }} title={item.name} />
                ))}
                {activeMarker && selectedLocation && (
                    <InfoWindow
                        marker={activeMarker}
                        visible={activeMarker}
                        onClose={onInfoWindowClose}
                    >
                        <div style={{ width: "350px", height: "450px" }}>
                            <img style={{ width: "100%", height: "75%" }} src={selectedLocation.previewImage} />
                            <a style={{ textDecoration: "none", color: "black", width: "fit-content" }} href={`/spots/${selectedLocation.id}`}><h2>{selectedLocation.name}</h2></a>
                            <h4>{selectedLocation.description}</h4>
                        </div>
                    </InfoWindow>
                )}
                <Modal open={open} onClose={(e) => setOpen(false)}>
                    <img src={image} />
                </Modal>
            </Map>
        );
    } else if (spots && !allSpots) {
        return (
            <Map apiKey={apiKey} zoom={15} containerStyle={{ width: "25%", height: "100%", margin: "0", padding: "0" }} style={{ width: "425px", height: "550px", borderRadius: "20px", margin: "0px", padding: "0px" }} initialCenter={{ lat: spots.lat, lng: spots.lng }} google={window.google}>
                <Marker onClick={(e, marker) => onMarkerClick(marker, spots)} key={spots.id} position={{ lat: spots.lat, lng: spots.lng }} title={spots.name} />
            </Map>
        );
    }
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(Maps);
