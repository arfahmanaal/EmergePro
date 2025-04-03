import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  Users, 
  BarChart2, 
  Award, 
  Clock, 
  TrendingUp,
  TrendingDown,
  BookOpen,
  ChevronRight
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useAnalyticsStore } from '@/store/analytics-store';
import { StatCard } from '@/components/StatCard';
import { ProgressBar } from '@/components/ProgressBar';
import colors from '@/constants/colors';

export default function AdminScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { analytics, fetchAnalytics, isLoading } = useAnalyticsStore();
  
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Check if user is admin or manager
    if (user && (user.role !== 'admin' && user.role !== 'manager')) {
      router.back();
    }
    
    fetchAnalytics();
  }, [user]);
  
  if (!analytics) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Stack.Screen options={{ title: 'Admin Dashboard' }} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Stack.Screen options={{ title: 'Admin Dashboard' }} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Overview</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total Users"
              value={analytics.totalUsers}
              icon={<Users size={24} color={colors.primary} />}
              color={colors.primary}
            />
            
            <StatCard
              title="Active Users"
              value={analytics.activeUsers}
              icon={<Users size={24} color={colors.success} />}
              color={colors.success}
            />
          </View>
          
          <View style={styles.statsRow}>
            <StatCard
              title="Completion Rate"
              value={analytics.completionRate}
              icon={<Award size={24} color={colors.secondary} />}
              color={colors.secondary}
              suffix="%"
            />
            
            <StatCard
              title="Avg. Score"
              value={analytics.averageScore}
              icon={<BarChart2 size={24} color={colors.info} />}
              color={colors.info}
              suffix="%"
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Module Performance</Text>
        
        <View style={styles.moduleStats}>
          {analytics.moduleStats.map((module) => (
            <TouchableOpacity key={module.moduleId} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleName} numberOfLines={1}>
                  {module.moduleName}
                </Text>
                <ChevronRight size={20} color={colors.light.subtext} />
              </View>
              
              <View style={styles.moduleMetrics}>
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <Users size={16} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.metricValue}>{module.enrollments}</Text>
                    <Text style={styles.metricLabel}>Enrollments</Text>
                  </View>
                </View>
                
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <BookOpen size={16} color={colors.success} />
                  </View>
                  <View>
                    <Text style={styles.metricValue}>{module.completions}</Text>
                    <Text style={styles.metricLabel}>Completions</Text>
                  </View>
                </View>
                
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <BarChart2 size={16} color={colors.info} />
                  </View>
                  <View>
                    <Text style={styles.metricValue}>{module.averageScore}%</Text>
                    <Text style={styles.metricLabel}>Avg. Score</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.completionRateContainer}>
                <View style={styles.completionRateHeader}>
                  <Text style={styles.completionRateLabel}>Completion Rate</Text>
                  <Text style={styles.completionRateValue}>
                    {Math.round((module.completions / module.enrollments) * 100)}%
                  </Text>
                </View>
                <ProgressBar 
                  progress={Math.round((module.completions / module.enrollments) * 100)} 
                  height={6}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityContainer}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.success + '20' }]}>
              <Award size={20} color={colors.success} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityHighlight}>John Doe</Text> earned a certificate in{' '}
                <Text style={styles.activityHighlight}>Workplace Safety</Text>
              </Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.primary + '20' }]}>
              <BookOpen size={20} color={colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityHighlight}>Jane Smith</Text> started{' '}
                <Text style={styles.activityHighlight}>Cybersecurity Essentials</Text>
              </Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.info + '20' }]}>
              <BarChart2 size={20} color={colors.info} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityHighlight}>Robert Johnson</Text> scored 92% on{' '}
                <Text style={styles.activityHighlight}>Leadership Skills</Text> quiz
              </Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.light.subtext,
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moduleStats: {
    marginBottom: 24,
  },
  moduleCard: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  moduleMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.light.input,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.text,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.light.subtext,
  },
  completionRateContainer: {
    marginTop: 4,
  },
  completionRateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  completionRateLabel: {
    fontSize: 12,
    color: colors.light.subtext,
  },
  completionRateValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: colors.light.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  activityHighlight: {
    fontWeight: '600',
    color: colors.primary,
  },
  activityTime: {
    fontSize: 12,
    color: colors.light.subtext,
  },
});