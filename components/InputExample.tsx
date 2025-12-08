import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Input, Form } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

export default class SimpleInputDemo extends Component {
  constructor(p) {
    super(p)
    this.state = {
      basicInput: '',
      customStyleInput: '',
      passwordInput: '',
      textStyleValue:'',
      eventLogs: []
    }
  }

  // 保留日志功能
  appendEventLog = (eventName, detail = '') => {
    const now = new Date()
    const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const entry = {
      id: `${now.getTime()}-${Math.random()}`,
      timestamp,
      event: eventName,
      detail
    }
    this.setState(prev => ({
      eventLogs: [entry].concat(prev.eventLogs).slice(0, 20)
    }))
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        {/* 日志区域 */}
        <View style={styles.logArea}>
          <Text style={styles.logTitle}>操作日志</Text>
          <ScrollView style={styles.logList}>
            {this.state.eventLogs.length ?
              this.state.eventLogs.map(log => (
                <View key={log.id} style={styles.logItem}>
                  <Text style={styles.logEvent}>[{log.timestamp}] {log.event}</Text>
                  {log.detail && <Text style={styles.logDetail}>{log.detail}</Text>}
                </View>
              )) :
              <Text style={styles.emptyLog}>操作输入框查看日志</Text>
            }
          </ScrollView>
        </View>

        {/* 核心属性示例 */}
        <Text style={styles.header}>基础输入框</Text>
        <Form>
          <Form.Item label='基础属性' hasLine>
            <Input
              value={this.state.basicInput}
              placeholder='请输入内容'
              onChange={(value) => {
                this.appendEventLog('onChange', `基础输入框: ${value}`)
                this.setState({ basicInput: value })
              }}
            />
          </Form.Item>
        </Form>

        <Text style={styles.header}>样式自定义</Text>
        <Form>
          <Form.Item label='自定义样式' hasLine>
            <Input
              value={this.state.customStyleInput}
              placeholder='带圆角边框'
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#eee',
                padding: 10
              }}
              onChange={(value) => {
                this.appendEventLog('onChange', `自定义样式输入框: ${value}`)
                this.setState({ customStyleInput: value })
              }}
            />
          </Form.Item>
        </Form>

        <Text style={styles.header}>输入文本样式</Text>
        <Form>
          <Form.Item label='输入文本样式' hasLine>
            <Input
              value={this.state.textStyleValue}
              placeholder='请输入'
              inputStyle={{ fontSize: 20, color: 'red' }}
              onChange={(value) => {
                this.appendEventLog('onChange', `自定义输入文本样式: ${value}`)
                this.setState({ textStyleValue: value })
              }}
            />
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
    padding: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: variables.mtdGrayDark
  },
  logArea: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff8e1',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffe082'
  },
  logTitle: {
    fontSize: 12,
    color: '#ff8f00',
    fontWeight: 'bold'
  },
  logList: {
    height: 120,
    marginTop: 8,
    backgroundColor: '#fffdf3',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe082',
    padding: 8
  },
  logItem: {
    marginBottom: 8
  },
  logEvent: {
    fontSize: 12,
    color: '#ff8f00'
  },
  logDetail: {
    fontSize: 12,
    color: '#795548'
  },
  emptyLog: {
    fontSize: 12,
    color: '#ffb74d'
  }
})