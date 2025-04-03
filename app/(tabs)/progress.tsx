import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BarChart2, TrendingUp, Award, Clock } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { modules } from '@/mocks/modules';
import { ProgressBar } from '@/components/ProgressBar';
import { EmptyState } from '@/components/EmptyState';
import colors from '@/constants/colors';

export default function ProgressScreen() {
  const { user } = useAuthStore();
  const { progress, fetchUserProgress, getCompletionPercentage } = useProgressStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    if (user) {
      fetchUserProgress(user.id);
    }
  }, [user]);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await fetchUserProgress(user.id);
    }
    setRefreshing(false);
  };
  
  const getFilteredModules = () => {
    if (!user || !progress.length) return [];
    
    const userProgress = progress.filter(p => p.userId === user.id);
    
    let filteredModules = modules.filter(module => {
      const moduleProgress = userProgress.find(p => p.moduleId === module.id);
      return moduleProgress !== undefined;
    });
    
    switch (activeTab) {
      case 'completed':
        return filteredModules.filter(module => {
          const moduleProgress = userProgress.find(p => p.moduleId === module.id);
          return moduleProgress?.completed;
        });
      case 'inProgress':
        return filteredModules.filter(module => {
          const moduleProgress = userProgress.find(p => p.moduleId === module.id);
          return !moduleProgress?.completed && moduleProgress?.completedSections.length > 0;
        });
      case 'notStarted':
        return modules.filter(module => {
          const moduleProgress = userProgress.find(p => p.moduleId === module.id);
          return moduleProgress === undefined || moduleProgress.completedSections.length === 0;
        });
      default:
        return filteredModules;
    }
  };
  
  const getOverallProgress = () => {
    if (!user || !progress.length) return 0;
    
    const totalSections = modules.reduce((sum, module) => sum + module.sections.length, 0);
    const completedSections = progress
      .filter(p => p.userId === user.id)
      .reduce((sum, p) => sum + p.completedSections.length, 0);
    
    return Math.round((completedSections / totalSections) * 100);
  };
  
  const getCompletedModulesCount = () => {
    if (!user || !progress.length) return 0;
    return progress.filter(p => p.userId === user.id && p.completed).length;
  };
  
  const getInProgressModulesCount = () => {
    if (!user || !progress.length) return 0;
    return progress.filter(
      p => p.userId === user.id && !p.completed && p.completedSections.length > 0
    ).length;
  };
  
  const getAverageScore = () => {
    if (!user || !progress.length) return 0;
    
    const quizResults = progress
      .filter(p => p.userId === user.id)
      .flatMap(p => p.quizResults || []);
    
    if (quizResults.length === 0) return 0;
    
    const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / quizResults.length);
  };
  
  const filteredModules = getFilteredModules();
  
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
        <View style={styles.overallProgressContainer}>
          <Text style={styles.overallProgressTitle}>Overall Progress</Text>
          
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={getOverallProgress()} height={8} />
            <Text style={styles.progressText}>{getOverallProgress()}%</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.success + '20' }]}>
                <Award size={20} color={colors.success} />
              </View>
              <View>
                <Text style={styles.statValue}>{getCompletedModulesCount()}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <TrendingUp size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.statValue}>{getInProgressModulesCount()}</Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <BarChart2 size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.statValue}>{getAverageScore()}%</Text>
                <Text style={styles.statLabel}>Avg. Score</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
            onPress={() => setActiveTab('inProgress')}
          >
            <Text style={[styles.tabText, activeTab === 'inProgress' && styles.activeTabText]}>
              In Progress
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'notStarted' && styles.activeTab]}
            onPress={() => setActiveTab('notStarted')}
          >
            <Text style={[styles.tabText, activeTab === 'notStarted' && styles.activeTabText]}>
              Not Started
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.modulesContainer}>
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => {
              const moduleProgress = progress.find(
                p => p.userId === user?.id && p.moduleId === module.id
              );
              
              const completionPercentage = user
                ? getCompletionPercentage(user.id, module.id, module.sections)
                : 0;
              
              return (
                <View key={module.id} style={styles.moduleCard}>
                  <View style={styles.moduleHeader}>
                    <Text style={styles.moduleTitle} numberOfLines={1}>
                      {module.title}
                    </Text>
                    <View style={styles.moduleMeta}>
                      <Clock size={14} color={colors.light.subtext} />
                      <Text style={styles.moduleMetaText}>{module.duration} min</Text>
                    </View>
                  </View>
                  
                  <View style={styles.moduleProgressContainer}>
                    <ProgressBar progress={completionPercentage} height={6} />
                    <View style={styles.moduleProgressMeta}>
                      <Text style={styles.moduleProgressText}>
                        {completionPercentage}% Complete
                      </Text>
                      <Text style={styles.moduleProgressText}>
                        {moduleProgress?.completedSections.length || 0}/{module.sections.length} sections
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <EmptyState
              icon={<BarChart2 size={32} color={colors.light.subtext} />}
              title="No progress data"
              description="Start taking courses to track your progress"
              buttonTitle="Browse Courses"
              onButtonPress={() => {}}
            />
          )}
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
  scrollContent: {
    padding: 16,
  },
  overallProgressContainer: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overallProgressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 16,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: colors.light.subtext,
    marginTop: 4,
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.light.subtext,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.light.input,
    borderRadius: 8,
    marginBottom: 24,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.light.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.light.subtext,
  },
  activeTabText: {
    color: colors.primary,
  },
  modulesContainer: {
    marginBottom: 16,
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
  moduleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  moduleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleMetaText: {
    fontSize: 12,
    color: colors.light.subtext,
    marginLeft: 4,
  },
  moduleProgressContainer: {
    marginBottom: 4,
  },
  moduleProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moduleProgressText: {
    fontSize: 12,
    color: colors.light.subtext,
  },
});