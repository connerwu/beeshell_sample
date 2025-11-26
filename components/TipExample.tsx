import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native'
import { Button, Tip, Picker, Switch } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

/** --- 公共 LabelPicker，与 TimePicker 一致 --- */
const LabelPicker = ({ label, value, maps, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{value}</Text>
    <Picker
      label={label}
      value=""
      style={{ width: 260 }}
      onChange={v => onChange(v[0])}
    >
      <View style={{ backgroundColor: '#fff', padding: 12 }}>
        {maps.map((v, i) => (
          <Button
            key={i}
            style={{ marginVertical: 8 }}
            onPress={() => onChange(v)}
          >
            {Array.isArray(v) ? v.join(',') : String(v)}
          </Button>
        ))}
      </View>
    </Picker>
  </View>
)

/** Tip 可用位置 */
const positions = [
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

export default class TipScreen extends Component<any, any> {
  [propName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      body: '这是一个 Tip 示例',
      duration: 2000,
      position: 'center',
      cancelable: true,
      positionIndex: 0
    }
  }

  /** 显示 Tip 实例方法 */
  showTip = () => {
    const { body, duration, position, cancelable } = this.state
    Tip.show(body, duration, cancelable, position)
  }

  componentDidMount() {
    Tip.show('API 调用方式：Tip.show', 3000, false, 'center')
    Tip.show('API 调用方式，自定义位置', 2000, true, ['left', 'bottom'])
  }

  render() {
    const { body, duration, position, cancelable } = this.state

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Tip Demo（可调参数 + 方法测试）</Text>

        {/* --- 可调参数 Tip --- */}
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>可调参数 Tip</Text>

        <View style={styles.row}>
          <Text style={styles.label}>body</Text>
          <TextInput
            style={styles.input}
            value={body}
            onChangeText={t => this.setState({ body: t })}
            placeholder="提示内容"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>duration</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(duration)}
            onChangeText={t => this.setState({ duration: Number(t) || 0 })}
            placeholder="自动关闭时间（毫秒）"
          />
        </View>

        <LabelPicker
          label="position"
          value={Array.isArray(position) ? position.join(',') : position}
          maps={positions}
          onChange={v => this.setState({ position: v })}
        />

        <View style={styles.row}>
          <Text style={styles.label}>cancelable</Text>
          <Switch
            value={cancelable}
            onChange={v => this.setState({ cancelable: v })}
          />
        </View>

        <Button type="primary" textColorInverse onPress={this.showTip} style={{ marginTop: 10 }}>
          显示 Tip
        </Button>

        {/* --- 自定义内容 Tip --- */}
        <Text style={{ fontWeight: 'bold', marginVertical: 15 }}>自定义内容 Tip</Text>
        <Button
          type="primary"
          textColorInverse
          onPress={() => this.tipCustom.open()}
        >
          显示自定义内容 Tip
        </Button>

        <Tip
          ref={c => (this.tipCustom = c)}
          body={
            <View>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>
                加载中...
              </Text>
            </View>
          }
          duration={1500}
          cancelable={false}
        />

        {/* --- Tip 实例方法测试 --- */}
        <Text style={{ fontWeight: 'bold', marginVertical: 15 }}>Tip 实例方法测试</Text>

        <Button
          size="sm"
          type="primary"
          textColorInverse
          onPress={() => this.tip1.open()}
        >
          基础 Tip open
        </Button>
        <Tip ref={c => (this.tip1 = c)} body="信息删除成功！" cancelable={true} />

        <Button
          size="sm"
          style={{ marginTop: 10 }}
          type="secondary"
          textColorInverse
          onPress={() => {
            this.tip1.init({
              ...this.tip1.props,
              position: ['top', 'right'],
              body: '调用 init 修改位置和内容'
            })
            this.tip1.open()
          }}
        >
          调用 init()
        </Button>

        <Button
          size="sm"
          style={{ marginTop: 10 }}
          type="secondary"
          textColorInverse
          onPress={() => {
            const content = this.tip1.getContent(<Text>自定义 getContent 内容</Text>)
            Alert.alert('getContent 输出', JSON.stringify(content), [{ text: '确定' }])
            console.log(content)
          }}
        >
          调用 getContent()
        </Button>

        <Button
          size="sm"
          style={{ marginTop: 10 }}
          type="secondary"
          textColorInverse
          onPress={() => {
            const bodyContent = this.tip1.getBody('自定义 getBody 内容')
            Alert.alert('getBody 输出', JSON.stringify(bodyContent), [{ text: '确定' }])
          }}
        >
          调用 getBody()
        </Button>

        <Button
          size="sm"
          style={{ marginTop: 10 }}
          type="secondary"
          textColorInverse
          onPress={() => this.tip1.open('自定义 open 内容')}
        >
          调用 open()
        </Button>

        {/* --- Tip 静态方法测试 --- */}
        <Text style={{ fontWeight: 'bold', marginVertical: 15 }}>Tip 静态方法测试</Text>

        <Button
          size="sm"
          style={{ marginBottom: 10 }}
          type="primary"
          textColorInverse
          onPress={() => {
            Tip.show('调用 Tip.show 静态方法', 2000, true, 'center')
          }}
        >
          Tip.show()
        </Button>

        <Button
          size="sm"
          type="secondary"
          textColorInverse
          onPress={() => {
            Tip.hide()
          }}
        >
          Tip.hide()
        </Button>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
    padding: variables.mtdHSpacingXL
  },
  header: {
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    fontSize: 15,
    color: '#666',
    flex: 1
  },
  input: {
    width: 180,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd'
  }
})
