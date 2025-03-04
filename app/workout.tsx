import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function CurrentWorkout() {
  const { theme } = useTheme();
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [isActive, setIsActive] = useState(false);

  const progressStyle = useAnimatedStyle(() => ({
    width: withSpring((timeRemaining / 45) * 100 + '%', {
      damping: 12,
      stiffness: 100,
    }),
  }));

  useEffect(() => {
    let interval;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setIsActive(false);
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const toggleTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(!isActive);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.timerContainer}>
        <Text style={[styles.timerText, { color: theme.text }]}>
          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </Text>
        
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progress,
              progressStyle,
              { backgroundColor: theme.primary },
            ]}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  timerText: {
    fontSize: 72,
    fontFamily: 'SFPro-Bold',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progress: {
    height: '100%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SFPro-Medium',
  },
});