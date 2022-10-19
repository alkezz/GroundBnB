import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode'
import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = () => {
    const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }
    Geocode.setApiKey(key)

    return (
        <Maps apiKey={key} />
    );
};

export default MapContainer;
