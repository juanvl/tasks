import React, { Component } from 'react';
import { FlatList, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

import Task from '~components/Task';
import AddTask from '~pages/AddTask';

import commonStyles from '~/commonStyles';
import todayImage from '~../assets/imgs/today.jpg';
import {
  Container,
  Background,
  IconBar,
  FilterButton,
  TitleBar,
  Title,
  Subtitle,
  TaskContainer,
} from './styles';

export default class Main extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  };

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('tasks');
    const tasks = JSON.parse(data) || [];
    this.setState({ tasks }, this.filterTasks);
  };

  addTask = ({ desc, estimateAt }) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc,
      estimateAt,
      doneAt: null,
    });

    this.setState({ tasks, showAddTask: false }, this.filterTasks);
  };

  deleteTask = (id) => {
    const tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({ tasks }, this.filterTasks);
  };

  toggleTask = (id) => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        task = { ...task };
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    });

    this.setState({ tasks }, this.filterTasks);
  };

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      visibleTasks = this.state.tasks.filter(task => !task.doneAt);
    }
    this.setState({ visibleTasks });

    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  };

  render() {
    return (
      <Container>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <Background source={todayImage}>
          <IconBar>
            <FilterButton onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </FilterButton>
          </IconBar>
          <TitleBar>
            <Title>Hoje</Title>
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
              <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />
            )}
          />
        </TaskContainer>
        <ActionButton
          buttonColor={commonStyles.colors.today}
          onPress={() => this.setState({ showAddTask: true })}
        />
      </Container>
    );
  }
}
