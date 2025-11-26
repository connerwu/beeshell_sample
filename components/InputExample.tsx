import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, Alert } from 'react-native'
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
      isFocused: false
    }
  }

  // 用于演示 onBlur 时的表单校验
  validateName = (value: string) => {
    if (!value.trim()) {
      Alert.alert('失焦提示', '姓名不能为空！')
    }
  }

  handleNameFocus = () => {
    // 同时更新聚焦状态（用于改变样式）
    this.setState({ isFocused: true })
  }
  handleNameBlur = (value: string) => {
    this.setState({ isFocused: false });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>1. 基础属性</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='左对齐' hasLine>
            <Input
              value={this.state.name}
              placeholder='请输入姓名'
              autoCorrect={true} // 拼写纠错
              onChange={(value: string) => this.setState({ name: value })}
              onBlur={() => this.validateName(this.state.name)} // 失焦时校验
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='右对齐' hasLine>
            <Input
              textAlign='right'
              value={this.state.address}
              placeholder='请输入地址'
              onChange={(value: string) => this.setState({ address: value })}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='自动聚焦' hasLine>
            <Input
              value={this.state.autoFocusText}
              placeholder='页面加载后自动弹出键盘'
              autoFocus={true} // 开启自动聚焦
              onChange={(value: string) => this.setState({ autoFocusText: value })}
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
            />
          </Form.Item>
        </Form>
        <Text style={styles.header}>3. 输入类型与提示语颜色</Text>
        <Form>
          <Form.Item style={{ paddingVertical: 13 }} label='手机号' hasLine>
            <Input
              value={this.state.phone}
              placeholder='请输入手机号'
              placeholderTextColor='blue' // 自定义占位符颜色
              keyboardType='number-pad' // 数字键盘
              onChange={(value: string) => this.setState({ phone: value })}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='邮箱' hasLine>
            <Input
              value={this.state.email}
              placeholder='请输入邮箱'
              placeholderTextColor='#666'
              keyboardType='email-address'// 邮箱专用键盘
              onChange={(value: string) => this.setState({ email: value })}
            />
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='密码输入(隐藏)' hasLine>
            <Input
                value={this.state.password}
                placeholder='请输入密码'
                secureTextEntry={true} // 密码隐藏属性
                onChange={(value: string) => this.setState({ password: value })}
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
              onChange={(value: string) => this.setState({ name: value })}
            />
          </Form.Item>
             <Form.Item style={{ paddingVertical: 13 }} label='输入长度限制（6位）' hasLine>
                <Input
                value={this.state.maxLengthText}
                placeholder='最多输入6个字符'
                maxLength={6} // 限制最大输入长度为6
                onChange={(value: string) => this.setState({ maxLengthText: value })}
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
    paddingBottom:20
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