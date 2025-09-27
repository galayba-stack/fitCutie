
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from '../components/Icon';

export default function ExerciseDetailScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [isStarted, setIsStarted] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(0);

  const exerciseDetails = {
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push back up to the starting position",
      "Keep your core engaged throughout the movement",
      "Maintain a straight line from head to heels"
    ],
    tips: [
      "Keep your elbows close to your body",
      "Don't let your hips sag or pike up",
      "Breathe out as you push up",
      "Start with knee push-ups if needed"
    ],
    muscles: ["Chest", "Shoulders", "Triceps", "Core"]
  };

  const handleStartExercise = () => {
    setIsStarted(true);
    console.log('Exercise started:', name);
  };

  const handleCompleteSet = () => {
    if (currentSet < 3) {
      setCurrentSet(currentSet + 1);
      console.log('Set completed:', currentSet);
    } else {
      setIsStarted(false);
      setCurrentSet(1);
      console.log('Exercise completed!');
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.content]}>
        {/* Header */}
        <View style={[commonStyles.row, { marginBottom: 30 }]}>
          <TouchableOpacity 
            style={commonStyles.headerButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { fontSize: 20, margin: 0, flex: 1, textAlign: 'center' }]}>
            {name}
          </Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Exercise Info */}
          <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 20 }]}>
            <View style={[commonStyles.centerContent, { paddingVertical: 20 }]}>
              <Icon name="fitness" size={60} color={colors.text} style={{ marginBottom: 15 }} />
              <Text style={[commonStyles.title, { fontSize: 28, marginBottom: 10 }]}>
                {name}
              </Text>
              <Text style={[commonStyles.text, { fontSize: 16, opacity: 0.8 }]}>
                3 sets × 10 reps
              </Text>
            </View>
          </View>

          {/* Current Progress */}
          {isStarted && (
            <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: colors.success }]}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 10 }]}>
                Current Set: {currentSet} / 3
              </Text>
              <View style={[commonStyles.row, { justifyContent: 'center' }]}>
                <TouchableOpacity 
                  style={[buttonStyles.primary, { backgroundColor: colors.text, marginHorizontal: 10 }]}
                  onPress={handleCompleteSet}
                >
                  <Text style={[commonStyles.buttonText, { color: colors.background }]}>
                    Complete Set {currentSet}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Instructions */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Instructions
            </Text>
            {exerciseDetails.instructions.map((instruction, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={[commonStyles.text, { marginRight: 10, fontWeight: '600' }]}>
                  {index + 1}.
                </Text>
                <Text style={[commonStyles.text, { flex: 1 }]}>
                  {instruction}
                </Text>
              </View>
            ))}
          </View>

          {/* Tips */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Pro Tips
            </Text>
            {exerciseDetails.tips.map((tip, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Icon name="checkmark-circle" size={16} color={colors.success} style={{ marginRight: 10, marginTop: 2 }} />
                <Text style={[commonStyles.text, { flex: 1 }]}>
                  {tip}
                </Text>
              </View>
            ))}
          </View>

          {/* Muscles Worked */}
          <View style={[commonStyles.card, { marginBottom: 30 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Muscles Worked
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {exerciseDetails.muscles.map((muscle, index) => (
                <View key={index} style={{
                  backgroundColor: colors.accent,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 15,
                  marginRight: 10,
                  marginBottom: 10,
                }}>
                  <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600' }]}>
                    {muscle}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Start Button */}
          {!isStarted && (
            <TouchableOpacity 
              style={[buttonStyles.primary, { marginBottom: 30 }]}
              onPress={handleStartExercise}
            >
              <Text style={[commonStyles.buttonText, { fontSize: 18 }]}>
                Start Exercise
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
