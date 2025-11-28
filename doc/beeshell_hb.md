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
yarn add beeshell-ls

# 0.72
yarn add @react-navigation/native-stack@6.9.26
yarn add @react-navigation/native@^6.1.7
yarn add @react-native-oh-tpl/react-native-screens

# 0.77
yarn add @react-navigation/native-stack@7.2.0
yarn add @react-navigation/native@7.1.17
yarn add @react-native-ohos/react-native-screens
```

下面的代码展示了该库的基本使用场景：

**Hello world**  
import React, { Component } from 'react'
import { Button, Picker, Datepicker } from 'beeshell-ls'
import variables from '../common/customTheme'
import { View, Text, ScrollView, StyleSheet} from 'react-native';

export default class DatepickerScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(props) {
    super(props)
    this.state = {
      dateValue: '2018-1-1',
      startYear: 2018,
      numberOfYears: 10,
      date: 'undefined',
      proportion: [2, 1, 1]
    }
  }

  componentDidMount () {
  }
  
  changeDate = (value: any) => {
    this.setState({
      dateValue: value
    })
  }

  render() {
    const { dateValue } = this.state
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          {/* 1. 基础示例 */}
          <Text style={styles.textStyle}>基础示例</Text> 
          <Datepicker />     
          
          {/* 2. 设置开始年份*/}
          <Text style={styles.textStyle}>设置开始年份</Text>
          <Datepicker
            startYear={2023}
          />

          {/* 3. 设置年数*/}
          <Text style={styles.textStyle}>设置年数</Text>
          <Datepicker
            numberOfYears={10}
          />

          {/* 4. 设置开始日期*/}
          <Text style={styles.textStyle}>设置开始日期</Text>
          <Datepicker
            date={'2021-05-04'}
          />

          {/* 5. 间隔布局*/}
          <Text style={styles.textStyle}>设置年月日布局间隔</Text>
          <Datepicker
            proportion={[2,4,6]}
          />

           {/* 6. 修改日期*/}
          <Text style={styles.textStyle}>修改日期</Text>
          <Datepicker
            date={dateValue}
            onChange={this.changeDate}
          />    
          <Text style={styles.textStyle}>选择的日期值：{ dateValue }</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL
  },
  container: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 30,
    color: variables.mtdGrayDark
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 30,
    color: variables.mtdGrayDark
  },
});
```
**按需加载**  
使用单独 import 组件实现按需加载
```
import { DatePicker } from 'beeshell-ls';
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

### 1. DatePicker - 日期选择组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| startYear | 开始年份  | any | no | iOS/Android | yes |
| numberOfYears |  选择的年数 | any | no | iOS/Android | yes |
| date | 默认日期 | any | no | iOS/Android | yes |
| proportion |  年月日列表的布局 | 数组 | no | iOS/Android | yes |
| onChange | 监听值变化回调函数 | function | no | iOS/Android | yes |

### 2. Popover - 弹层组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| offsetX | 弹出位置 X 轴坐标 | number | no | iOS/Android | yes |
| offsetY | 弹出位置 Y 轴坐标 | number | no | iOS/Android | yes |
| direction | 视图弹出方向 | string/string[] | no | iOS/Android | yes |
| align | 弹出视图所处位置 | string | no | iOS/Android | yes |
| cancelable | 是否可关闭弹层 | bool | no | iOS/Android | yes |
| onOpen | 打开弹层的方法 | Function | no | iOS/Android | yes |
| onClosed | 关闭弹层的方法 | Function | no | iOS/Android | yes |
| children | 弹出框展示内容 | string/ReactChild/ReactChild[] | true | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
