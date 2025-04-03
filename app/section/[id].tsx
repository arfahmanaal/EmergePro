import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  Gamepad2, 
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react-native';
import { modules } from '@/mocks/modules';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { Button } from '@/components/Button';
import { WebView } from '@/components/WebView';
import colors from '@/constants/colors';

export default function SectionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { markSectionCompleted } = useProgressStore();
  
  const [section, setSection] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [sectionIndex, setSectionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Find the section and its parent module
    for (const mod of modules) {
      const idx = mod.sections.findIndex(s => s.id === id);
      if (idx !== -1) {
        setSection(mod.sections[idx]);
        setModule(mod);
        setSectionIndex(idx);
        break;
      }
    }
  }, [id]);
  
  useEffect(() => {
    if (!section && !isLoading) {
      // Section not found, go back
      router.back();
    }
  }, [section, isLoading]);
  
  if (!section || !module) {
    return null;
  }
  
  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      await markSectionCompleted(user.id, module.id, section.id);
      
      // Navigate to next section or back to module
      if (sectionIndex < module.sections.length - 1) {
        const nextSection = module.sections[sectionIndex + 1];
        if (nextSection.type === 'quiz') {
          router.push(`/quiz/${nextSection.id}`);
        } else {
          router.push(`/section/${nextSection.id}`);
        }
      } else {
        router.push(`/module/${module.id}`);
      }
    } catch (error) {
      console.error('Error marking section as completed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrevious = () => {
    if (sectionIndex > 0) {
      const prevSection = module.sections[sectionIndex - 1];
      if (prevSection.type === 'quiz') {
        router.push(`/quiz/${prevSection.id}`);
      } else {
        router.push(`/section/${prevSection.id}`);
      }
    } else {
      router.push(`/module/${module.id}`);
    }
  };
  
  const getSectionIcon = () => {
    switch (section.type) {
      case 'video':
        return <PlayCircle size={24} color={colors.primary} />;
      case 'reading':
        return <FileText size={24} color={colors.info} />;
      case 'simulation':
        return <Gamepad2 size={24} color={colors.secondary} />;
      default:
        return <FileText size={24} color={colors.info} />;
    }
  };
  
  const renderContent = () => {
    switch (section.type) {
      case 'video':
        if (section.content.includes('youtube.com') || section.content.includes('youtu.be')) {
          return (
            <View style={styles.videoContainer}>
              <View style={styles.videoWrapper}>
                <WebView
                  source={{ uri: section.content }}
                  style={styles.videoPlayer}
                />
              </View>
              <Text style={styles.videoCaption}>
                {section.title} - {module.title}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.videoContainer}>
              <View style={styles.videoPlaceholder}>
                <PlayCircle size={48} color="#FFFFFF" />
              </View>
              <Text style={styles.videoText}>
                Video content would be displayed here in a real application.
              </Text>
            </View>
          );
        }
      case 'reading':
        return (
          <View style={styles.readingContainer}>
            {section.content.startsWith('#') ? (
              <MarkdownRenderer content={section.content} />
            ) : (
              <Text style={styles.readingText}>
                {section.content}
              </Text>
            )}
          </View>
        );
      case 'simulation':
        if (section.content.includes('youtube.com') || section.content.includes('youtu.be')) {
          return (
            <View style={styles.simulationContainer}>
              <View style={styles.videoWrapper}>
                <WebView
                  source={{ uri: section.content }}
                  style={styles.videoPlayer}
                />
              </View>
              <Text style={styles.simulationCaption}>
                VR Simulation Preview: {section.title}
              </Text>
            </View>
          );
        } else if (section.content.includes('http')) {
          return (
            <View style={styles.simulationContainer}>
              <View style={styles.simulationWrapper}>
                <WebView
                  source={{ uri: section.content }}
                  style={styles.simulationFrame}
                />
              </View>
              <Text style={styles.simulationCaption}>
                Interactive Simulation: {section.title}
              </Text>
              <Text style={styles.simulationInstructions}>
                Complete this interactive simulation to practice your skills in a safe environment.
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.simulationContainer}>
              <View style={styles.simulationPlaceholder}>
                <Gamepad2 size={48} color="#FFFFFF" />
              </View>
              <Text style={styles.simulationText}>
                Interactive simulation would be displayed here in a real application.
              </Text>
            </View>
          );
        }
      default:
        return (
          <View style={styles.defaultContainer}>
            <Text style={styles.defaultText}>
              Content not available.
            </Text>
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Stack.Screen
        options={{
          title: section.title,
        }}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.sectionInfo}>
            {getSectionIcon()}
            <View style={styles.sectionMeta}>
              <Text style={styles.sectionType}>
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </Text>
              <Text style={styles.moduleName}>{module.title}</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>{section.title}</Text>
          
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>Duration: {section.duration} minutes</Text>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={handlePrevious}
        >
          <ChevronLeft size={24} color={colors.light.text} />
        </TouchableOpacity>
        
        <Button
          title="Mark as Completed"
          onPress={handleComplete}
          variant="primary"
          isLoading={isLoading}
          style={styles.completeButton}
          icon={<Check size={20} color="#FFFFFF" />}
        />
        
        {sectionIndex < module.sections.length - 1 && (
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => {
              const nextSection = module.sections[sectionIndex + 1];
              if (nextSection.type === 'quiz') {
                router.push(`/quiz/${nextSection.id}`);
              } else {
                router.push(`/section/${nextSection.id}`);
              }
            }}
          >
            <ChevronRight size={24} color={colors.light.text} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// Simple Markdown renderer for reading content
const MarkdownRenderer = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  
  return (
    <View>
      {lines.map((line, index) => {
        // Heading 1
        if (line.startsWith('# ')) {
          return (
            <Text key={index} style={styles.mdH1}>
              {line.substring(2)}
            </Text>
          );
        }
        // Heading 2
        else if (line.startsWith('## ')) {
          return (
            <Text key={index} style={styles.mdH2}>
              {line.substring(3)}
            </Text>
          );
        }
        // Heading 3
        else if (line.startsWith('### ')) {
          return (
            <Text key={index} style={styles.mdH3}>
              {line.substring(4)}
            </Text>
          );
        }
        // List item
        else if (line.startsWith('- ')) {
          return (
            <View key={index} style={styles.mdListItem}>
              <Text style={styles.mdListBullet}>•</Text>
              <Text style={styles.mdListText}>{line.substring(2)}</Text>
            </View>
          );
        }
        // Numbered list item
        else if (/^\d+\.\s/.test(line)) {
          const number = line.match(/^\d+/)?.[0] || '';
          return (
            <View key={index} style={styles.mdListItem}>
              <Text style={styles.mdListNumber}>{number}.</Text>
              <Text style={styles.mdListText}>{line.substring(number.length + 2)}</Text>
            </View>
          );
        }
        // Empty line
        else if (line.trim() === '') {
          return <View key={index} style={styles.mdEmptyLine} />;
        }
        // Regular paragraph
        else {
          return (
            <Text key={index} style={styles.mdParagraph}>
              {line}
            </Text>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 24,
  },
  sectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionMeta: {
    marginLeft: 12,
  },
  sectionType: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  moduleName: {
    fontSize: 14,
    color: colors.light.subtext,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 8,
  },
  durationContainer: {
    backgroundColor: colors.light.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontSize: 14,
    color: colors.light.subtext,
  },
  contentContainer: {
    flex: 1,
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  videoWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  videoPlayer: {
    flex: 1,
  },
  videoCaption: {
    fontSize: 14,
    color: colors.light.subtext,
    textAlign: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  videoText: {
    fontSize: 16,
    color: colors.light.subtext,
    textAlign: 'center',
  },
  readingContainer: {
    marginBottom: 24,
  },
  readingText: {
    fontSize: 16,
    color: colors.light.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  simulationContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  simulationWrapper: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  simulationFrame: {
    flex: 1,
  },
  simulationCaption: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  simulationInstructions: {
    fontSize: 14,
    color: colors.light.subtext,
    textAlign: 'center',
  },
  simulationPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  simulationText: {
    fontSize: 16,
    color: colors.light.subtext,
    textAlign: 'center',
  },
  defaultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  defaultText: {
    fontSize: 16,
    color: colors.light.subtext,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.light.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    flex: 1,
    marginHorizontal: 12,
  },
  // Markdown styles
  mdH1: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 16,
    marginTop: 24,
  },
  mdH2: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 12,
    marginTop: 20,
  },
  mdH3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 10,
    marginTop: 16,
  },
  mdParagraph: {
    fontSize: 16,
    color: colors.light.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  mdListItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  mdListBullet: {
    fontSize: 16,
    color: colors.light.text,
    width: 16,
  },
  mdListNumber: {
    fontSize: 16,
    color: colors.light.text,
    width: 24,
  },
  mdListText: {
    fontSize: 16,
    color: colors.light.text,
    lineHeight: 24,
    flex: 1,
  },
  mdEmptyLine: {
    height: 12,
  },
});