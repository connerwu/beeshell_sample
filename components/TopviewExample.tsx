import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ToastAndroid } from 'react-native'

import { TopviewGetInstance, Button } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

export default class TopviewScreen extends Component<any, any> {
  constructor(p) {
    super(p)
    this.state = {
      fullScreenViewId: null,
      footerId: null,
      testViewId: [], // 新增：用于测试 add/replace/remove
    }
  }

  // 原来的全屏视图
  renderFullScreenView() {
    return (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: variables.mtdFillBackdrop, alignItems: 'center'
      }}>
        <Button
          style={{ marginTop: 400, width: 200 }}
          size='sm' type='primary' textColorInverse
          onPress={() => {
            TopviewGetInstance().remove(this.state.fullScreenViewId)
          }}>
          关闭
        </Button>
      </View>
    )
  }

  // 新增测试浮层
  renderTestView(text: string) {
    return (
      <View style={{
        position: 'absolute', top: 100, left: 50, right: 50, height: 150,
        backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center'
      }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>{text}</Text>
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Button
          size='sm' type='primary' textColorInverse
          onPress={() => {
            TopviewGetInstance().remove(this.state.footerId).then(() => {
              this.setState({ footerId: null })
            })
          }}>
          固定在底部的按钮
        </Button>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>

          {/* 原有按钮 */}
          {/* <Button
            style={{ marginTop: 12 }}
            size='sm' type='primary' textColorInverse
            onPress={() => {
              TopviewGetInstance().add(this.renderFullScreenView()).then((id) => {
                this.setState({ fullScreenViewId: id })
              })
            }}>
            展示全屏遮罩
          </Button> */}

          {/* <Button
            style={{ marginTop: 12 }}
            size='sm' type='primary' textColorInverse
            onPress={() => {
              if (this.state.footerId) return
              TopviewGetInstance().add(this.renderFooter()).then((id) => {
                this.setState({ footerId: id })
              })
            }}>
            展示底部固定按钮
          </Button> */}

          {/* 新增 Topview 对外方法测试按钮 */}
      <Button
        style={{ marginTop: 20 }}
        size='sm' type='info' textColorInverse
        onPress={() => {
          // Add 测试
          TopviewGetInstance().add(this.renderTestView('测试 Add')).then((id) => {
            this.setState(prev => ({
              testViewId: [...prev.testViewId, id]
            }))
          })
        }}>
        测试 Add() + itemId: {this.state.testViewId.length > 0 ? this.state.testViewId[this.state.testViewId.length - 1] : '无'}
      </Button>

      <Button
        style={{ marginTop: 12 }}
        size='sm' type='warning' textColorInverse
        onPress={() => {
          if (this.state.testViewId.length === 0) {
            ToastAndroid.show('请先 Add 浮层再 Replace', 3)
            return
          }
          const lastId = this.state.testViewId[this.state.testViewId.length - 1]
          TopviewGetInstance().replace(this.renderTestView('已 Replace'), lastId)
        }}>
        测试 Replace()  + itemId: {this.state.testViewId.length > 0 ? this.state.testViewId[this.state.testViewId.length - 1] : '无'}
      </Button>

        <Button
          style={{ marginTop: 12 }}
          size='sm' type='danger' textColorInverse
          onPress={() => {
            if (this.state.testViewId.length === 0) {
              ToastAndroid.show('没有可删除的浮层', 3)
              return
            }
            const lastId = this.state.testViewId[this.state.testViewId.length - 1]
            TopviewGetInstance().remove(lastId).then(() => {
              this.setState(prev => ({
                testViewId: prev.testViewId.slice(0, -1)
              }))
            })
          }}>
          测试 Remove()  + itemId: {this.state.testViewId.length > 0 ? this.state.testViewId[this.state.testViewId.length - 1] : '无'}
        </Button>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  container: {
    padding: 16
  }
})
