import React from 'react';
import { View } from 'react-native';
import { MapComponent } from '../../components/Map';
import { useLocation } from '../../hooks/useLocation';

import { styles } from './styles';

export const Map = () => {
	return (
		<View style={{ flex: 1 }}>
			<MapComponent />
		</View>
	);
};
