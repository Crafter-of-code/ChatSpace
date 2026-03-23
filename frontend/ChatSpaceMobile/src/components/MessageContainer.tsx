import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type MessageContainerProps = {
  message: string;
  self: boolean;
};

const MessageContainer = ({
  message,
  self,
}: MessageContainerProps): React.ReactElement => {
  return (
    <View
      style={[styles.wrapper, self ? styles.selfWrapper : styles.otherWrapper]}
    >
      <View
        style={[styles.bubble, self ? styles.selfBubble : styles.otherBubble]}
      >
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export default MessageContainer;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 6,
  },

  selfWrapper: {
    alignItems: 'flex-end',
  },

  otherWrapper: {
    alignItems: 'flex-start',
  },

  bubble: {
    maxWidth: '78%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  selfBubble: {
    backgroundColor: 'rgba(99,102,241,0.25)',
    borderColor: 'rgba(99,102,241,0.4)',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
  },

  otherBubble: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.12)',

    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  text: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
});
