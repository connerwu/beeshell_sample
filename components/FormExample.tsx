import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input, Form, Radio, Checkbox, Button } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'


export default class FormScreen extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    address: 1,
    hobbies: ['reading'],
    gender: 'male'
  }

  handleInputChange = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  render() {
    const { name, phone, email } = this.state

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Form - 表单</Text>

        {/* Form 组件展示 style 属性 */}
        {/* @ts-ignore */}
        <Form style={styles.formStyle}>

          {/* Form.Item 默认 labelWidth - 不设置 labelWidth 属性 */}
          <Form.Item
            style={styles.itemStyle}
            label="姓名"
            hasLine>
            <Input
              value={name}
              placeholder="默认labelWidth"
              onChange={(value) => this.handleInputChange('name', value)}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>

          <Form.Item
            style={styles.itemStyle}
            label="labelWidth为200"
            labelWidth={200}
            hasLine>
            <Input
              value={phone}
              placeholder="labelWidth"
              onChange={(value) => this.handleInputChange('phone', value)}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>

          <Form.Item
            style={styles.itemStyle}
            label="电子邮箱地址"
            hasLine={false}>
            <Input
              value={email}
              placeholder="无分割线"
              onChange={(value) => this.handleInputChange('email', value)}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>

          {/* Form.Item 卡片样式 - 新增的不同样式示例 */}
          <Form.Item
            style={styles.itemStyleCard}
            label="自定义Form.Item样式"
            labelWidth={100}>
            <Text style={styles.cardText}>蓝色卡片风格，带阴影和边框</Text>
          </Form.Item>

          {/* Form.Item label 为 ReactElement 示例 */}
          <Form.Item
            style={styles.itemStyle}
            label={
              <View style={styles.reactElementLabel}>
                <Text style={styles.labelIcon}>⭐</Text>
                <Text style={styles.labelText}>重要信息</Text>
                <View style={styles.labelBadge}>
                  <Text style={styles.badgeText}>必填</Text>
                </View>
              </View>
            }
            labelWidth={150}
            hasLine>
            <Input
              value=""
              placeholder="label为ReactElement类型"
              onChange={() => { }}
              onBlur={() => { }}
              onFocus={() => { }}
            />
          </Form.Item>

          {/* Form.Item children 属性展示 - ReactChild 单个子元素 */}
          <Form.Item
            style={styles.itemStyle}
            label="children 属性展示 - ReactChild 单个子元素 "
            hasLine={true}>
            <Text style={styles.singleChildText}>ReactChild - 单个文本元素</Text>
          </Form.Item>

          {/* Form.Item children 属性展示 - ReactChild[] 实际案例：Radio组件 */}
          <Form.Item
            style={styles.itemStyle}
            label="children 属性展示 - ReactChild[]"
            hasLine>
            <View></View>
            <Radio
              value={this.state.address}
              onChange={(value) => {
                this.handleInputChange('address', value)
              }}
              style={{ marginTop: 5 }}
              iconPosition='right'>
              <Radio.Item label='北京' value={1} />
              <Radio.Item label='上海' value={2} />
              <Radio.Item label='广州' value={3} />
            </Radio>
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdBackgroundColor || '#f5f5f5',
  },
  header: {
    fontSize: variables.mtdFontSizeXL || 18,
    fontWeight: '600',
    color: variables.mtdTextColorPrimary || '#333333',
    marginHorizontal: variables.mtdHSpacingXL || 20,
    marginTop: variables.mtdVSpacingXL || 20,
    marginBottom: variables.mtdVSpacingL || 16,
  },
  // Form 组件的 style 属性
  formStyle: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Form.Item 组件的 style 属性
  itemStyle: {
    paddingVertical: 15,
    minHeight: 50,
  },
  // Form.Item 卡片样式 - 新增的不同样式
  itemStyleCard: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: 65,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#4169e1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#e6f3ff',
  },
  // ReactChild 单个子元素样式
  singleChildText: {
    fontSize: 14,
    color: variables.mtdBrandPrimary || '#1890ff',
    textAlign: 'right',
    fontWeight: '500',
  },
  // 卡片样式文本
  cardText: {
    fontSize: 14,
    color: '#4169e1',
    textAlign: 'right',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  // ReactElement label 样式
  reactElementLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  labelIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  labelText: {
    fontSize: 14,
    color: variables.mtdTextColorPrimary || '#333333',
    fontWeight: '500',
    marginRight: 8,
  },
  labelBadge: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  // labelWidth 演示样式
  labelWidthDemo: {
    fontSize: 14,
    color: variables.mtdGray || '#666666',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  // 按钮容器 - ReactChild[] 实际案例
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: variables.mtdBrandPrimary || '#1890ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  // 混合内容容器 - 实际案例
  mixedRealContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: variables.mtdGray || '#666666',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#52c41a',
    borderRadius: 4,
    marginRight: 8,
  },
  smallButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  smallButtonText: {
    fontSize: 12,
    color: variables.mtdGray || '#666666',
  },
  // 属性说明区域
  propsContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: variables.mtdBrandPrimary || '#1890ff',
  },
  // labelWidth 对比说明区域
  labelWidthContainer: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#52c41a',
  },
  // children 类型说明区域
  childrenTypesContainer: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  propsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: variables.mtdTextColorPrimary || '#333333',
    marginBottom: 10,
  },
  propsText: {
    fontSize: 14,
    color: variables.mtdGray || '#666666',
    lineHeight: 22,
    marginBottom: 4,
  },
});