import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import api from '~services/api';
import AuthInput from '~components/AuthInput';

import backgroundImage from '~../assets/imgs/login.jpg';
import {
  ContainerImgBg,
  Input,
  Title,
  Subtitle,
  ButtonText,
  FormContainer,
  Button,
} from './styles';

export default class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  signin = async () => {
    try {
      const res = await api.post('/signin', {
        email: this.state.email,
        password: this.state.password,
      });
      api.defaults.headers.common.Authorization = `bearer ${res.data.token}`;
      AsyncStorage.setItem('userData', JSON.stringify(res.data));
      this.props.navigation.navigate('Home', res.data);
    } catch (err) {
      Alert.alert('Ops...', err);
    }
  };

  signup = async () => {
    try {
      await api.post('/signup', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      });
      Alert.alert('Tudo certo!', 'Cadastro feito');
      this.setState({ stageNew: false });
    } catch (err) {
      Alert.alert('Ops...', err);
    }
  };

  signInOrSignUp = () => {
    if (this.state.stageNew) {
      this.signup();
    } else {
      this.signin();
    }
  };

  render() {
    const validations = [];

    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.password && this.state.password.length >= 6);

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim());
      validations.push(this.state.confirmPassword);
      validations.push(this.state.password === this.state.confirmPassword);
    }

    const validForm = validations.reduce((all, v) => all && v);

    return (
      <ContainerImgBg source={backgroundImage}>
        <Title>Tasks</Title>
        <FormContainer>
          <Subtitle>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Subtitle>
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          )}

          <AuthInput
            icon="at"
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <AuthInput
            icon="lock"
            secureTextEntry
            placeholder="Senha"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />

          {this.state.stageNew && (
            <AuthInput
              icon="lock"
              secureTextEntry
              placeholder="Confirmar Senha"
              value={this.state.confirmPassword}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
            />
          )}

          <Button
            disabled={!validForm}
            onPress={this.signInOrSignUp}
            color={validForm ? '#080' : '#AAA'}
          >
            <ButtonText>
              {this.state.stageNew ? 'Registrar' : 'Entrar'}
            </ButtonText>
          </Button>
        </FormContainer>

        <Button
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}
        >
          <ButtonText>
            {this.state.stageNew
              ? 'Já possui conta?'
              : 'Ainda não possui conta?'}
          </ButtonText>
        </Button>
      </ContainerImgBg>
    );
  }
}
