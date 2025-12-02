import React, { Component } from 'react'
import { ScrollView, View, Text, Platform, Alert, ToastAndroid } from 'react-native'

import { Button, Modal, Input } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const contentContainerPositions = [
  ['top', 'left'],
  ['top'],
  ['top', 'right'],
  ['left'],
  ['center'],
  ['right'],
  ['bottom', 'left'],
  ['bottom'],
  ['bottom', 'right']
]

export default class ModalScreen extends Component<{}, any> {
  [prpsName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      contentContainerPositionIndex: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined,
      foo: 0,
      inputInfo2: '2222'
    }
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     foo: this.state.foo + 1
    //   })
    // }, 1000)
  }

  render() {
    const contentContainerPosition = contentContainerPositions[this.state.contentContainerPositionIndex]
    const alignItems = contentContainerPosition.indexOf('top') !== -1 ? 'flex-start' : (
      contentContainerPosition.indexOf('bottom') !== -1 ? 'flex-end' : 'center'
    )
    const justifyContent = contentContainerPosition.indexOf('left') !== -1 ? 'flex-start' : (
      contentContainerPosition.indexOf('right') !== -1 ? 'flex-end' : 'center'
    )

    return (
      <ScrollView
        style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: variables.mtdHSpacingXL }}>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modal1.open()
          }}>
          基础
        </Button>
        <Modal
          ref={c => {
            this.modal1 = c
          }}
          cancelable>

          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容{this.state.foo || ''}</Text>
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modal3.open()
          }}>
          横向拉伸，水平外边距 40px
        </Button>
        <Modal
          ref={c => {
            this.modal3 = c
          }}
          cancelable
          style={{
            flex: 1,
            marginHorizontal: 40
          }}>
          <View style={{ minWidth: 100, height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>

        <Button
          ref={(c) => {
            this.btnEl = c
          }}
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            if (Platform.OS !== 'web') {
              this.setState({
                animatedTranslateX: 200,
                animatedTranslateY: 300
              }, () => {
                this.modal4.open()
              })
            } else {
              this.setState({
                animatedTranslateX: 190,
                animatedTranslateY: 150
              }, () => {
                this.modal4.open()
              })
            }
          }}>
          自定义展示位置与弹出位置
        </Button>
        <Modal
          ref={c => {
            this.modal4 = c
          }}
          animatedTranslateX={this.state.animatedTranslateX || undefined}
          animatedTranslateY={this.state.animatedTranslateY || undefined}
          cancelable
          containerStyle={{
            alignItems,
            justifyContent,
          }}
          style={{
            marginTop: contentContainerPosition.indexOf('top') !== -1 ? 90 : null,
            marginBottom: contentContainerPosition.indexOf('bottom') !== -1 ? 90 : null,
            marginLeft: contentContainerPosition.indexOf('left') !== -1 ? 20 : null,
            marginRight: contentContainerPosition.indexOf('right') !== -1 ? 20 : null
          }}
          onClosed={() => {
            this.setState({
              contentContainerPositionIndex: (this.state.contentContainerPositionIndex + 1) % contentContainerPositions.length
            })
          }}>
          <View style={{ width: 200, height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>位置：{contentContainerPosition.join(',')}</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalA.open()
          }}>
          自定义 offset
        </Button>
        <Modal
          ref={c => {
            this.modalA = c
          }}
          offsetY={300}
          offsetX={50}
          cancelable
          scrollable>

          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalX.open()
          }}>
          内容溢出可滚动
        </Button>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalBackdrop.open()
          }}>
          自定义背景色 + 回调事件
        </Button>
        <Modal
          ref={c => {
            this.modalX = c
          }}
          scrollable
          style={{ marginVertical: 150 }}
          cancelable>
          <View
            style={{
              width: 200,
              height: 1000,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
            <Input
              style={{ width: '100%' }}
              value={this.state.inputInfo2}
              onChange={(value) => {
                this.setState({
                  inputInfo2: value
                })
              }}
            />
          </View>
        </Modal>

        <Modal
          ref={c => {
            this.modalBackdrop = c
          }}
          cancelable
          backdropColor="rgba(255, 0, 0, 0.3)"
          screenWidth={300}
          screenHeight={600}
          onOpen={() => {
            // Alert.alert('回调事件', 'Modal 开始打开')
            ToastAndroid.show(`回调事件 : Modal 开始打开`, 3);
          }}
          onOpened={() => {
            // Alert.alert('回调事件', 'Modal 打开完成')
            ToastAndroid.show(`回调事件 : Modal 打开完成`, 3);
          }}
          onClose={() => {
            // Alert.alert('回调事件', 'Modal 开始关闭')
            ToastAndroid.show(`回调事件 : Modal 开始关闭`, 3);
          }}
          onClosed={() => {
            // Alert.alert('回调事件', 'Modal 关闭完成')
            ToastAndroid.show(`回调事件 : Modal 关闭完成`, 3);
          }}>
          <View
            style={{
              width: 250,
              height: 150,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              padding: 20
            }}>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              红色背景遮罩
            </Text>
            <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
              自定义屏幕尺寸 300x600
            </Text>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}