import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button, BottomModal } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

// --- 定义日志条目类型 ---
interface EventLogEntry {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
}

interface State {
  eventLogs: EventLogEntry[]; // 添加日志状态
}

const localStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height * 0.2, // 至少占屏幕 20%
  },

  // --- 日志区域样式 ---
  logContainer: {
    padding: 10,
    backgroundColor: '#fff8e1',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffe082',
    marginTop: 10,
  },
  logTitle: {
    fontSize: 12,
    color: '#ff8f00',
    lineHeight: 18,
    fontWeight: 'bold',
  },
  logScrollView: {
    height: 180,
    marginTop: 8,
    backgroundColor: '#fffdf3',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  logEntryWrapper: {
    marginBottom: 8,
  },
  logEntryMain: {
    fontSize: 12,
    color: '#ff8f00',
    lineHeight: 18,
    fontWeight: 'bold',
  },
  logEntryDetail: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 18,
  },
  logEmptyText: {
    fontSize: 12,
    color: '#ffb74d',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 60,
  },
});

export default class BottomModalScreen extends Component<{}, State> { // 添加 State 泛型
  private bottomModal1: any = null;
  private bottomModal2: any = null;
  private bottomModal3: any = null;
  private bottomModal4: any = null;
  private bottomModal5: any = null;
  private bottomModal6: any = null;
  private bottomModal7: any = null;
  private bottomModal8: any = null;
  private bottomModal_titleStyle: any = null;

  constructor(props: {}) { // 添加构造函数和初始 state
    super(props);
    this.state = {
      eventLogs: [],
    };
  }

  // --- 添加日志方法 ---
  appendEventLog = (eventName: string, detail: string = '') => {
    const now = new Date();
    const pad = (value: number) => value.toString().padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const entry: EventLogEntry = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`, // 简单生成唯一 ID
      timestamp,
      event: eventName,
      detail,
    };
    this.setState((prevState) => {
      // 限制最多显示50条日志，新日志在前
      const nextLogs = [entry].concat(prevState.eventLogs).slice(0, 50);
      return { eventLogs: nextLogs };
    });
  };

  render() {
    return (
      <ScrollView style={localStyles.body}>
        {/* ===== 回调事件日志显示区域 ===== */}
        <View style={localStyles.logContainer}>
          <Text style={localStyles.logTitle}>
            回调日志 (最新在顶部，可滚动查看)
          </Text>
          <View style={localStyles.logScrollView}>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 8 }}>
              {this.state.eventLogs.length > 0 ? (
                this.state.eventLogs.map(log => (
                  <View key={log.id} style={localStyles.logEntryWrapper}>
                    <Text style={localStyles.logEntryMain}>
                      [{log.timestamp}] {log.event}
                    </Text>
                    {log.detail ? (
                      <Text style={localStyles.logEntryDetail}>
                        {log.detail}
                      </Text>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text style={localStyles.logEmptyText}>
                  暂无日志，点击下方按钮体验回调事件
                </Text>
              )}
            </ScrollView>
          </View>
        </View>

        {/* ===== 原有内容区域 ===== */}
        <View style={localStyles.container}>
          {/* ========== 1. leftCallback / rightCallback ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            onPress={() => {
              this.bottomModal1?.open();
            }}
          >
            leftCallback / rightCallback
          </Button>
          <BottomModal
            testID="bottomModal1"
            ref={(c) => (this.bottomModal1 = c)}
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'leftCallback / rightCallback - 点击了取消');
              Alert.alert('回调', '点击了取消');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'leftCallback / rightCallback - 点击了完成');
              Alert.alert('回调', '点击了完成');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>点击按钮触发回调</Text>
            </View>
          </BottomModal>

          {/* ========== 2. title ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal2?.open();
            }}
          >
            title
          </Button>
          <BottomModal
            testID="bottomModal2"
            ref={(c) => (this.bottomModal2 = c)}
            title="请选择品类"
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'title - 点击了取消');
              Alert.alert('回调', '点击了取消');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'title - 点击了完成');
              Alert.alert('回调', '点击了完成');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>自定义标题文本</Text>
            </View>
          </BottomModal>

          {/* ========== 3. titleStyle ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal_titleStyle?.open();
            }}
          >
            titleStyle
          </Button>
          <BottomModal
            testID="bottomModal3"
            ref={(c) => (this.bottomModal_titleStyle = c)}
            title="红色加粗标题"
            titleStyle={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'titleStyle - 点击了取消');
              Alert.alert('回调', '点击了取消');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'titleStyle - 点击了完成');
              Alert.alert('回调', '点击了完成');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>标题样式定制</Text>
            </View>
          </BottomModal>

          {/* ========== 4. leftLabelText / rightLabelText ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal3?.open();
            }}
          >
            leftLabelText / rightLabelText
          </Button>
          <BottomModal
            testID="bottomModal4"
            ref={(c) => (this.bottomModal3 = c)}
            leftLabelText="否"
            rightLabelText="是"
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'leftLabelText / rightLabelText - 选择“否”');
              Alert.alert('回调', '选择“否”');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'leftLabelText / rightLabelText - 选择“是”');
              Alert.alert('回调', '选择“是”');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>自定义按钮文字</Text>
            </View>
          </BottomModal>

          {/* ========== 5. leftLabelTextStyle / rightLabelTextStyle ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal4?.open();
            }}
          >
            leftLabelTextStyle / rightLabelTextStyle
          </Button>
          <BottomModal
            testID="bottomModal5"
            ref={(c) => (this.bottomModal4 = c)}
            leftLabelText="放弃"
            rightLabelText="提交"
            leftLabelTextStyle={{ color: variables.mtdBrandDanger }}
            rightLabelTextStyle={{ color: variables.mtdBrandSuccess }}
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'leftLabelTextStyle / rightLabelTextStyle - 放弃操作');
              Alert.alert('回调', '放弃操作');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'leftLabelTextStyle / rightLabelTextStyle - 提交成功');
              Alert.alert('回调', '提交成功');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>自定义按钮样式</Text>
            </View>
          </BottomModal>

          {/* ========== 6. 隐藏左侧按钮 (leftLabelText=null) ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal5?.open();
            }}
          >
            leftLabelText
          </Button>
          <BottomModal
            testID="bottomModal6"
            ref={(c) => (this.bottomModal5 = c)}
            leftLabelText={null}
            rightLabelText="我知道了"
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'leftLabelText - 用户已知晓');
              Alert.alert('回调', '用户已知晓');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>仅显示右侧按钮</Text>
            </View>
          </BottomModal>

          {/* ========== 7. 隐藏右侧按钮 (rightLabelText=null) ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal6?.open();
            }}
          >
            rightLabelText
          </Button>
          <BottomModal
            testID="bottomModal7"
            ref={(c) => (this.bottomModal6 = c)}
            rightLabelText={null}
            leftLabelText="返回"
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'rightLabelText - 点击返回');
              Alert.alert('回调', '点击返回');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>仅显示左侧按钮</Text>
            </View>
          </BottomModal>

          {/* ========== 8. titleContainer (自定义标题区域) ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal7?.open();
            }}
          >
            titleContainer
          </Button>
          <BottomModal
            testID="bottomModal8"
            ref={(c) => (this.bottomModal7 = c)}
            titleContainer={
              <View style={{ paddingVertical: 8, backgroundColor: '#e6f7ff', alignItems: 'center' }}>
                <Text style={{ color: '#1890ff', fontSize: 16 }}>自定义标题容器</Text>
              </View>
            }
            leftCallback={() => {
              this.appendEventLog('leftCallback', 'titleContainer - 点击了取消');
              Alert.alert('回调', '点击了取消');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback', 'titleContainer - 点击了完成');
              Alert.alert('回调', '点击了完成');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>整个标题区域被替换</Text>
            </View>
          </BottomModal>

          {/* ========== 9. leftLabel / rightLabel (自定义按钮元素) ========== */}
          <Button
            size="sm"
            type="primary"
            textColorInverse
            style={{ marginTop: 12 }}
            onPress={() => {
              this.bottomModal8?.open();
            }}
          >
            leftLabel / rightLabel
          </Button>
          <BottomModal
            testID="bottomModal9"
            ref={(c) => (this.bottomModal8 = c)}
            leftLabel={
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: '#ffe58f',
                  borderRadius: 4,
                }}
                onPress={() => { // 确保 TouchableOpacity 可点击并触发回调
                  this.appendEventLog('leftCallback', 'leftLabel / rightLabel - 点击了左侧自定义区域');
                  console.log('点击了左侧自定义区域');
                  // 如果需要在点击后关闭 Modal，可以调用 close()
                  this.bottomModal8?.close();
                }}
              >
                <Text style={{ color: '#faad14' }}>自定义左</Text>
              </TouchableOpacity>
            }
            rightLabel={
              <TouchableOpacity
                onPress={() => {
                  this.appendEventLog('rightCallback', 'leftLabel / rightLabel - 点击了右侧自定义区域');
                  this.bottomModal8?.close();
                }}
                style={{ padding: 8 }}
              >
                <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>✓ 确认</Text>
              </TouchableOpacity>
            }
            leftCallback={() => {
              this.appendEventLog('leftCallback (Default Area)', 'leftLabel / rightLabel - 点击了默认左侧区域');
              Alert.alert('回调', '点击了左侧默认区域');
            }}
            rightCallback={() => {
              this.appendEventLog('rightCallback (Default Area)', 'leftLabel / rightLabel - 点击了默认右侧区域');
              Alert.alert('回调', '点击了右侧默认区域');
            }}
          >
            <View style={localStyles.modalContent}>
              <Text>左右按钮均为自定义元素</Text>
              <Text style={{ fontSize: 10, color: '#888', marginTop: 5 }}>
                * 注意：点击自定义元素和默认按钮区域都会触发对应回调
              </Text>
            </View>
          </BottomModal>
        </View>
      </ScrollView>
    );
  }
}