import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { Button, Icon, Actionsheet } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  panel: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 20,
  },
  configPanel: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  valueText: {
    fontSize: 14,
    color: variables.mtdBrandPrimary,
  },
})

type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'text'

type ButtonSize = 'sm' | 'md' | 'lg'

type ChildrenPreset = 'text' | 'iconText' | 'empty' | 'longText'

const TYPE_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Text', value: 'text' },
]

const SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]

const CHILDREN_PRESETS = [
  { label: '普通文本', value: 'text' },
  { label: '带图标文本', value: 'iconText' },
  { label: '空内容', value: 'empty' },
  { label: '长文本', value: 'longText' },
]

interface State {
  type: ButtonType
  size: ButtonSize
  disabled: boolean
  textColorInverse: boolean
  clickCount: number
  childrenPreset: ChildrenPreset
}

export default class ButtonScreen extends Component<{}, State> {
  // Refs for Actionsheets
  private typeSheetRef: any = null
  private sizeSheetRef: any = null
  private childrenSheetRef: any = null

  constructor(props: any) {
    super(props)
    this.state = {
      type: 'primary',
      size: 'md',
      disabled: false,
      textColorInverse: true,
      clickCount: 0,
      childrenPreset: 'text',
    }
  }

  handlePress = () => {
    if (!this.state.disabled) {
      this.setState((prevState) => ({
        clickCount: prevState.clickCount + 1,
      }))
    }
  }

  getButtonChildren = (): React.ReactNode => {
    const { childrenPreset } = this.state
    switch (childrenPreset) {
      case 'iconText':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type="check" size={14} />
            <Text>确认</Text>
          </View>
        )
      case 'empty':
        return null
      case 'longText':
        return '这是一个很长的按钮文本用于测试换行和布局'
      case 'text':
      default:
        return '按钮预览'
    }
  }

  render() {
    const {
      type,
      size,
      disabled,
      textColorInverse,
      clickCount,
      childrenPreset,
    } = this.state

    const buttonChildren = this.getButtonChildren()

    const fixedButtonStyle = {
      borderWidth: 1,
      borderColor: variables.mtdBrandPrimary,
    }

    const fixedButtonTextStyle = {
      fontWeight: '600',
    }

    const currentTypeLabel = TYPE_OPTIONS.find(opt => opt.value === type)?.label || 'Primary'
    const currentSizeLabel = SIZE_OPTIONS.find(opt => opt.value === size)?.label || 'Medium'
    const currentChildrenLabel = CHILDREN_PRESETS.find(opt => opt.value === childrenPreset)?.label || '普通文本'

    return (
      <ScrollView style={styles.body}>
        {/* 预览区 */}
        <View style={styles.panel}>
          <Button
            testID="preview-button"
            type={type}
            size={size}
            disabled={disabled}
            textColorInverse={textColorInverse}
            style={fixedButtonStyle}
            textStyle={fixedButtonTextStyle}
            onPress={this.handlePress}
          >
            {buttonChildren}
          </Button>
          {clickCount > 0 && (
            <Text testID="click-count" style={{ marginTop: 10 }}>
              已点击：{clickCount} 次
            </Text>
          )}
        </View>

        {/* 配置面板 */}
        <Text style={styles.header}>按钮属性配置</Text>
        <View style={styles.configPanel}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.typeSheetRef?.open()}
          >
            <Text style={styles.label}>类型 (type)</Text>
            <Text style={styles.valueText}>{currentTypeLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => this.sizeSheetRef?.open()}
          >
            <Text style={styles.label}>尺寸 (size)</Text>
            <Text style={styles.valueText}>{currentSizeLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => this.childrenSheetRef?.open()}
          >
            <Text style={styles.label}>内容 (children)</Text>
            <Text style={styles.valueText}>{currentChildrenLabel}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.label}>禁用 (disabled)</Text>
            <Switch
              value={disabled}
              onValueChange={(value) => this.setState({ disabled: value })}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>反色文字 (textColorInverse)</Text>
            <Switch
              value={textColorInverse}
              onValueChange={(value) => this.setState({ textColorInverse: value })}
            />
          </View>
        </View>

        {/* Actionsheet - Type */}
        <Actionsheet
          ref={(c) => (this.typeSheetRef = c)}
          header="选择按钮类型"
          data={TYPE_OPTIONS}
          cancelable
          onPressConfirm={(item) => {
            this.setState({ type: item.value })
          }}
          onPressCancel={() => { }}
        />

        {/* Actionsheet - Size */}
        <Actionsheet
          ref={(c) => (this.sizeSheetRef = c)}
          header="选择按钮尺寸"
          data={SIZE_OPTIONS}
          cancelable
          onPressConfirm={(item) => {
            this.setState({ size: item.value })
          }}
          onPressCancel={() => { }}
        />

        {/* Actionsheet - Children Preset */}
        <Actionsheet
          ref={(c) => (this.childrenSheetRef = c)}
          header="选择按钮内容"
          data={CHILDREN_PRESETS}
          cancelable
          onPressConfirm={(item) => {
            this.setState({ childrenPreset: item.value })
          }}
          onPressCancel={() => { }}
        />
      </ScrollView>
    )
  }
}