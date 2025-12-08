import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Button, Dialog, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

interface State {
  count: number,
  animatedTranslateX: any,
  animatedTranslateY: any,
  eventLogs: Array<{
    id: string
    timestamp: string
    event: string
    detail: string
  }>
}

export default class DialogScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      count: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined,
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

  clickHandle(e) {
    this.setState({
      count: this.state.count + 1
    })
    console.warn('clickHandle', Object.keys(e))
  }

  getLabel(label, type) {
    const color = type === 'confirm' ? variables.mtdBrandPrimaryDark : variables.mtdGrayDark
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          paddingHorizontal: 15
        }}>
        <Text style={{ fontSize: 16, color }}>{label}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}>
        <View style={{ paddingHorizontal: variables.mtdHSpacingXL }}>

          {/* 回调日志显示区域 */}
          <View style={{
            marginTop: 20,
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
                      暂无日志，点击按钮打开 Dialog 体验回调事件
                    </Text>
                  )
                }
              </ScrollView>
            </View>
          </View>

          {/* 1. 基础示例 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog1.open()
            }}
          >
            基础
          </Button>
          <Dialog
            ref={(c) => {
              this.dialog1 = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？'
            cancelable={false}
            cancelCallback={() => {
              this.appendEventLog('cancelCallback', '基础 Dialog - 点击取消按钮')
            }}
            confirmCallback={() => {
              this.appendEventLog('confirmCallback', '基础 Dialog - 点击确认按钮')
            }}
          />

          {/* 2. 自定义标题&主体文本样式*/}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogX1.open()
            }}
          >
            自定义标题&自定义文本
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogX1 = c
            }}
            title='系统提示'
            titleStyle={{ color: variables.mtdBrandDanger, fontSize: 18, fontWeight: '600' }}
            bodyText='确认删除该信息？删除后数据将无法恢复，请谨慎操作～'
            bodyTextStyle={{ fontWeight: '600', color: '#666', lineHeight: 24, fontSize: 16 }}
            cancelable={true}
          />

          {/* 3. 一个按钮 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogA.open()
            }}
          >
            一个按钮
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogA = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelable={true}
            cancelLabelText=""
            confirmLabelText='我知道了'
            confirmCallback={() => {
              this.appendEventLog('confirmCallback', '一个按钮 Dialog - 点击我知道了')
            }}
          />

          {/* 4. 自定义按钮样式 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogBtnStyle.open()
            }}
          >
            自定义按钮样式
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogBtnStyle = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            // 按钮文本样式
            cancelLabelText='取消'
            confirmLabelText='确认'
            cancelLabelTextStyle={{
              color: 'red',
              fontSize: 18,
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center'
            }}
            confirmLabelTextStyle={{
              color: 'blue',
              fontSize: 18,
              fontWeight: '100',
              fontStyle: 'italic',
              textAlign: 'center',
              textDecorationLine: 'underline'
            }}
            cancelable={true}
            cancelCallback={() => {
              this.appendEventLog('cancelCallback', '自定义按钮样式 Dialog - 点击取消')
            }}
            confirmCallback={() => {
              this.appendEventLog('confirmCallback', '自定义按钮样式 Dialog - 点击确认')
            }}
          />

          {/* 5. 自定义按钮内容 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogCustomBtn.open()
            }}
          >
            自定义按钮内容
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogCustomBtn = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelLabel={
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>取消删除</Text>
              </View>
            }
            confirmLabel={
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'blue', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>确认删除</Text>
              </View>
            }
            cancelCallback={() => {
              this.appendEventLog('cancelCallback', '自定义按钮内容 Dialog - 点击取消删除')
            }}
            confirmCallback={() => {
              this.appendEventLog('confirmCallback', '自定义按钮内容 Dialog - 点击确认删除')
            }}
          />

          {/* 6. 自定义 header body & footer*/}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog2.open()
            }}
          >
            自定义 header body & operations(默认操作按钮布局'row')
          </Button>
          <Dialog
            ref={(c) => { this.dialog2 = c }}
            // 自定义 header
            header={
              <View style={{ paddingTop: 30, paddingBottom: 10, alignItems: 'center' }}>
                <Icon type='check-circle' size={50} tintColor={variables.mtdBrandSuccess} />
              </View>
            }
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 80 }}>
                  <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity activeOpacity={1}>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            }
            cancelable={true}
            operations={[
              {
                label: this.getLabel('操作一', 'confirm'),
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 header body & footer - 点击操作一')
                }
              },
              {
                label: this.getLabel('操作二', 'confirm'),
                type: 'confirm',
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 header body & footer - 点击操作二')
                }
              },
              {
                label: this.getLabel('操作三', 'cancel'),
                type: 'cancel',
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 header body & footer - 点击操作三')
                }
              }
            ]}>
          </Dialog>

          {/* 7. 自定义 footer 布局 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog3.open()
            }}
          >
            自定义 operationsLayout('column') 布局
          </Button>
          <Dialog
            ref={(c) => { this.dialog3 = c }}
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>自定义内容</Text>
                </View>
              </View>}
            cancelable={true}
            operationsLayout='column'
            operations={[
              {
                labelText: '操作一',
                type: 'cancel',
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 footer 布局 - 点击操作一')
                }
              },
              {
                labelText: '操作二',
                type: 'confirm',
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 footer 布局 - 点击操作二')
                }
              },
              {
                labelText: '操作三',
                type: 'confirm',
                onPress: () => {
                  this.appendEventLog('onPress', '自定义 footer 布局 - 点击操作三')
                }
              }
            ]}>
          </Dialog>
        </View>
      </ScrollView>
    )
  }
}
