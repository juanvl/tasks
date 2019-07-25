import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

import api from '~services/api';
import Task from '~components/Task';
import AddTask from '~pages/AddTask';

import commonStyles from '~/commonStyles';
import todayImage from '~../assets/imgs/today.jpg';
import tomorrowImage from '~../assets/imgs/tomorrow.jpg';
import weekImage from '~../assets/imgs/week.jpg';
import monthImage from '~../assets/imgs/month.jpg';

import {
  Container,
  Background,
  IconBar,
  FilterButton,
  TitleBar,
  Title,
  Subtitle,
  TaskContainer,
  MenuButton,
} from './styles';

export default class Main extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  };

  componentDidMount = async () => {
    this.loadTasks();
  };

  addTask = async ({ desc, date }) => {
    try {
      await api.post('/tasks', { desc, estimateAt: date });
      await this.loadTasks();
      this.setState({ showAddTask: false }, this.loadTasks);
    } catch (error) {
      Alert.alert(error);
    }
  };

  deleteTask = async id => {
    try {
      await api.delete(`/tasks/${id}`);
      await this.loadTasks();
    } catch (error) {
      Alert.alert(error);
    }
  };

  toggleTask = async id => {
    try {
      await api.put(`/tasks/${id}/toggle`);
      await this.loadTasks();
    } catch (error) {
      Alert.alert(error);
    }
  };

  toggleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    );
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      visibleTasks = this.state.tasks.filter(task => !task.doneAt);
    }
    this.setState({ visibleTasks });
  };

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({ days: this.props.daysAhead })
        .format('YYYY-MM-DD 23:59');
      const res = await api.get(`/tasks?date=${maxDate}`);
      this.setState({ tasks: res.data }, this.filterTasks);
    } catch (error) {
      Alert.alert(error);
    }
  };

  daysSelect = days => {
    const options = {
      '0': { styleColor: commonStyles.colors.today, image: todayImage },
      '1': { styleColor: commonStyles.colors.tomorrow, image: tomorrowImage },
      '7': { styleColor: commonStyles.colors.week, image: weekImage },
      default: { styleColor: commonStyles.colors.month, image: monthImage },
    };

    return options[days] || options.default;
  };

  render() {
    const { styleColor, image } = this.daysSelect(this.props.daysAhead);

    return (
      <Container>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <Background source={image}>
          <IconBar>
            <MenuButton
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            >
              <Icon
                name="bars"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </MenuButton>
            <FilterButton onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </FilterButton>
          </IconBar>
          <TitleBar>
            <Title>{this.props.title}</Title>
            <Subtitle>
              {moment()
                .locale('pt-br')
                .format('ddd, D [de] MMMM [de] YYYY')}
            </Subtitle>
          </TitleBar>
        </Background>
        <TaskContainer>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </TaskContainer>
        <ActionButton
          buttonColor={styleColor}
          onPress={() => this.setState({ showAddTask: true })}
        />
      </Container>
    );
  }
}
