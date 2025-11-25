> 模板版本：v0.2.2

<p align="center">
  <h1 align="center"> <code>beeshell-ls</code> </h1>
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
从 beeshell-ls 包中 import 组件即可使用
```
import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Button, Dialog } from 'beeshell-ls'
import variables from '../common/customTheme'

interface State {
  count: number,
  animatedTranslateX: any,
  animatedTranslateY: any
}

export default class DialogScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      count: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined
    }
  }

  clickHandle(e) {
    this.setState({
      count: this.state.count + 1
    })
    console.warn('clickHandle', Object.keys(e))
  }

  getLabel(label, type) {
    const color = type === 'confirm' ? variables.mtdBrandPrimaryDark : variables.mtdGrayDark
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          paddingHorizontal: 15
        }}>
        <Text style={{ fontSize: 16, color }}>{label}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          {/* 1. 基础示例 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog1.open()
            }}
          >
            基础
          </Button>
          <Dialog
            ref={(c) => {
              this.dialog1 = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？'
            cancelable={true}
            cancelCallback={() => {
              console.log('cancel')
            }}
            confirmCallback={() => {
              console.log('confirm')
            }}
          />

          {/* 2. 自定义标题&主体文本样式*/}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogX1.open()
            }}
          >
            自定义标题&文本样式
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogX1 = c
            }}
            title='系统提示'
            titleStyle={{ color: variables.mtdBrandDanger, fontSize: 18, fontWeight: '600' }}
            bodyText='确认删除该信息？删除后数据将无法恢复，请谨慎操作～'
            bodyTextStyle={{ fontWeight: '600', color: '#666', lineHeight: 24, fontSize: 15 }}
            cancelable={true}
          />

          {/* 3. 一个按钮 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogA.open()
            }}
          >
            一个按钮
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogA = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelable={true}
            cancelLabelText=""
            confirmLabelText='我知道了'
            confirmCallback={() => {
              console.log('confirm')
            }}
          />

          {/* 4. 自定义按钮样式 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogBtnStyle.open()
            }}
          >
            自定义按钮样式
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogBtnStyle = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            // 按钮文本样式
            cancelLabelText='取消'
            confirmLabelText='确认'
            cancelLabelTextStyle={{
              color: 'red',
              fontSize: 18,
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center'
            }}
            confirmLabelTextStyle={{
              color: 'blue',
              fontSize: 18,
              fontWeight: 'light',
              fontStyle: 'italic',
              textAlign: 'center',
              textDecorationLine: 'underline'
            }}
            cancelable={true}
            cancelCallback={() => this.dialogBtnStyle.close()}
            confirmCallback={() => this.dialogBtnStyle.close()}
          />

          {/* 5. 自定义按钮内容 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialogCustomBtn.open()
            }}
          >
            自定义按钮内容
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogCustomBtn = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelLabel={
              <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}>取消删除</Text>
              </View>
            }
            confirmLabel={
              <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
                <Text style={{ color: 'blue', fontSize: 16, fontWeight: '600', textAlign:'center' }}>确认删除</Text>
              </View>
            }
            cancelCallback={() => this.dialogCustomBtn.close()}
            confirmCallback={() => this.dialogCustomBtn.close()}
          />

          {/* 6. 自定义 header body & footer*/}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog2.open()
            }}
          >
            自定义 header body & footer
          </Button>
          <Dialog
            ref={(c) => { this.dialog2 = c }}
            // 自定义 header
            header={
              <View style={{ paddingTop: 30, paddingBottom: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: variables.mtdBrandSuccess, fontWeight: '600' }}>操作成功</Text>
              </View>
            }
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 80 }}>
                  <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity activeOpacity={1}>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            }
            cancelable={true}
            operations={[
              {
                label: this.getLabel('操作一', 'confirm'),
                onPress: () => {
                  console.log('操作一')
                }
              },
              {
                label: this.getLabel('操作二', 'confirm'),
                type: 'confirm',
                onPress: () => {
                  console.log('操作二')
                }
              },
              {
                label: this.getLabel('操作三', 'cancel'),
                type: 'cancel',
                onPress: () => {
                  console.log('操作三')
                }
              }
            ]}>
          </Dialog>

          {/* 7. 自定义 footer 布局 */}
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog3.open()
            }}
          >
            自定义 footer 布局
          </Button>
          <Dialog
            ref={(c) => { this.dialog3 = c }}
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>自定义内容</Text>
                </View>
              </View>}
            cancelable={true}
            operationsLayout='column'
            operations={[
              {
                labelText: '操作一',
                type: 'cancel',
                onPress: () => {
                  console.log('操作一')
                }
              },
              {
                labelText: '操作二',
                type: 'confirm',
                onPress: () => {
                  console.log('操作二')
                }
              },
              {
                labelText: '操作三',
                type: 'confirm',
                onPress: () => {
                  console.log('操作三')
                }
              }
            ]}>
          </Dialog>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdBackgroundColor || '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
});
```
**按需加载**  
使用单独 import 组件实现按需加载
```
import { Dialog } from 'beeshell-ls'
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

### 2. Form - 表单


### 3. Icon - 图标

使用 Image 元素实现，并且在本组件库的其他组中使用。因为 Android 平台不支持 tintColor 属性，所以使用场景很有限，请根据自己的实际情况使用。推荐在自己的项目中集成字体文件功能

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ImageStyle | no | iOS/Android | yes |
| type | 图标类型标识 | string | no | iOS/Android | yes |
| size | 图标大小 | number | no | iOS/Android | yes |
| tintColor | 图标颜色 | string | no | iOS | yes |
| source | 	自定义图片 | 	ImageSourcePropType | no | iOS/Android | yes |



## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
