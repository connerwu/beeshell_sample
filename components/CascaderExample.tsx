import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';

import { Cascader, BottomModal, Button, Icon } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

export default class CascaderScreen extends Component<any, any> {
  [propsName: string]: any;

  constructor(props) {
    super(props);
    this.state = {
      valueA: ['sweetie'],
      valueX: ['baiziwan'],
      optionsB: [],
      valueB: [],
    };
  }

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

  // 异步加载数据
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
    const targetItem = this.getTargetItem(this.state.optionsB, value[value.length - 1])
    if (!targetItem) {
      console.log('error')
      return
    }
    if (targetItem.children && targetItem.children.length) {
      this.setState({
        valueB: value
      })
    } else {
      this.fetchData(value).then((data: any) => {
        let newOptionsB
        if (data && data.list && data.list.length) {
          targetItem.children = data.list

          newOptionsB = [
            ...this.state.optionsB
          ]
        } else {
          newOptionsB = this.state.optionsB
        }

        this.setState({
          valueB: value,
          optionsB: newOptionsB
        })
      }).catch((e) => {
        console.log(e)
      })
    }
  }

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

    // 判断是否为叶子节点的函数
    const isLeafNodeFlattened = (item) => item.isLeaf === true;

    const isLeafNodeNested = (item) => {
      return !item.children || item.children.length === 0;
    };

    return (
      <View style={[localStyles.body, localStyles.container]}>
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
              // 获取最后选中的项
              const lastId = value[value.length - 1];
              const lastItem = optionsX.find(item => item.id === lastId);

              // 只有叶子节点才视为选择完成
              if (lastItem && isLeafNodeFlattened(lastItem)) {
                this.setState({ valueX: value }, () => {
                  const message = value.join(' → ');
                  Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                });
              } else {
                // 非叶子节点：仅更新状态（用于展开下一级），不弹框
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
              this.setState({ valueA: value }, () => {
                const lastItem = this.getTargetItem(optionsA, value[value.length - 1]);
                const isLeaf = !lastItem?.children || lastItem.children.length === 0;
                if (isLeaf) {
                  const message = value.join(' → ');
                  Alert.alert(
                    '选择完成',
                    `选中：${message}`,
                    [{ text: 'OK' }]
                  );
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
            onChange={this.handleChangeB}
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
              this.setState({ valueA: value }, () => {
                const lastItem = this.getTargetItem(optionsA, value[value.length - 1]);
                const isLeaf = !lastItem?.children || lastItem.children.length === 0;
                if (isLeaf) {
                  const message = value.join(' → ');
                  Alert.alert(
                    '选择完成',
                    `选中：${message}`,
                    [{ text: 'OK' }]
                  );
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
              const lastValue = value[value.length - 1];
              const lastItem = this.getTargetItem(optionsA, lastValue);

              // 使用统一的 isLeaf 判断
              const isLeaf = lastItem ? isLeafNodeNested(lastItem) : false;

              this.setState({ valueA: value }, () => {
                if (isLeaf) {
                  const message = value.join(' → ');
                  Alert.alert('选择完成', `选中：${message}`, [{ text: 'OK' }]);
                }
                // 如果不是叶子，只是切换层级，不弹框
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
      </View>
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