import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

const exercises = [
  {
    id: '1',
    name: 'Squats',
    muscle: 'Legs',
    difficulty: 'Beginner',
    animation: 'squat',
  },
  {
    id: '2',
    name: 'Push-ups',
    muscle: 'Chest',
    difficulty: 'Intermediate',
    animation: 'pushup',
  },
  {
    id: '3',
    name: 'Deadlifts',
    muscle: 'Back',
    difficulty: 'Advanced',
    animation: 'deadlift',
  },
];

export default function ExerciseLibrary() {
  const { theme } = useTheme();

  const renderExercise = ({ item, index }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 200)}
      style={[styles.exerciseCard, { backgroundColor: theme.cardBackground }]}
    >
      <View style={styles.exerciseHeader}>
        <FontAwesome5 name="dumbbell" size={24} color={theme.primary} />
        <Text style={[styles.exerciseName, { color: theme.text }]}>{item.name}</Text>
      </View>
      
      <View style={styles.exerciseDetails}>
        <Text style={[styles.detail, { color: theme.text }]}>
          Muscle: {item.muscle}
        </Text>
        <Text style={[styles.detail, { color: theme.text }]}>
          Difficulty: {item.difficulty}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  exerciseCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    marginLeft: 12,
    fontSize: 18,
    fontFamily: 'SFPro-Bold',
  },
  exerciseDetails: {
    marginLeft: 36,
  },
  detail: {
    fontSize: 16,
    fontFamily: 'SFPro-Regular',
    marginBottom: 4,
  },
});