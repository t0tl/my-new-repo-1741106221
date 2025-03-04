import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesome5 } from '@expo/vector-icons';

interface WorkoutCardProps {
  title: string;
  duration: string;
  exercises: string[];
}

export default function WorkoutCard({ title, duration, exercises }: WorkoutCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.durationContainer}>
          <FontAwesome5 name="clock" size={14} color={theme.text} />
          <Text style={[styles.duration, { color: theme.text }]}>{duration}</Text>
        </View>
      </View>

      <View style={styles.exerciseList}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <FontAwesome5 name="circle" size={8} color={theme.primary} />
            <Text style={[styles.exerciseText, { color: theme.text }]}>{exercise}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.startButton, { backgroundColor: theme.primary }]}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SFPro-Bold',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'SFPro-Medium',
  },
  exerciseList: {
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'SFPro-Regular',
  },
  startButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SFPro-Medium',
  },
});