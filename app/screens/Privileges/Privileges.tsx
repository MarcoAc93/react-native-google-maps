import React, { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { PermissionsContext } from '../../context/permissions';
import { styles } from './styles';

export const Privileges = () => {
	const { permissions, askLocationPermissions } = useContext(PermissionsContext);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Privileges Screen!</Text>
				<Text>{JSON.stringify(permissions, null, 2)}</Text>
			</View>
			<Button title='Privileges' onPress={askLocationPermissions} />
		</SafeAreaView>
	);
};
