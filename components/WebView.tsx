import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';
import colors from '@/constants/colors';

interface WebViewProps {
  source: { uri: string };
  style?: any;
}

export const WebView: React.FC<WebViewProps> = ({ source, style }) => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src={source.uri}
        style={{ 
          border: 'none', 
          width: '100%', 
          height: '100%',
          ...style 
        }}
        allow="camera; microphone; accelerometer; gyroscope; magnetometer"
        allowFullScreen
      />
    );
  }
  
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        Web content is only available in the web version of the app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.input,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: colors.light.subtext,
    textAlign: 'center',
  },
});