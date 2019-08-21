import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = '0c92beab857078a2c68a3d621dadc849';

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount() {
    // "latitude": 37.6162554,
    // "longitude": 127.0868828,
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({ error });
      }
    );
  }
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };
  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
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
  },
  loading: {
    flex: 1,
    backgroundColor: '#fdf6aa',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 36,
    marginBottom: 100,
    fontWeight: '300',
    marginBottom: 24
  }
});
