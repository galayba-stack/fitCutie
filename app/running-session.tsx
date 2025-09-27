
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from '../components/Icon';

export default function RunningSessionScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
        setDistance(distance => distance + 0.001); // Simulate distance tracking
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (km: number) => {
    return (km).toFixed(2);
  };

  const calculatePace = () => {
    if (distance === 0) return '0:00';
    const paceInSeconds = timer / distance;
    const mins = Math.floor(paceInSeconds / 60);
    const secs = Math.floor(paceInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRun = () => {
    setIsRunning(true);
    setIsPaused(false);
    console.log('Run started:', name);
  };

  const handlePauseRun = () => {
    setIsPaused(!isPaused);
    console.log('Run paused:', isPaused);
  };

  const handleStopRun = () => {
    setIsRunning(false);
    setIsPaused(false);
    console.log('Run completed! Time:', formatTime(timer), 'Distance:', formatDistance(distance));
  };

  const runningTips = [
    "Start with a 5-minute warm-up walk",
    "Maintain a conversational pace",
    "Land on your midfoot, not your heel",
    "Keep your arms relaxed at your sides",
    "Breathe naturally and rhythmically",
    "Cool down with a 5-minute walk"
  ];

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
          <View style={[commonStyles.card, { backgroundColor: colors.accent, marginBottom: 20 }]}>
            <View style={[commonStyles.centerContent, { paddingVertical: 20 }]}>
              <Icon name="walk" size={60} color={colors.text} style={{ marginBottom: 15 }} />
              <Text style={[commonStyles.title, { fontSize: 28, marginBottom: 10 }]}>
                {name}
              </Text>
              <Text style={[commonStyles.text, { fontSize: 16, opacity: 0.8 }]}>
                Target: 20 minutes
              </Text>
            </View>
          </View>

          {/* Running Stats */}
          {isRunning && (
            <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: colors.success }]}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 20 }]}>
                {isPaused ? 'Paused' : 'Running'}
              </Text>
              
              <View style={[commonStyles.row, { marginBottom: 20 }]}>
                <View style={[commonStyles.centerContent, { flex: 1 }]}>
                  <Text style={[commonStyles.text, { fontSize: 32, fontWeight: '700', color: colors.primary }]}>
                    {formatTime(timer)}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                    Time
                  </Text>
                </View>
                <View style={[commonStyles.centerContent, { flex: 1 }]}>
                  <Text style={[commonStyles.text, { fontSize: 32, fontWeight: '700', color: colors.secondary }]}>
                    {formatDistance(distance)}
                  </Text>
                  <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                    KM
                  </Text>
                </View>
              </View>

              <View style={[commonStyles.centerContent, { marginBottom: 20 }]}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.accent }]}>
                  {calculatePace()}
                </Text>
                <Text style={[commonStyles.text, { fontSize: 12, opacity: 0.7 }]}>
                  Pace (min/km)
                </Text>
              </View>

              <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                <TouchableOpacity 
                  style={[buttonStyles.secondary, { flex: 1, marginRight: 10 }]}
                  onPress={handlePauseRun}
                >
                  <Text style={[commonStyles.buttonText]}>
                    {isPaused ? 'Resume' : 'Pause'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[buttonStyles.primary, { flex: 1, marginLeft: 10 }]}
                  onPress={handleStopRun}
                >
                  <Text style={[commonStyles.buttonText]}>
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Running Tips */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 15 }]}>
              Running Tips
            </Text>
            {runningTips.map((tip, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Icon name="checkmark-circle" size={16} color={colors.success} style={{ marginRight: 10, marginTop: 2 }} />
                <Text style={[commonStyles.text, { flex: 1 }]}>
                  {tip}
                </Text>
              </View>
            ))}
          </View>

          {/* Safety Note */}
          <View style={[commonStyles.card, { marginBottom: 30, backgroundColor: colors.warning }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Icon name="warning" size={20} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '600' }]}>
                Safety First
              </Text>
            </View>
            <Text style={[commonStyles.text]}>
              Stay hydrated, listen to your body, and stop if you feel any pain or discomfort. 
              Always run in well-lit, safe areas and let someone know your route.
            </Text>
          </View>

          {/* Start Button */}
          {!isRunning && (
            <TouchableOpacity 
              style={[buttonStyles.accent, { marginBottom: 30 }]}
              onPress={handleStartRun}
            >
              <Text style={[commonStyles.buttonText, { fontSize: 18 }]}>
                Start Running
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
