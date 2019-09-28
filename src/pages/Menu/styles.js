import styled from 'styled-components/native';
import { Gravatar } from 'react-native-gravatar';
import commonStyles from '~/commonStyles';

export const ContainerScroll = styled.ScrollView`
  margin-top: 25%;
`;

export const Header = styled.View`
  border-bottom-width: 1px;
  border-color: #ddd;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

export const Title = styled.Text`
  background-color: #fff;
  color: #000;
  font-family: ${commonStyles.fontFamily};
  font-size: 30px;
  padding-top: 30px;
  padding: 10px;
  align-self: flex-start;
`;

export const Avatar = styled(Gravatar)`
  width: 60px;
  height: 60px;
  border-width: 3px;
  border-color: #aaa;
  border-radius: 30px;
  margin: 10px;
`;

export const UserInfo = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const UserInfoItems = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: ${commonStyles.colors.mainText};
  font-size: 20px;
`;

export const Email = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: ${commonStyles.colors.subText};
  font-size: 15px;
`;

export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

export const LogoutIcon = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
