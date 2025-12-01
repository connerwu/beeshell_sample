import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Input, Form, Button, Checkbox, Switch, Radio, BottomModal, Datepicker } from 'beeshell-ls'
import renderSafeArea from 'beeshell-ls/common/utils/renderSafeArea'
import variables from 'beeshell-ls/common/styles/variables'
import validator from 'beeshell-ls/common/utils/validator'

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function ruleName(value: any, targetValue: any) {
  if (!value) {
    return {
      valid: false,
      msg: '请输入姓名'
    }
  }
  value = value.toLowerCase()
  if (value === targetValue) {
    return {
      valid: true
    }
  } else {
    return {
      valid: false,
      msg: '输入姓名无效'
    }
  }
}

function rulePhone(value: any) {
  if (!value) {
    return {
      valid: false,
      msg: '请输入手机号码'
    }
  }

  if (/^\d{11}$/.test(value)) {
    return {
      valid: true,
    }
  } else {
    return {
      valid: false,
      msg: '输入手机号码无效'
    }
  }
}

const validate = validator.dispatch(
  validator.register('name', (key, value, callback) => {
    callback(ruleName(value, 'lulu'))
  }),
  validator.register('phone', (key, value, callback) => {
    callback(rulePhone(value))
  })
)


export default class FormScreen extends Component<{}, any> {
  [propName: string]: any

  constructor(p) {
    super(p)
    const tmpDateDefault = formatDate(new Date())

    this.state = {
      filters: {
        deliveryTime: ['time_1'],
        name: 'Lulu',
        store: '',
        email: '2901829012@qq.com',
        phone: '',
        location: false,
        date: null
      },
      validateResults: {},
      tmpDateDefault: tmpDateDefault,
      tmpDate: null,
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

  handleChangeFilter(...args) {
    this.handleChangeFilterSync(...args) // 同步校验
    // this.handleChangeFilterAsync(...args) // 异步校验
  }

  /**
   * 同步校验
   */
  handleChangeFilterSync(key?, value?) {
    let ret
    validate(key, value, (tmp) => {
      ret = tmp
    })
    this.setState({
      filters: {
        ...this.state.filters,
        [key]: value
      },
      validateResults: {
        ...this.state.validateResults,
        [key]: ret
      }
    })
  }

  /**
   * 异步校验
   */
  handleChangeFilterAsync(key?, value?) {
    validate(key, value, (ret) => {
      this.setState({
        validateResults: {
          ...this.state.validateResults,
          [key]: ret
        }
      })
    })

    this.setState({
      filters: {
        ...this.state.filters,
        [key]: value
      }
    })
  }

  submitData = () => {
    const { filters, validateResults } = this.state

    const promiseArray: Promise<any>[] = [];
    ['name', 'phone'].forEach((key) => {
      promiseArray.push(new Promise<any>((resolve) => {
        validate(key, filters[key], (ret) => {
          resolve({
            [key]: ret
          })
        })
      }))
    })
    Promise.all(promiseArray).then((rets) => {
      let tmp = {}
      rets.forEach((retItem: any) => {
        tmp = {
          ...tmp,
          ...retItem
        }
      })

      this.setState({
        validateResults: {
          ...validateResults,
          ...tmp
        }
      }, () => {
        // 检查验证结果
        const allValid = Object.values(this.state.validateResults).every((result: any) =>
          result && result.valid !== false
        )

        if (allValid) {
          const formData = {
            姓名: filters.name,
            手机号码: filters.phone,
            邮箱: filters.email,
            日期: filters.date || '未选择',
            开启定位: filters.location ? '是' : '否',
            配送时间: filters.deliveryTime.join(', '),
            地址: this.state.address === 1 ? '北京' : '上海'
          }

          const message = Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')

          this.appendEventLog('submitData', `保存成功！表单信息：${message.replace(/\n/g, ', ')}`)
        } else {
          this.appendEventLog('submitData', '验证失败 - 请检查表单信息并重新填写')
        }
      })
    }).catch((e) => {
      console.log(e)
      this.appendEventLog('submitData', '保存失败 - 表单验证过程中出现错误')
    })
  }

  render() {
    const { validateResults, filters } = this.state
    return (
      <ScrollView
        testID='scroller'
        style={styles.body}>
        
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
                    暂无日志，操作表单组件体验回调事件
                  </Text>
                )
              }
            </ScrollView>
          </View>
        </View>

        <Text style={styles.header}>基本信息</Text>
        {/* @ts-ignore */}
        <Form
          testID='form'
          style={{ backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 10, paddingHorizontal: 15 }}
          ref={(ref) => this.form = ref}>
          <Form.Item
            style={{ paddingVertical: 13 }}
            label={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: variables.formItemLabelWidth,
                  marginRight: variables.formItemLabelMarginRight
                }}>
                <Text style={{ color: variables.mtdBrandDanger, marginRight: 2 }}>*</Text>
                <Text>姓名</Text>
                <Icon style={{ marginLeft: 4 }} type='question-circle' size={14} tintColor={variables.mtdGrayLighter}></Icon>
              </View>
            }
            hasLine>
            <Input testID='name' value={this.state.filters.name} placeholder='姓名' onChange={(value) => { 
              this.appendEventLog('onChange', `姓名输入框 - 输入内容: ${value}`)
              this.handleChangeFilter('name', value) 
            }} onBlur={(value) => { 
              this.appendEventLog('onBlur', '姓名输入框 - 失去焦点')
            }} onFocus={(value) => { 
              this.appendEventLog('onFocus', '姓名输入框 - 获得焦点')
            }} />
            {
              validateResults.name && !validateResults.name.valid && (
                <Text testID='nameInfo' style={{ color: variables.mtdBrandDanger }}>{validateResults.name.msg}</Text>
              )
            }
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='手机号码' hasLine>
            <Input testID='phone' placeholder='请填写手机号码' textAlign='right' inputStyle={{ textAlign: 'right' }} value={this.state.filters.phone} onChange={(value) => { 
              this.appendEventLog('onChange', `手机号码输入框 - 输入内容: ${value}`)
              this.handleChangeFilter('phone', value) 
            }} onBlur={(value) => { 
              this.appendEventLog('onBlur', '手机号码输入框 - 失去焦点')
            }} onFocus={(value) => { 
              this.appendEventLog('onFocus', '手机号码输入框 - 获得焦点')
            }} />
            {
              validateResults.phone && !validateResults.phone.valid && (
                <Text testID='phoneInfo' style={{ color: variables.mtdBrandDanger }}>{validateResults.phone.msg}</Text>
              )
            }
            <Text style={{ color: variables.mtdGrayLighter, fontSize: 12, marginTop: 4 }}>该信息非常重要，请认真填写</Text>
          </Form.Item>
          <Form.Item style={{ paddingVertical: 0 }} label='日期' hasLine>
            <TouchableOpacity
              style={{ paddingVertical: variables.mtdVSpacingX3L, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
              testID='date'
              onPress={() => {
                this.appendEventLog('onPress', '日期选择 - 打开日期选择器')
                this._dateModal.open()
              }}>
              <Text style={{ color: variables.mtdGray, marginRight: 5 }}>{filters.date ? filters.date : ' 请点击选择'}</Text>
              {
                filters.date ? <TouchableOpacity
                  testID='dateRemoveIcon'
                  onPress={() => {
                    this.appendEventLog('onPress', '日期选择 - 清除已选日期')
                    this.setState({
                      filters: {
                        ...this.state.filters,
                        date: null
                      },
                      tmpDate: null
                    })
                  }}>
                  <Icon type='trash-o' tintColor={variables.mtdBrandDanger} />
                </TouchableOpacity> : <Icon type='angle-right' size={14} tintColor={variables.mtdGray} />
              }
            </TouchableOpacity>
          </Form.Item>

          <Form.Item label='是否开启定位' hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Switch
                testID='location'
                value={this.state.filters.location}
                onChange={(value) => {
                  this.appendEventLog('onChange', `定位开关 - 切换状态: ${value ? '开启' : '关闭'}`)
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      location: value
                    }
                  })
                }}
              />
            </View>
          </Form.Item>
          <Form.Item label='配送时间' hasLine>
            <View></View>
            <Checkbox
              style={{ marginTop: 5 }}
              value={this.state.filters.deliveryTime}
              onChange={(value) => {
                this.appendEventLog('onChange', `配送时间选择 - 选中项: ${value.join(', ')}`)
              }}
              iconPosition='right'>
              {/* @ts-ignore */}
              <Checkbox.Item label='上午' value='time_1' />
              {/* @ts-ignore */}
              <Checkbox.Item label='下午' value='time_2' />
              {/* @ts-ignore */}
              <Checkbox.Item label='晚上' value='time_3' />
            </Checkbox>
          </Form.Item>

          <Form.Item label='地址'>
            <View></View>
            <Radio
              value={this.state.address || 1}
              onChange={(value) => {
                const addressName = value === 1 ? '北京' : '上海'
                this.appendEventLog('onChange', `地址选择 - 选择: ${addressName}`)
                this.setState({
                  address: value
                })
              }}
              style={{ marginTop: 5 }}
              iconPosition='right'>
              <Radio.Item testID='r1' label='北京' value={1} />
              <Radio.Item testID='r2' label='上海' value={2} />
            </Radio>
          </Form.Item>

          <Form.Item
            label='自定义标签宽度'
            labelWidth={150}
            hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{ color: variables.mtdGray }}>标签宽度为 150px</Text>
            </View>
          </Form.Item>
        </Form>
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Button
              testID='submit'
              textColorInverse
              type='primary'
              onPress={this.submitData}>
              保存
            </Button>
          </View>
        </View>

        {/* @ts-ignore */}
        <BottomModal
          ref={(c) => { this._dateModal = c }}
          title='请选择日期'
          cancelable={true}
          rightCallback={() => {
            this.setState({
              filters: {
                ...this.state.filters,
                date: this.state.tmpDate || this.state.tmpDateDefault
              }
            })
          }}
          onClosed={() => {
            setTimeout(() => {
              this.setState({
                tmpDate: this.state.filters.date || this.state.tmpDateDefault
              })
            })
          }}>
          <View style={{ paddingVertical: 15 }}>
            <Datepicker
              style={{ paddingHorizontal: 50 }}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.state.tmpDate || this.state.tmpDateDefault}
              onChange={(value) => {
                this.appendEventLog('onChange', `日期选择器 - 选择日期: ${value}`)
                this.setState({
                  tmpDate: value
                })
              }}
            />
          </View>
          {renderSafeArea()}
        </BottomModal>
      </ScrollView >
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
  formContainer: {
    paddingHorizontal: variables.mtdHSpacingXL || 20,
  },
  errorText: {
    fontSize: variables.mtdFontSizeS || 12,
    marginTop: variables.mtdVSpacingXS || 4,
    lineHeight: 16,
    color: variables.mtdBrandDanger || '#ff4d4f',
  },
  dateItemWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },

  buttonContainer: {
    paddingVertical: variables.mtdVSpacingL || 16,
    marginHorizontal: variables.mtdHSpacingXL || 20,
  },
});