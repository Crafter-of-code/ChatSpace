import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const OutlineButton = ({
  title,
  onPress,
  disabled = false,
}: OutlineButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1.5,
    borderColor: '#6f6cff',

    backgroundColor: 'transparent',

    paddingVertical: 15,
  },

  text: {
    color: '#6f6cff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  disabled: {
    opacity: 0.5,
  },

  disabledText: {
    color: '#a0a0ff',
  },
});
