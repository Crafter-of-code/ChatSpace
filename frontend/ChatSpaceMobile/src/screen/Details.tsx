import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiContext } from '../store/ApiProvider';
import getName from '../store/names';

const Detail = (): React.ReactElement => {
  const { isCreator, userName, roomId, setUserName, setRoomId } =
    React.useContext(apiContext);
  React.useEffect(() => {
    setUserName(getName());
  }, []);
  return (
    <LinearGradient colors={['#1a1a25', '#0b0b11']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {isCreator == true ? 'Create a Room' : 'Join a Room'}
          </Text>

          <Text style={styles.subtitle}>
            {isCreator == true
              ? 'Start a new room and invite others.'
              : 'Enter details to join an existing room.'}
          </Text>
          {isCreator == true ? (
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Your Name</Text>
              <InputBox
                placeHolder="Enter your name"
                disabled={true}
                value={userName}
              />
              <Text style={styles.helperText}>
                Your name is automatically generated for you.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Your Name</Text>
                <InputBox
                  placeHolder={'enter you name'}
                  disabled={true}
                  value={userName}
                />
                <Text style={styles.helperText}>
                  Your name is automatically generated for you.
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Room Code</Text>
                <InputBox
                  placeHolder="Enter room code"
                  disabled={false}
                  value={roomId}
                  setValue={setRoomId}
                />
              </View>
            </>
          )}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={isCreator ? 'Create Room' : 'Join Room'}
              onPress={() => {
                console.log(isCreator ? 'creating room' : 'joining room');
              }}
              disabled={false}
            />
          </View>
          <Text style={styles.footerText}>
            {isCreator == true
              ? 'You can share the room code after creating.'
              : 'Ask the host for the room code.'}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: { flex: 1 },

  safeArea: { flex: 1 },
  helperText: {
    color: '#7a7a90',
    fontSize: 12,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    color: '#a0a0b0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  inputWrapper: {
    marginBottom: 18,
  },

  label: {
    color: '#cfcfe6',
    fontSize: 13,
    marginBottom: 6,
  },

  buttonWrapper: {
    marginTop: 10,
  },

  footerText: {
    color: '#7a7a90',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});
