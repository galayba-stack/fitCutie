
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function YogaScreen() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState('15min');

  const durations = [
    { id: '10min', title: '10 min', icon: 'time-outline' },
    { id: '15min', title: '15 min', icon: 'time-outline' },
    { id: '30min', title: '30 min', icon: 'time-outline' },
    { id: '45min', title: '45 min', icon: 'time-outline' },
  ];

  const yogaSessions = {
    '10min': [
      { id: 1, name: 'Morning Stretch', poses: 8, focus: 'Energy & Flexibility' },
      { id: 2, name: 'Quick Relaxation', poses: 6, focus: 'Stress Relief' },
      { id: 3, name: 'Desk Break', poses: 5, focus: 'Posture & Relief' },
    ],
    '15min': [
      { id: 4, name: 'Sun Salutation', poses: 12, focus: 'Full Body Flow' },
      { id: 5, name: 'Hip Opener Flow', poses: 10, focus: 'Hip Flexibility' },
      { id: 6, name: 'Gentle Evening', poses: 9, focus: 'Relaxation' },
      { id: 7, name: 'Core Strength', poses: 8, focus: 'Core & Balance' },
    ],
    '30min': [
      { id: 8, name: 'Vinyasa Flow', poses: 20, focus: 'Strength & Flow' },
      { id: 9, name: 'Restorative Yoga', poses: 15, focus: 'Deep Relaxation' },
      { id: 10, name: 'Power Yoga', poses: 18, focus: 'Strength & Endurance' },
    ],
    '45min': [
      { id: 11, name: 'Complete Practice', poses: 25, focus: 'Full Body Workout' },
      { id: 12, name: 'Meditation Flow', poses: 20, focus: 'Mindfulness & Peace' },
    ],
  };

  const getFocusColor = (focus: string) => {
    if (focus.includes('Energy') || focus.includes('Strength')) return colors.primary;
    if (focus.includes('Relaxation') || focus.includes('Peace')) return colors.secondary;
    if (focus.includes('Flexibility') || focus.includes('Flow')) return colors.accent;
    return colors.teal;
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
          <Text style={[commonStyles.title, { fontSize: 24, margin: 0 }]}>Yoga</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Inspiration Quote */}
        <View style={[commonStyles.card, { backgroundColor: colors.secondary, marginBottom: 25 }]}>
          <Text style={[commonStyles.text, { fontSize: 16, fontStyle: 'italic', textAlign: 'center' }]}>
            "Yoga is not about touching your toes. It is about what you learn on the way down."
          </Text>
        </View>

        {/* Duration Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 25 }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {durations.map((duration) => (
            <TouchableOpacity
              key={duration.id}
              style={[
                {
                  backgroundColor: selectedDuration === duration.id ? colors.secondary : colors.backgroundAlt,
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
              onPress={() => setSelectedDuration(duration.id)}
            >
              <Icon 
                name={duration.icon as any} 
                size={18} 
                color={colors.text}
                style={{ marginRight: 8 }}
              />
              <Text style={[commonStyles.buttonText, { fontSize: 14 }]}>
                {duration.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Yoga Sessions List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {yogaSessions[selectedDuration as keyof typeof yogaSessions].map((session) => (
            <TouchableOpacity
              key={session.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/yoga-session?id=${session.id}&name=${session.name}`)}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 5 }]}>
                    {session.name}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 14, opacity: 0.7, marginBottom: 8 }]}>
                    {session.poses} poses • {selectedDuration.replace('min', ' minutes')}
                  </Text>
                  <View style={{
                    backgroundColor: getFocusColor(session.focus),
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    alignSelf: 'flex-start',
                  }}>
                    <Text style={[commonStyles.text, { fontSize: 12, fontWeight: '600' }]}>
                      {session.focus}
                    </Text>
                  </View>
                </View>
                <View style={commonStyles.centerContent}>
                  <Icon name="leaf" size={32} color={colors.secondary} style={{ marginBottom: 5 }} />
                  <Icon name="chevron-forward" size={20} color={colors.textLight} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
