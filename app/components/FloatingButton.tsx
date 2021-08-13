import React from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatinButtonProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
}

export const FloatingButton = ({ iconName, onPress, style }: FloatinButtonProps) => {
  return (
    <View style={{ ...style as any }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.blackButton}
        onPress={onPress}
      >
        <Icon name={iconName} size={35} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  }
});

