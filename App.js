import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Loading from './Loading';
import Weather from './Weather';

const API_KEY = '0c92beab857078a2c68a3d621dadc849';

export default class extends Component {
  state = {
    isLoading: true,
    error: null,
    temperature: null,
    name: null
  };
  getWeather = async (lat, long) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`
    );
    this.setState({
      isLoading: false,
      temperature: temp,
      name: weather[0].main
    });
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (err) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoading ? (
          <Loading />
        ) : (
          <Weather temp={Math.round(temperature)} weatherName={name} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent',
    marginBottom: 40
  }
});
