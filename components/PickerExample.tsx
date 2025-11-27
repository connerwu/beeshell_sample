import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { Picker, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  pickerStyle: { backgroundColor: 'red', padding: 30, marginTop: 30 }
})

interface State {
  count: number
}

export default class PickerScreen extends Component<{}, State> {
  [propName: string]: any
  constructor(p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  componentDidMount() { }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>

        <View style={styles.panel}>

          <View style={{ flexDirection: 'row' }}>
            <Picker
              ref={(c) => {
                this.picker1 = c
              }}
              label='甜点饮品'
              disabled={false}
              cancelable={true}
              onToggle={(active) => {
                if (active) {
                  this.picker2.close().catch((e) => {
                    // console.log(e)
                  })
                  this.picker3.close().catch((e) => {
                    // console.log(e)
                  })
                }
              }}>

              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>

            <Picker
              ref={(c) => {
                this.picker2 = c
              }}
              label='筛选'
              disabled={true}
              cancelable={true}>

              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>
          </View>

          <Picker
            ref={(c) => {
              this.picker3 = c
            }}
            label={(active) => {
              const color = active ? variables.mtdBrandDanger : variables.mtdGrayBase
              const size = 16
              return (
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                  <Text style={{ fontSize: size, textAlign: 'center', color, marginRight: 3 }}>
                    自定义 Label 函数
                  </Text>
                  {
                    active ? <Icon type='times' size={size - 3} tintColor={color}></Icon> : <Icon type='question-circle' size={size - 3} tintColor={color}></Icon>
                  }
                </View>
              )
            }}
            disabled={false}
            cancelable={true}
            onToggle={(active) => {
              if (active) {
                this.picker1.close().catch((e) => {
                  // console.log(e)
                })

                this.picker2.close().catch((e) => {
                  // console.log(e)
                })
              }
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                borderTopColor: '#ddd',
                borderTopWidth: StyleSheet.hairlineWidth
              }}>
              <Text>展示 label 为函数的用法</Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
                动态改变文字颜色和图标
              </Text>
            </View>
          </Picker>

          <Picker
            ref={(c) => {
              this.picker4 = c
            }}
            style={{
              backgroundColor: '#f0f8ff',
              borderRadius: 8,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#007AFF'
            }}
            label='自定义样式和图标'
            activeIcon={<Icon type='angle-up' size={14} tintColor='#007AFF' />}
            inactiveIcon={<Icon type='angle-down' size={14} tintColor='#666' />}
            disabled={false}
            cancelable={true}
            onToggle={(active) => {
              Alert.alert('自定义样式和图标', `状态变化: ${active ? '打开' : '关闭'}`)
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                borderTopColor: '#007AFF',
                borderTopWidth: 2
              }}>
              <Text style={{ color: '#007AFF', fontSize: 16 }}>
                自定义样式的内容区域
              </Text>
              <Text style={{ color: '#666', fontSize: 12, marginTop: 10 }}>
                展示了 style、activeIcon、inactiveIcon 属性
              </Text>
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}