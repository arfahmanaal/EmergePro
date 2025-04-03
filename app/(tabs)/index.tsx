import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Search, Filter, BookOpen, Clock, Award, AlertTriangle, Bell, Shield, Flame } from 'lucide-react-native';
import { modules } from '@/mocks/modules';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { ModuleCard } from '@/components/ModuleCard';
import { StatCard } from '@/components/StatCard';
import colors from '@/constants/colors';
import { WebView } from '@/components/WebView';

export default function TabOneScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { progress, fetchUserProgress, getCompletionPercentage } = useProgressStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filteredModules, setFilteredModules] = useState(modules);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showARDemo, setShowARDemo] = useState(false);
  
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
  
  // Find safety modules
  const safetyModules = modules.filter(module => module.category.toLowerCase() === 'safety');
  
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

        {/* Safety Alert Banner */}
        <TouchableOpacity 
          style={styles.alertBanner}
          onPress={() => router.push('/module/5')}
        >
          <View style={styles.alertIconContainer}>
            <AlertTriangle size={24} color="#FFFFFF" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>New Safety Training Available</Text>
            <Text style={styles.alertDescription}>Complete the Fire Safety and Emergency Evacuation module</Text>
          </View>
        </TouchableOpacity>
        
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

        {/* Safety Spotlight Section */}
        <View style={styles.spotlightContainer}>
          <View style={styles.spotlightHeader}>
            <Shield size={20} color={colors.primary} />
            <Text style={styles.spotlightTitle}>Safety Spotlight</Text>
          </View>
          
          <View style={styles.spotlightContent}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80' }}
              style={styles.spotlightImage}
              contentFit="cover"
            />
            
            <View style={styles.spotlightTextContainer}>
              <Text style={styles.spotlightHeading}>Workplace Safety Statistics</Text>
              <Text style={styles.spotlightText}>
                • 2.3 million workers face work-related accidents annually
              </Text>
              <Text style={styles.spotlightText}>
                • 340 million occupational accidents occur globally each year
              </Text>
              <Text style={styles.spotlightText}>
                • Proper training can reduce workplace accidents by up to 70%
              </Text>
              
              <TouchableOpacity 
                style={styles.spotlightButton}
                onPress={() => router.push('/module/1')}
              >
                <Text style={styles.spotlightButtonText}>Learn Safety Fundamentals</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Featured Safety Module */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredHeader}>
            <Flame size={20} color={colors.secondary} />
            <Text style={styles.featuredTitle}>Featured Safety Training</Text>
          </View>
          
          {safetyModules.length > 0 && (
            <ModuleCard
              module={safetyModules[safetyModules.length - 1]}
              progress={getModuleProgress(safetyModules[safetyModules.length - 1].id)}
              completed={isModuleCompleted(safetyModules[safetyModules.length - 1].id)}
            />
          )}
        </View>

        {/* AR/VR Demo Section */}
        <View style={styles.arvrContainer}>
          <View style={styles.arvrHeader}>
            <Text style={styles.arvrTitle}>Interactive AR/VR Training</Text>
            <Text style={styles.arvrSubtitle}>Experience immersive safety training</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.arvrCard}
            onPress={() => setShowARDemo(!showARDemo)}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' }}
              style={styles.arvrImage}
              contentFit="cover"
            />
            <View style={styles.arvrOverlay}>
              <Text style={styles.arvrCardTitle}>Fire Extinguisher VR Training</Text>
              <Text style={styles.arvrCardDescription}>Learn proper fire extinguisher usage in virtual reality</Text>
            </View>
          </TouchableOpacity>
          
          {showARDemo && Platform.OS === 'web' && (
            <View style={styles.webViewContainer}>
              <WebView
                source={{ uri: 'https://storage.googleapis.com/arvr-fire-safety/index.html' }}
                style={styles.webView}
              />
              <Text style={styles.webViewNote}>
                Note: This is a web-based AR demo. For full VR experience, complete the Fire Safety module.
              </Text>
            </View>
          )}
          
          {showARDemo && Platform.OS !== 'web' && (
            <View style={styles.mobileARPlaceholder}>
              <Text style={styles.mobileARText}>
                AR/VR content is available in the web version or through the Fire Safety module.
              </Text>
            </View>
          )}
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
  alertBanner: {
    flexDirection: 'row',
    backgroundColor: colors.danger + '15',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: colors.light.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  spotlightContainer: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  spotlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  spotlightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginLeft: 8,
  },
  spotlightContent: {
    padding: 16,
  },
  spotlightImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  spotlightTextContainer: {
    padding: 8,
  },
  spotlightHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 12,
  },
  spotlightText: {
    fontSize: 14,
    color: colors.light.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  spotlightButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  spotlightButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredContainer: {
    marginBottom: 24,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginLeft: 8,
  },
  arvrContainer: {
    marginBottom: 24,
  },
  arvrHeader: {
    marginBottom: 16,
  },
  arvrTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 4,
  },
  arvrSubtitle: {
    fontSize: 14,
    color: colors.light.subtext,
  },
  arvrCard: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    position: 'relative',
    marginBottom: 16,
  },
  arvrImage: {
    width: '100%',
    height: '100%',
  },
  arvrOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  arvrCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  arvrCardDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  webViewContainer: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  webView: {
    flex: 1,
  },
  webViewNote: {
    fontSize: 12,
    color: colors.light.subtext,
    marginTop: 8,
    textAlign: 'center',
  },
  mobileARPlaceholder: {
    backgroundColor: colors.light.input,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileARText: {
    fontSize: 14,
    color: colors.light.subtext,
    textAlign: 'center',
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