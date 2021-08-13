import { useState, useEffect, useRef } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Location } from "../types";

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({ longitude: 0, latitude: 0 });
  const [userLocation, setUserLocation] = useState<Location>({ longitude: 0, latitude: 0 });
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const isMounted = useRef(true);
  const watchIdRef = useRef<number>();

  const getCurrentLocation = async (): Promise<Location> => {
    return await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        success => resolve({
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        }),
        error => reject(error),
        { enableHighAccuracy: true }
      )
    });
  };

  const stopFollowUser = () => {
    if (watchIdRef.current)
      Geolocation.clearWatch(watchIdRef.current);
  };

  const followUser = () => {
    watchIdRef.current = Geolocation.watchPosition(
      ({ coords }) => {
        // if (!watchIdRef.current) return;
        const location: Location = { latitude: coords.latitude, longitude: coords.longitude };
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    )
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
		getCurrentLocation()
      .then(location => {
        if (!isMounted.current) return;
        setInitialPosition(location);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
        setHasLocation(true);
      });
	}, []);

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    userLocation,
    stopFollowUser,
    routeLines
  };
};
