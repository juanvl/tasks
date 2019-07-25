import styled from 'styled-components/native';
import commonStyles from '~commonStyles';

export const Container = styled.View`
  padding: 10px 0;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #aaa;
`;

export const ContainerTouchable = styled.TouchableWithoutFeedback``;

export const CheckContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 20%;
`;

export const DoneView = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #4d7031;
  align-items: center;
  justify-content: center;
`;

export const PendingView = styled.View`
  border-width: 1px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border-color: #555;
`;

export const DescContainer = styled.View``;

export const DescText = styled.Text`
  text-decoration-line: ${({ doneAt }) => (doneAt ? 'line-through' : 'none')};
  color: ${commonStyles.colors.mainText};
  font-family: ${commonStyles.fontFamily};
  font-size: 15px;
`;

export const DateText = styled.Text`
  color: ${commonStyles.colors.subText};
  font-family: ${commonStyles.fontFamily};
  font-size: 12px;
`;

export const ExcludeContainer = styled.View`
  flex: 1;
  background-color: red;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ExcludeText = styled.Text`
  font-family: ${commonStyles.fontFamily};
  color: #fff;
  font-size: 20px;
  margin: 10px;
`;

export const ExcludeButton = styled(ExcludeContainer)`
  justify-content: flex-start;
  padding-left: 20px;
`;
