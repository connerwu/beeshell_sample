import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Button, Dialog,Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

interface State {
  count: number,
  animatedTranslateX: any,
  animatedTranslateY: any
}

export default class DialogScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      count: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined
    }
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
      <ScrollView style={{ backgroundColor: variables.mtdFillBody,flex: 1 }}>
        <View style={{ paddingHorizontal:variables.mtdHSpacingXL }}>
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
            cancelable={true}
            cancelCallback={() => {
              Alert.alert('取消')
            }}
            confirmCallback={() => {
              Alert.alert('确认')
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
            自定义标题&文本样式
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogX1 = c
            }}
            title='系统提示'
            titleStyle={{ color: variables.mtdBrandDanger, fontSize: 18, fontWeight: '600' }}
            bodyText='确认删除该信息？删除后数据将无法恢复，请谨慎操作～'
            bodyTextStyle={{ fontWeight: '600', color: '#666', lineHeight: 24, fontSize: 15 }}
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
              Alert.alert('我知道了')
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
              fontWeight: 'light',
              fontStyle: 'italic',
              textAlign: 'center',
              textDecorationLine: 'underline'
            }}
            cancelable={true}
            cancelCallback={() => {Alert.alert('取消')}}
            confirmCallback={() => {Alert.alert('确认')}}
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
              <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}>取消删除</Text>
              </View>
            }
            confirmLabel={
              <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'blue', fontSize: 16, fontWeight: '600', textAlign:'center' }}>确认删除</Text>
              </View>
            }
            cancelCallback={() => {Alert.alert('取消删除')}}
            confirmCallback={() => {Alert.alert('确认删除')}}
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
            自定义 header body & footer
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
                  Alert.alert('操作一')
                }
              },
              {
                label: this.getLabel('操作二', 'confirm'),
                type: 'confirm',
                onPress: () => {
                  Alert.alert('操作二')
                }
              },
              {
                label: this.getLabel('操作三', 'cancel'),
                type: 'cancel',
                onPress: () => {
                  Alert.alert('操作三')
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
            自定义 footer 布局
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
                  Alert.alert('操作一')
                }
              },
              {
                labelText: '操作二',
                type: 'confirm',
                onPress: () => {
                  Alert.alert('操作二')
                }
              },
              {
                labelText: '操作三',
                type: 'confirm',
                onPress: () => {
                  Alert.alert('操作三')
                }
              }
            ]}>
          </Dialog>
        </View>
      </ScrollView>
    )
  }
}
