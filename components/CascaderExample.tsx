import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ToastAndroid
} from 'react-native';
import { Cascader, BottomModal, Button, Icon } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

// 日志类型定义
interface EventLogEntry {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
}

export default function CascaderScreen() {
  const [valueA, setValueA] = useState<string[]>(['sweetie']);
  const [valueX, setValueX] = useState<string[]>(['baiziwan']);
  const [optionsB, setOptionsB] = useState<any[]>([]);
  const [valueB, setValueB] = useState<string[]>([]);
  const [eventLogs, setEventLogs] = useState<EventLogEntry[]>([]); // 新增日志状态

  const bottomModalXRef = useRef<any>(null);
  const bottomModalARef = useRef<any>(null);
  const bottomModalCRef = useRef<any>(null);
  const bottomModalBRef = useRef<any>(null);
  const bottomModalDRef = useRef<any>(null);
  const bottomModalERef = useRef<any>(null);

  const getComputedFieldKeys = useCallback((userProvidedFieldKeys: any = {}) => {
    const defaultInternalKeys = {
      idKey: 'id',
      pIdKey: 'pId',
      labelKey: 'label',
      childrenKey: 'children',
      activeKey: 'active',
      checkedKey: 'checked',
      disabledKey: 'disabled'
    };
    return {
      ...defaultInternalKeys,
      ...userProvidedFieldKeys
    };
  }, []);

  const getTargetItem = useCallback((options: any[], targetValue: any) => {
    let targetItem = null;
    if (!options || !options.length) {
      return targetItem;
    }
    const matched = options.some((item) => {
      if (item.value === targetValue) {
        targetItem = item;
      } else if (item.children) {
        targetItem = getTargetItem(item.children, targetValue); // 递归调用自身
      }
      return !!targetItem;
    });
    return targetItem;
  }, []);

  // 添加日志的方法
  const appendEventLog = useCallback((eventName: string, detail: string = '') => {
    setEventLogs((prevLogs) => {
      const now = new Date();
      const pad = (value: number) => value.toString().padStart(2, '0');
      const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const entry: EventLogEntry = {
        id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
        timestamp,
        event: eventName,
        detail,
      };
      // 添加到开头，并限制最多 50 条
      const nextLogs = [entry, ...prevLogs].slice(0, 50);
      return nextLogs;
    });
  }, []);

  // 数据获取和初始化逻辑
  useEffect(() => {
    // 模拟 componentDidMount 中的 setTimeout 修改 valueX
    const timer = setTimeout(() => {
      setValueX(['haidianqu']);
    }, 3000);

    // 清理函数
    return () => clearTimeout(timer);
  }, []); // 空依赖数组，仅在挂载时运行一次

  useEffect(() => {
    // 模拟 componentDidMount 中的 fetchData
    const fetchDataAndSetState = async () => {
      try {
        const data: any = await fetchData(); // 使用顶层定义的 fetchData
        setOptionsB(data.list || []);
      } catch (e) {
        console.error("Failed to fetch initial data for optionsB:", e);
        // 可以在这里添加错误处理逻辑，比如设置一个错误状态
      }
    };

    fetchDataAndSetState();
  }, []); // 空依赖数组，仅在挂载时运行一次

  // 异步数据加载逻辑
  const fetchData = useCallback(async (value?: any[]) => {
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
  }, []); // fetchData 不依赖组件状态，所以依赖数组为空

  // 处理 Cascader B 的 change 事件，包含异步加载逻辑
  const handleChangeB = useCallback(async (value: string[]) => {
    // 获取当前最新的 optionsB 状态

    const currentOptionsB = optionsB; // 获取当前值

    const targetItem = getTargetItem(currentOptionsB, value[value.length - 1]);

    if (!targetItem) {
      console.log('error: Target item not found');
      return;
    }

    // 检查这个节点是否已经有 children 了
    if (targetItem.children && targetItem.children.length) {
      // 如果已经有了，就只更新 valueB，不加载新数据
      setValueB(value);
      return; // 提前返回
    }

    // 如果没有 children，则需要加载
    try {
      const data: any = await fetchData(value);
      if (data && data.list && data.list.length) {
        // 加载成功且有数据，需要不可变地更新 state.optionsB 中的对象

        // 辅助函数：递归构建新的选项树
        const updateTreeWithChildren = (items: any[], targetValue: any, newChildren: any[]): any[] => {
          return items.map(item => {
            if (item.value === targetValue) {
              // 创建一个全新的对象
              return {
                ...item,
                children: newChildren
              };
            } else if (item.children) {
              // 递归处理子节点
              const updatedChildren = updateTreeWithChildren(item.children, targetValue, newChildren);
              // 如果 children 数组引用变了，说明子孙节点被修改了，需要返回新 item
              if (updatedChildren !== item.children) {
                return {
                  ...item,
                  children: updatedChildren
                };
              }
              // 如果 children 没变，可以返回原 item
              return item;
            }
            // 没有 children 且不是目标项，返回原项
            return item;
          });
        };

        const newOptionsB = updateTreeWithChildren(currentOptionsB, targetItem.value, data.list);

        // 更新 state，包括数据源和选中的值
        setOptionsB(newOptionsB);
        setValueB(value);

      } else {
        // 即使没有加载到新数据，也更新选中的值
        setValueB(value);
      }

    } catch (e) {
      console.error("Failed to load data for Cascader B:", e);
      // 根据需求决定是否在错误时也更新 value
      setValueB(value);
    }
  }, [optionsB, fetchData, getTargetItem]);


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

  const isLeafNodeFlattened = useCallback((item: any) => item.isLeaf === true, []);
  const isLeafNodeNested = useCallback((item: any) => {
    return !item.children || item.children.length === 0;
  }, []);

  return (
    <ScrollView style={[localStyles.body, localStyles.container]}>
      {/* ===== 回调事件日志显示区域 ===== */}
      <View style={{ padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082', marginTop: 10 }}>
        <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
          onChange 回调日志 (最新在顶部)
        </Text>
        <View style={{ height: 180, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082' }}>
          <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 8 }}>
            {eventLogs.length > 0 ? (
              eventLogs.map(log => (
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
        type="primary"
        textColorInverse
        onPress={() => bottomModalXRef.current?.open()}>
        dataStructureType：flattened
      </Button>
      <BottomModal
        ref={bottomModalXRef}
        title='扁平数据结构'
        cancelable={true}>
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          data={optionsX}
          dataStructureType='flattened'
          value={valueX}
          isLeafNode={isLeafNodeFlattened}
          onChange={(value) => {
            appendEventLog('onChange', `flattened → ${value.join(' → ')}`);
            const lastId = value[value.length - 1];
            const lastItem = optionsX.find(item => item.id === lastId);
            if (lastItem && isLeafNodeFlattened(lastItem)) {
              setValueX(value); // 先更新值
              const message = value.join(' → ');
              ToastAndroid.show(`选择完成 选中：${message}, OK`, 3);
            } else {
              setValueX(value);
            }
          }}
        />
      </BottomModal>

      {/* 嵌套数据结构 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type="primary"
        textColorInverse
        onPress={() => bottomModalARef.current?.open()}>
        dataStructureType：nested
      </Button>
      <BottomModal
        ref={bottomModalARef}
        title='嵌套数据结构'
        cancelable={true}>
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          data={optionsA}
          fieldKeys={{ idKey: 'value' }}
          value={valueA}
          onChange={(value) => {
            appendEventLog('onChange', `nested → ${value.join(' → ')}`);
            setValueA(value); // 先更新值
            // 使用 setTimeout 确保 state 已更新后再读取
            setTimeout(() => {
              const lastItem = getTargetItem(optionsA, value[value.length - 1]);
              const isLeaf = !lastItem?.children || lastItem.children.length === 0;
              if (isLeaf) {
                const message = value.join(' → ');
                ToastAndroid.show(`选择完成 选中：${message}, OK`, 3);
              }
            }, 0);
          }}
        />
      </BottomModal>

      {/* 异步数据 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type="primary"
        textColorInverse
        onPress={() => bottomModalCRef.current?.open()}>
        onChange 异步加载子级
      </Button>
      <BottomModal
        ref={bottomModalCRef}
        title='异步数据'
        cancelable={true}>
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          proportion={[1]}
          fieldKeys={{
            idKey: 'value',
            pIdKey: 'pId',
            labelKey: 'label',
            childrenKey: 'children',
            activeKey: 'active',
            checkedKey: 'checked',
            disabledKey: 'disabled'
          }}
          data={optionsB}
          value={valueB}
          onChange={(value) => {
            const cascaderFieldKeys = {
              idKey: 'value',
              pIdKey: 'pId',
              labelKey: 'label',
              childrenKey: 'children',
              activeKey: 'active',
              checkedKey: 'checked',
              disabledKey: 'disabled'
            };
            appendEventLog(
              'onChange',
              `async → ${value.join(' → ')}\nField Keys Used:\n${JSON.stringify(getComputedFieldKeys(cascaderFieldKeys), null, 2)}`
            );
            handleChangeB(value); // 调用处理异步逻辑的函数
          }}
        />
      </BottomModal>

      {/* 自定义渲染项 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type="primary"
        textColorInverse
        onPress={() => bottomModalBRef.current?.open()}>
        renderItem 自定义渲染项
      </Button>
      <BottomModal
        ref={bottomModalBRef}
        title='自定义渲染项'
        cancelable={true}>
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          data={optionsA}
          fieldKeys={{ idKey: 'value' }}
          value={valueA}
          onChange={(value) => {
            appendEventLog('onChange', `renderItem → ${value.join(' → ')}`);
            setValueA(value); // 先更新值
            setTimeout(() => {
              const lastItem = getTargetItem(optionsA, value[value.length - 1]);
              const isLeaf = !lastItem?.children || lastItem.children.length === 0;
              if (isLeaf) {
                const message = value.join(' → ');
                ToastAndroid.show(`选择完成 选中：${message}, OK`, 3);
              }
            }, 0);
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
        type="primary"
        textColorInverse
        onPress={() => bottomModalDRef.current?.open()}>
        isLeafNode 自定义叶子节点判断
      </Button>
      <BottomModal
        ref={bottomModalDRef}
        title='自定义叶子节点判断'
        cancelable={true}>
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          data={optionsA}
          fieldKeys={{ idKey: 'value' }}
          value={valueA}
          isLeafNode={isLeafNodeNested}
          onChange={(value) => {
            appendEventLog('onChange', `isLeafNode custom → ${value.join(' → ')}`);
            setValueA(value); // 先更新值
            setTimeout(() => {
              const lastValue = value[value.length - 1];
              const lastItem = getTargetItem(optionsA, lastValue);
              const isLeaf = lastItem ? isLeafNodeNested(lastItem) : false;

              if (isLeaf) {
                const message = value.join(' → ');
                ToastAndroid.show(`选择完成 选中：${message}, OK`, 3);
              }
            }, 0);
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

      {/* ==== proportion示例 [1, 2, 1] ==== */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type="primary"
        textColorInverse
        onPress={() => bottomModalERef.current?.open()}
      >
        proportion示例 [1, 2, 1]
      </Button>
      <BottomModal
        ref={bottomModalERef}
        title='Proportion [1, 2, 1]'
        cancelable={true}
      >
        <Cascader
          style={{ height: 200, marginBottom: 50 }}
          data={optionsA}
          fieldKeys={{ idKey: 'value' }}
          value={valueA}
          proportion={[1, 2, 1]} // <--- 设置列宽比例
          onChange={(value) => {
            appendEventLog('onChange', `proportion [1,2,1] → ${value.join(' → ')}`);
            // 更新选中值
            setValueA(value); // 先更新值
            setTimeout(() => {
              const lastItem = getTargetItem(optionsA, value[value.length - 1]);
              const isLeaf = !lastItem?.children || lastItem.children.length === 0;
              if (isLeaf) {
                const message = value.join(' → ');
                ToastAndroid.show(`选择完成 选中：${message}`, ToastAndroid.SHORT);
              }
            }, 0);
          }}
        />
      </BottomModal>
    </ScrollView>
  );
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