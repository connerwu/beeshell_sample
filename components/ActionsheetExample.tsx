import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import { Button, Actionsheet } from 'beeshell-ls';

const variables = {
  mtdBorderColor: '#e0e0e0',
  mtdBorderColorDark: '#ccc',
  mtdGray: '#888',
};

const commonStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
});

const formatItem = (item: any): string => {
  if (typeof item === 'string') return item;
  return item?.label || item?.text || JSON.stringify(item);
};

const testData = [
  { label: '选项一', value: '1' },
  '选项二',
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '选项六', value: '6' },
  { label: '选项七', value: '7' },
  { label: '选项八', value: '8' },
];

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

export default class ActionsheetExample extends Component<any, State> {
  private actionsheet_useSafeAreaView_true: any = null;
  private actionsheet_useSafeAreaView_false: any = null;

  private actionsheet_onPressConfirm: any = null;
  private actionsheet_onPressCancel: any = null;

  private actionsheet_maxShowNum_3: any = null;
  private actionsheet_maxShowNum_null: any = null;

  private actionsheet_customHeader: any = null;
  private actionsheet_customFooter: any = null;
  private actionsheet_renderItem: any = null;
  private actionsheet_cancelable_true: any = null;
  private actionsheet_cancelable_false: any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      eventLogs: [], // 初始化日志状态为空数组
    };
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

  render() {
    return (
      <ScrollView style={commonStyles.body}>

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

        <View style={commonStyles.container}>
          <Text style={commonStyles.sectionTitle}>Actionsheet 测试用例</Text>

          {/* ========== useSafeAreaView = true ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            onPress={() => this.actionsheet_useSafeAreaView_true?.open()}>
            测试 useSafeAreaView = true
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_useSafeAreaView_true = c)}
            header="useSafeAreaView = true"
            data={testData}
            useSafeAreaView={true}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `useSafeAreaView=true → 选择了: ${formatItem(item)}`);
              ToastAndroid.show(`onPressConfirm useSafeAreaView=true → ${formatItem(item)}`, 3);
              // Alert.alert('onPressConfirm', `useSafeAreaView=true → ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'useSafeAreaView=true → 用户取消');
              // Alert.alert('onPressCancel', 'useSafeAreaView=true');
              ToastAndroid.show(`onPressCancel useSafeAreaView=true`, 3);
            }}
          />

          {/* ========== useSafeAreaView = false ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_useSafeAreaView_false?.open()}>
            测试 useSafeAreaView = false
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_useSafeAreaView_false = c)}
            header="useSafeAreaView = false"
            data={testData}
            useSafeAreaView={false}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `useSafeAreaView=false → 选择了: ${formatItem(item)}`);
              // Alert.alert('onPressConfirm', `useSafeAreaView=false → ${formatItem(item)}`);
              ToastAndroid.show(`onPressConfirm useSafeAreaView=false → ${formatItem(item)}`, 3);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'useSafeAreaView=false → 用户取消');
              // Alert.alert('onPressCancel', 'useSafeAreaView=false');
              ToastAndroid.show(`onPressCancel useSafeAreaView=false`, 3);
            }}
          />

          {/* ========== onPressConfirm 回调测试 ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_onPressConfirm?.open()}>
            测试 onPressConfirm 方法
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_onPressConfirm = c)}
            header="onPressConfirm 回调测试"
            data={testData.slice(0, 3)}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `onPressConfirm回调测试 → 选择了: ${formatItem(item)}`);
              // Alert.alert('Callback', `onPressConfirm 触发！\n选择: ${formatItem(item)}`);
              ToastAndroid.show(`onPressConfirm 触发！\n选择: ${formatItem(item)}`, 3);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'onPressConfirm回调测试 → 用户取消');
              // Alert.alert('提示', '已取消');
              ToastAndroid.show(`提示: 已取消`, 3);
            }}
          />

          {/* ========== onPressCancel 回调测试 ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_onPressCancel?.open()}>
            测试 onPressCancel 方法
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_onPressCancel = c)}
            header="onPressCancel 回调测试"
            data={['确认']}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `onPressCancel回调测试 → 选择了: ${formatItem(item)}`);
              Alert.alert('确认', '你点了选项');
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'onPressCancel回调测试 → 用户取消');
              console.log('onPressCancel 被调用');
              Alert.alert('Callback', 'onPressCancel 已触发！');
            }}
          />

          {/* ========== maxShowNum = 3 ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_maxShowNum_3?.open()}>
            测试 maxShowNum = 3
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_maxShowNum_3 = c)}
            header="maxShowNum = 3"
            data={testData}
            maxShowNum={3}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `maxShowNum=3 → 选择了: ${formatItem(item)}`);
              Alert.alert('maxShowNum=3', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'maxShowNum=3 → 用户取消');
              Alert.alert('提示', '已取消');
            }}
          />

          {/* ========== maxShowNum = null（不限制） ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_maxShowNum_null?.open()}>
            测试 maxShowNum = null（不限制行数）
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_maxShowNum_null = c)}
            header="maxShowNum = null"
            data={testData}
            maxShowNum={null}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `maxShowNum=null → 选择了: ${formatItem(item)}`);
              Alert.alert('maxShowNum=null', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'maxShowNum=null → 用户取消');
              Alert.alert('提示', '已取消');
            }}
          />

          {/* ========== 自定义 header ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_customHeader?.open()}>
            测试自定义 header
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_customHeader = c)}
            header={
              <View
                style={{
                  padding: 12,
                  backgroundColor: '#e6f7ff',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>
                  自定义头部标题
                </Text>
              </View>
            }
            data={testData}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `自定义header → 选择了: ${formatItem(item)}`);
              Alert.alert('customHeader', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', '自定义header → 用户取消');
              Alert.alert('提示', '已取消');
            }}
          />

          {/* ========== 自定义 footer ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_customFooter?.open()}>
            测试自定义 footer
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_customFooter = c)}
            header="测试自定义底部"
            data={testData.slice(0, 3)}
            footer={
              <TouchableOpacity
                onPress={() => {
                  this.actionsheet_customFooter?.close();
                  this.appendEventLog('onPressCancel', '自定义footer → 点击自定义取消按钮');
                  Alert.alert('自定义 Footer', '你点击了自定义底部按钮！');
                }}
                style={{
                  padding: 14,
                  backgroundColor: '#fff1f0',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#ff4d4f' }}>自定义取消按钮</Text>
              </TouchableOpacity>
            }
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `自定义footer → 选择了: ${formatItem(item)}`);
              Alert.alert('customFooter', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', '自定义footer → 标准取消');
              Alert.alert('提示', '通过标准取消按钮关闭');
            }}
          />

          {/* ========== renderItem ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_renderItem?.open()}>
            测试 renderItem 自定义选项样式
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_renderItem = c)}
            header="测试 renderItem"
            data={[
              { text: '苹果', icon: 'apple' },
              { text: '香蕉', icon: 'banana' },
              { text: '葡萄', icon: 'grape' },
            ]}
            renderItem={(item, index) => (
              <View
                key={index}
                style={{
                  padding: 14,
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: '#eee',
                }}>
                <Text style={{ fontSize: 16, color: '#d46b08' }}>{item.text}</Text>
              </View>
            )}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `renderItem测试 → 选择了: ${item.text}`);
              Alert.alert('renderItem', `选择了: ${item.text}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'renderItem测试 → 用户取消');
              Alert.alert('提示', '已取消');
            }}
          />

          {/* ========== cancelable = true ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_cancelable_true?.open()}>
            测试 cancelable = true（可点击遮罩关闭）
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_cancelable_true = c)}
            header="cancelable = true"
            data={['选项A', '选项B']}
            cancelable={true}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `cancelable=true → 选择了: ${formatItem(item)}`);
              Alert.alert('cancelable=true', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'cancelable=true → 用户取消(遮罩/按钮)');
              Alert.alert('提示', '通过遮罩或取消按钮关闭了');
            }}
          />

          {/* ========== cancelable = false ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => this.actionsheet_cancelable_false?.open()}>
            测试 cancelable = false（不可点击遮罩关闭）
          </Button>
          <Actionsheet
            ref={(c) => (this.actionsheet_cancelable_false = c)}
            header="cancelable = false"
            data={['选项X', '选项Y']}
            cancelable={false}
            onPressConfirm={(item) => {
              this.appendEventLog('onPressConfirm', `cancelable=false → 选择了: ${formatItem(item)}`);
              Alert.alert('cancelable=false', `选择了: ${formatItem(item)}`);
            }}
            onPressCancel={() => {
              this.appendEventLog('onPressCancel', 'cancelable=false → 用户取消(理论上不应触发)');
              Alert.alert('提示', '取消按钮关闭了');
            }}
          />
        </View>
      </ScrollView>
    );
  }
}