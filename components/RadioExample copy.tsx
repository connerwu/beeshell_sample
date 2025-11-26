import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert
} from 'react-native'

import { Radio, Icon } from 'beeshell-ls'
import styles from './PickerExample'
import star from 'beeshell-ls/common/images/icons/star.png'
import variables from 'beeshell-ls/common/styles/variables'

const radioItems = [
  <Radio.Item key={0} value={0} label="选项A" style={{ marginRight: 12 }} />,
  <Radio.Item key={1} value={1} label="选项B" style={{ marginRight: 12 }} />,
  <Radio.Item key={2} value={2} label="选项C" />,
];

export default class RadioScreen extends Component<any, any> {
  [propsName: string]: any

  constructor (props) {
    super(props)
    this.state = {
      valueA: 0,
      valueB: 2,
      valueC: 3
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     valueA: 1
    //   })
    // }, 2000)
  }

  renderItem (checked, index, label) {
    let color = checked ? variables.mtdBrandDanger : variables.mtdGrayBase
    return (
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { checked ? <Icon type='star' size={16} tintColor={color} /> : <Icon type='star-o' size={16} tintColor={color} /> }
          <Text style={{ fontSize: 14, marginLeft: 8, color: color }}>{label}</Text>
          { index === 0 ? <Icon style={{ marginLeft: 5 }} type='question-circle' tintColor={variables.mtdGrayLighter} /> : null }
        </View>
        { index === 1 ? <Text style={{ color: variables.mtdGrayLighter, marginLeft: 24, fontSize: 12, marginTop: 5 }}>该选项风险较大，请谨慎选择</Text> : null }
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}>

            <Radio.Item label='选项A' value={0} />
            <Radio.Item label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>

        <Text style={styles.header}>onChange:回调函数:</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
              Alert.alert('选中值', `当前选中值：${value}`)
            }}>

            <Radio.Item label='选项A' value={0} />
            <Radio.Item label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>

        <Text style={styles.header}>style：横向布局</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            style={{ flexDirection: 'row' }}
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}>

            <Radio.Item style={{ marginRight: 12 }} label='选项A' value={0} />
            <Radio.Item style={{ marginRight: 12 }} label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>

        <Text style={styles.header}>
          <Switch
            value={this.state.strokeColor}
            onValueChange={(value) => this.setState({ strokeColor: value })}
          />iconPosition: 右边图标
          </Text>
           <TestCase itShould="iconPosition: 右边图标">
          <Switch
            value={this.state.strokeColor}
            onValueChange={(value) => this.setState({ strokeColor: value })}
          />
        </TestCase>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            style={{ flexDirection: 'row' }}
            value={this.state.valueB}
            onChange={(value) => {
              this.setState({
                valueB: value
              })
            }}
            iconPosition='right'>
            <Radio.Item label='选项一' value={1} />
            <Radio.Item label='选项二（禁用）' value={2} disabled />
            <Radio.Item label='选项三' value={3} />
          </Radio>
        </View>

        <Text style={styles.header}>checkedIcon: 自定义选择中图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueC}
            checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
            uncheckedIcon={<Icon type='star' source={star}  size={20} tintColor={variables.mtdGrayLightest} />}
            onChange={(value) => {
              this.setState({
                valueC: value
              })
            }}>
            <Radio.Item value={1} label='选项一' />
            <Radio.Item value={2} label='选项二'/>
            <Radio.Item value={3} label='选项三' />
          </Radio>
        </View>

        <Text style={styles.header}>uncheckedIcon: 自定义未选中图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueC}
            checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
            uncheckedIcon={<Icon type='star' source={star}  size={20} tintColor={variables.mtdGrayLightest} />}
            onChange={(value) => {
              this.setState({
                valueC: value
              })
            }}>
            <Radio.Item value={1} label='选项一' />
            <Radio.Item value={2} label='选项二'/>
            <Radio.Item value={3} label='选项三' />
          </Radio>
        </View>

        <Text style={styles.header}>children:数组形式子选项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio 
            value={this.state.valueA} 
            onChange={(value) => this.setState({ valueA: value })}
            >
  {radioItems}
</Radio>
        </View>

        <Text style={styles.header}>自定义渲染项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueD}
            onChange={(value) => {
              this.setState({
                valueD: value
              })
            }}>
            <Radio.Item
              value={1}
              renderItem={(checked) => {
                return this.renderItem(checked, 0, '选项一')
              }}
            />
            <Radio.Item
              value={2}
              renderItem={(checked) => {
                return this.renderItem(checked, 1, '选项二')
              }}
            />
            <Radio.Item
              value={3}
              renderItem={(checked) => {
                return this.renderItem(checked, 2, '选项三')
              }}
            />
          </Radio>
        </View>
      </ScrollView>
    )
  }
}
