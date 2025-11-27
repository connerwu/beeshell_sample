import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppHome from './AppHome';
import ActionsheetExample from './components/ActionsheetExample';
import BadgeExample from './components/BadgeExample';
import BottomModalExample from './components/BottomModalExample';
import PickerExample from './components/PickerExample';
import RadioExample from './components/RadioExample';
import RateExample from './components/RateExample';
import ScrollpickerExample from './components/ScrollpickerExample';
import SlideModalExample from './components/SlideModalExample';
import SliderExample from './components/SliderExample';
import StepperExample from './components/StepperExample';
import SwitchExample from './components/SwitchExample';
import TabExample from './components/TabExample';
import TagExample from './components/TagExample';
import TimepickerExample from './components/TimepickerExample';
import TipExample from './components/TipExample';
import TopviewExample from './components/TopviewExample';

import DialogExample from './components/DialogExample';
import IconExample from './components/IconExample';
import InputExample from './components/InputExample'
import DatepickerExample from './components/DatepickerExample'
import LonglistExample from './components/LonglistExample';

// import TagExample from './components/TagExample';



const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={AppHome} />
          <Stack.Screen name="ActionsheetExample" component={ActionsheetExample} />
          <Stack.Screen name="BadgeExample" component={BadgeExample} />
          <Stack.Screen name="BottomModalExample" component={BottomModalExample} />
          <Stack.Screen name="PickerExample" component={PickerExample} />
          <Stack.Screen name="RadioExample" component={RadioExample} />
          <Stack.Screen name="RateExample" component={RateExample} />
          <Stack.Screen name="ScrollpickerExample" component={ScrollpickerExample} />
          <Stack.Screen name="SlideModalExample" component={SlideModalExample} />
          <Stack.Screen name="SliderExample" component={SliderExample} />
          <Stack.Screen name="StepperExample" component={StepperExample} />
          <Stack.Screen name="SwitchExample" component={SwitchExample} />
          <Stack.Screen name="TabExample" component={TabExample} />
          <Stack.Screen name="TagExample" component={TagExample} />
          <Stack.Screen name="TimepickerExample" component={TimepickerExample} />
          <Stack.Screen name="TipExample" component={TipExample} />
          <Stack.Screen name="TopviewExample" component={TopviewExample} />
          <Stack.Screen name="DialogExample" component={DialogExample} />
          <Stack.Screen name="IconExample" component={IconExample} />
          <Stack.Screen name="InputExample" component={InputExample} />
          <Stack.Screen name="DatepickerExample" component={DatepickerExample} />
          <Stack.Screen name="LonglistExample" component={LonglistExample} />
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