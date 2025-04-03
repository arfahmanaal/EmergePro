import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Clock, BookOpen, Award } from 'lucide-react-native';
import { Module } from '@/types';
import colors from '@/constants/colors';
import { ProgressBar } from './ProgressBar';

interface ModuleCardProps {
  module: Module;
  progress?: number;
  completed?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  progress = 0,
  completed = false
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/module/${module.id}`);
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
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: module.thumbnail }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{module.title}</Text>
          {module.required && (
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>Required</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {module.description}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={colors.light.subtext} />
            <Text style={styles.metaText}>{module.duration} min</Text>
          </View>
          
          <View style={styles.metaItem}>
            <BookOpen size={14} color={colors.light.subtext} />
            <Text style={styles.metaText}>{module.sections.length} sections</Text>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
              {module.difficulty}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{progress}% Complete</Text>
            {completed && (
              <View style={styles.completedContainer}>
                <Award size={14} color={colors.success} />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            )}
          </View>
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
    width: '100%',
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  requiredBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  requiredText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.light.subtext,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: colors.light.subtext,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.light.subtext,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
    marginLeft: 4,
  },
});