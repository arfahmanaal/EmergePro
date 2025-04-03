import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Share,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { 
  Award, 
  Calendar, 
  Download, 
  Share2,
  User,
  CheckCircle
} from 'lucide-react-native';
import { useCertificateStore } from '@/store/certificate-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/Button';
import colors from '@/constants/colors';

export default function CertificateScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { certificates } = useCertificateStore();
  const { user } = useAuthStore();
  
  const [certificate, setCertificate] = useState<any>(null);
  
  useEffect(() => {
    const cert = certificates.find(c => c.id === id);
    if (cert) {
      setCertificate(cert);
    } else {
      router.back();
    }
  }, [id, certificates]);
  
  if (!certificate) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've earned a certificate for completing ${certificate.moduleName} with a score of ${certificate.score}%!`,
        title: 'My Training Certificate',
      });
    } catch (error) {
      console.error('Error sharing certificate:', error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Stack.Screen
        options={{
          title: 'Certificate',
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
              <Share2 size={20} color={colors.light.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={styles.certificateContainer}>
        <View style={styles.certificateHeader}>
          <Award size={32} color={colors.secondary} />
          <Text style={styles.certificateTitle}>Certificate of Completion</Text>
        </View>
        
        <View style={styles.certificateContent}>
          <Text style={styles.presentedTo}>Presented to</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.completionText}>
            For successfully completing the training module
          </Text>
          
          <Text style={styles.moduleName}>{certificate.moduleName}</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{certificate.score}%</Text>
            </View>
            <Text style={styles.scoreLabel}>Final Score</Text>
          </View>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={colors.light.subtext} />
              <Text style={styles.metaText}>
                Issued on: {formatDate(certificate.issueDate)}
              </Text>
            </View>
            
            {certificate.expiryDate && (
              <View style={styles.metaItem}>
                <Calendar size={16} color={colors.light.subtext} />
                <Text style={styles.metaText}>
                  Valid until: {formatDate(certificate.expiryDate)}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.verificationContainer}>
            <CheckCircle size={16} color={colors.success} />
            <Text style={styles.verificationText}>
              Verified and authenticated by Training Platform
            </Text>
          </View>
        </View>
        
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' }}
          style={styles.certificateBackground}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Download Certificate"
          onPress={() => {}}
          variant="primary"
          fullWidth
          icon={<Download size={20} color="#FFFFFF" />}
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
  headerButton: {
    padding: 8,
  },
  certificateContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.light.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  certificateBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  certificateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  certificateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.light.text,
    marginLeft: 12,
  },
  certificateContent: {
    padding: 24,
    alignItems: 'center',
  },
  presentedTo: {
    fontSize: 16,
    color: colors.light.subtext,
    marginBottom: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 16,
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: colors.secondary,
    marginBottom: 24,
  },
  completionText: {
    fontSize: 16,
    color: colors.light.subtext,
    marginBottom: 8,
    textAlign: 'center',
  },
  moduleName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.light.subtext,
  },
  metaContainer: {
    width: '100%',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: colors.light.subtext,
    marginLeft: 8,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verificationText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
  },
});