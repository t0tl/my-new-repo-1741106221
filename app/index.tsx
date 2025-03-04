import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import WorkoutCard from '../components/WorkoutCard';
import ProgressChart from '../components/ProgressChart';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Today's Workout</Text>
      </View>
      
      <WorkoutCard
        title="Full Body Strength"
        duration="45 min"
        exercises={['Squats', 'Push-ups', 'Deadlifts']}
      />

      <View style={styles.progressSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Progress</Text>
        <ProgressChart />
      </View>

      <View style={styles.quickActions}>
        <Link href="/exercises" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="dumbbell" size={24} color={theme.primary} />
            <Text style={[styles.actionText, { color: theme.text }]}>Exercise Library</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/workout" asChild>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]}>
            <FontAwesome5 name="play" size={24} color="white" />
            <Text style={[styles.actionText, { color: 'white' }]}>Start Workout</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SFPro-Bold',
  },
  progressSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SFPro-Medium',
    marginBottom: 15,
  },
  quickActions: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  actionText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'SFPro-Medium',
  },
});