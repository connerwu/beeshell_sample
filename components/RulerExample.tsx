import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { Picker, Button, Switch, Ruler } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const LabelPicker = ({ label, maps, onValueChange, pickerTitle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Picker label={pickerTitle} style={{ width: 200 }}>
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        {maps.map(v => (
          <Button key={v} onPress={() => onValueChange(v)}>
            {v}
          </Button>
        ))}
      </View>
    </Picker>
  </View>
)

export default class RulerScreen extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      showRuler: true,
      direction: 'vertical',
      style: {}
    }
  }

  updateStyle = (text) => {
    try {
      const json = JSON.parse(text)
      this.setState({ style: json })
    } catch (e) {
      // 无效 JSON 不处理
    }
  }

  render() {
    const { showRuler, direction, style } = this.state

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Ruler 控制台</Text>

        {/* 属性控制 */}
        {/* <LabelSwitch
          label="显示/隐藏"
          value={showRuler}
          onValueChange={v => this.setState({ showRuler: v })}
        /> */}

        <LabelPicker
          label="direction"
          maps={['vertical', 'horizontal']}
          pickerTitle={direction}
          onValueChange={v => this.setState({ direction: v })}
        />

        <LabelPicker
          label="style"
          maps={[
            JSON.stringify({ backgroundColor: '#f5f5f5' }),
            JSON.stringify({ padding: 20 }),
            JSON.stringify({ backgroundColor: '#ffd591', padding: 10 })
          ]}
          pickerTitle={JSON.stringify(style)}
          onValueChange={v => this.updateStyle(v)}
        />

        <View style={styles.panel}>
          <Text style={{ marginBottom: 10, color: variables.mtdGrayDark }}>
            （标尺显示在屏幕上方 Topview 层）
          </Text>
          <Button onPress={() => this.setState({ showRuler: !showRuler })}>
            {showRuler ? '隐藏 Ruler' : '显示 Ruler'}
          </Button>
        </View>

        {/* 预览区域：Ruler 本身不会占这里空间 */}
        {showRuler && (
          <Ruler direction={direction} style={style} />
        )}
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
    padding: 16,
    fontWeight: 'bold',
    color: variables.mtdGrayDark
  },
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    color: variables.mtdGrayDark
  },
  panel: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 10
  }
})
