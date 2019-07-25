import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import api from '~services/api';
import { Container } from './styles';

export default class AuthOrApp extends Component {

  componentWillMount = async () => {
    const json = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(json) || {};

    if (userData.token) {
      api.defaults.headers.common.Authorization = `bearer ${userData.token}`;
      this.props.navigation.navigate('Home', userData);
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
}
