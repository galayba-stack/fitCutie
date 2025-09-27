
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const router = useRouter();

  const activities = [
    {
      id: 'exercises',
      title: 'Exercises',
      subtitle: 'Strength & Cardio',
      icon: 'fitness-outline',
      color: colors.primary,
      route: '/exercises',
    },
    {
      id: 'yoga',
      title: 'Yoga',
      subtitle: 'Mindfulness & Flexibility',
      icon: 'leaf-outline',
      color: colors.secondary,
      route: '/yoga',
    },
    {
      id: 'running',
      title: 'Running',
      subtitle: 'Endurance & Speed',
      icon: 'walk-outline',
      color: colors.accent,
      route: '/running',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.centerContent, { marginTop: 20, marginBottom: 40 }]}>
          <Text style={commonStyles.title}>FitCute</Text>
          <Text style={commonStyles.subtitle}>Your adorable fitness companion</Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[commonStyles.activityCard, { backgroundColor: activity.color }]}
              onPress={() => router.push(activity.route)}
              activeOpacity={0.8}
            >
              <Icon 
                name={activity.icon as any} 
                size={60} 
                color={colors.text}
                style={{ marginBottom: 15 }}
              />
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 5 }]}>
                {activity.title}
              </Text>
              <Text style={[commonStyles.text, { textAlign: 'center', opacity: 0.8 }]}>
                {activity.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { marginBottom: 30 }]}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 10 }]}>
            Today's Progress
          </Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
                0
              </Text>
              <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                Workouts
              </Text>
            </View>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.secondary }]}>
                0
              </Text>
              <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                Minutes
              </Text>
            </View>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.accent }]}>
                0
              </Text>
              <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                Calories
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
