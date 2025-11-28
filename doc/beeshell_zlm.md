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

### 18. Radio - 单选框组件

类似 HTML Radio 的单选框组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | any | false | iOS/Android | yes |
| iconPosition |  图标位置 | 'left' \| 'right' | false | iOS/Android | yes |
| checkedIcon | 选中的图标 | ReactElement\<any> | false | iOS/Android | yes |
| uncheckedIcon |  未选中的图标 | ReactElement\<any> | false | iOS/Android | yes |
| value | 选中的值，与 Radio.Item 的 value 属性对应 | any | false | iOS/Android | yes |
| children | 子元素 | ReactChild[] \| ReactChild | false | iOS/Android | yes |
| onChange | 值变化回调函数 | function | false | iOS/Android | yes |

Radio.Item Props
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 单选项样式  | any | false | iOS/Android | yes |
| label |  选项文案 | string | true | iOS/Android | yes |
| value | 选项值 | any | true | iOS/Android | yes |
| disabled |  禁用选项 | boolean | false | iOS/Android | yes |
| renderItem | 自定义渲染项 | Function | false | iOS/Android | yes |


### 19. Rate - 评分组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 自定义样式  | ViewStyle | false | iOS/Android | yes |
| value |  分数 | number | false | iOS/Android | yes |
| total | 总分数 | number | false | iOS/Android | yes |
| icons |  图标元素集合 | { <br/>&nbsp;&nbsp; empty: ReactElement\<any> <br/>&nbsp;&nbsp; full: ReactElement\<any> <br/>&nbsp;&nbsp; half?: ReactElement\<any> <br/> } | false | iOS/Android | yes |
| iconSize | 图标的尺寸 | number | false | iOS/Android | yes |
| iconSpace | 图标的间隔 | number | true | iOS/Android | yes |
| iconColor | 图标颜色 | string | true | iOS/Android | yes |
| enableHalf | 是否开启半分 | boolean | false | iOS/Android | yes |
| onChange | 评分变化的回调函数 | function | false | iOS/Android | yes |

### 20. Scrollpicker - 滚动选择组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | true |
| list |  选择数据源，二维数组，第一层代表列，第二层代表选择项，选择项数据可以是对象（必须包含 label 属性）或者 string、number | Array | false | iOS/Android | yes |
| value | 选中的数据，一维数组，数组索引代表 list 列，数组值对应 list 行，所以其长度要和数据源 list 长度一致 | Array | false | iOS/Android | yes |
| proportion |  分区比例，注意和数据源长度保持一致 | Array| false | iOS/Android | yes |
| offsetCount | 选中项距离顶部的偏移个数 | number | false | iOS/Android | yes |
| onChange | 数据变化回调，该函数提供两个索引参数，第一个是列索引，第二个是行索引 | Function | false | iOS/Android | yes |
| renderItem | 自定义渲染项 | Function | false | iOS/Android | yes |

### 21. SlideModal - 滑动弹框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| styles | 自定义各层级元素样式  | { root: ViewStyle, container: ViewStyle, backdrop: ViewStyle, content: ViewStyle } | false | iOS/Android | yes |
| offsetX | 弹出位置 X 轴坐标 | number | false | iOS/Android | yes |
| offsetY | 弹出位置 Y 轴坐标 | number | false | iOS/Android | yes |
| direction | 	动画的方向，值为 'up' 'down' 'left' 'right' ['up', 'left' ] 等| string/string[]| false | iOS/Android | yes |
| align | 内容部分所处的位置 | string | false | iOS/Android | yes |
| fullScreenPatch | 全屏补丁，配置区域是否可以击穿 | boolean[] | false | iOS/Android | yes |
| children | 弹框内容 | ReactChild/ReactChild[] | false | iOS/Android | yes |

### 22. Slider - 滑块组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| value | 当前值 | number | false | iOS/Android | yes |
| min | 最小值| number | false | iOS/Android | yes |
| max | 	最大值| number| false | iOS/Android | yes |
| disabled | 是否禁用 | boolean | false | iOS/Android | yes |
| step | 滑动最小单位 | number | false | iOS/Android | yes |
| marks | 刻度对应的标记值 | string[] / ReactElement[] | false | iOS/Android | yes |
| maxTrackColor | 最大一段滑轨的颜色 | string | false | iOS/Android | yes |
| minTrackColor | 最小一段滑轨的颜色 | string | false | iOS/Android | yes |
| midTrackColor | 中间一段滑轨的颜色 | string | false | iOS/Android | yes |
| onChange | 值改变回调 | Function | false | iOS/Android | yes |
| showTip | 是否显示气泡 | boolean | false | iOS/Android | yes |
| renderTip | 自定义气泡渲染内容，回调参数 isOther 标识当前为哪个滑块 | Function | false | iOS/Android | yes |
| renderThumb | 自定义滑块的显示，回调参数 isOther 标识当前为哪个滑块 | Function | false | iOS/Android | yes |

### 23. Stepper - 计数器组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| operatorStyle | 	操作按钮样式 | any | false | iOS/Android | yes |
| operatorIconColor | 操作按钮图标颜色| string | false | iOS/Android | yes |
| max | 	最大值| number| false | iOS/Android | yes |
| min | 最小值 | number | false | iOS/Android | yes |
| value | 当前值 | number | false | iOS/Android | yes |
| step | 步长 | number | false | iOS/Android | yes |

### 24. Switch - 开关组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| value | 	状态值 | boolean | false | iOS/Android | yes |
| disabled | 是否可以切换状态| boolean | false | iOS/Android | yes |
| rockerSize | 	滑块的尺寸，支持 'lg' 'sm'| string| false | iOS/Android | yes |
| activeColor | 打开状态颜色 | string | false | iOS/Android | yes |
| onChange | 值变化回调 | Function | false | iOS/Android | yes |

### 25. Tab - 标签页组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| dataContainerStyle | 	数据源容器的样式 | ViewStyle | false | iOS/Android | yes |
| dataItemContainerStyle | 数据源每一项的容器样式| ViewStyle | false | iOS/Android | yes |
| dataItemStyle | 	数据源每一项的样式| ViewStyle| false | iOS/Android | yes |
| activeColor | 激活状态颜色 | string | false | iOS/Android | yes |
| data | 	数据源，数组元素为对象，必须包含 label 和 value 属性 | Array | true | iOS/Android | yes |
| value | 激活项的值，与数据源某项的 value 相等 | any | false | iOS/Android | yes |
| onChange | 状态切换时的回调，参数为数据源的选项和索引 | Function | false | iOS/Android | yes |
| renderItem | 自定义渲染项，函数参数为 item index active | Function | false | iOS/Android | yes |

Methods
.scrollTo(index: number)
滚动到 index 索引指定的选项。

### 26. Tag - 标签

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| textStyle | 	文本样式 | ViewStyle | false | iOS/Android | yes |
| type | 类型，支持 'default' 'primary' 'danger' 'info' 'success' 'warning'| ViewStyle | false | iOS/Android | yes |
| textColorInverse | 	文本反色| ViewStyle| false | iOS/Android | yes |

### 27. Timepicker - 时间选择器

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| hourStep | 	时步长 | number | false | iOS/Android | yes |
| minuteStep | 分步长| number | false | iOS/Android | yes |
| secondStep | 	秒步长| number| false | iOS/Android | yes |
| value | 	选定的时间字符串，'HH:mm:ss' 格式| string| false | iOS/Android | yes |
| onChange | 	数据变化回调| Function| false | iOS/Android | yes |

### 28. Tip - 提示框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| body	 | 样式  | string/ReactElement | false | iOS/Android | yes |
| duration | 	时步长 | number | false | iOS/Android | yes |
| position | 分步长| string/string[] | false | iOS/Android | yes |

Methods
.show(msg: string, duration?: number, cancelable?: boolean, position?: string | string[])
这是一个类方法（静态方法）。
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| msg	 | 	展示文案  | string | false | iOS/Android | yes |
| duration | 	在多少毫秒后自动消失 | number | false | iOS/Android | yes |
| cancelable | 点击空白处是否关闭| boolean | false | iOS/Android | yes |
| position | 弹框展示位置，支持字符串与数组，例如：'top' 'center' ['top', 'left'] 等| string/string[] | false | iOS/Android | yes |

### 29. Topview - 顶层视图

Methods
TopviewGetInstance()
获取 Topview 组件单例。

add(component: ReactElement, args?: any)
添加元素。参数包括一个 ReactElement 类型参数 component 和配置对象 args。返回一个 Promise 对象，返回结果是元素的唯一标志 id，可以通过这个 id 来删除该元素。

TopviewGetInstance().add(<Text>自定义内容</Text>).then((id) => {
  console.log(id)
})
remove(id: number)
删除元素。参数为添加元素返回的 id。返回一个 Promsie 对象。

TopviewGetInstance().remove(id).then(() => {
  // 删除成功
})

### 30. TreeView - 树形结构

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 按钮样式  | ViewStyle | false | iOS/Android | yes |
| activeIcon | 	激活状态图标 | ReactElement | false | iOS/Android | yes |
| inactiveIcon | 未激活状态图标| ReactElement | false | iOS/Android | yes |
| data | 	数据源，支持嵌套和扁平的树形结构| any[]| false | iOS/Android | yes |
| dataStructureType | 数据结构类型，支持 'nested'\|'flattened'| string| false | iOS/Android | yes |
| fieldKeys | 	数据项的 key 自定义，包括 idKey pIdKey childrenKey activeKey| any| false | iOS/Android | yes |
| onPress | 	点击某项回调，参数为点击项| Function| false | iOS/Android | yes |

### 31. Ruler - 刻度尺组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | false | iOS/Android | yes |
| direction |  刻度尺方向 | 'vertical'\|'horizontal' | false | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
