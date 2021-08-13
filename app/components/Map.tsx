import React, { useRef, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { FloatingButton } from '../components/FloatingButton';
import { useLocation } from '../hooks/useLocation';


export const MapComponent = () => {
  const { initialPosition, hasLocation, getCurrentLocation, followUser, userLocation, stopFollowUser, routeLines } = useLocation();
  const [showPolyline, setPolyline] = useState(true);
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUser();
    // TODO: cancel follow user function
    return () => {
      stopFollowUser();
    }
  }, []);

  useEffect(() => {
    if (!following.current) return;
    mapViewRef.current?.animateCamera({ center: userLocation });
  }, [userLocation]);
  
  const centerPosition = async () => {
    mapViewRef.current?.animateCamera({
      center: await getCurrentLocation()
    });
    following.current = true;
    followUser();
  };

	const togglePolyline = () => setPolyline(value => !value);

  if (!hasLocation)
    return <ActivityIndicator size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />

  return (
    <>
      <MapView
        ref={element => mapViewRef.current = element!}
        style={{ flex: 1 }}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onTouchStart={() => following.current = false}
      >
        {showPolyline && <Polyline coordinates={routeLines} strokeColor='black' strokeWidth={3} />}
      </MapView>
			<FloatingButton
				iconName='brush-outline'
				onPress={togglePolyline}
				style={{ position: 'absolute', bottom: 80, right: 20 }}
			/>
			<FloatingButton
				iconName='compass-outline'
				onPress={centerPosition}
				style={{ position: 'absolute', bottom: 20, right: 20 }}
			/>
    </>
  );
}
