import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

export default function ProgressChart() {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get('window').width;

  const data = [65, 78, 82, 75, 90, 85, 88];
  const maxValue = Math.max(...data);

  const animatedBars = data.map((value, index) => {
    const height = (value / maxValue) * 200;
    
    const animatedStyle = useAnimatedStyle(() => ({
      height: withSpring(height, {
        damping: 12,
        stiffness: 100,
      }),
    }));

    return (
      <View key={index} style={styles.barContainer}>
        <Animated.View
          style={[
            styles.bar,
            animatedStyle,
            { backgroundColor: theme.primary },
          ]}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>{animatedBars}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    padding: 20,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  bar: {
    borderRadius: 6,
    width: '100%',
  },
});