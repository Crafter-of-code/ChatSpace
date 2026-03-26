import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import InputBox from '../components/InputBox';
import { apiContext } from '../store/ApiProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageContainer from '../components/MessageContainer';

const Chat = (): React.ReactElement => {
  const {
    roomId,
    setMessage,
    message,
    sendMessageHandler,
    messageArray,
    navigation,
    connectToWebSocket,
    endMetting,
    copyToClipBoard,
  } = React.useContext(apiContext);
  React.useEffect(() => {
    connectToWebSocket();
  });
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.chatContainer}>
        <View style={styles.mainTopContainer}></View>
        <View style={styles.chatContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={messageArray}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 0 }}>
                  <MessageContainer message={item.message} self={item.self} />
                </View>
              );
            }}
            keyExtractor={(item, index) => item.index.toString()}
          />
        </View>
      </SafeAreaView>

      {/* Input + button area */}
      <View style={styles.copyButton}>
        <CustomButton
          onPress={() => {
            copyToClipBoard(roomId);
          }}
          title="Copy Room Id"
          disabled={false}
        />
      </View>
      <View style={styles.operationContainer}>
        <View>
          <CustomButton
            onPress={() => {
              endMetting();
            }}
            title="End"
            disabled={false}
          />
        </View>
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
            onPress={sendMessageHandler}
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
    backgroundColor: '#0b0b11',
  },

  chatContainer: {
    flex: 9,
  },

  operationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
  },

  inputContainer: {
    flex: 2,
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flex: 0,
  },
  mainTopContainer: {
    alignItems: 'flex-end',
  },
  copyButton: {
    paddingHorizontal: 16,
  },
});
