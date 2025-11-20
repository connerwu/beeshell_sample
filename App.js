import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppHome from './AppHome';
import ActionsheetExample from './components/ActionsheetExample';
import PickerExample from './components/PickerExample';
import RadioExample from './components/RadioExample';
import RateExample from './components/RateExample';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={AppHome} />
          <Stack.Screen name="ActionsheetExample" component={ActionsheetExample} />
          <Stack.Screen name="PickerExample" component={PickerExample} />
          <Stack.Screen name="RadioExample" component={RadioExample} />
          <Stack.Screen name="RateExample" component={RateExample} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default {
  displayName: 'beeshell',
  framework: 'React',
  category: 'UI',
  title: 'beeshell',
  documentationURL: 'beeshell',
  description: '',
  hideTopTitleBar: true,
  examples: [
    {
      title: 'beeshell',
      render: function () {
        return <App />;
      },
    },
  ],
};