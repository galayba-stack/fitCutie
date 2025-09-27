
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from '../components/Icon';

export default function YogaSessionScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [isStarted, setIsStarted] = useState(false);
  const [currentPose, setCurrentPose] = useState(1);

  const yogaPoses = [
    { name: "Mountain Pose", duration: "30 seconds", description: "Stand tall with feet together, arms at sides" },
    { name: "Forward Fold", duration: "45 seconds", description: "Hinge at hips, let arms hang toward floor" },
    { name: "Downward Dog", duration: "60 seconds", description: "Hands and feet on ground, hips up high" },
    { name: "Warrior I", duration: "45 seconds each side", description: "Step back, arms up, front knee bent" },
    { name: "Tree Pose", duration: "30 seconds each side", description: "Balance on one foot, other foot on inner thigh" },
    { name: "Child's Pose", duration: "60 seconds", description: "Kneel, sit back on heels, arms forward" },
  ];

  const handleStartSession = () => {
    setIsStarted(true);
    console.log('Yoga session started:', name);
  };

  const handleNextPose = () => {
    if (currentPose < yogaPoses.length) {
      setCurrentPose(currentPose + 1);
      console.log('Next pose:', currentPose + 1);
    } else {
      setIsStarted(false);
      setCurrentPose(1);
      console.log('Yoga session completed!');
    }
  };

  const handlePreviousPose = () => {
    if (currentPose > 1) {
      setCurrentPose(currentPose - 1);
      console.log('Previous pose:', currentPose - 1);
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
          {/* Session Info */}
          <View style={[commonStyles.card, { backgroundColor: colors.secondary, marginBottom: 20 }]}>
            <View style={[commonStyles.centerContent, { paddingVertical: 20 }]}>
              <Icon name="leaf" size={60} color={colors.text} style={{ marginBottom: 15 }} />
              <Text style={[commonStyles.title, { fontSize: 28, marginBottom: 10 }]}>
                {name}
              </Text>
              <Text style={[commonStyles.text, { fontSize: 16, opacity: 0.8 }]}>
                {yogaPoses.length} poses • 15 minutes
              </Text>
            </View>
          </View>

          {/* Current Progress */}
          {isStarted && (
            <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: colors.teal }]}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 15 }]}>
                Pose {currentPose} of {yogaPoses.length}
              </Text>
              
              <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginBottom: 15 }]}>
                <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 8 }]}>
                  {yogaPoses[currentPose - 1].name}
                </Text>
                <Text style={[commonStyles.text, { fontSize: 14, textAlign: 'center', marginBottom: 10, opacity: 0.8 }]}>
                  Hold for {yogaPoses[currentPose - 1].duration}
                </Text>
                <Text style={[commonStyles.text, { textAlign: 'center' }]}>
                  {yogaPoses[currentPose - 1].description}
                </Text>
              </View>

              <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                <TouchableOpacity 
                  style={[buttonStyles.secondary, { flex: 1, marginRight: 10, opacity: currentPose === 1 ? 0.5 : 1 }]}
                  onPress={handlePreviousPose}
                  disabled={currentPose === 1}
                >
                  <Text style={[commonStyles.buttonText]}>
                    Previous
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[buttonStyles.primary, { flex: 1, marginLeft: 10 }]}
                  onPress={handleNextPose}
                >
                  <Text style={[commonStyles.buttonText]}>
                    {currentPose === yogaPoses.length ? 'Complete' : 'Next Pose'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Pose Sequence */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Pose Sequence
            </Text>
            {yogaPoses.map((pose, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15,
                backgroundColor: isStarted && currentPose === index + 1 ? colors.accent : colors.backgroundAlt,
                borderRadius: 12,
                marginBottom: 8,
              }}>
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: colors.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                }}>
                  <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600' }]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '600', marginBottom: 2 }]}>
                    {pose.name}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                    {pose.duration}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Benefits */}
          <View style={[commonStyles.card, { marginBottom: 30 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Session Benefits
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Icon name="heart" size={16} color={colors.primary} style={{ marginRight: 10, marginTop: 2 }} />
              <Text style={[commonStyles.text, { flex: 1 }]}>
                Improves flexibility and balance
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Icon name="leaf" size={16} color={colors.secondary} style={{ marginRight: 10, marginTop: 2 }} />
              <Text style={[commonStyles.text, { flex: 1 }]}>
                Reduces stress and anxiety
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Icon name="body" size={16} color={colors.accent} style={{ marginRight: 10, marginTop: 2 }} />
              <Text style={[commonStyles.text, { flex: 1 }]}>
                Strengthens core muscles
              </Text>
            </View>
          </View>

          {/* Start Button */}
          {!isStarted && (
            <TouchableOpacity 
              style={[buttonStyles.secondary, { marginBottom: 30 }]}
              onPress={handleStartSession}
            >
              <Text style={[commonStyles.buttonText, { fontSize: 18 }]}>
                Begin Session
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
