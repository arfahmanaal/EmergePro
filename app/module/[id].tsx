import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight,
  Share2
} from 'lucide-react-native';
import { modules } from '@/mocks/modules';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { SectionCard } from '@/components/SectionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/Button';
import colors from '@/constants/colors';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { progress, getModuleProgress, getCompletionPercentage } = useProgressStore();
  
  const [module, setModule] = useState(modules.find(m => m.id === id));
  
  useEffect(() => {
    if (!module) {
      // Module not found, go back
      router.back();
    }
  }, [module]);
  
  if (!module) {
    return null;
  }
  
  const moduleProgress = user ? getModuleProgress(user.id, module.id) : undefined;
  const completionPercentage = user
    ? getCompletionPercentage(user.id, module.id, module.sections)
    : 0;
  
  const isSectionCompleted = (sectionId: string) => {
    return moduleProgress?.completedSections.includes(sectionId) || false;
  };
  
  const isSectionLocked = (index: number) => {
    if (index === 0) return false;
    
    // Check if previous section is completed
    const prevSectionId = module.sections[index - 1].id;
    return !isSectionCompleted(prevSectionId);
  };
  
  const handleSectionPress = (sectionId: string, type: string) => {
    if (type === 'quiz') {
      router.push(`/quiz/${sectionId}`);
    } else {
      router.push(`/section/${sectionId}`);
    }
  };
  
  const getDifficultyColor = () => {
    switch (module.difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.danger;
      default:
        return colors.info;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Stack.Screen
        options={{
          title: module.title,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Share2 size={20} color={colors.light.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: module.thumbnail }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{module.title}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Clock size={16} color={colors.light.subtext} />
                <Text style={styles.metaText}>{module.duration} min</Text>
              </View>
              
              <View style={styles.metaItem}>
                <BookOpen size={16} color={colors.light.subtext} />
                <Text style={styles.metaText}>{module.sections.length} sections</Text>
              </View>
              
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
                <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                  {module.difficulty}
                </Text>
              </View>
            </View>
            
            <Text style={styles.description}>{module.description}</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Your Progress</Text>
                <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
              </View>
              <ProgressBar progress={completionPercentage} />
            </View>
          </View>
          
          <View style={styles.sectionsContainer}>
            <Text style={styles.sectionTitle}>Module Content</Text>
            
            {module.sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                onPress={() => handleSectionPress(section.id, section.type)}
                completed={isSectionCompleted(section.id)}
                locked={isSectionLocked(index)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={completionPercentage === 100 ? "Completed" : "Continue Learning"}
          onPress={() => {
            // Find the first uncompleted section
            const firstUncompletedSection = module.sections.find(
              section => !isSectionCompleted(section.id)
            );
            
            if (firstUncompletedSection) {
              handleSectionPress(firstUncompletedSection.id, firstUncompletedSection.type);
            } else if (module.sections.length > 0) {
              // If all completed, go to the first section
              handleSectionPress(module.sections[0].id, module.sections[0].type);
            }
          }}
          variant={completionPercentage === 100 ? "secondary" : "primary"}
          fullWidth
          disabled={completionPercentage === 100}
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
  scrollContent: {
    paddingBottom: 80,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: colors.light.subtext,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: colors.light.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  progressContainer: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.light.background,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    padding: 16,
  },
});