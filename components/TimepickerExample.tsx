import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker, Button, Switch, Timepicker } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

// ---------- 工具方法：处理步长对齐 ----------
const two = (v: number) => (v < 10 ? '0' + v : String(v));

const snap = (num: number, step: number) =>
  step <= 1 ? num : Math.floor(num / step) * step;

// value 自动按 step 调整
const fixValueWithStep = (
  value: string,
  hourStep: number,
  minuteStep: number,
  secondStep: number
) => {
  let [h, m, s] = value.split(':').map(v => parseInt(v, 10));

  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  if (isNaN(s)) s = 0;

  h = snap(h, hourStep);
  m = snap(m, minuteStep);
  s = snap(s, secondStep);

  return `${two(h)}:${two(m)}:${two(s)}`;
};

// ---------- 复用的 LabelPicker ----------
const LabelPicker = ({ lable, maps, pickerTitle, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{lable}</Text>
    <Picker label={pickerTitle} style={{ width: 240 }}>
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        {maps.map((v, i) => (
          <Button key={i} onPress={() => onValueChange(v)}>
            {v.toString()}
          </Button>
        ))}
      </View>
    </Picker>
  </View>
);

// ---------- 复用的开关 ----------
const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

export default class TimepickerScreen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '12:30:40',
      hourStep: 1,
      minuteStep: 5,
      secondStep: 10,
      lastChange: ''
    };
  }

  render() {
    const { value, hourStep, minuteStep, secondStep, lastChange } = this.state;

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Timepicker 全属性调试 Demo</Text>

        {/* hourStep */}
        <LabelPicker
          lable="hourStep"
          maps={[1, 2, 3, 4, 6]}
          pickerTitle={hourStep}
          onValueChange={v => {
            const fixed = fixValueWithStep(value, v, minuteStep, secondStep);
            this.setState({ hourStep: v, value: fixed });
          }}
        />

        {/* minuteStep */}
        <LabelPicker
          lable="minuteStep"
          maps={[1, 5, 10, 15, 20, 30]}
          pickerTitle={minuteStep}
          onValueChange={v => {
            const fixed = fixValueWithStep(value, hourStep, v, secondStep);
            this.setState({ minuteStep: v, value: fixed });
          }}
        />

        {/* secondStep */}
        <LabelPicker
          lable="secondStep"
          maps={[1, 5, 10, 15, 20, 30]}
          pickerTitle={secondStep}
          onValueChange={v => {
            const fixed = fixValueWithStep(value, hourStep, minuteStep, v);
            this.setState({ secondStep: v, value: fixed });
          }}
        />

        {/* Timepicker 实例 */}
        <Timepicker
          value={value}
          hourStep={hourStep}
          minuteStep={minuteStep}
          secondStep={secondStep}
          onChange={v => this.setState({ value: v, lastChange: v })}
          style={{ marginVertical: 20 }}
        />

        {/* 显示当前状态 */}
        <Text style={styles.info}>当前 value：{value}</Text>
        <Text style={styles.info}>最后一次 onChange：{lastChange}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 15,
    color: variables.mtdGrayDark
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    fontSize: 16
  },
  info: {
    fontSize: 16,
    marginVertical: 5
  }
});
