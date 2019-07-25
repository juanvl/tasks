import styled from 'styled-components/native';
import commonStyles from '~commonStyles';

export const ModalContainer = styled.Modal``;

export const ModalBlurTouchable = styled.TouchableWithoutFeedback``;

export const ModalBlur = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.View`
  background-color: white;
  justify-content: space-between;
`;

export const ModalHeader = styled.Text`
  font-family: ${commonStyles.fontFamily};
  background-color: ${commonStyles.colors.default};
  color: ${commonStyles.colors.secondary};
  text-align: center;
  padding: 15px;
  font-size: 15px;
`;

export const DescInput = styled.TextInput`
  font-family: ${commonStyles.fontFamily};
  width: 90%;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: #fff;
  border-width: 1px;
  border-color: #e3e3e3;
  border-radius: 6px;
`;

export const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ActionButton = styled.TouchableOpacity``;

export const ActionButtonText = styled.Text`
  margin: 20px;
  margin-right: 30px;
  color: ${commonStyles.colors.default};
`;

export const DateAndroidTouchable = styled.TouchableOpacity``;

export const DateAndroidText = styled.Text`
  font-family: ${commonStyles.fontFamily};
  font-size: 20px;
  margin-top: 10px;
  margin-left: 10px;
  text-align: center;
`;
