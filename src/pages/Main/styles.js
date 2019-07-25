import styled from 'styled-components/native';
import { Platform } from 'react-native';
import commonStyles from '~commonStyles';

export const Container = styled.View`
  flex: 1;
`;

export const Background = styled.ImageBackground`
  flex: 3;
`;

export const IconBar = styled.View`
  margin-top: ${Platform.OS === 'ios' ? '50px' : '30px'};
  margin-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const MenuButton = styled.TouchableOpacity``;

export const FilterButton = styled.TouchableOpacity``;

export const TitleBar = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: ${commonStyles.colors.secondary};
  font-size: 50px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: ${commonStyles.colors.secondary};
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export const TaskContainer = styled.View`
  flex: 7;
`;
