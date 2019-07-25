import React from 'react';
import { TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '~commonStyles';

import {
  DoneView,
  PendingView,
  Container,
  ContainerTouchable,
  CheckContainer,
  DescContainer,
  DescText,
  DateText,
  ExcludeContainer,
  ExcludeText,
  ExcludeButton,
} from './styles';

const Task = props => {
  let check = null;

  if (props.doneAt) {
    check = (
      <DoneView>
        <Icon name="check" size={20} color={commonStyles.colors.secondary} />
      </DoneView>
    );
  } else {
    check = <PendingView />;
  }

  const leftContent = (
    <ExcludeContainer>
      <Icon name="trash" size={20} color="#fff" />
      <ExcludeText>Excluir</ExcludeText>
    </ExcludeContainer>
  );

  const rightContent = [
    <ExcludeButton
      as={TouchableOpacity}
      onPress={() => props.onDelete(props.id)}
    >
      <Icon name="trash" size={30} color="#fff" />
    </ExcludeButton>,
  ];

  return (
    <Swipeable
      leftActionActivationDistance={200}
      onLeftActionActivate={() => props.onDelete(props.id)}
      leftContent={leftContent}
      rightButtons={rightContent}
    >
      <Container>
        <ContainerTouchable onPress={() => props.onToggleTask(props.id)}>
          <CheckContainer>{check}</CheckContainer>
        </ContainerTouchable>
        <DescContainer>
          <DescText doneAt={props.doneAt}>{props.desc}</DescText>
          <DateText>
            {moment(props.estimateAt)
              .locale('pt-br')
              .format('ddd, D [de] MMMM [de] YYYY')}
          </DateText>
        </DescContainer>
      </Container>
    </Swipeable>
  );
};

export default Task;
