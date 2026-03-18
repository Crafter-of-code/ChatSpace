import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      <LinearGradient
        colors={disabled ? ['#a0a0ff', '#c0bfff'] : ['#6f6cff', '#9d7bff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, disabled && styles.disabled]}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6f6cff',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginVertical: 15,
    marginHorizontal: 18,
  },

  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
  },
});
