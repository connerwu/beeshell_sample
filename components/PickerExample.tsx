import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

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
  eventLogs: Array<{
    id: string
    timestamp: string
    event: string
    detail: string
  }>
}

export default class PickerScreen extends Component<{}, State> {
  [propName: string]: any
  constructor(p) {
    super(p)
    this.state = {
      count: 0,
      eventLogs: []
    }
  }

  // 添加事件日志的方法
  appendEventLog = (eventName: string, detail: string = '') => {
    const now = new Date()
    const pad = (value: number) => value.toString().padStart(2, '0')
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    const entry = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      event: eventName,
      detail
    }

    this.setState(prevState => {
      const nextLogs = [entry].concat(prevState.eventLogs || []).slice(0, 50) // 保留最新50条
      return { eventLogs: nextLogs }
    })
  }

  componentDidMount() { }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>

        {/* 回调日志显示区域 */}
        <View style={{
          margin: 15,
          padding: 10,
          backgroundColor: '#fff8e1',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ffe082'
        }}>
          <Text style={{
            fontSize: 12,
            color: '#ff8f00',
            lineHeight: 18,
            fontWeight: 'bold'
          }}>
            回调日志 (最新在顶部，可滚动查看)
          </Text>

          <View style={{
            height: 180,
            marginTop: 8,
            backgroundColor: '#fffdf3',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#ffe082'
          }}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{ padding: 8 }}
            >
              {this.state.eventLogs.length ?
                this.state.eventLogs.map(log => (
                  <View key={log.id} style={{ marginBottom: 8 }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#ff8f00',
                      lineHeight: 18,
                      fontWeight: 'bold'
                    }}>
                      [{log.timestamp}] {log.event}
                    </Text>
                    {log.detail ? (
                      <Text style={{
                        fontSize: 12,
                        color: '#795548',
                        lineHeight: 18
                      }}>
                        {log.detail}
                      </Text>
                    ) : null}
                  </View>
                )) : (
                  <Text style={{
                    fontSize: 12,
                    color: '#ffb74d',
                    lineHeight: 18
                  }}>
                    暂无日志，点击选择器体验回调事件
                  </Text>
                )
              }
            </ScrollView>
          </View>
        </View>

        <View style={styles.panel}>

          <View style={{ flexDirection: 'row' }}>
            {/* @ts-ignore */}
            <Picker
              ref={(c) => {
                this.picker1 = c
              }}
              label='甜点饮品'
              disabled={false}
              cancelable={true}
              onToggle={(active) => {
                const detail = `状态变化: ${active ? '打开' : '关闭'}`
                this.appendEventLog('onToggle', `甜点饮品 - ${detail}`)
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

            {/* @ts-ignore */}
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

          {/* @ts-ignore */}
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
            cancelable={false}
            onToggle={(active) => {
              const detail = `状态变化: ${active ? '打开' : '关闭'}`
              this.appendEventLog('onToggle', `自定义 Label 函数 - ${detail}`)
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

          {/* @ts-ignore */}
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
              const detail = `状态变化: ${active ? '打开' : '关闭'}`
              this.appendEventLog('onToggle', `自定义样式和图标 - ${detail}`)
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