import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
const Welcome = (): React.ReactElement => {
  return (
    <LinearGradient
      colors={['#1a1a25', '#0b0b11']}
      style={styles.mainContainer}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.mainHeading}>Welcome to Chat Space</Text>

        <Text style={styles.subHeading}>
          Connect with someone instantly. Create a room or join one.
        </Text>

        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Create a Room</Text>
          </TouchableOpacity> */}
          <CustomButton
            title="hello"
            disabled={false}
            onPress={() => {
              console.log('hello world');
            }}
          />

          <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
            <Text style={styles.joinText}>Join a Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    width: 320,
    paddingVertical: 45,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#111118',
    borderRadius: 20,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',

    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 15 },

    elevation: 15,
  },

  mainHeading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#9d7bff',
  },

  subHeading: {
    fontSize: 13,
    color: '#9fa0b5',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 18,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  createButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 10,

    backgroundColor: '#6f6cff',

    shadowColor: '#6f6cff',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 8,
  },

  joinButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 10,

    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(140,140,255,0.4)',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  joinText: {
    color: '#cfcfff',
    fontWeight: '600',
  },
});
