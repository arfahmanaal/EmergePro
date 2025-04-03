import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { Question } from '@/types';
import colors from '@/constants/colors';

interface QuizQuestionProps {
  question: Question;
  index: number;
  onAnswer: (optionId: string) => void;
  showResults?: boolean;
  selectedOptionId?: string;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  index,
  onAnswer,
  showResults = false,
  selectedOptionId,
}) => {
  const handleOptionPress = (optionId: string) => {
    if (!showResults && !selectedOptionId) {
      onAnswer(optionId);
    }
  };
  
  const isOptionSelected = (optionId: string) => {
    return selectedOptionId === optionId;
  };
  
  const isCorrectOption = (optionId: string) => {
    return question.options.find(option => option.id === optionId)?.isCorrect;
  };
  
  const getOptionStyle = (optionId: string) => {
    if (!showResults) {
      return isOptionSelected(optionId) ? styles.selectedOption : styles.option;
    }
    
    if (isCorrectOption(optionId)) {
      return styles.correctOption;
    }
    
    if (isOptionSelected(optionId) && !isCorrectOption(optionId)) {
      return styles.incorrectOption;
    }
    
    return styles.option;
  };
  
  const getOptionTextStyle = (optionId: string) => {
    if (!showResults) {
      return isOptionSelected(optionId) ? styles.selectedOptionText : styles.optionText;
    }
    
    if (isCorrectOption(optionId)) {
      return styles.correctOptionText;
    }
    
    if (isOptionSelected(optionId) && !isCorrectOption(optionId)) {
      return styles.incorrectOptionText;
    }
    
    return styles.optionText;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question {index + 1}</Text>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={getOptionStyle(option.id)}
            onPress={() => handleOptionPress(option.id)}
            disabled={showResults || !!selectedOptionId}
            activeOpacity={0.8}
          >
            <Text style={getOptionTextStyle(option.id)}>{option.text}</Text>
            
            {showResults && isCorrectOption(option.id) && (
              <View style={styles.resultIcon}>
                <Check size={16} color={colors.success} />
              </View>
            )}
            
            {showResults && isOptionSelected(option.id) && !isCorrectOption(option.id) && (
              <View style={styles.resultIcon}>
                <X size={16} color={colors.danger} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {showResults && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.light.text,
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 8,
  },
  option: {
    backgroundColor: colors.light.input,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  correctOption: {
    backgroundColor: colors.success + '20',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.success,
  },
  incorrectOption: {
    backgroundColor: colors.danger + '20',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  optionText: {
    fontSize: 16,
    color: colors.light.text,
    flex: 1,
  },
  selectedOptionText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    flex: 1,
  },
  correctOptionText: {
    fontSize: 16,
    color: colors.success,
    fontWeight: '500',
    flex: 1,
  },
  incorrectOptionText: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: '500',
    flex: 1,
  },
  resultIcon: {
    marginLeft: 8,
  },
  explanationContainer: {
    backgroundColor: colors.light.input,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: colors.light.subtext,
  },
});