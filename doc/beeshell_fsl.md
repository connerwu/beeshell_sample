> 模板版本：v0.2.2

<p align="center">
  <h1 align="center"> <code>teaset</code> </h1>
</p>
<p align="center">
    <a href="https://github.com/react-native-oh-library/teaset">
        <img src="https://img.shields.io/badge/platforms-android%20|%20ios%20|%20harmony%20-lightgrey.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/react-native-oh-library/teaset/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
    </a>
</p>

> [!TIP] [Github 地址](https://github.com/react-native-oh-library/teaset)

## 安装与使用

进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install @react-native-ohos/teaset

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
import React, {Component} from 'react';
import {View, AppRegistry} from 'react-native';

import {Label} from 'teaset';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label size='xl' text='Hello world!' />
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```
**按需加载**  
使用单独 import 组件实现按需加载
```
import Label from 'teaset/components/Label/Label';
```

## Link

本库 HarmonyOS 侧实现依赖 react-native-screens 的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。

如未引入请参照[ react-native-screens 文档](/zh-cn/react-native-screens.md)进行引入

## 约束与限制

### 兼容性

本文档内容基于以下环境验证通过：

1. RNOH: 0.72.x/0.77.x; SDK：HarmonyOS 6.0.0.47 (API Version 20 Release); IDE：DevEco Studio 6.0.0 Release; ROM：6.0.0.108 SP6;

## 组件

> [!TIP] "Platform" 列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 1. Dialog - 弹框

用于展示系统提示、操作确认、自定义内容等场景，支持多样式定制与灵活交互。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 弹窗标题文本 | string | no | iOS/Android | yes |
| titleStyle | 标题文本样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| bodyText | 弹窗主体文本内容 | string | no | iOS/Android | yes |
| bodyTextStyle | 主体文本样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| header | 自定义头部内容（替代默认标题） | React.ReactNode | no | iOS/Android | yes |
| body | 自定义主体内容（替代默认 bodyText） | React.ReactNode | no | iOS/Android | yes |
| cancelable | 是否支持点击弹窗外部关闭 | boolean | no | iOS/Android | yes |
| cancelLabelText | 取消按钮文本 | string | no | iOS/Android | yes |
| cancelLabelTextStyle | 取消按钮文本样式（仅纯文本按钮生效） | StyleProp<TextStyle> | no | iOS/Android | yes |
| confirmLabelText | 确认按钮文本 | string | no | iOS/Android | yes |
| confirmLabelTextStyle | 确认按钮文本样式（仅纯文本按钮生效） | StyleProp<TextStyle> | no | iOS/Android | yes |
| cancelLabel | 自定义取消按钮内容（优先级高于 cancelLabelText） | React.ReactNode | no | iOS/Android | yes |
| confirmLabel | 自定义确认按钮内容（优先级高于 confirmLabelText） | React.ReactNode | no | iOS/Android | yes |
| cancelCallback | 取消按钮点击回调 | () => void | no | iOS/Android | yes |
| confirmCallback | 确认按钮点击回调 | () => void | no | iOS/Android | yes |
| operations | 自定义底部操作按钮组（替代默认取消 / 确认按钮） | Array<{ label?: React.ReactNode; labelText?: string; type?: 'cancel'/'confirm'; onPress: () => void }> | no | iOS/Android | yes |
| operationsLayout | 底部操作按钮布局方向（可选值：row/column） | string | no | iOS/Android | yes |


## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
