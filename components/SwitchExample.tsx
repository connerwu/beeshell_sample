
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput , Alert, ToastAndroid } from 'react-native';
import { Switch, Picker, Form, Button } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

const rockerSizes = ['lg', 'sm'] as const;
const activeColors = ['#ff0000', '#00ff00', '#0000ff'];

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

export default class SwitchTestScreen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      disabled: false,
      rockerSize: 'lg',
      activeColor: variables.mtdBrandPrimaryDark,

       valueA: true
    };
  }

  render() {
    const { value, disabled, rockerSize, activeColor } = this.state;

    return (
      <ScrollView style={styles.body} contentContainerStyle={{ padding: 16 }}>

        {/* 预览区 */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ marginBottom: 10 }}>预览：</Text>

          <Switch
            value={value}
            disabled={disabled}
            rockerSize={rockerSize}
            activeColor={activeColor}
            onChange={(v) => {
              this.setState({ value: v })
              // Alert.alert('onChange回调', `value: ${v}`)
              ToastAndroid.show(`onChange回调 value: ${v}`, 3);
          }}
          />
        </View>

        {/* value */}
        <LabelSwitch
          label="value"
          value={value}
          onValueChange={(v) => this.setState({ value: v })}
        />

        {/* disabled */}
        <LabelSwitch
          label="disabled"
          value={disabled}
          onValueChange={(v) => this.setState({ disabled: v })}
        />

        {/* rockerSize 下拉框 */}
        <View style={styles.row}>
          <Text style={styles.label}>rockerSize</Text>
          <Picker label={rockerSize} style={{ width: 120 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {rockerSizes.map(size => (
                <Button
                  key={size}
                  onPress={() => this.setState({ rockerSize: size })}
                >{size}</Button>
              ))}
            </View>
          </Picker>
        </View>

        {/* activeColor 下拉框 */}
         <View style={styles.row}>
          <Text style={styles.label}>activeColor</Text>
          <Picker label={activeColor} style={{ width: 120 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {activeColors.map(color => (
                <Button
                  key={color}
                  onPress={() => this.setState({ activeColor: color })}
                >{color}</Button>
              ))}
            </View>
          </Picker>
        </View>


         <Form>
           <Form.Item label='基础' hasLine>
             <View style={{ alignItems: 'flex-end' }}>
               <Switch value={this.state.valueA} onChange={(value) => { this.setState({ valueA: value }) }}/>
             </View>
           </Form.Item>

           <Form.Item label='禁用' hasLine>
             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
               <Switch style={{ marginRight: 3 }} value disabled activeColor={variables.mtdGrayLight} />
               <Switch value={false} disabled />
             </View>
           </Form.Item>

           <Form.Item label='自定义'>
             <View style={{ alignItems: 'flex-end' }}>
               <Switch onChange={this.onChange} rockerSize='sm' />
             </View>
           </Form.Item>
         </Form>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  label: {
    fontSize: 14
  },
  input: {
    width: 150,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8
  }
});
