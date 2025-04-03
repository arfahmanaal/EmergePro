import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Award
} from 'lucide-react-native';
import { modules } from '@/mocks/modules';
import { quizzes } from '@/mocks/quizzes';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { useCertificateStore } from '@/store/certificate-store';
import { QuizQuestion } from '@/components/QuizQuestion';
import { Button } from '@/components/Button';
import colors from '@/constants/colors';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { markSectionCompleted, saveQuizResult } = useProgressStore();
  const { generateCertificate } = useCertificateStore();
  
  const [section, setSection] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Find the section and its parent module
    for (const mod of modules) {
      const sec = mod.sections.find(s => s.id === id);
      if (sec) {
        setSection(sec);
        setModule(mod);
        
        // Find the quiz
        const quizData = quizzes.find(q => q.id === sec.content);
        if (quizData) {
          setQuiz(quizData);
        }
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
  
  if (!section || !module || !quiz) {
    return null;
  }
  
  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const calculateResults = () => {
    let correctCount = 0;
    
    quiz.questions.forEach(question => {
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(option => option.id === selectedOptionId);
        if (selectedOption && selectedOption.isCorrect) {
          correctCount++;
        }
      }
    });
    
    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    const hasPassed = calculatedScore >= quiz.passingScore;
    
    setScore(calculatedScore);
    setPassed(hasPassed);
    setShowResults(true);
  };
  
  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Mark section as completed
      await markSectionCompleted(user.id, module.id, section.id);
      
      // Save quiz result
      await saveQuizResult(user.id, module.id, quiz.id, score, passed);
      
      // Generate certificate if passed
      if (passed) {
        try {
          const certificate = await generateCertificate(
            user.id,
            module.id,
            module.title,
            score
          );
          
          // Show success message
          Alert.alert(
            'Congratulations!',
            'You have earned a certificate for completing this module.',
            [
              {
                text: 'View Certificate',
                onPress: () => router.push(`/certificate/${certificate.id}`),
              },
              {
                text: 'Continue',
                onPress: () => router.push(`/module/${module.id}`),
                style: 'cancel',
              },
            ]
          );
        } catch (error) {
          console.error('Error generating certificate:', error);
          router.push(`/module/${module.id}`);
        }
      } else {
        // Show failure message
        Alert.alert(
          'Quiz Failed',
          `You scored ${score}%. The passing score is ${quiz.passingScore}%. Please try again.`,
          [
            {
              text: 'OK',
              onPress: () => router.push(`/module/${module.id}`),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error completing quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderResultSummary = () => {
    return (
      <View style={styles.resultSummary}>
        <View style={[
          styles.resultIconContainer,
          passed ? styles.passedIconContainer : styles.failedIconContainer
        ]}>
          {passed ? (
            <CheckCircle size={48} color={colors.success} />
          ) : (
            <XCircle size={48} color={colors.danger} />
          )}
        </View>
        
        <Text style={styles.resultTitle}>
          {passed ? 'Quiz Passed!' : 'Quiz Failed'}
        </Text>
        
        <Text style={styles.resultScore}>
          Your Score: <Text style={passed ? styles.passedScore : styles.failedScore}>{score}%</Text>
        </Text>
        
        <Text style={styles.passingScore}>
          Passing Score: {quiz.passingScore}%
        </Text>
        
        {passed ? (
          <View style={styles.certificateInfo}>
            <Award size={20} color={colors.secondary} />
            <Text style={styles.certificateText}>
              You have earned a certificate!
            </Text>
          </View>
        ) : (
          <View style={styles.retryInfo}>
            <AlertCircle size={20} color={colors.danger} />
            <Text style={styles.retryText}>
              You can retry the quiz to improve your score.
            </Text>
          </View>
        )}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Stack.Screen
        options={{
          title: quiz.title,
        }}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {showResults ? (
          <>
            {renderResultSummary()}
            
            <View style={styles.questionsReview}>
              <Text style={styles.reviewTitle}>Questions Review</Text>
              
              {quiz.questions.map((question, index) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  index={index}
                  onAnswer={() => {}}
                  showResults={true}
                  selectedOptionId={answers[question.id]}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` },
                  ]}
                />
              </View>
            </View>
            
            <QuizQuestion
              question={quiz.questions[currentQuestion]}
              index={currentQuestion}
              onAnswer={(optionId) => handleAnswer(quiz.questions[currentQuestion].id, optionId)}
              selectedOptionId={answers[quiz.questions[currentQuestion].id]}
            />
            
            <View style={styles.navigationContainer}>
              <Button
                title="Previous"
                onPress={handlePrevious}
                variant="outline"
                disabled={currentQuestion === 0}
                style={[styles.navigationButton, { opacity: currentQuestion === 0 ? 0.5 : 1 }]}
              />
              
              <Button
                title={currentQuestion === quiz.questions.length - 1 ? "Finish" : "Next"}
                onPress={handleNext}
                variant="primary"
                disabled={!answers[quiz.questions[currentQuestion].id]}
                style={[
                  styles.navigationButton,
                  { opacity: !answers[quiz.questions[currentQuestion].id] ? 0.5 : 1 },
                ]}
              />
            </View>
          </>
        )}
      </ScrollView>
      
      {showResults && (
        <View style={styles.footer}>
          <Button
            title="Complete Quiz"
            onPress={handleComplete}
            variant="primary"
            isLoading={isLoading}
            fullWidth
          />
        </View>
      )}
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
    paddingBottom: showResults => showResults ? 80 : 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: colors.light.subtext,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.light.input,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navigationButton: {
    width: '48%',
  },
  resultSummary: {
    backgroundColor: colors.light.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  passedIconContainer: {
    backgroundColor: colors.success + '20',
  },
  failedIconContainer: {
    backgroundColor: colors.danger + '20',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 18,
    color: colors.light.text,
    marginBottom: 4,
  },
  passedScore: {
    color: colors.success,
    fontWeight: '700',
  },
  failedScore: {
    color: colors.danger,
    fontWeight: '700',
  },
  passingScore: {
    fontSize: 16,
    color: colors.light.subtext,
    marginBottom: 16,
  },
  certificateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  certificateText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
    marginLeft: 8,
  },
  retryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: '500',
    marginLeft: 8,
  },
  questionsReview: {
    marginBottom: 24,
  },
  reviewTitle: {
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