import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Switch, TextInput, Alert } from 'react-native'
import { Stepper, Form } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
)

const LabelInput = ({ label, value, onChangeText }) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={String(value)}
      // keyboardType="numeric"
      onChangeText={onChangeText}
    />
  </View>
)

interface State {
  value: number
  min: number
  max: number
  step: number
  editable: boolean
  operatorIconColor: string
  operatorStyle: object
  onChangeAlert: boolean
}

export default class StepperScreen extends Component<any, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: 10,
      min: 1,
      max: 100,
      step: 1,
      editable: false,
      operatorIconColor: '#000',
      operatorStyle: {backgroundColor: '#0de744ff', borderRadius: 0},
      onChangeAlert: false
    }
  }

  handleChange = (value: number, oldValue: number, action: string) => {
    this.setState({ value })
    if (this.state.onChangeAlert) {
      Alert.alert('onChange回调', `value: ${value}, oldValue: ${oldValue}, action: ${action}`)
    }
  }

  render() {
    const { value, min, max, step, editable, operatorIconColor, operatorStyle, onChangeAlert } = this.state

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Stepper 全属性 Demo</Text>

        <View style={styles.panel}>
          <Text>当前值: {value}</Text>
          <Stepper
            min={min}
            max={max}
            step={step}
            value={value}
            editable={editable}
            operatorStyle={operatorStyle}
            operatorIconColor={operatorIconColor}
            onChange={this.handleChange}
          />
        </View>

        <LabelSwitch
          label="editable 可编辑"
          value={editable}
          onValueChange={(v) => this.setState({ editable: v })}
        />
        <LabelSwitch
          label="onChange 弹窗回调"
          value={onChangeAlert}
          onValueChange={(v) => this.setState({ onChangeAlert: v })}
        />

        <LabelInput
          label="min 最小值"
          value={min}
          onChangeText={(v) => this.setState({ min: Number(v) })}
        />
        <LabelInput
          label="max 最大值"
          value={max}
          onChangeText={(v) => this.setState({ max: Number(v) })}
        />
        <LabelInput
          label="step 步长"
          value={step}
          onChangeText={(v) => this.setState({ step: Number(v) })}
        />

        <LabelInput
          label="operatorIconColor 操作按钮颜色"
          value={operatorIconColor}
          onChangeText={(v) => this.setState({ operatorIconColor: v })}
        />
        <LabelInput
          label="operatorStyle 操作按钮圆角"
          value={operatorStyle?.borderRadius || 0}
          onChangeText={(v) =>
            this.setState({ operatorStyle: { ...operatorStyle, borderRadius: Number(v) } })
          }
        />
        <LabelInput
          label="operatorStyle 操作按钮背景色"
          value={operatorStyle?.backgroundColor || ''}
          onChangeText={(v) =>
            this.setState({ operatorStyle: { ...operatorStyle, backgroundColor: v } })
          }
        />


        <Form>
           <Form.Item
            style={{ paddingVertical: 13 }}
            label='基础'
            hasLine>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                min={min}
                max={max}
                value={value}
                onChange={this.handleChange}
              />
            </View>
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            labelWidth={120}
            label='可编辑'
            hasLine>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                min={min}
                max={max}
                value={value}
                editable={true}
                onChange={this.handleChange}
              />
            </View>
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            labelWidth={120}
            label='自定义操作按钮'>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                operatorStyle={{ backgroundColor: variables.mtdBrandInfo, borderRadius: 15 }}
                operatorIconColor='#fff'
                min={min}
                max={max}
                value={value}
                editable={true}
                onChange={this.handleChange}
              />
            </View>
          </Form.Item>
        </Form>  

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: 16
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  panel: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 20
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  switchLabel: {
    fontSize: 14
  },
  input: {
    width: 80,
    height: 32,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center'
  }
})
