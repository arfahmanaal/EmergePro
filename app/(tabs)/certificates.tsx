import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Award } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useCertificateStore } from '@/store/certificate-store';
import { CertificateCard } from '@/components/CertificateCard';
import { EmptyState } from '@/components/EmptyState';
import colors from '@/constants/colors';

export default function CertificatesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { certificates, fetchUserCertificates } = useCertificateStore();
  
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchUserCertificates(user.id);
    }
  }, [user]);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await fetchUserCertificates(user.id);
    }
    setRefreshing(false);
  };
  
  const handleCertificatePress = (certificateId: string) => {
    router.push(`/certificate/${certificateId}`);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Certificates</Text>
          <Text style={styles.subtitle}>
            View and download your earned certificates
          </Text>
        </View>
        
        {certificates.length > 0 ? (
          <View style={styles.certificatesContainer}>
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onPress={() => handleCertificatePress(certificate.id)}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon={<Award size={32} color={colors.light.subtext} />}
            title="No certificates yet"
            description="Complete training modules to earn certificates"
            buttonTitle="Browse Courses"
            onButtonPress={() => router.push('/')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.light.subtext,
  },
  certificatesContainer: {
    marginBottom: 16,
  },
});