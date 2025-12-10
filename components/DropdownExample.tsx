import React, { Component } from 'react'
import { ScrollView,  View, StyleSheet, Dimensions, Text, ToastAndroid, Platform, StatusBar } from 'react-native'
import { Dropdown, Icon, Button, Switch, Radio } from 'beeshell-ls'
import variables from '../common/customTheme'

const window = Dimensions.get('window')
const screenHeight = Platform.OS === 'ios' ? window.height : window.height - StatusBar.currentHeight
const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ marginTop: 12 }}>
    <Text>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

const DirectionRadioGroup = ({ label, value, onValueChange }) => (
  <View style={{ marginTop: 12, display: 'flex' }}>
    <Text>{label}</Text>
    <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      <Radio
        style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        value={value.toString()}
        onChange={onValueChange}>
        <Radio.Item label='up' value={'up'} />
        <Radio.Item label='down' value={'down'} />
        <Radio.Item label='left' value={'left'} />
        <Radio.Item label='right' value={'right'} />
        <Radio.Item label='up,left' value={'up,left'} />
      </Radio>
    </View>
  </View>
)

export default class DropdownScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      value: 2,
      offsetX: 200,
      offsetY: 300,
      offsetX1: 200,
      offsetY1: 400,
      offsetX2: 50,
      offsetY2: 250,
      offsetX3: 50,
      offsetY3: 400,
      offsetX4: 50,
      offsetY4: 350,
      cancelable: true,
      direction: 'down',
      data: [
        {
            label: '综合评分',
            value: 1,
          },
          {
            label: '离我最近',
            value: 2,
          },
          {
            label: '价格最低',
            value: 3
          }
      ]
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
  }

  handleChange = (value: any) => {
    this.setState({
      value: value
    })
    ToastAndroid.show(`onchange事件监听：修改的值为${value}`, 3);
  }

  render () {
    const { value, data } = this.state
    return (
      <ScrollView
        style={styles.body}>
        <View style={styles.container}>

          {/* 切换弹层方向 */}
          <DirectionRadioGroup
            label="切换direction弹出方向"
            value={this.state.direction}
            onValueChange={(v) => {
                const directionData = v.split(',')
                this.setState({ direction: directionData })
                ToastAndroid.show(`弹出方向设置为：${directionData}`, 3);
              }
            }
          />

          {/* 基础示例 */}
          <Button
            style={{ marginTop: 12 }}
            textColorInverse
            size='sm'
            type="primary"
            onPress={() => {
               this.dropdown1.open()
               ToastAndroid.show(`横向位置:${this.state.offsetX}, 纵向位置：${this.state.offsetY}`, 3);
            }}>
            基础示例
          </Button>
          <Dropdown
            ref={(c) => {
              this.dropdown1 = c
            }}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            cancelable={true}
            value={value}
            data={data}
            style={{width: '100%'}}
            screenHeight={screenHeight}
            align={this.state.align}
            direction={this.state.direction}
            fullScreenPatch = {[true, true, true]}
            onChange={ this.handleChange }
          />

          {/* 修改样式 */}
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            textColorInverse
            type="primary"
            onPress={() => {
                this.dropdown2.open()
            }}
          >
            修改样式
          </Button>

          <Dropdown
            ref={c => {
              this.dropdown2 = c
            }}
            offsetX={0}
            style={{ width: window.width, height: 200, backgroundColor: 'red' }}
            checkedIcon={<Icon type='star'></Icon>}
            offsetY={this.state.offsetY2}
            cancelable={true}
            value={value}
            data={data}
            onChange={this.handleChange}
          />

          {/* 弹出内容事件监听 */}
          <Button
            style={{ marginTop: 12 }}
            textColorInverse
            size='sm'
            type="primary"
            onPress={() => {
               this.dropdown3.open()
            }}>
            弹层事件监听
          </Button>
          <Dropdown
            ref={(c) => {
              this.dropdown3 = c
            }}
            offsetX={this.state.offsetX3}
            offsetY={this.state.offsetY3}
            cancelable={true}
            value={value}
            data={data}
            style={{width: '100%'}}
            screenHeight={screenHeight}
            align={this.state.align}
            direction={this.state.direction}
            fullScreenPatch = {[true, true, true]}
            onChange={ this.handleChange }
            onOpened={() => {
              console.log("onOpen");
              ToastAndroid.show(`弹层已打开`, 3);
            }}
            onClosed={() => {
              console.log("onClosed")
              ToastAndroid.show(`弹层已关闭`, 3);
            }}
          />

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL,
  },
  container: {
    fontWeight: 'bold',
    fontSize: 14,
    color: variables.mtdGrayDark,
    paddingBottom: 50,
    marginBottom: 50,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 15,
    color: variables.mtdGrayDark
  },
});