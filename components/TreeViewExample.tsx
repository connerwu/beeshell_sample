
// TreeViewTestScreen.tsx
// Updated TreeViewScreen.tsx - Full Feature Debug Console Style

import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid
} from 'react-native'
import { TreeView, Picker, Button, Switch } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

// Icon Preview Components
const ActiveIcon = () => <Text style={{ fontSize: 14 }}>📂</Text>
const InactiveIcon = () => <Text style={{ fontSize: 14 }}>📁</Text>

const LabelRow = ({ label, children }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
)

const LabelPicker = ({ lable, maps, onValueChange,pickerTitle }) => (
        <View style={styles.row}>
          <Text style={styles.label}>{lable}</Text>
          <Picker label={pickerTitle} style={{ width: 240 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {maps.map(v => (
                <Button
                  key={v}
                  onPress={() => onValueChange(v)} 
                >{v}</Button>
              ))}
            </View>
          </Picker>
        </View>
); 

// nested data
const nestedData = [
  {
    id: '1',
    label: '节点 1',
    active: true,
    children: [
      { id: '1-1', label: '节点 1-1' },
      {
        id: '1-2',
        label: '节点 1-2',
        children: [{ id: '1-2-1', label: '节点 1-2-1' }]
      }
    ]
  },
  { id: '2', label: '节点 2' }
]

// flat data
const flatData = [
  { id: '1', pId: null, label: 'tree 1', active: true },
  { id: '1-1', pId: '1', label: 'tree 1-1' },
  { id: '1-2', pId: '1', label: 'tree 1-2' },
  { id: '1-2-1', pId: '1-2', label: 'tree 1-2-1' },
  { id: '2', pId: null, label: 'tree 2' }
]

export default class TreeViewScreen extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      styleText: '{}',
      dataStructureType: 'nested', 
      fieldKeysText: JSON.stringify({
        idKey: 'id',
        pIdKey: 'pId',
        labelKey: 'label',
        childrenKey: 'children',
        activeKey: 'active'
      }, null, 2),
      useCustomIcons: true,
      data: nestedData,
      nodeIdInput: ''
    }
  }

  getFieldKeys = () => {
    try { return JSON.parse(this.state.fieldKeysText) }
    catch { 
      // Alert.alert('⚠ fieldKeys JSON 解析错误'); 
      ToastAndroid.show(`⚠ fieldKeys JSON 解析错误`, 3);
      return null 
    }
  }

  getStyle = () => {
    try { return JSON.parse(this.state.styleText) }
    catch { 
      // Alert.alert('⚠ style JSON 解析错误'); 
      ToastAndroid.show(`⚠ style JSON 解析错误'`, 3);
      return {} 
    }
  }

  updateAllActive = (expand) => {
    const f = this.getFieldKeys()
    const aKey = f.activeKey
    const deepCopy = JSON.parse(JSON.stringify(this.state.data))

    const toggle = (lst: any[]) =>
      lst.forEach(n => {
        n[aKey] = expand
        if (n[f.childrenKey]) toggle(n[f.childrenKey])
      })

    toggle(deepCopy)
    this.setState({ data: deepCopy })
  }

  render() {
    const { dataStructureType, data, fieldKeysText, styleText, useCustomIcons } = this.state

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>TreeView 调试控制台</Text>

        {/* 自定义 Style */}
        <View style={styles.panel}>
          {/* <LabelRow label="style JSON">
            <TextInput
              style={styles.jsonInput}
              multiline
              value={styleText}
              onChangeText={t => this.setState({ styleText: t })}
            />
          </LabelRow> */}

        <LabelPicker
          lable='style 风格'
          maps={[
            JSON.stringify({ backgroundColor: '#f5f5f5' }),
            JSON.stringify({ padding: 20 }),
            JSON.stringify({ backgroundColor: '#ffd591', padding: 10 }),
            JSON.stringify({ borderWidth: 1, borderColor: '#ccc' })
          ]}
          pickerTitle={styleText}
          onValueChange={(v) => this.setState({ styleText: v })}
        ></LabelPicker>

        </View>

        {/* 图标切换 */}
        <LabelRow label="activeIcon|inactiveIcon 使用自定义图标">
          <Switch value={useCustomIcons} onChange={v => this.setState({ useCustomIcons: v })} />
        </LabelRow>

        {/* 树数据类型 */}
        <LabelRow label="dataStructureType|data 数据类型">
          <Picker label={dataStructureType} style={{ width: 160 }}>
            <View style={styles.pickerPanel}>
              <Button onPress={() => {
                this.setState({
                    dataStructureType: 'nested',
                    data: nestedData,
                    fieldKeysText: JSON.stringify({
                    idKey: 'id',
                    labelKey: 'label',
                    childrenKey: 'children',
                    activeKey: 'active'
                  }, null, 2)
                  })
                }}>nested</Button>
              <Button style={{ marginTop: 6 }} onPress={() => {
                this.setState({ 
                  dataStructureType: 'flattened', 
                  data: flatData,
                  fieldKeysText: JSON.stringify({
                  idKey: 'id',
                  pIdKey: 'pId',
                  labelKey: 'label',
                  activeKey: 'active'
                }, null, 2)                
                })
                }}>flat</Button>
            </View>
          </Picker>
        </LabelRow>

        {/* fieldKeys 编辑 */}
        <View style={[styles.panel, { marginTop: 12 }]}>
          <Text style={styles.subHeader}>fieldKeys JSON</Text>
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.jsonInput}
            value={fieldKeysText}
            onChangeText={(t) => this.setState({ fieldKeysText: t })}
          />
        </View>

        {/* 方法区域 */}
        {/* <View style={[styles.panel, { marginTop: 12 }]}>
          <Text style={styles.subHeader}>方法测试</Text>

          <View style={styles.inlineBtns}>
            <Button onPress={() => this.updateAllActive(true)}>展开所有</Button>
            <Button onPress={() => this.updateAllActive(false)}>收起所有</Button>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TextInput
              placeholder="输入 id"
              style={styles.smallInput}
              onChangeText={nodeIdInput => this.setState({ nodeIdInput })}
            />
            <Button onPress={() => ToastAndroid.show(`手动节点操作略，可扩展`, 3)}>切换节点</Button>
          </View>
        </View> */}

        {/* TreeView 预览 */}
        <View style={[styles.panel, { marginTop: 12 }]}>
          <Text style={styles.subHeader}>TreeView 预览</Text>

          <TreeView
            style={this.getStyle()}
            activeIcon={useCustomIcons ? <ActiveIcon /> : undefined}
            inactiveIcon={useCustomIcons ? <InactiveIcon /> : undefined}
            data={data}
            dataStructureType={dataStructureType}
            fieldKeys={this.getFieldKeys()}
            onPress={item =>
              // Alert.alert(`onPress id=${item.id}`, JSON.stringify(item, null, 2))
              ToastAndroid.show(`onPress id=${item.id}, ${JSON.stringify(item, null, 2)}'`, 3)
            }
          />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: { backgroundColor: variables.mtdFillBody, flex: 1 },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    padding: 16,
    fontWeight: 'bold',
    color: variables.mtdGrayDark
  },
  subHeader: {
    marginBottom: 8,
    fontWeight: 'bold'
  },
  panel: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 6
  },
  label: { fontSize: 14, color: '#000' },
  jsonInput: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8
  },
  pickerPanel: {
    backgroundColor: '#fff',
    padding: 10
  },
  inlineBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  smallInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 4,
    paddingHorizontal: 8
  }
})

