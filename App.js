import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppHome from './AppHome';
import ActionsheetExample from './components/ActionsheetExample';
import BadgeExample from './components/BadgeExample';
import BottomModalExample from './components/BottomModalExample';
import ButtonExample from './components/ButtonExample';
import CalendarExample from './components/CalendarExample';
import CascaderExample from './components/CascaderExample';
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
import FormExample from './components/FormExample';
import IconExample from './components/IconExample';
import InputExample from './components/InputExample'
import DatepickerExample from './components/DatepickerExample'
import LonglistExample from './components/LonglistExample';
import ModalExample from './components/ModalExample';
import NavigationBarExample from './components/NavigationBarExample';
import ProgressExample from './components/ProgressExample'
import CheckboxExample from './components/CheckboxExample'

import PopoverExample from './components/PopoverExample'
// import TagExample from './components/TagExample';
import TreeViewExample from './components/TreeViewExample';
import RulerExample from './components/RulerExample';



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
          <Stack.Screen name="ButtonExample" component={ButtonExample} />
          <Stack.Screen name="CalendarExample" component={CalendarExample} />
          <Stack.Screen name="CascaderExample" component={CascaderExample} />
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
          <Stack.Screen name="FormExample" component={FormExample} />
          <Stack.Screen name="IconExample" component={IconExample} />
          <Stack.Screen name="InputExample" component={InputExample} />
          <Stack.Screen name="DatepickerExample" component={DatepickerExample} />
          <Stack.Screen name="LonglistExample" component={LonglistExample} />
          <Stack.Screen name="ModalExample" component={ModalExample} />
          <Stack.Screen name="NavigationBarExample" component={NavigationBarExample} />
          <Stack.Screen name="ProgressExample" component={ProgressExample} />
          <Stack.Screen name="TreeViewExample" component={TreeViewExample} />
          <Stack.Screen name="RulerExample" component={RulerExample} />
          <Stack.Screen name="CheckboxExample" component={CheckboxExample} />
          <Stack.Screen name="PopoverExample" component={PopoverExample} />
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