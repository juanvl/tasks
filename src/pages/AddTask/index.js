import React, { Component } from 'react';
import {
  DatePickerIOS,
  DatePickerAndroid,
  Alert,
  Platform,
} from 'react-native';
import moment from 'moment';
import commonStyles from '~commonStyles';

import {
  ModalContainer,
  ModalBlurTouchable,
  ModalBlur,
  ModalContent,
  ModalHeader,
  DescInput,
  ActionButtonsContainer,
  ActionButton,
  ActionButtonText,
  DateAndroidTouchable,
  DateAndroidText,
} from './styles';

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    desc: '',
    date: new Date(),
  });

  save = () => {
    if (!this.state.desc.trim()) {
      Alert.alert('Ops!', 'Essa descrição não é válida!');
      return;
    }
    const data = { ...this.state };
    this.props.onSave(data);
  };

  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.date,
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date);
        momentDate.date(e.day);
        momentDate.month(e.month);
        momentDate.year(e.year);
        this.setState({ date: momentDate.toDate() });
      }
    });
  };

  render() {
    let datePicker = null;
    if (Platform.OS === 'ios') {
      datePicker = (
        <DatePickerIOS
          mode="date"
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
        />
      );
    } else {
      datePicker = (
        <DateAndroidTouchable onPress={this.handleDateAndroidChanged}>
          <DateAndroidText>
            {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
          </DateAndroidText>
        </DateAndroidTouchable>
      );
    }

    return (
      <ModalContainer
        onShow={() => this.setState({ ...this.getInitialState() })}
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent
      >
        <ModalBlurTouchable onPress={this.props.onCancel}>
          <ModalBlur />
        </ModalBlurTouchable>
        <ModalContent>
          <ModalHeader>Nova Tarefa</ModalHeader>
          <DescInput
            placeholder="Descrição..."
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
          />
          {datePicker}
          <ActionButtonsContainer>
            <ActionButton onPress={this.props.onCancel}>
              <ActionButtonText>Cancelar</ActionButtonText>
            </ActionButton>
            <ActionButton onPress={this.save}>
              <ActionButtonText>Salvar</ActionButtonText>
            </ActionButton>
          </ActionButtonsContainer>
        </ModalContent>
        <ModalBlurTouchable onPress={this.props.onCancel}>
          <ModalBlur />
        </ModalBlurTouchable>
      </ModalContainer>
    );
  }
}
