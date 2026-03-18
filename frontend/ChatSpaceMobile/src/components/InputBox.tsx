import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Platform } from 'react-native';

type InputBoxProps = {
  placeHolder: string;
  value: string;
  setValue?: (text: string) => void;
  disabled: boolean;
};

const InputBox = ({
  placeHolder,
  value,
  setValue,
  disabled,
}: InputBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.inputBox,
        isFocused && styles.inputFocused,
        disabled && styles.inputDisabled,
      ]}
      placeholder={placeHolder}
      placeholderTextColor="#8a8aa3"
      value={value}
      editable={!disabled}
      onChangeText={text => setValue && setValue(text)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      selectionColor="#7c7cff"
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(20,20,30,0.9)',
    color: '#e8e8f0',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  inputFocused: {
    borderColor: '#7c7cff',
    shadowColor: '#7c7cff',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    transform: [{ translateY: -1 }],
  },

  inputDisabled: {
    opacity: 0.5,
  },
});
