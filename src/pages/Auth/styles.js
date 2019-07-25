import styled from 'styled-components/native';
import commonStyles from '~commonStyles';

export const ContainerImgBg = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  margin-top: 10px;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: #fff;
  font-size: 70px;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: #fff;
  font-size: 20px;
`;

export const FormContainer = styled.View`
  background-color: 'rgba(0,0,0,0.8)';
  padding: 20px;
  width: 90%;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 10px;
  align-items: center;

  ${({ color }) => color && `background-color: ${color};`}
`;

export const ButtonText = styled.Text`
  font-family: ${commonStyles.fontFamily};
  font-size: 20px;
  color: #fff;
`;
