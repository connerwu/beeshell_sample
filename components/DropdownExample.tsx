import React, { Component } from 'react'
import { ScrollView,  View, StyleSheet, Dimensions, Text, ToastAndroid } from 'react-native'
import { Dropdown, Icon, Button, Switch } from 'beeshell-ls'
import variables from '../common/customTheme'

const window = Dimensions.get('window')

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ marginTop: 12 }}>
    <Text>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

export default class DropdownScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      value: 2,
      offsetX: 50,
      offsetY: 200,
      offsetX1: 200,
      offsetY1: 400,
      offsetX2: 50,
      offsetY2: 250,
      offsetX3: 50,
      offsetY3: 400,
      offsetX4: 50,
      offsetY4: 350,
      cancelable: true,
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
  }

  render () {
    const { value, data } = this.state
    return (
      <ScrollView
        style={styles.body}>
        <View style={styles.container}>

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
            fullScreenPatch = {[true, true, true]}
            onChange={ this.handleChange }
          />

          {/* 修改弹出位置 */}
          <Button
            style={{ marginTop: 12 }}
            textColorInverse
            size='sm'
            type="primary"
            onPress={() => {
               this.dropdown2.open()
               ToastAndroid.show(`横向位置:${this.state.offsetX1}, 纵向位置：${this.state.offsetY1}`, 3);
            }}>
            修改弹出位置
          </Button>
          <Dropdown
            ref={(c) => {
              this.dropdown2 = c
            }}
            offsetX={this.state.offsetX1}
            offsetY={this.state.offsetY1}
            cancelable={true}
            value={value}
            data={data}
            fullScreenPatch = {[true, true, true]}
            onChange={ this.handleChange }
          />

          {/* 修改弹出方向 */}
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type="primary"
            textColorInverse
            onPress={() => {
              this.dropdown3.open()
              ToastAndroid.show('弹出方向向上', 3);
            }}
          >
            弹出方向向上
          </Button>
          <Dropdown
            ref={c => {
              this.dropdown3 = c
            }}
            offsetX={this.state.offsetX3}
            offsetY={this.state.offsetY3}
            direction='up'
            cancelable={true}
            value={value}
            data={data}
            onChange={ this.handleChange }
          />

          {/* 切换弹层关闭状态 */}
          <LabelSwitch
            label="切换弹层可关闭状态"
            value={this.state.cancelable}
            onValueChange={(v) => {
                this.setState({ cancelable: v })
                if(v) {
                  ToastAndroid.show(`点击弹层区域可以关闭`, 3);
                } else {
                  ToastAndroid.show(`点击弹层区域不可以关闭`, 3);
                }
              }
            }
          />
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type="primary"
            textColorInverse
            onPress={() => {
              this.dropdown4.open()
              ToastAndroid.show('弹出方向向上', 3);
            }}
          >
            切换弹层关闭状态
          </Button>
          <Dropdown
            ref={c => {
              this.dropdown4 = c
            }}
            offsetX={this.state.offsetX3}
            offsetY={this.state.offsetY3}
            fullScreenPatch={[true, false, false]}
            direction='down'
            cancelable={this.state.cancelable}
            value={value}
            data={data}
            onChange={ this.handleChange }
          />

          {/* 全屏展示 */}
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            textColorInverse
            type="primary"
            onPress={() => {
                this.dropdown5.open()
            }}
          >
            全屏展示
          </Button>

          <Dropdown
            ref={c => {
              this.dropdown5 = c
            }}
            offsetX={0}
            style={{ width: window.width, height: 200 }}
            offsetY={this.state.offsetY2}
            cancelable={true}
            value={value}
            data={data}
            onChange={this.handleChange}
          />

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type="primary"
            textColorInverse
            onPress={() => {
                this.dropdown6.open()
            }}
          >
            自定义图标
          </Button>

          <Dropdown
            ref={c => {
              this.dropdown6 = c
            }}
            checkedIcon={<Icon type='star'></Icon>}
            offsetX={this.state.offsetX4}
            offsetY={this.state.offsetY4}
            cancelable={true}
            value={value}
            data={data}
            onChange={this.handleChange}
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
    paddingHorizontal: variables.mtdHSpacingXL
  },
  container: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 30,
    color: variables.mtdGrayDark
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 15,
    color: variables.mtdGrayDark
  },
});