import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
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

export default class ActionsheetExample extends Component<any, any> {
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

  render() {
    return (
      <ScrollView style={commonStyles.body}>
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
            onPressConfirm={(item) =>
              Alert.alert('onPressConfirm', `useSafeAreaView=true → ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('onPressCancel', 'useSafeAreaView=true')}
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
            onPressConfirm={(item) =>
              Alert.alert('onPressConfirm', `useSafeAreaView=false → ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('onPressCancel', 'useSafeAreaView=false')}
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
              console.log('onPressConfirm 被调用:', item);
              Alert.alert('Callback', `onPressConfirm 触发！\n选择: ${formatItem(item)}`);
            }}
            onPressCancel={() => Alert.alert('提示', '已取消')}
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
            onPressConfirm={(item) => Alert.alert('确认', '你点了选项')}
            onPressCancel={() => {
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
            onPressConfirm={(item) =>
              Alert.alert('maxShowNum=3', `选择了: ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('提示', '已取消')}
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
            onPressConfirm={(item) =>
              Alert.alert('maxShowNum=null', `选择了: ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('提示', '已取消')}
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
            onPressConfirm={(item) =>
              Alert.alert('customHeader', `选择了: ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('提示', '已取消')}
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
            onPressConfirm={(item) =>
              Alert.alert('customFooter', `选择了: ${formatItem(item)}`)
            }
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
            onPressConfirm={(item) =>
              Alert.alert('renderItem', `选择了: ${item.text}`)
            }
            onPressCancel={() => Alert.alert('提示', '已取消')}
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
            onPressConfirm={(item) =>
              Alert.alert('cancelable=true', `选择了: ${formatItem(item)}`)
            }
            onPressCancel={() => Alert.alert('提示', '通过遮罩或取消按钮关闭了')}
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
            onPressConfirm={(item) =>
              Alert.alert('cancelable=false', `选择了: ${formatItem(item)}`)
            }
            onPressCancel={() => {
              // 注意：当 cancelable={false} 时，onPressCancel 通常不会被触发（除非有取消按钮）
              Alert.alert('提示', '不会触发（因为无法关闭）');
            }}
          />
        </View>
      </ScrollView>
    );
  }
}