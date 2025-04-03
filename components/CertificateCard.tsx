import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, Calendar, Download } from 'lucide-react-native';
import { Certificate } from '@/types';
import colors from '@/constants/colors';

interface CertificateCardProps {
  certificate: Certificate;
  onPress: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  onPress 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Award size={24} color={colors.secondary} />
        <Text style={styles.title}>Certificate of Completion</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.moduleName}>{certificate.moduleName}</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score:</Text>
          <Text style={styles.scoreValue}>{certificate.score}%</Text>
        </View>
        
        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <Calendar size={14} color={colors.light.subtext} />
            <Text style={styles.dateText}>
              Issued: {formatDate(certificate.issueDate)}
            </Text>
          </View>
          
          {certificate.expiryDate && (
            <View style={styles.dateItem}>
              <Calendar size={14} color={colors.light.subtext} />
              <Text style={styles.dateText}>
                Expires: {formatDate(certificate.expiryDate)}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.downloadButton}>
          <Download size={16} color={colors.primary} />
          <Text style={styles.downloadText}>Download</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
    backgroundColor: colors.light.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.text,
    marginBottom: 12,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.light.subtext,
    marginRight: 8,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
  dateContainer: {
    marginBottom: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: colors.light.subtext,
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    alignItems: 'flex-end',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  downloadText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
});