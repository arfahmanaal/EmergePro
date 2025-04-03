import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  PlayCircle, 
  FileText, 
  Gamepad2, 
  CheckCircle, 
  ChevronRight,
  Clock
} from 'lucide-react-native';
import { ModuleSection } from '@/types';
import colors from '@/constants/colors';

interface SectionCardProps {
  section: ModuleSection;
  index: number;
  onPress: () => void;
  completed?: boolean;
  locked?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  index,
  onPress,
  completed = false,
  locked = false,
}) => {
  const getSectionIcon = () => {
    switch (section.type) {
      case 'video':
        return <PlayCircle size={20} color={colors.primary} />;
      case 'reading':
        return <FileText size={20} color={colors.info} />;
      case 'simulation':
        return <Gamepad2 size={20} color={colors.secondary} />;
      case 'quiz':
        return <CheckCircle size={20} color={colors.success} />;
      default:
        return <FileText size={20} color={colors.info} />;
    }
  };
  
  const getSectionTypeText = () => {
    switch (section.type) {
      case 'video':
        return 'Video';
      case 'reading':
        return 'Reading';
      case 'simulation':
        return 'Simulation';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Content';
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        completed && styles.completedContainer,
        locked && styles.lockedContainer,
      ]}
      onPress={onPress}
      disabled={locked}
      activeOpacity={0.8}
    >
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      
      <View style={styles.iconContainer}>
        {getSectionIcon()}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {section.title}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{getSectionTypeText()}</Text>
          </View>
          
          <View style={styles.durationContainer}>
            <Clock size={12} color={colors.light.subtext} />
            <Text style={styles.durationText}>{section.duration} min</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statusContainer}>
        {completed ? (
          <CheckCircle size={20} color={colors.success} />
        ) : (
          <ChevronRight size={20} color={colors.light.subtext} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  completedContainer: {
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  indexContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.light.input,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  indexText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.subtext,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.text,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeContainer: {
    marginRight: 12,
  },
  typeText: {
    fontSize: 12,
    color: colors.light.subtext,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: colors.light.subtext,
    marginLeft: 4,
  },
  statusContainer: {
    marginLeft: 8,
  },
});