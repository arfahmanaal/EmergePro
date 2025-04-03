import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/Button';
import colors from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  const handleRegister = () => {
    router.push('/register');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Training Platform</Text>
          <Text style={styles.subtitle}>Learn, Grow, Succeed</Text>
          <Text style={styles.description}>
            Access interactive training modules, track your progress, and earn certifications all in one place.
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Login"
          onPress={handleLogin}
          variant="primary"
          style={styles.button}
          fullWidth
        />
        
        <Button
          title="Register"
          onPress={handleRegister}
          variant="outline"
          style={styles.button}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.light.subtext,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  button: {
    marginBottom: 16,
  },
});