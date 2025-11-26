> 模板版本：v0.0.1
<p align="center">
  <h1 align="center"> <code>beeshell-ls</code> </h1>
</p>
<p align="center">
    <a href="https://github.com/connerwu/beeshell_lib">
        <img src="https://img.shields.io/badge/platforms-android%20|%20ios%20|%20harmony%20-lightgrey.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/react-native-oh-library/teaset/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
    </a>
</p>

> [!TIP] [Github 地址](https://github.com/connerwu/beeshell_lib)

## 安装与使用

进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install beeshell-ls

# 0.72
npm @react-navigation/native-stack@6.9.26
npm @react-navigation/native@6.1.7
npm @react-native-oh-tpl/react-native-screens

# 0.77
npm @react-navigation/native-stack@7.2.0
npm @react-navigation/native@7.1.17
npm @react-native-ohos/react-native-screens

```

#### **yarn**

```bash
yarn add @react-native-ohos/teaset

# 0.72
yarn add @react-navigation/native-stack@6.9.26
yarn add @react-navigation/native@^6.1.7
yarn add @react-native-oh-tpl/react-native-screens

# 0.77
yarn add @react-navigation/native-stack@7.2.0
yarn add @react-navigation/native@7.1.17
yarn add @react-native-ohos/react-native-screens
```

<!-- tabs:end -->

下面的代码展示了该库的基本使用场景：

**Hello world**  
从 teaset 包中 import 组件即可使用
```
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Switch
} from 'react-native'
import { Radio, Icon } from 'beeshell-ls'
import styles from './PickerExample'
import star from 'beeshell-ls/common/images/icons/star.png'
import star_o from 'beeshell-ls/common/images/icons/star-half-o.png'
import variables from 'beeshell-ls/common/styles/variables'

const radioItems = [
  <Radio.Item key={0} value={0} label="选项A" style={{ marginRight: 12 }} />,
  <Radio.Item key={1} value={1} label="选项B" style={{ marginRight: 12 }} />,
  <Radio.Item key={2} value={2} label="选项C" />,
];

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    <Text style={styles.header}>{label}</Text>
    <View style={{ width: 10 }} /> {/* 文字和开关间的间距 */}
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);


export default class RadioScreen extends Component<any, any> {
  [propsName: string]: any

  constructor (props) {
    super(props)
    this.state = {
      valueA: 0,
      valueB: 2,
      valueC: 3,
      valueD: 4,
      valueE: 5,
      valueF: 6,
      iconPosition: false,
      flexDirection: false
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     valueA: 1
    //   })
    // }, 2000)
  }

  renderItem (checked, index, label) {
    let color = checked ? variables.mtdBrandDanger : variables.mtdGrayBase
    return (
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { checked ? <Icon type='star' size={16} tintColor={color} /> : <Icon type='star-o' size={16} tintColor={color} /> }
          <Text style={{ fontSize: 14, marginLeft: 8, color: color }}>{label}</Text>
          { index === 0 ? <Icon style={{ marginLeft: 5 }} type='question-circle' tintColor={variables.mtdGrayLighter} /> : null }
        </View>
        { index === 1 ? <Text style={{ color: variables.mtdGrayLighter, marginLeft: 24, fontSize: 12, marginTop: 5 }}>该选项风险较大，请谨慎选择</Text> : null }
      </View>
    )
  }

  setRadioProps(radioProps: { [key: string]: any }, key: string) {
    switch (key) {
      case 'iconPosition':
        radioProps[key] = this.state[key] ? 'column' : 'row';
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}>

            <Radio.Item label='选项A' value={0} />
            <Radio.Item label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>

        <Text style={styles.header}>onChange:回调函数:</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueD}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueD: value
              })
              Alert.alert('选中值', `当前选中值：${value}`)
            }}>

            <Radio.Item label='选项A' value={0} />
            <Radio.Item label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>

           <LabelSwitch
              label="style：横向布局"
              value={this.state.flexDirection}
              onValueChange={(value) => this.setState({ flexDirection: value })}
            />
           <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            style={{ flexDirection: this.state.flexDirection ? 'row' : 'column' }}
            value={this.state.valueB}
            onChange={(value) => {
              this.setState({
                valueB: value
              })
            }}
            iconPosition='right'>
            <Radio.Item label='选项一' value={1} />
            <Radio.Item label='选项二（禁用）' value={2} disabled />
            <Radio.Item label='选项三' value={3} />
          </Radio>
        </View>

        <LabelSwitch
              label="iconPosition：图标位置"
              value={this.state.iconPosition}
              onValueChange={(value) => this.setState({ iconPosition: value })}
            />
           <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            style={{ flexDirection: 'row' }}
            iconPosition={this.state.iconPosition ? 'left' : 'right'}
            value={this.state.valueF}
            onChange={(value) => {
              this.setState({
                valueF: value
              })
            }}
            >
            <Radio.Item label='选项一' value={1} />
            <Radio.Item label='选项二（禁用）' value={2} disabled />
            <Radio.Item label='选项三' value={3} />
          </Radio>
        </View>

       

        <Text style={styles.header}>checkedIcon: 自定义选择中图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueC}
            checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
            uncheckedIcon={<Icon type='star' source={star}  size={20} tintColor={variables.mtdGrayLightest} />}
            onChange={(value) => {
              this.setState({
                valueC: value
              })
            }}>
            <Radio.Item value={1} label='选项一' />
            <Radio.Item value={2} label='选项二'/>
            <Radio.Item value={3} label='选项三' />
          </Radio>
        </View>

        <Text style={styles.header}>uncheckedIcon: 自定义未选中图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueE}
            checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
            uncheckedIcon={<Icon type='star' source={star_o}  size={20} tintColor={variables.mtdGrayLightest} />}
            onChange={(value) => {
              this.setState({
                valueE: value
              })
            }}>
            <Radio.Item value={1} label='选项一' />
            <Radio.Item value={2} label='选项二'/>
            <Radio.Item value={3} label='选项三' />
          </Radio>
        </View>

        <Text style={styles.header}>children:数组形式子选项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio 
            value={this.state.valueA} 
            onChange={(value) => this.setState({ valueA: value })}
            >
  {radioItems}
</Radio>
        </View>

        <Text style={styles.header}>自定义渲染项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueD}
            onChange={(value) => {
              this.setState({
                valueD: value
              })
            }}>
            <Radio.Item
              value={1}
              renderItem={(checked) => {
                return this.renderItem(checked, 0, '选项一')
              }}
            />
            <Radio.Item
              value={2}
              renderItem={(checked) => {
                return this.renderItem(checked, 1, '选项二')
              }}
            />
            <Radio.Item
              value={3}
              renderItem={(checked) => {
                return this.renderItem(checked, 2, '选项三')
              }}
            />
          </Radio>
        </View>
      </ScrollView>
    )
  }
}

```
**按需加载**  
使用单独 import 组件实现按需加载
```
import { Radio, Icon, Rate } from 'beeshell-ls';
```

## Link

本库 HarmonyOS 侧实现依赖 react-native-screens 的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。

如未引入请参照[ react-native-screens 文档](/zh-cn/react-native-screens.md)进行引入

## 约束与限制

### 兼容性

本文档内容基于以下环境验证通过：

1. RNOH: 0.72.x/0.77.x; SDK：HarmonyOS 6.0.0.47 (API Version 20 Release); IDE：DevEco Studio 6.0.0 Release; ROM：6.0.0.110 SP8;

## 组件

> [!TIP] "Platform" 列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 1. Actionsheet - 底部操作菜单组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| header | 顶部标题内容，可为字符串或自定义 React 元素 | any | no | iOS/Android | yes |
| footer | 底部取消按钮文本或自定义元素 | any | no | iOS/Android | yes |
| data | 选项数据列表，每项为字符串或含 label 字段的对象 | DataItem[] \| any | no | iOS/Android | yes |
| maxShowNum | 最大显示选项数量，超出可滚动；设为 null 则不限制 | number \| null \| undefined | no | iOS/Android | yes |
| renderItem | 自定义选项渲染函数，接收 (item, index) | Function | no | iOS/Android | yes |
| onPressCancel | 点击取消按钮时的回调函数 | Function | no | iOS/Android | yes |
| onPressConfirm | 点击选项时的回调函数，接收 (item, index) | Function | no | iOS/Android | yes |
| useSafeAreaView | 是否启用 SafeAreaView 适配底部安全区域 | boolean | no | iOS/Android | yes |

### 2. Badge - 评分组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 徽章容器的自定义样式 | ViewStyle | no | iOS/Android | yes |
| label | 徽章显示的文本或数字内容 | string \| number | no | iOS/Android | yes |
| labelStyle | 徽章文本的自定义样式 | TextStyle | no | iOS/Android | yes |

### 3. BottomModal - 底部弹窗组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| testID | 添加唯一标识 | string | no | iOS/Android | yes |
| titleContainer | 自定义标题区域内容 | any | no | iOS/Android | yes |
| title | 标题文本内容 | string | no | iOS/Android | yes |
| titleStyle | 标题文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| rightLabel | 右侧按钮的自定义元素 | any | no | iOS/Android | yes |
| rightLabelText | 右侧按钮的文本内容 | string | no | iOS/Android | yes |
| rightLabelTextStyle | 右侧按钮文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| rightCallback | 右侧按钮点击时的回调函数 | Function | no | iOS/Android | yes |
| leftLabel | 左侧按钮的自定义元素 | any | no | iOS/Android | yes |
| leftLabelText | 左侧按钮的文本内容 | string | no | iOS/Android | yes |
| leftLabelTextStyle | 左侧按钮文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| leftCallback | 左侧按钮点击时的回调函数 | Function | no | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
