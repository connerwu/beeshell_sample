import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  SafeAreaView,
  Alert
} from 'react-native'
import { Scrollpicker, Datepicker, Timepicker, Button, BottomModal, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'
import star from 'beeshell-ls/common/images/icons/star.png'

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    <Text style={styles.header}>{label}</Text>
    <View style={{ width: 10 }} />
    <Switch value={value} onValueChange={onValueChange} />
  </View>
)

export default class ScrollpickerTestScreen extends React.Component<any, any> {
  [propName: string]: any
  constructor(props) {
    super(props)
    this.state = {
      style: false,
      list: false, // list属性
      value: false,
      proportion: false,
      offsetCount: false,
      onChange: false,
      renderItem: false,
      changeValue: [0, 0],
      time: '',//非属性
      date: ''//非属性
    }
  }

  renderSafeArea() {
    return (
      <View style={{ maxHeight: 30 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: 60 }} />
        </SafeAreaView>
      </View>
    )
  }

  setScrollpickerProps(scrollpickerProps: { [key: string]: any }, key: string) {
    switch (key) {
      case 'style':
        scrollpickerProps[key] = this.state[key]
          ? { backgroundColor: '#18da28ff' }
          : { backgroundColor: '#f7efefff' }
        break
      case 'value':
        scrollpickerProps[key] = this.state[key] ? [2, 1, 2] : this.state.changeValue || [0, 0, 0]
        break
      case 'proportion':
        scrollpickerProps[key] = this.state[key] ? [2, 1, 1] : [1, 1, 1]
        break
      case 'offsetCount':
        scrollpickerProps[key] = this.state[key] ? 2 : 1
        break
      case 'onChange':
        scrollpickerProps[key] = this.state[key]
          ? (colIndex, rowIndex) => {
              Alert.alert('onChange', `col: ${colIndex}, row: ${rowIndex}`)
            }
          : undefined
        break
      case 'renderItem':
        scrollpickerProps[key] = this.state[key]
          ? (item) => (
              <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Icon type="star" size={16} source={star} tintColor={variables.mtdBrandPrimary} />
                <Text style={{ marginLeft: 8 }}>{item.label}</Text>
              </View>
            )
          : undefined
        break
      default:
        break
    }
  }

  render() {
    const scrollpickerProps: { [key: string]: any } = {}
    Object.keys(this.state).forEach((key) => {
      this.setScrollpickerProps(scrollpickerProps, key)
    })

    // 默认列表，如果没有启用自定义列表
    if (!this.state.list) {
      scrollpickerProps.list = [
        ['第一列第一项', '第一列第二项', '第一列第三项'],
        ['第二列第一项', '第二列第二项', '第二列第三项'],
        ['第三列第一项', '第三列第二项', '第三列第三项']
      ]
    } else {
      scrollpickerProps.list = [
        [{ label: 'A1' }, { label: 'A2' }, { label: 'A3' }],
        [{ label: 'B1' }, { label: 'B2' }, { label: 'B3' }],
        [{ label: 'C1' }, { label: 'C2' }, { label: 'C3' }]
      ]
    }

    return (
      <ScrollView style={styles.body} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Scrollpicker 属性测试</Text>

        {/* 开关控制属性 */}
        {['style:自定义样式', 'list:自定义数据源', 'value:选中值', 'proportion:列宽度比', 'offsetCount:上下可见数量', 'onChange:选中值回调', 'renderItem:自定义行渲染'].map((key) => (
          <LabelSwitch
            key={key}
            label={`${key}`}
            value={this.state[key.split(':')[0] ]}
            onValueChange={(value) => this.setState({ [key.split(':')[0]]: value })}
          />
        ))}

        {/* 基础 Scrollpicker */}
        <Button size="sm" style={{ marginTop: 12 }} type="default" onPress={() => this.bottomModalBasic.open()}>
          Scrollpicker 基础
        </Button>
        <BottomModal ref={(c) => { this.bottomModalBasic = c }} title="请选择" cancelable>
          <View style={{ paddingVertical: 15, height: 250 }}>
            <Scrollpicker {...scrollpickerProps} proportion={scrollpickerProps.proportion || [1, 1, 1]} />
          </View>
          {this.renderSafeArea()}
        </BottomModal>

        {/* 时间选择 */}
        <Button size="sm" style={{ marginTop: 12 }} type="default" onPress={() => this.bottomModalTime.open()}>
          Timepicker 时间选择
        </Button>
        <BottomModal ref={(c) => { this.bottomModalTime = c }} title="请选择时间" cancelable>
          <View style={{ paddingVertical: 15, height: 250 }}>
            <Timepicker
              style={scrollpickerProps.style}
              proportion={scrollpickerProps.proportion || [2, 1, 1]}
              value={this.state.time}
              onChange={(value) => this.setState({ time: value })}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>

        {/* 日期选择 */}
        <Button size="sm" style={{ marginTop: 12 }} type="default" onPress={() => this.bottomModalDate.open()}>
          Datepicker 日期选择
        </Button>
        <BottomModal ref={(c) => { this.bottomModalDate = c }} title="请选择日期" cancelable>
          <View style={{ paddingVertical: 15, height: 250 }}>
            <Datepicker
              style={scrollpickerProps.style}
              proportion={scrollpickerProps.proportion || [1, 1, 1]}
              date={this.state.date}
              onChange={(value) => this.setState({ date: value })}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: variables.mtdFillBody },
  container: { paddingHorizontal: 15 },
  header: { fontWeight: 'bold', color: variables.mtdGrayDark, paddingVertical: 6 }
})
