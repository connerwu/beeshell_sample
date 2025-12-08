import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import { NavigationBar, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

export default class NavigationBarPropsDemo extends Component<{}, any> {
  constructor(p) {
    super(p)
    this.state = {
      msg: ''
    }
  }

  handlePress = (msg) => {
    this.setState({ msg })
  }

  render() {
    return (
      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* 1. 基础属性示例（title/backLabelText/forwardLabelText） */}
        <Text style={styles.sectionHeader}>1. 基础属性（title/backLabelText/forwardLabelText）</Text>
        <NavigationBar
          title="标题"
          backLabelText="返回"
          forwardLabelText="下一步"
          onPressBack={() => this.handlePress('返回')}
          onPressForward={() => this.handlePress('下一步')}
        />
        {this.state.msg ? (
          <Text style={styles.msgText}>点击了“{this.state.msg}”区域</Text>
        ) : null}


        {/* 2. style属性：自定义样式 */}
        <Text style={styles.sectionHeader}>2. style：自定义容器样式</Text>
        <NavigationBar
          style={{ 
            backgroundColor: 'pink', 
            borderBottomWidth: 2, 
            borderBottomColor: '#007AFF' 
          }}
          title="标题"
          backLabelText="返回"
          forwardLabelText="下一步"
        />


        {/* 3. titleContainer：自定义中间区域内容 */}
        <Text style={styles.sectionHeader}>3. titleContainer：自定义中间区域内容</Text>
        <NavigationBar
          titleContainer={
            <View style={styles.customTitleContainer}>
              <Icon type="star" tintColor="#FFD700" size={18} />
              <Text style={styles.customTitleText}>自定义中间区域</Text>
              <Icon type="star" tintColor="#FFD700" size={18} />
            </View>
          }
          backLabelText="返回"
          forwardLabelText="完成"
        />


        {/* 4. backLabel：自定义左边区域内容 */}
        <Text style={styles.sectionHeader}>4. backLabel：自定义左边区域内容</Text>
        <NavigationBar
          title="标题"
          backLabel={
            <View style={styles.customBackLabel}>
              <View style={styles.customBackIcon}>
                <Text style={styles.iconText}>←</Text>
              </View>
              <Text style={styles.backLabelText}>自定义返回</Text>
            </View>
          }
          forwardLabelText="下一步"
          onPressBack={() => this.handlePress('自定义左边区域')}
        />


        {/* 5. backLabelTextStyle：左边区域文案样式 */}
        <Text style={styles.sectionHeader}>5. backLabelTextStyle：左边区域文案样式</Text>
        <NavigationBar
          title="标题"
          backLabelText="返回"
          backLabelTextStyle={{ 
            color: '#FF6347', 
            fontSize: 20, 
            fontWeight: 'bold' 
          }}
          forwardLabelText="下一步"
        />


        {/* 6. backLabelIcon：自定义左边区域图标 */}
        <Text style={styles.sectionHeader}>6. backLabelIcon：自定义左边区域图标</Text>
        <NavigationBar
          title="标题"
          backLabelText="返回"
          backLabelIcon={<Icon type="times" tintColor="#FF4500" size={20} />}
        />


        <Text style={styles.sectionHeader}>7. forwardLabel：自定义右边区域内容</Text>
        <NavigationBar
          title="标题"
          backLabelText="返回"
          forwardLabel={
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <Icon type="check-circle" tintColor="#4CAF50" size={18} />
              <TouchableHighlight
                onPress={() => this.handlePress('forwardLabel：确认按钮')}
                style={{ marginLeft: 5 }}
              >
                <Text style={{ color: '#4CAF50', fontSize: 15, fontWeight: 'bold' }}>
                  确认
                </Text>
              </TouchableHighlight>
            </View>
          }
        />


        {/* 8. forwardLabelTextStyle：右边区域文案样式 */}
        <Text style={styles.sectionHeader}>8. forwardLabelTextStyle：右边区域文案样式</Text>
        <NavigationBar
          title="标题"
          backLabelText="返回"
          forwardLabelText="完成"
          forwardLabelTextStyle={{ 
            color: '#32CD32', 
            fontSize: 15, 
            fontWeight: 'bold' 
          }}
        />


        {/* 9. proportion：渲染区域布局占比 */}
        <Text style={styles.sectionHeader}>9. proportion：区域布局占比（示例：[3,2,1]）</Text>
        <NavigationBar
          title="标题"
          proportion={[3, 2, 1]}
          backLabelText="返回"
          forwardLabelText="确认"
        />


        {/* 10. renderItem：自定义每个渲染区域 */}
        <Text style={styles.sectionHeader}>10. renderItem：自定义每个区域</Text>
        <NavigationBar
          renderItem={(index) => {
            switch (index) {
              case 0:
                return (
                  <TouchableHighlight
                    onPress={() => this.handlePress('自定义左侧')}
                    style={styles.customRenderLeft}
                  >
                    <Text style={styles.renderBtnText}>左按钮</Text>
                  </TouchableHighlight>
                )
              case 1:
                return (
                  <View style={styles.customRenderMiddle}>
                    <Text style={styles.renderMiddleText}>自定义中间</Text>
                  </View>
                )
              case 2:
                return (
                  <TouchableHighlight
                    onPress={() => this.handlePress('自定义右侧')}
                    style={styles.customRenderRight}
                  >
                    <Text style={styles.renderBtnText}>右按钮</Text>
                  </TouchableHighlight>
                )
              default:
                return null
            }
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1
  },
  sectionHeader: {
    padding: 15,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    color: variables.mtdGrayDark,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5
  },
  msgText: {
    margin: 10,
    textAlign: 'center',
    color: variables.mtdGray,
    fontSize: 14
  },
  // 自定义titleContainer样式
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customTitleText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  // 自定义backLabel样式
  customBackLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  customBackIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  backLabelText: {
    marginLeft: 8,
    color: '#007AFF'
  },
  // 自定义forwardLabel样式
  customForwardBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10
  },
  forwardBtnText: {
    color: 'white',
    fontSize: 14
  },
  // 自定义renderItem样式
  customRenderLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    height: '100%'
  },
  customRenderMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  customRenderRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45B7D1',
    height: '100%'
  },
  renderBtnText: {
    color: 'white',
    fontSize: 14
  },
  renderMiddleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ECDC4'
  }
})