import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
  Rain: {
    colors: ['#00c6fb', '#005bea'],
    title: 'Rainy',
    subtitle: 'For more info look outside',
    icon: 'weather-pouring'
  },
  Clear: {
    colors: ['#fef253', '#ff7300'],
    title: 'Sunny',
    subtitle: 'Go for a Picnic',
    icon: 'weather-sunny'
  },
  Thunderstorm: {
    colors: ['#00ecbc', '#007adf'],
    title: 'Thunderstorm',
    subtitle: 'Stay inside of the house',
    icon: 'weather-lightning'
  },
  Drizzle: {
    colors: ['#89f7fe', '#66a6ff'],
    title: 'Drizzle',
    subtitle: 'Is like rain',
    icon: 'weather-rainy'
  },
  Snow: {
    colors: ['#7de2fc', '#b9b6e5'],
    title: 'Snowy',
    subtitle: 'Do you want to build a snowman?',
    icon: 'weather-snowy'
  },
  Clouds: {
    colors: ['#d7d2cc', '#304352'],
    title: 'Cloudy',
    subtitle: 'So-so',
    icon: 'weather-cloudy'
  }
};

export default function Weather({ temp, weatherName }) {
  return (
    <LinearGradient
      colors={weatherCases[weatherName].colors}
      style={styles.container}
    >
      <View style={styles.upper}>
        <MaterialCommunityIcons
          color="#fff"
          size={144}
          name={weatherCases[weatherName].icon}
        />
        <Text style={styles.temp}>{temp}˚</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
        <Text style={styles.subtitle}>
          {weatherCases[weatherName].subtitle}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  weatherName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  temp: {
    fontSize: 48,
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 10
  },
  lower: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  title: {
    fontSize: 36,
    backgroundColor: 'transparent',
    color: '#fff',
    marginBottom: 10,
    fontWeight: '300'
  },
  subtitle: {
    fontSize: 24,
    backgroundColor: 'transparent',
    color: '#fff',
    marginBottom: 24
  }
});
