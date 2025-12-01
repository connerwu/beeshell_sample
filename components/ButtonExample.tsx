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
    borderRadius: 8, // 给预览面板也加点圆角
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

type ChildrenPreset = 'text' | 'iconText' | 'empty' | 'longText' | 'roundedIcon'

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
  { label: '圆角图标按钮', value: 'roundedIcon' },
]

interface State {
  type: ButtonType
  size: ButtonSize
  disabled: boolean
  textColorInverse: boolean
  clickCount: number
  childrenPreset: ChildrenPreset
}

// 定义日志条目类型
interface EventLogEntry {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
}

interface State {
  eventLogs: EventLogEntry[]; // 添加日志状态
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
      eventLogs: [], // 初始化日志状态为空数组
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
      case 'roundedIcon':
        return <Icon type="heart" size={18} color="#fff" />
      case 'text':
      default:
        return '按钮预览'
    }
  }

  // 添加日志的方法
  appendEventLog = (eventName: string, detail: string = '') => {
    const now = new Date();
    const pad = (value: number) => value.toString().padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const entry: EventLogEntry = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      event: eventName,
      detail,
    };
    this.setState((prevState) => {
      // 限制最多显示50条
      const nextLogs = [entry].concat(prevState.eventLogs).slice(0, 50);
      return { eventLogs: nextLogs };
    });
  };

  handlePress = () => {
    if (!this.state.disabled) {
      this.setState((prevState) => ({
        clickCount: prevState.clickCount + 1,
      }))
      this.appendEventLog('按钮点击', `当前类型: ${this.state.type}, 尺寸: ${this.state.size}`);
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

    let dynamicButtonStyle = {}
    let dynamicButtonTextStyle = {}

    if (childrenPreset === 'roundedIcon') {
      dynamicButtonStyle = {
        borderRadius: 50,
        backgroundColor: variables.mtdBrandPrimary,
        paddingHorizontal: 0,
        minWidth: 0,
      }
    } else {
      dynamicButtonStyle = {
        borderWidth: 1,
        borderColor: variables.mtdBrandPrimary,
        borderRadius: 8,
      }
      dynamicButtonTextStyle = {
        fontWeight: '600',
      }
    }


    const currentTypeLabel = TYPE_OPTIONS.find(opt => opt.value === type)?.label || 'Primary'
    const currentSizeLabel = SIZE_OPTIONS.find(opt => opt.value === size)?.label || 'Medium'
    const currentChildrenLabel = CHILDREN_PRESETS.find(opt => opt.value === childrenPreset)?.label || '普通文本'

    return (
      <ScrollView style={styles.body}>

        {/* ===== 回调事件日志显示区域 ===== */}
        <View style={{ padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082', marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
            回调日志 (最新在顶部，可滚动查看)
          </Text>
          <View style={{ height: 180, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082' }}>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 8 }}>
              {this.state.eventLogs.length > 0 ? (
                this.state.eventLogs.map(log => (
                  <View key={log.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
                      [{log.timestamp}] {log.event}
                    </Text>
                    {log.detail ? (
                      <Text style={{ fontSize: 12, color: '#795548', lineHeight: 18 }}>
                        {log.detail}
                      </Text>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text style={{ fontSize: 12, color: '#ffb74d', lineHeight: 18 }}>
                  暂无日志，点击测试用例体验回调事件
                </Text>
              )}
            </ScrollView>
          </View>
        </View>

        {/* 预览区 */}
        <View style={styles.panel}>
          <Button
            testID="preview-button"
            type={type}
            size={size}
            disabled={disabled}
            textColorInverse={textColorInverse}
            style={[dynamicButtonStyle]}
            textStyle={[dynamicButtonTextStyle]}
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