import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  ToastAndroid
} from 'react-native';

import { Cascader, BottomModal, Button, Icon } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

// ====== 日志类型定义 ======
interface EventLogEntry {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
}

interface State {
  valueA: string[];
  valueX: string[];
  optionsB: any[];
  valueB: string[];
  eventLogs: EventLogEntry[]; // 新增日志状态
}

export default class CascaderScreen extends Component<any, State> {
  [propsName: string]: any;

  constructor(props) {
    super(props);
    this.state = {
      valueA: ['sweetie'],
      valueX: ['baiziwan'],
      optionsB: [],
      valueB: [],
      eventLogs: [], // 初始化日志为空
    };
  }

  // ====== 添加日志的方法 ======
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
      const nextLogs = [entry].concat(prevState.eventLogs).slice(0, 50);
      return { eventLogs: nextLogs };
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        valueX: ['haidianqu']
      });
    }, 3000);

    this.fetchData().then((data: any) => {
      this.setState({
        optionsB: data.list
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  getTargetItem(options, targetValue) {
    let targetItem = null;
    if (!options || !options.length) {
      return targetItem;
    }
    const matched = options.some((item) => {
      if (item.value === targetValue) {
        targetItem = item;
      } else if (item.children) {
        targetItem = this.getTargetItem(item.children, targetValue);
      }
      return !!targetItem;
    });
    return targetItem;
  }

  fetchData(value?) {
    value = value || [];
    const length = value.length;
    let parentValue = length ? value[length - 1] : 0;

    return new Promise((resolve) => {
      const list = [];
      let base = parentValue * 10;

      for (let i = 1; i < 8; i++) {
        const valueNum = base + i;
        const label = `L${length + 1}-${i}(${valueNum})`;
        list.push({ label, value: valueNum });
      }

      setTimeout(() => {
        if (value.length >= 4) {
          resolve({});
        } else {
          resolve({ list });
        }
      }, 0);
    });
  }

  handleChangeB = (value) => {
    const targetItem = this.getTargetItem(this.state.optionsB, value[value.length - 1]);
    if (!targetItem) {
      console.log('error');
      return;
    }
    if (targetItem.children && targetItem.children.length) {
      this.setState({
        valueB: value
      });
    } else {
      this.fetchData(value).then((data: any) => {
        let newOptionsB;
        if (data && data.list && data.list.length) {
          targetItem.children = data.list;
          newOptionsB = [...this.state.optionsB];
        } else {
          newOptionsB = this.state.optionsB;
        }

        this.setState({
          valueB: value,
          optionsB: newOptionsB
        });
      }).catch((e) => {
        console.log(e);
      });
    }
  };

  render() {
    const optionsX = [
      { label: '北京', id: 'beijing', isLeaf: false },
      { label: '朝阳区', id: 'chaoyangqu', pId: 'beijing', isLeaf: false },
      { label: '百子湾', id: 'baiziwan', pId: 'chaoyangqu', isLeaf: true },
      { label: '海淀区', id: 'haidianqu', pId: 'beijing', isLeaf: false },
      { label: '中关村', id: 'zhongguancun', pId: 'haidianqu', isLeaf: true },
      { label: '上海', id: 'shanghai', isLeaf: false },
      { label: '黄浦区', id: 'huangpuqu', pId: 'shanghai', isLeaf: true },
      { label: '闸北区', id: 'zhabeiqu', pId: 'shanghai', isLeaf: true },
    ];

    const optionsA = [
      {
        label: '甜点饮品',
        value: 'sweet',
        children: [
          { label: '甜品', value: 'sweetie' },
          { label: '冰淇淋', value: 'icecream' },
        ]
      },
      {
        label: '美食',
        value: 'food',
        children: [
          {
            label: '火锅',
            value: 'hotpot',
            children: [
              { label: '四川火锅', value: 'sichuan' },
              { label: '云南火锅', value: 'yunnan' },
              { label: '羊蝎子火锅', value: 'sheep' }
            ]
          },
          {
            label: '面',
            value: 'noodle',
            children: [
              { label: '重庆小面', value: 'chongqing' },
              { label: '山西刀削面', value: 'xiao' }
            ]
          }
        ]
      },
      { label: '甜点饮品1', value: 'sweet1' },
      { label: '甜点饮品2', value: 'sweet2' }
    ];

    const isLeafNodeFlattened = (item) => item.isLeaf === true;
    const isLeafNodeNested = (item) => {
      return !item.children || item.children.length === 0;
    };

    return (
      <ScrollView style={[localStyles.body, localStyles.container]}>
        {/* ===== 回调事件日志显示区域 ===== */}
        <View style={{ padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082', marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
            onChange 回调日志 (最新在顶部)
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
                  暂无日志，点击下方按钮体验 onChange 回调
                </Text>
              )}
            </ScrollView>
          </View>
        </View>

        {/* 扁平数据结构 */}
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => this.bottomModalX.open()}>
          dataStructureType：flattened
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModalX = c; }}
          title='扁平数据结构'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsX}
            dataStructureType='flattened'
            value={this.state.valueX}
            isLeafNode={isLeafNodeFlattened}
            onChange={(value) => {
              this.appendEventLog('onChange', `flattened → ${value.join(' → ')}`);
              const lastId = value[value.length - 1];
              const lastItem = optionsX.find(item => item.id === lastId);
              if (lastItem && isLeafNodeFlattened(lastItem)) {
                this.setState({ valueX: value }, () => {
                  const message = value.join(' → ');
                  // Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                  ToastAndroid.show(`选择完成 选中：${message}`, 3);
                });
              } else {
                this.setState({ valueX: value });
              }
            }}
          />
        </BottomModal>

        {/* 嵌套数据结构 */}
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => this.bottomModalA.open()}>
          dataStructureType：nested
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModalA = c; }}
          title='嵌套数据结构'
          cancelable={true}>
          <Text style={{ padding: variables.mtdHSpacingXL }}>
            选中值：{String(this.state.valueA)}
          </Text>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsA}
            fieldKeys={{ idKey: 'value' }}
            value={this.state.valueA}
            onChange={(value) => {
              this.appendEventLog('onChange', `nested → ${value.join(' → ')}`);
              this.setState({ valueA: value }, () => {
                const lastItem = this.getTargetItem(optionsA, value[value.length - 1]);
                const isLeaf = !lastItem?.children || lastItem.children.length === 0;
                if (isLeaf) {
                  const message = value.join(' → ');
                  // Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                  ToastAndroid.show(`选择完成 选中：${message}`, 3);
                }
              });
            }}
          />
        </BottomModal>

        {/* 异步数据 */}
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => this.bottomModalC.open()}>
          onChange 异步加载子级
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModalC = c }}
          title='异步数据'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            proportion={[1]}
            fieldKeys={{ idKey: 'value' }}
            data={this.state.optionsB}
            value={this.state.valueB}
            onChange={(value) => {
              this.appendEventLog('onChange', `async → ${value.join(' → ')}`);
              this.handleChangeB(value);
            }}
          />
        </BottomModal>

        {/* 自定义渲染项 */}
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => this.bottomModalB.open()}>
          renderItem 自定义渲染项
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModalB = c; }}
          title='自定义渲染项'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsA}
            fieldKeys={{ idKey: 'value' }}
            value={this.state.valueA}
            onChange={(value) => {
              this.appendEventLog('onChange', `renderItem → ${value.join(' → ')}`);
              this.setState({ valueA: value }, () => {
                const lastItem = this.getTargetItem(optionsA, value[value.length - 1]);
                const isLeaf = !lastItem?.children || lastItem.children.length === 0;
                if (isLeaf) {
                  const message = value.join(' → ');
                  // Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                  ToastAndroid.show(`选择完成 选中：${message}`, 3);
                }
              });
            }}
            renderItem={(item) => {
              const active = item.active;
              const hasChildren = item.children && item.children.length;
              const color = active ? variables.mtdBrandDanger : variables.mtdGrayBase;
              const backgroundColor = active ? variables.mtdFillBody : '#fff';
              const icon = active ? (
                <Icon style={{ marginRight: 5 }} type='star' size={14} tintColor={color} />
              ) : (
                <Icon style={{ marginRight: 5 }} type='star-o' size={14} tintColor={color} />
              );

              return (
                <View style={{
                  padding: 15,
                  backgroundColor,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    {icon}
                    <Text
                      style={{
                        color,
                        flex: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {hasChildren ? (
                    <Icon type='angle-right' size={14} tintColor={color} style={{ marginTop: 4 }} />
                  ) : null}
                </View>
              );
            }}
          />
        </BottomModal>

        {/* 自定义叶子节点判断 */}
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => this.bottomModalD.open()}>
          isLeafNode 自定义叶子节点判断
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModalD = c; }}
          title='自定义叶子节点判断'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsA}
            fieldKeys={{ idKey: 'value' }}
            value={this.state.valueA}
            isLeafNode={isLeafNodeNested}
            onChange={(value) => {
              this.appendEventLog('onChange', `isLeafNode custom → ${value.join(' → ')}`);
              const lastValue = value[value.length - 1];
              const lastItem = this.getTargetItem(optionsA, lastValue);
              const isLeaf = lastItem ? isLeafNodeNested(lastItem) : false;

              this.setState({ valueA: value }, () => {
                if (isLeaf) {
                  const message = value.join(' → ');
                  // Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                  ToastAndroid.show(`选择完成 选中：${message}`, 3);
                }
              });
            }}
            renderItem={(item) => {
              const active = item.active;
              const isLeaf = isLeafNodeNested(item);
              const color = active ? variables.mtdBrandDanger : variables.mtdGrayBase;
              const backgroundColor = active ? variables.mtdFillBody : '#fff';
              const icon = active ? (
                <Icon style={{ marginRight: 5 }} type='star' size={14} tintColor={color} />
              ) : (
                <Icon style={{ marginRight: 5 }} type='star-o' size={14} tintColor={color} />
              );

              return (
                <View style={{
                  padding: 15,
                  backgroundColor,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    {icon}
                    <Text style={{ color, flex: 1, flexWrap: 'wrap' }}>
                      {item.label}
                    </Text>
                    {isLeaf && (
                      <Text style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>(leaf)</Text>
                    )}
                  </View>
                  {!isLeaf && (
                    <Icon type='angle-right' size={14} tintColor={color} style={{ marginTop: 4 }} />
                  )}
                </View>
              );
            }}
          />
        </BottomModal>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    padding: 16,
  },
  container: {
    flex: 1,
  },
});