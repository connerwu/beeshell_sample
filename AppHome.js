// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';

function AppHome({ navigation }) {

  const [data, setData] = useState([
    { id: '1', name: 'Actionsheet', page: 'ActionsheetExample' },
    { id: '2', name: 'Badge', page: 'BadgeExample' },
    { id: '3', name: 'BottomModal', page: 'BottomModalExample' },
    { id: '4', name: 'Button', page: 'ButtonExample' },
    { id: '5', name: 'Calendar', page: 'CalendarExample' },
    { id: '6', name: 'Cascader', page: 'CascaderExample' },
    { id: '7', name: 'Checkbox', page: 'CheckboxExample' },
    { id: '8', name: 'Datepicker', page: 'DatepickerExample' },
    { id: '9', name: 'Dialog', page: 'DialogExample' },
    { id: '10', name: 'Form', page: 'FormExample' },
    { id: '11', name: 'Icon', page: 'IconExample' },
    { id: '12', name: 'Input', page: 'InputExample' },
    { id: '13', name: 'Longlist', page: 'LonglistExample' },
    { id: '14', name: 'Modal', page: 'ModalExample' },
    { id: '15', name: 'NavigationBar', page: 'NavigationBarExample' },
    { id: '16', name: 'Picker', page: 'PickerExample' },
    { id: '17', name: 'Progress', page: 'ProgressExample' },
    { id: '18', name: 'Radio', page: 'RadioExample' },
    { id: '19', name: 'Rate', page: 'RateExample' },
    { id: '20', name: 'Scrollpicker', page: 'ScrollpickerExample' },
    { id: '21', name: 'SlideModal', page: 'SlideModalExample' },
    { id: '22', name: 'Slider', page: 'SliderExample' },
    { id: '23', name: 'Stepper', page: 'StepperExample' },
    { id: '24', name: 'Switch', page: 'SwitchExample' },
    { id: '25', name: 'Tab', page: 'TabExample' },
    { id: '26', name: 'Tag', page: 'TagExample' },
    { id: '27', name: 'Timepicker', page: 'TimepickerExample' },
    { id: '28', name: 'Tip', page: 'TipExample' },
    { id: '29', name: 'Topview', page: 'TopviewExample' },
    { id: '30', name: 'TreeView', page: 'TreeViewExample' },
    { id: '31', name: 'Ruler', page: 'RulerExample' },
    { id: '32', name: 'Popover', page: 'PopoverExample' },
    { id: '33', name: 'Dropdown', page: 'DropdownExample' }
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.push(`${item.page}`)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2f2',
  },
  item: {
    backgroundColor: '#ffffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 14,
    flex: 1
  },
  arrow: {
    color: 'rgba(193, 193, 193, 1)'
  }
});

export default AppHome;