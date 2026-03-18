import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputBox from '../components/InputBox';
// import InputBox from '../components/InputBox';

const Chat = (): React.ReactElement => {
  // Temporary state to test layout
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Send:', message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Chat messages area */}
      <View style={styles.chatContainer} />

      {/* Input + button area */}
      <View style={styles.operationContainer}>
        <View style={styles.inputContainer}>
          <InputBox
            disabled={false}
            placeHolder="Write your message here"
            value={message}
            setValue={setMessage}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Send"
            disabled={message === ''}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0b0b11', // fallback for gradient
    // Optional: you can add LinearGradient if desired
  },

  chatContainer: {
    flex: 9, // 90% of height
  },

  operationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
  },

  inputContainer: {
    flex: 2,
    paddingRight: 15,
  },

  buttonContainer: {
    flex: 0,
  },
});
