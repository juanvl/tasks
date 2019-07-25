import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  width: 100%;
  height: 40px;
  background-color: #eee;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const IconContainer = styled(Icon)`
  color: #333;
  margin-left: 20px;
`;

export const Input = styled.TextInput`
  margin-left: 20px;
  width: 70%;
`;
