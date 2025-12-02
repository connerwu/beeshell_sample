import React, { Component } from 'react'
import { ScrollView,  View, StyleSheet, Dimensions, Text } from 'react-native'
import { Dropdown, Icon, Button } from 'beeshell-ls'
import variables from '../common/customTheme'

const window = Dimensions.get('window')

export default class DropdownScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      value: 2,
      offsetX: 50,
      offsetY: 200,
      offsetX2: 50,
      offsetY2: 250,
      offsetX3: 50,
      offsetY3: 300,
      offsetX4: 50,
      offsetY4: 350,
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
          <Button
            style={{ marginTop: 12 }}
            textColorInverse
            size='sm'
            type="primary"
            onPress={() => {
               this.dropdown1.open()
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
            onChange={this.handleChange}
          />

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            textColorInverse
            type="primary"
            onPress={() => {
                this.dropdown2.open()
            }}
          >
            全屏展示
          </Button>

          <Dropdown
            ref={c => {
              this.dropdown2 = c
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
                this.dropdown3.open()
            }}
          >
            往上弹出
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
            onChange={this.handleChange}
          />

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type="primary"
            textColorInverse
            onPress={() => {
                this.dropdown4.open()
            }}
          >
            自定义图标
          </Button>

          <Dropdown
            ref={c => {
              this.dropdown4 = c
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