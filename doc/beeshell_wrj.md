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

<!-- tabs:end -->

下面的代码展示了该库的基本使用场景：

**Progress组件**  
从 beeshell-ls 包中 import 组件即可使用
```
import React, { Component, ReactNode } from "react";

// beeshell-ls components
import { Progress, Button } from 'beeshell-ls'

// react-native
import { View, Text, StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({

})

export default class ProgressExample extends Component<{}, any> {

    constructor(props: {}) {
        super(props)

        this.state = {
            value_1: 90,

            value_2: 90,
            duration_2: 2000,

            value_3: 90,
            easing_3: false
        }
    }

    render(): ReactNode {
        return (
            <ScrollView>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>默认</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_1} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>动画持续2000ms</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_2} duration={this.state.duration_2} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>没有动画</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_3} easing={this.state.easing_3} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Button
                        onPress={() => {
                            this.setState({
                                value_1: Math.floor((Math.random()*100)+1),
                                value_2: Math.floor((Math.random()*100)+1),
                                value_3: Math.floor((Math.random()*100)+1)
                            })
                        }}
                        >随机设置值</Button>
                </View>
            </ScrollView>
        )
    }
}
```
**Checkbox组件**  
从 beeshell-ls 包中 import 组件即可使用
```
import React, { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { Checkbox, Icon } from "beeshell-ls";

import star from 'beeshell-ls/common/images/icons/star.png'
import star_o from 'beeshell-ls/common/images/icons/star-half-o.png'
import variables from 'beeshell-ls/common/styles/variables'

const box_items = [
    {
        value: 1,
        label: 'a'
    },
    {
        value: 2,
        label: 'b'
    },
    {
        value: 3,
        label: 'c'
    }
]

export default function CheckboxExample() {
    const [value_1, setStateValue_1] = useState([])
    const [value_2, setStateValue_2] = useState([])
    const [value_3, setStateValue_3] = useState([])
    const [value_4, setStateValue_4] = useState([])
    const [value_5, setStateValue_5] = useState([])
    const [value_6, setStateValue_6] = useState([])
    const [value_7, setStateValue_7] = useState([])
    return (
        <ScrollView>
            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>基础</Text>
                <Checkbox 
                    value={value_1}
                    onChange={(value: []) => {
                        setStateValue_1(value)
                    }}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>选中状态改变回调</Text>
                <Checkbox 
                    value={value_7}
                    onChange={(value: []) => {
                        setStateValue_7(value)
                        Alert.alert('选中值', `当前选中值：${value}`)
                    }}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>图标位置右</Text>
                <Checkbox 
                    value={value_2}
                    onChange={(value: []) => {
                        setStateValue_2(value)
                    }}
                    iconPosition="right"
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>可全选</Text>
                <Checkbox 
                    value={value_3}
                    onChange={(value: []) => {
                        setStateValue_3(value)
                    }}
                    showAllCheck={true}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义选中图标</Text>
                <Checkbox 
                    value={value_4}
                    onChange={(value: []) => {
                        setStateValue_4(value)
                    }}
                    checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义未选中图标</Text>
                <Checkbox 
                    value={value_5}
                    onChange={(value: []) => {
                        setStateValue_5(value)
                    }}
                    uncheckedIcon={<Icon type='star' source={star_o}  size={20} tintColor={variables.mtdGrayLightest} />}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义子选项</Text>
                <Checkbox 
                    value={value_6}
                    onChange={(value: []) => {
                        setStateValue_6(value)
                        Alert.alert('选中值', `选中状态：${value}`)
                    }}
                    style={{padding: 20}}>
                    <Checkbox.Item value={1} label={'自定义选项label'} />
                    <Checkbox.Item value={2} label={'自定义选项disabled'} disabled={true} />
                    <Checkbox.Item value={7} label={'自定义选项renderItem'} renderItem={(checked) => (
                        <View>
                            <Text>选中状态：</Text>
                            <Text>{checked ? 'true' : 'false'}</Text>
                        </View>
                    ) } />
                </Checkbox>
            </View>
        </ScrollView>
    )
}
```

**按需加载**  
使用单独 import 组件实现按需加载
```
import { xxx } from 'beeshell-ls'
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

### 4. Input - 输入框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| value | 输入框受控值 | 	string | no | iOS/Android | yes |
| onChange | 输入内容变化回调（参数为输入值） | Function | yes | iOS/Android | yes |
| textAlign | 文本对齐方式（left/right/center）| string | no | iOS/Android | yes |
| onBlur | 输入框失焦回调 | Function | no | iOS | yes |
| onFocus | 输入框聚焦回调 | 	Function | no | iOS/Android | yes |
| style | 外层容器样式 | 	ViewStyle | no | iOS/Android | yes |
| inputStyle | 输入框文本样式 | TextStyle | yes | iOS/Android | yes |
| autoFocus | 是否自动聚焦 | boolean | no | iOS/Android | yes |
| editable | 是否允许编辑（false 为只读）| boolean | no | iOS | yes |
| maxLength | 输入最大长度限制 | 	number | no | iOS/Android | yes |
| autoCorrect | 是否开启拼写纠错 | 	boolean | no | iOS | no |
| placeholder | 输入框提示 | 	string | no | iOS/Android | yes |
| placeholderTextColor | 提示文本颜色 | 	string | no | iOS/Android | yes |
| keyboardType | 弹出键盘类型（default/number-pad 等） | 	string | no | iOS/Android | yes |
| clearButtonMode | 清除按钮显示时机（while-editing/never） | 	string | no | iOS/Android | yes |

### 17. Progress - 进度条

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 外层容器样式 | 	ViewStyle | no | iOS/Android | yes |
| barStyle | 进度条样式 | ViewStyle | no | iOS/Android | yes |
| percent | 进度（0-100区间） | number | no | iOS/Android | yes |
| easing | 是否需要动画 | boolean | no | iOS/Android | yes |
| duration | 动画持续时间（ms） | 	number | no | iOS/Android | yes |

### 7. Checkbox -  复选框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ------------ | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ViewStyle | no | iOS/Android | yes |
| value | 选中状态值 | any[] | no | iOS/Android | yes |
| iconPosition | 图标位置（'left'\|'right'） | string | no | iOS/Android | yes |
| onChange | 选中状态改变回调 | Function | no | iOS/Android | yes |
| children | 复选框子项 | ReactChild[] \| ReactChild | no | iOS/Android | yes |
| showAllCheck | 显示全选 | 	boolean | no | iOS/Android | yes |
| checkedIcon | 选中状态图标 | 	ReactElement<any> | no | iOS/Android | yes |
| uncheckedIcon | 未选中状态图标 | 	ReactElement<any> | no | iOS/Android | yes |

#### 7.1. Checkbox.Item -  复选框子选项

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ViewStyle | no | iOS/Android | yes |
| label | label值 | string | no | iOS/Android | yes |
| value | 选中状态值 | any\|null\|undefined | no | iOS/Android | yes |
| disabled | 禁用状态 | boolean | no | iOS/Android | yes |
| renderItem | 自行定义选项 | 	Function | no | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
