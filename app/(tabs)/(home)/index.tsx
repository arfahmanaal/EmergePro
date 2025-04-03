import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, BookOpen, Clock, Award } from 'lucide-react-native';
import { modules } from '@/mocks/modules';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { ModuleCard } from '@/components/ModuleCard';
import { StatCard } from '@/components/StatCard';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { progress, fetchUserProgress, getCompletionPercentage } = useProgressStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filteredModules, setFilteredModules] = useState(modules);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    if (user) {
      fetchUserProgress(user.id);
    }
  }, [user]);
  
  useEffect(() => {
    filterModules(activeFilter, searchQuery);
  }, [searchQuery, activeFilter, progress]);
  
  const filterModules = (filter: string, query: string) => {
    let filtered = modules;
    
    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(module => 
        module.category.toLowerCase() === filter.toLowerCase()
      );
    }
    
    // Apply search query
    if (query) {
      filtered = filtered.filter(module => 
        module.title.toLowerCase().includes(query.toLowerCase()) ||
        module.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredModules(filtered);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await fetchUserProgress(user.id);
    }
    setRefreshing(false);
  };
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    filterModules(filter, searchQuery);
  };
  
  const getModuleProgress = (moduleId: string) => {
    if (!user) return 0;
    return getCompletionPercentage(user.id, moduleId, 
      modules.find(m => m.id === moduleId)?.sections || []);
  };
  
  const isModuleCompleted = (moduleId: string) => {
    if (!user) return false;
    const moduleProgress = progress.find(p => p.userId === user.id && p.moduleId === moduleId);
    return moduleProgress?.completed || false;
  };
  
  const getCompletedModulesCount = () => {
    if (!user || !progress.length) return 0;
    return progress.filter(p => p.completed).length;
  };
  
  const getInProgressModulesCount = () => {
    if (!user || !progress.length) return 0;
    return progress.filter(p => !p.completed && p.completedSections.length > 0).length;
  };
  
  const getAverageScore = () => {
    if (!user || !progress.length) return 0;
    
    const quizResults = progress.flatMap(p => p.quizResults || []);
    if (quizResults.length === 0) return 0;
    
    const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / quizResults.length);
  };
  
  // Get unique categories from modules
  const categories = ['all', ...new Set(modules.map(module => module.category.toLowerCase()))];
  
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
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.subGreeting}>Continue your learning journey</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={colors.light.subtext} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search modules..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.light.subtext}
            />
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.light.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard
            title="Completed"
            value={getCompletedModulesCount()}
            icon={<Award size={24} color={colors.success} />}
            color={colors.success}
            suffix="modules"
          />
          
          <StatCard
            title="In Progress"
            value={getInProgressModulesCount()}
            icon={<BookOpen size={24} color={colors.primary} />}
            color={colors.primary}
            suffix="modules"
          />
          
          <StatCard
            title="Avg. Score"
            value={getAverageScore()}
            icon={<Clock size={24} color={colors.secondary} />}
            color={colors.secondary}
            suffix="%"
          />
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                activeFilter === category && styles.activeFilterChip,
              ]}
              onPress={() => handleFilterChange(category)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === category && styles.activeFilterChipText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.modulesContainer}>
          <Text style={styles.sectionTitle}>Training Modules</Text>
          
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                completed={isModuleCompleted(module.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No modules found</Text>
            </View>
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.light.subtext,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    color: colors.light.text,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.light.input,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.light.input,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    color: colors.light.subtext,
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  modulesContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.input,
    borderRadius: 8,
  },
  emptyStateText: {
    color: colors.light.subtext,
    fontSize: 16,
  },
});