import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Input, Form } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

export default class InputScreen extends Component<any, any> {
  constructor(p) {
    super(p)
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      maxLengthText: '',
      autoFocusText: '',
      isFocused: false,
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

  // 用于演示 onBlur 时的表单校验
  validateName = (value: string) => {
    if (!value.trim()) {
      this.appendEventLog('validation', '姓名校验失败 - 姓名不能为空！')
    } else {
      this.appendEventLog('validation', '姓名校验通过')
    }
  }

  handleNameFocus = () => {
    // 同时更新聚焦状态（用于改变样式）
    this.appendEventLog('onFocus', '自定义样式输入框 - 获得焦点，边框变色')
    this.setState({ isFocused: true })
  }
  handleNameBlur = (value: string) => {
    this.appendEventLog('onBlur', '自定义样式输入框 - 失去焦点，边框恢复')
    this.setState({ isFocused: false });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        
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
                    暂无日志，操作输入框体验回调事件
                  </Text>
                )
              }
            </ScrollView>
          </View>
        </View>

        <Text style={styles.header}>1. 基础属性</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='左对齐' hasLine>
            <Input
              value={this.state.name}
              placeholder='请输入姓名'
              autoCorrect={true}
              onChange={(value: string) => {
                this.appendEventLog('onChange', `左对齐输入框 - 输入内容: ${value}`)
                this.setState({ name: value })
              }}
              onBlur={() => {
                this.appendEventLog('onBlur', '左对齐输入框 - 失去焦点，触发校验')
                this.validateName(this.state.name)
              }} // 失焦时校验
              onFocus={() => {
                this.appendEventLog('onFocus', '左对齐输入框 - 获得焦点')
              }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='右对齐' hasLine>
            <Input
              textAlign='right'
              value={this.state.address}
              placeholder='请输入地址'
              onChange={(value: string) => this.setState({ address: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='居中对齐' hasLine>
            <Input
              textAlign='center'
              value={this.state.name}
              placeholder='文本居中对齐'
              onChange={(value: string) => this.setState({ name: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='自动聚焦' hasLine>
            <Input
              value={this.state.autoFocusText}
              placeholder='页面加载后自动弹出键盘'
              autoFocus={true} // 开启自动聚焦
              onChange={(value: string) => this.setState({ autoFocusText: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
        </Form>

        <Text style={styles.header}>2. 样式自定义</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='自定义样式' hasLine>
            <Input
              value={this.state.name}
              placeholder='带圆角+边框+自定义颜色'
              onChange={(value: string) => this.setState({ name: value })}
              onFocus={this.handleNameFocus}
              onBlur={this.handleNameBlur}
              style={{ // 外层容器样式
                borderRadius: 8,
                borderWidth: 1,
                borderColor: this.state.isFocused ? variables.mtdBrandPrimary : '#eee',
                paddingHorizontal: 10,
              }}
              inputStyle={{ // 输入框文本样式
                fontSize: 16,
                color: variables.mtdGrayDark,
                fontWeight: '500',
                letterSpacing: 1, // 字间距
              }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='禁止编辑' hasLine>
            <Input
              value='这是不可编辑的内容'
              editable={false} // 关闭编辑功能（只能查看，无法输入）
              style={{ backgroundColor: '#f5f5f5' }} // 灰色背景提示不可编辑
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
        </Form>
        <Text style={styles.header}>3. 输入类型与提示语颜色</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='手机号' hasLine>
            <Input
              value={this.state.phone}
              placeholder='请输入手机号'
              placeholderTextColor='blue'
              keyboardType='number-pad' // 数字键盘
              onChange={(value: string) => {
                this.appendEventLog('onChange', `手机号输入框 - 数字键盘输入: ${value}`)
                this.setState({ phone: value })
              }}
              onBlur={() => {
                this.appendEventLog('onBlur', '手机号输入框 - 失去焦点')
              }}
              onFocus={() => {
                this.appendEventLog('onFocus', '手机号输入框 - 获得焦点，弹出数字键盘')
              }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='邮箱' hasLine>
            <Input
              value={this.state.email}
              placeholder='请输入邮箱'
              placeholderTextColor='#666'
              keyboardType='email-address'// 邮箱专用键盘
              onChange={(value: string) => this.setState({ email: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='电话键盘' hasLine>
            <Input
              value={this.state.phone}
              placeholder='电话号码键盘'
              placeholderTextColor='#999'
              keyboardType='phone-pad' // 电话键盘
              onChange={(value: string) => this.setState({ phone: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='默认键盘' hasLine>
            <Input
              value={this.state.name}
              placeholder='默认键盘类型'
              placeholderTextColor='#888'
              keyboardType='default' // 默认键盘
              onChange={(value: string) => this.setState({ name: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='密码输入(隐藏)' hasLine>
            <Input
              value={this.state.password}
              placeholder='请输入密码'
              secureTextEntry={true} // 密码隐藏属性
              onChange={(value: string) => this.setState({ password: value })}
              onBlur={() => { }}
              onFocus={() => { }}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#eee',
                paddingHorizontal: 10,
              }}
            />
          </Form.Item>
        </Form>
        <Text style={styles.header}>4. 清除按钮</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='编辑时显示清除按钮' hasLine>
            <Input
              value={this.state.name}
              placeholder='编辑时显示清除按钮'
              clearButtonMode='while-editing'
              onChange={(value: string) => {
                this.appendEventLog('onChange', `清除按钮输入框 - 输入内容: ${value}`)
                this.setState({ name: value })
              }}
              onBlur={() => {
                this.appendEventLog('onBlur', '清除按钮输入框 - 失去焦点')
              }}
              onFocus={() => {
                this.appendEventLog('onFocus', '清除按钮输入框 - 获得焦点，显示清除按钮')
              }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='从不显示清除按钮' hasLine>
            <Input
              value={this.state.email}
              placeholder='从不显示清除按钮'
              clearButtonMode='never'
              onChange={(value: string) => this.setState({ email: value })}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='输入长度限制（6位）' hasLine>
            <Input
              value={this.state.maxLengthText}
              placeholder='最多输入6个字符'
              maxLength={6} // 限制最大输入长度为6
              onChange={(value: string) => this.setState({ maxLengthText: value })}
              onBlur={() => { }}
              onFocus={() => { }}
              style={{ position: 'relative' }}
            />
            <Text style={styles.lengthTip}>
              {this.state.maxLengthText.length}/6
            </Text>
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
    paddingBottom: 20
  },
  header: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: variables.mtdFillBody,
    fontWeight: 'bold',
    color: variables.mtdGrayDark,
    fontSize: 16,
  },
  lengthTip: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 12,
    color: variables.mtdGrayLighter,
  },
})