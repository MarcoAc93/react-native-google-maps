import React from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from "./styles";

export const Loading = () => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<ActivityIndicator size={30} color='blue' />
	</View>
);
