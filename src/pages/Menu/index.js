import React from 'react';
import { AsyncStorage } from 'react-native';
import { DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~services/api';
import commonStyles from '~commonStyles';
import {
  ContainerScroll,
  Header,
  Title,
  Avatar,
  UserInfo,
  UserInfoItems,
  Name,
  Email,
  LogoutButton,
  LogoutIcon,
} from './styles';

const Menu = props => {
  const logout = () => {
    delete api.defaults.headers.common.Authorization;
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('Loading');
  };

  return (
    <ContainerScroll>
      <Header>
        <Title>Tasks</Title>
        <Avatar
          options={{
            email: props.navigation.getParam('email'),
            secure: true,
          }}
        />
        <UserInfo>
          <UserInfoItems>
            <Name>{props.navigation.getParam('name')}</Name>
            <Email>{props.navigation.getParam('email')}</Email>
          </UserInfoItems>
          <LogoutButton onPress={logout}>
            <LogoutIcon>
              <Icon name="sign-out" size={30} color="#800" />
            </LogoutIcon>
          </LogoutButton>
        </UserInfo>
      </Header>

      <DrawerItems {...props} />
    </ContainerScroll>
  );
};

export default Menu;
