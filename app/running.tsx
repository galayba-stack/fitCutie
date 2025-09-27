
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function RunningScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('beginner');

  const runningTypes = [
    { id: 'beginner', title: 'Beginner', icon: 'walk-outline' },
    { id: 'intermediate', title: 'Intermediate', icon: 'fitness-outline' },
    { id: 'advanced', title: 'Advanced', icon: 'flash-outline' },
  ];

  const runningPlans = {
    beginner: [
      { id: 1, name: 'Couch to 5K - Week 1', duration: '20 min', description: 'Walk 90s, Run 60s × 8' },
      { id: 2, name: 'Easy Jog', duration: '15 min', description: 'Comfortable pace jog' },
      { id: 3, name: 'Walk & Run Intervals', duration: '25 min', description: 'Alternate walking and light jogging' },
    ],
    intermediate: [
      { id: 4, name: '5K Training Run', duration: '30 min', description: 'Steady pace 5K distance' },
      { id: 5, name: 'Tempo Run', duration: '25 min', description: 'Comfortably hard pace' },
      { id: 6, name: 'Hill Training', duration: '35 min', description: 'Hill repeats for strength' },
      { id: 7, name: 'Long Slow Distance', duration: '45 min', description: 'Easy conversational pace' },
    ],
    advanced: [
      { id: 8, name: '10K Race Pace', duration: '40 min', description: 'Target race pace training' },
      { id: 9, name: 'Speed Intervals', duration: '35 min', description: '400m repeats at 5K pace' },
      { id: 10, name: 'Marathon Pace', duration: '60 min', description: 'Sustained marathon effort' },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.warning;
      case 'advanced': return colors.primary;
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
          <Text style={[commonStyles.title, { fontSize: 24, margin: 0 }]}>Running</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Stats Cards */}
        <View style={[commonStyles.row, { marginBottom: 25 }]}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 10, alignItems: 'center' }]}>
            <Icon name="timer-outline" size={24} color={colors.accent} style={{ marginBottom: 5 }} />
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.accent }]}>
              0:00
            </Text>
            <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
              Best Time
            </Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 10, alignItems: 'center' }]}>
            <Icon name="location-outline" size={24} color={colors.primary} style={{ marginBottom: 5 }} />
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.primary }]}>
              0.0
            </Text>
            <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
              Total KM
            </Text>
          </View>
        </View>

        {/* Level Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 25 }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {runningTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                {
                  backgroundColor: selectedType === type.id ? colors.accent : colors.backgroundAlt,
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
              onPress={() => setSelectedType(type.id)}
            >
              <Icon 
                name={type.icon as any} 
                size={18} 
                color={colors.text}
                style={{ marginRight: 8 }}
              />
              <Text style={[commonStyles.buttonText, { fontSize: 14 }]}>
                {type.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Running Plans List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {runningPlans[selectedType as keyof typeof runningPlans].map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/running-session?id=${plan.id}&name=${plan.name}`)}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 5 }]}>
                    {plan.name}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 14, opacity: 0.7, marginBottom: 8 }]}>
                    {plan.duration} • {plan.description}
                  </Text>
                  <View style={{
                    backgroundColor: getTypeColor(selectedType),
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    alignSelf: 'flex-start',
                  }}>
                    <Text style={[commonStyles.text, { fontSize: 12, fontWeight: '600' }]}>
                      {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={commonStyles.centerContent}>
                  <Icon name="walk" size={32} color={colors.accent} style={{ marginBottom: 5 }} />
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
