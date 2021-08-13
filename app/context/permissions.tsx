import React, { createContext, useState, useEffect } from "react";
import { Platform, AppState } from 'react-native'
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";

export interface PermissionsState {
	locationStatus: PermissionStatus;
};

export const permissionsInitState: PermissionsState = {
	locationStatus: 'unavailable',
};

type PermissionsContextProps = {
	permissions: PermissionsState;
	askLocationPermissions: () => void;
	checkLocationPermissions: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: { children: any }) => {
	const [permissions, setPermissions] = useState(permissionsInitState);

	useEffect(() => {
		AppState.addEventListener('change', (status) => {
			checkLocationPermissions();
			if (status !== 'active') return;
			checkLocationPermissions();
		});
	}, []);
	
	const askLocationPermissions = async () => {
		let permissionStatus: PermissionStatus;
		if (Platform.OS === 'ios') {
			permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		} else {
			permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
		}
		if (permissionStatus === 'blocked') {
			openSettings();
		}
		setPermissions({ ...permissions, locationStatus: permissionStatus })
	};

	const checkLocationPermissions = async () => {
		let permissionStatus: PermissionStatus;
		if (Platform.OS === 'ios') {
			permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		} else {
			permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
		}
		setPermissions({ ...permissions, locationStatus: permissionStatus });
	};


	return (
		<PermissionsContext.Provider value={{ permissions, askLocationPermissions, checkLocationPermissions }}>
			{children}
		</PermissionsContext.Provider>
	)
};
