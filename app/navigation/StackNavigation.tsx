import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PermissionsContext } from '../context/permissions';

import { Privileges } from '../screens/Privileges';
import { Map } from '../screens/Map';

const Stack = createStackNavigator();

export const StackNavigation = () => {
	const { permissions } = useContext(PermissionsContext);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
			{
				permissions.locationStatus === 'granted'
					? <Stack.Screen name='Map' component={Map} />
					: <Stack.Screen name='Privileges' component={Privileges} />
			}
		</Stack.Navigator>
	);	
};
