import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import { NavigationBar, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

export default class NavigationBarScreen extends Component<{}, any> {

  constructor(p) {
    super(p)
    this.state = {}
  }

  handlePress(msg) {
    this.setState({
      msg
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.header}>基础</Text>
        <NavigationBar
          testID='nav1'
          title='标题'
          backLabelText='返回'
          forwardLabelText='下一步'
          onPressBack={() => {
            this.handlePress('返回')
          }}
          onPressForward={() => {
            this.handlePress('下一步')
          }}>
        </NavigationBar>
        {
          this.state.msg ? <Text testID='text' style={{ margin: 5, textAlign: 'center' }}>
            点击了“{this.state.msg}”按钮
          </Text> : null
        }

        <Text style={styles.header}>自定义文字样式</Text>
        <NavigationBar
          title='标题'
          titleStyle={{ color: variables.mtdBrandInfo }}
          backLabelText='返回'
          backLabelTextStyle={{ color: variables.mtdBrandDanger }}
          forwardLabelText='下一步'
          forwardLabelTextStyle={{ color: variables.mtdBrandSuccess }}>
        </NavigationBar>

        <Text style={styles.header}>自定义返回图标</Text>
        <NavigationBar
          title='标题'
          backLabelText='关闭'
          backLabelIcon={<Icon type='times' tintColor='red' />}
          forwardLabel={<View></View>}>
        </NavigationBar>

        <Text style={styles.header}>自定义样式和背景</Text>
        <NavigationBar
          style={{ backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          title='自定义背景'
          titleStyle={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}
          backLabelText='返回'
          forwardLabelText='完成'>
        </NavigationBar>

        <Text style={styles.header}>自定义比例分配</Text>
        <NavigationBar
          title='左侧区域更大'
          proportion={[3, 2, 1]}
          backLabelText='很长的返回按钮'
          forwardLabelText='确定'>
        </NavigationBar>

        <Text style={styles.header}>自定义标题容器</Text>
        <NavigationBar
          titleContainer={
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon type='star' tintColor='gold' />
              <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                自定义标题
              </Text>
              <Icon type='star' tintColor='gold' />
            </View>
          }
          backLabelText='返回'
          forwardLabelText='完成'>
        </NavigationBar>

        <Text style={styles.header}>自定义返回区域</Text>
        <NavigationBar
          title='自定义返回区域'
          backLabel={
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: '#007AFF',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>←</Text>
              </View>
              <Text style={{ marginLeft: 8, color: '#007AFF' }}>自定义</Text>
            </View>
          }
          forwardLabelText='下一步'>
        </NavigationBar>

        <Text style={styles.header}>自定义渲染函数</Text>
        <NavigationBar
          title='自定义渲染'
          renderItem={(index) => {
            if (index === 0) {
              return (
                <TouchableHighlight
                  onPress={() => this.handlePress('自定义左侧')}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#ff6b6b', padding: 8, borderRadius: 4 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>红色按钮</Text>
                  </View>
                </TouchableHighlight>
              )
            }
            if (index === 1) {
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4ecdc4' }}>
                    完全自定义
                  </Text>
                </View>
              )
            }
            if (index === 2) {
              return (
                <TouchableHighlight
                  onPress={() => this.handlePress('自定义右侧')}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#45b7d1', padding: 8, borderRadius: 4 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>蓝色按钮</Text>
                  </View>
                </TouchableHighlight>
              )
            }
          }}>
        </NavigationBar>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1
  },
  header: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: variables.mtdFillBody,
    fontWeight: 'bold',
    color: variables.mtdGrayDark,
    fontSize: 16,
  }
})