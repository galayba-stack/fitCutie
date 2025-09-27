
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function ExercisesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('strength');

  const categories = [
    { id: 'strength', title: 'Strength', icon: 'barbell-outline' },
    { id: 'cardio', title: 'Cardio', icon: 'heart-outline' },
    { id: 'flexibility', title: 'Flexibility', icon: 'body-outline' },
  ];

  const exercises = {
    strength: [
      { id: 1, name: 'Push-ups', duration: '3 sets × 10 reps', difficulty: 'Beginner' },
      { id: 2, name: 'Squats', duration: '3 sets × 15 reps', difficulty: 'Beginner' },
      { id: 3, name: 'Planks', duration: '3 sets × 30 sec', difficulty: 'Intermediate' },
      { id: 4, name: 'Lunges', duration: '3 sets × 12 reps', difficulty: 'Beginner' },
    ],
    cardio: [
      { id: 5, name: 'Jumping Jacks', duration: '3 sets × 30 sec', difficulty: 'Beginner' },
      { id: 6, name: 'High Knees', duration: '3 sets × 20 sec', difficulty: 'Beginner' },
      { id: 7, name: 'Burpees', duration: '3 sets × 8 reps', difficulty: 'Advanced' },
      { id: 8, name: 'Mountain Climbers', duration: '3 sets × 15 reps', difficulty: 'Intermediate' },
    ],
    flexibility: [
      { id: 9, name: 'Cat-Cow Stretch', duration: '10 reps', difficulty: 'Beginner' },
      { id: 10, name: 'Child\'s Pose', duration: '30 sec hold', difficulty: 'Beginner' },
      { id: 11, name: 'Downward Dog', duration: '30 sec hold', difficulty: 'Beginner' },
      { id: 12, name: 'Pigeon Pose', duration: '45 sec each side', difficulty: 'Intermediate' },
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return colors.success;
      case 'Intermediate': return colors.warning;
      case 'Advanced': return colors.primary;
      default: return colors.textLight;
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
          <Text style={[commonStyles.title, { fontSize: 24, margin: 0 }]}>Exercises</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 25 }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                {
                  backgroundColor: selectedCategory === category.id ? colors.primary : colors.backgroundAlt,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  boxShadow: `0px 2px 8px ${colors.shadow}`,
                  elevation: 2,
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Icon 
                name={category.icon as any} 
                size={18} 
                color={colors.text}
                style={{ marginRight: 8 }}
              />
              <Text style={[commonStyles.buttonText, { fontSize: 14 }]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercise List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {exercises[selectedCategory as keyof typeof exercises].map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/exercise-detail?id=${exercise.id}&name=${exercise.name}`)}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 5 }]}>
                    {exercise.name}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 14, opacity: 0.7, marginBottom: 8 }]}>
                    {exercise.duration}
                  </Text>
                  <View style={{
                    backgroundColor: getDifficultyColor(exercise.difficulty),
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    alignSelf: 'flex-start',
                  }}>
                    <Text style={[commonStyles.text, { fontSize: 12, fontWeight: '600' }]}>
                      {exercise.difficulty}
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-forward" size={24} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
