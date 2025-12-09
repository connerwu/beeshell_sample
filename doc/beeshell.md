> 模板版本：v0.3.0

<p align="center">
  <h1 align="center"> <code>beeshell</code> </h1>
</p>

本项目基于 [beeshell@2.0.11](https://github.com/Meituan-Dianping/beeshell) 开发。

请到三方库的 Releases 发布地址查看配套的版本信息：[@react-native-ohos/beeshell Releases](https://github.com/react-native-oh-library/beeshell/releases)。对于未发布到npm的旧版本，请参考[安装指南](/zh-cn/tgz-usage.md)安装tgz包。

| 三方库版本                 | 发布信息                                      |  支持RN版本                 |
| ------------------------- | ------------------------------------------------- |  -------------------------- |
| 0.7.6                 | [@react-native-ohos/beeshell Releases](https://github.com/react-native-oh-library/beeshell/releases)  | 0.72/0.77 |

## 安装与使用

进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install @react-native-ohos/beeshell
```

#### **yarn**

```bash
yarn add @react-native-ohos/beeshell
```

<!-- tabs:end -->

下面的代码展示了该库的基本使用场景：

**Hello world**  
从 beeshell 包中 import 组件即可使用
```
import React, { Component } from 'react';
import { View, AppRegistry } from 'react-native';
import { Button } from 'beeshell';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button type="primary" size="md" textColorInverse>首选项 primary</ Button>
        <Button type="primary" size="md">
          <View>
            <Text>自定义</Text>
            <Text>支持组件</Text>
          </View>
        </Button>
        <Button type='info' size='sm' disabled>
          信息 info
        </Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```
**按需加载**  
使用单独 import 组件实现按需加载
```
import Label from 'beeshell/components/Button';
```
## 约束与限制

### 兼容性

本文档内容基于以下环境验证通过：

1. RNOH: 0.72.x/0.77.x; SDK：HarmonyOS 6.0.0.47 (API Version 20 Release); IDE：DevEco Studio 6.0.0 Release; ROM：6.0.0.108 SP6;

## 组件

> [!TIP] "Platform" 列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 1. Actionsheet - 底部操作菜单组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| header | 顶部标题内容，可为字符串或自定义 React 元素 | string/ReactElement | no | iOS/Android | yes |
| footer | 底部取消按钮文本或自定义元素 | string/ReactElement | no | iOS/Android | yes |
| data | 选项数据列表，每项为字符串或含 label 字段的对象 | Array | yes | iOS/Android | yes |
| cancelable | 点击蒙层是否消失 | boolean | no | iOS/Android | yes |
| maxShowNum | 最大显示选项数量，超出可滚动；设为 null 则不限制 | number | no | iOS/Android | yes |
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
| titleContainer | 自定义标题区域内容 | ReactElement | no | iOS/Android | yes |
| title | 标题文本内容 | string | no | iOS/Android | yes |
| titleStyle | 标题文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| rightLabel | 右侧按钮的自定义元素 | ReactElement | no | iOS/Android | yes |
| rightLabelText | 右侧按钮的文本内容 | string | no | iOS/Android | yes |
| rightLabelTextStyle | 右侧按钮文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| rightCallback | 右侧按钮点击时的回调函数 | Function | no | iOS/Android | yes |
| leftLabel | 左侧按钮的自定义元素 | ReactElement | no | iOS/Android | yes |
| leftLabelText | 左侧按钮的文本内容 | string | no | iOS/Android | yes |
| leftLabelTextStyle | 左侧按钮文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| leftCallback | 左侧按钮点击时的回调函数 | Function | no | iOS/Android | yes |

### 4. Button - 按钮组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 按钮容器的自定义样式 | ViewStyle | no | iOS/Android | yes |
| textStyle | 按钮内文本的自定义样式 | TextStyle | no | iOS/Android | yes |
| textColorInverse | 按钮文本是否是黑色，通过该参数，控制按钮文本颜色为黑色或者白色 | boolean | no | iOS/Android | yes |
| type | 指明按钮的预定义样式，包括 'default' 'primary' 'success' 'info' 'warning' 'danger' 'text' | string | yes | iOS/Android | yes |
| size | 尺寸，'lg' 'md' 'sm' | 	string | no | iOS/Android | yes |
| children | 子元素，可以是字符串或者 ReactElement | any | no | iOS/Android | yes |
| disabled | 是否可以点击 | boolean | no | iOS/Android | yes |
| onPress | 按钮点击时触发的回调函数 | Function | no | iOS/Android | yes |

### 5. Calendar - 日历组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 日历容器的自定义样式 | any | no | iOS/Android | yes |
| date | 当前选中的日期 | string | no | iOS/Android | yes |
| startDate | 可选日期范围的起始日期（格式需与 format 一致） | string | no | iOS/Android | yes |
| endDate | 可选日期范围的结束日期（格式需与 format 一致） | string | no | iOS/Android | yes |
| onChange | 日期变更时的回调函数，参数为格式化后的日期字符串 | Function | no | iOS/Android | yes |
| renderItem | 自定义日期项渲染函数，用于覆盖默认单元格样式 | Function | no | iOS/Android | yes |

### 6. Cascader - 级联选择组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 组件容器的自定义样式 | any | no | iOS/Android | yes |
| data | 数据源，是一个树形结构，支持子表表示法（默认通过 children 建立父子关系）和父指针表示法（默认通过 id、pId 建立关系） | any[] | yes | iOS/Android | yes |s
| value | 选中的值，是一个数组（单选情况下只有一个元素，多选暂不支持），数组元素是数据源某项的唯一标志的值 | any[] | no | iOS/Android | yes |
| fieldKeys | 数据源的属性 key 值自定义，labelKey 用于展示，idKey 数据项的唯一标志，pIdkey 父节点唯一标志（数据源为父指针表示法时使用），childrenKey 子节点数组（数据源为子表表示法时使用），activeKey 激活状态打开其子节点，checkedKey 选中，disabledKey 禁用 | any | no | iOS/Android | yes |
| proportion | 数据列宽度占比，每列占比默认为 1 | number[] | no | iOS/Android | yes |
| isLeafNode | 自定义叶子节点的逻辑判断 | Function | no | iOS/Android | yes |
| onChange | 选中项后的回调，参数包括 value（数组，目前只支持单选，只有一个元素）和 info（选中项以及其祖先节点） | Function | no | iOS/Android | yes |
| renderItem | 自定义渲染项，参数包括 item 和 index | Function | no | iOS/Android | yes |

### 7. Checkbox - 复选框

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

#### Checkbox.Item - 复选框子选项

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ViewStyle | no | iOS/Android | yes |
| label | 选项文本 | string | yes | iOS/Android | yes |
| value | 选中状态值 | any   | yes | iOS/Android | yes |
| disabled | 禁用状态 | boolean | no | iOS/Android | yes |
| renderItem | 自行定义选项 | 	Function |  no | iOS/Android | yes |

### 8. DatePicker - 日期选择组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| startYear | 开始年份  | number | yes | iOS/Android | yes |
| proportion |  数据列 UI 样式占比 | number[] | no | iOS/Android | yes |
| numberOfYears |  向后显示几年 | number | yes | iOS/Android | yes |
| date | 定的日期字符串，'YYYY-MM-DD' 格式 | string | no | iOS/Android | yes |
| onChange | 监听值变化回调函数 | Function | no | iOS/Android | yes |


### 9. Dialog - 弹框

用于展示系统提示、操作确认、自定义内容等场景，支持多样式定制与灵活交互。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string | no | iOS/Android | yes |
| titleStyle | 标题样式 | TextStyle | no | iOS/Android | yes |
| bodyText | 内容文本 | string | no | iOS/Android | yes |
| bodyTextStyle | 内容文本样式 | TextStyle | no | iOS/Android | yes |
| header | 	自定义头部渲染区域 | any | no | iOS/Android | yes |
| body | 自定义内容渲染区域 | any | no | iOS/Android | yes |
| cancelLabelText | 取消按钮文本 | string | no | iOS/Android | yes |
| cancelLabelTextStyle | 取消按钮文本样式 | TextStyle | no | iOS/Android | yes |
| confirmLabelText | 确认按钮文本 | string | no | iOS/Android | yes |
| confirmLabelTextStyle | 确认按钮文本样式 | TextStyle | no | iOS/Android | yes |
| cancelLabel | 自定义取消按钮渲染区域| any | no | iOS/Android | yes |
| confirmLabel | 自定义确认按钮渲染区域 | any| no | iOS/Android | yes |
| cancelCallback | 取消按钮点击回调 | Function | no | iOS/Android | yes |
| confirmCallback | 确认按钮点击回调 | Function | no | iOS/Android | yes |
| operations | 自定义底部操作按钮组 | Array | no | iOS/Android | yes |
| operationsLayout | 操作按钮布局，支持 'row' 'column' | string | no | iOS/Android | yes |

### 10. Form - 表单

Form 容器组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 表单样式 | ViewStyle | no | iOS/Android | yes |


Form.Item 表单项组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ | 
| style | 表单项样式 | ViewStyle | no | iOS/Android | yes | 
| label | 表单项标签 | string\ReactElement | no | iOS/Android | yes | 
| labelWidth | 表单项标签宽度 | number | no | iOS/Android | yes | 
| hasLine | 是否显示底部分割线 | boolean | no | iOS/Android | yes | 
| children | 表单控件内容 | ReactChild[]\|ReactChild | no | iOS/Android | yes |


### 11. Icon - 图标

使用 Image 元素实现，并且在本组件库的其他组中使用。因为 Android 平台不支持 tintColor 属性，所以使用场景很有限，请根据自己的实际情况使用。推荐在自己的项目中集成字体文件功能

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ImageStyle | no | iOS/Android | yes |
| type | 图标类型| string | yes | iOS/Android | yes |
| size | 图标大小 |number| no | iOS/Android | yes |
| tintColor | 图标颜色 | string | no | iOS | yes |
| source | 	自定义图片 | 	ImageSourcePropType | no | iOS/Android | yes |

### 12. Input - 输入框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式 | 	ViewStyle | no | iOS/Android | yes |
| inputStyle | 输入文本的样式 | TextStyle | no | iOS/Android | yes |
| value | 值 | 	string | no | iOS/Android | yes |
| onChange | 输入内容变化回调（参数为输入值） | Function | no | iOS/Android | yes |

### 13. Longlist - 长列表组件

长列表组件，基于 FlatList 实现，支持下拉刷新，上拉加载更多。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| data | 	数据源 | 	Array | yes | iOS/Android | yes |
| total | 总长度 | 	number | no | iOS/Android | yes |
| renderItem | 渲染每一项 | Function | 	yes | iOS/Android | yes |
| onEndReached | 当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用。无参数，需要返回一个 Promise 对象 | 	Function | yes | iOS/Android | yes |
| onRefresh | 下拉刷新回调。无参数，需要返回一个 Promise 对象 | 	Function | no | iOS/Android | yes |
| renderFooter | 自定义页脚部分渲染内容。参数为 loading 加载状态，data 数据源，total 数据总长度，需要返回一个 ReactElement | 	Function | no | iOS/Android | yes |


### 14. Modal - 模态窗组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| containerStyle | 弹框容器样式 | ViewStyle | no | iOS/Android | yes |
| style | 弹框样式 | ViewStyle | no | iOS/Android | yes | 
| cancelable | 点击蒙层是否消失 | boolean | no | iOS/Android | yes | 
| scrollable | 内容溢出时是否可滚动 | boolean | no | iOS/Android | yes | 
| backdropColor | 蒙层颜色 | string | no | iOS/Android | yes | 
| screenWidth | 屏幕宽度，用于计算布局 | number | no | iOS/Android | yes | 
| screenHeight | 屏幕高度，用于计算布局 | number | no | iOS/Android | yes | 
| offsetX | X 轴偏移 | number | no | iOS/Android | yes | 
| offsetY | Y 轴偏移 | number | no | iOS/Android | yes | 
| animatedTranslateX | 弹出位置的 X 轴坐标，默认从屏幕中间弹出 | number | no | iOS/Android | yes | 
| animatedTranslateY | 弹出位置的 Y 轴坐标，默认从屏幕中间弹出 | number | no | iOS/Android | yes | 
| onOpen | 	打开弹窗回调 | Function | no | iOS/Android | yes | 
| onOpened | 打开弹窗后回调 | Function | no | iOS/Android | yes | 
| onClose | 关闭弹窗回调 | Function | no | iOS/Android | yes | 
| onClosed |关闭弹窗后回调| Function | no | iOS/Android | yes |

### 15. NavigationBar - 导航条组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 自定义样式 | ViewStyle |no| iOS/Android | yes | 
| titleContainer | 中间区域展示内容 | ReactElement | no | iOS/Android | yes | 
| title | 中间区域标题 | string | no | iOS/Android | yes |
| backLabel | 左边区域展示内容 | ReactElement |	no | iOS/Android | yes | 
| backLabelText | 左边区域文案 | string |	no | iOS/Android | yes | 
| backLabelTextStyle | 左边区域文案样式 | TextStyle |	no | iOS/Android | yes |  
| backLabelIcon | 左边区域图标 | ReactElement |	no | iOS/Android | yes | 
| forwardLabel | 右边区域展示内容 | ReactElement |	no | iOS/Android | yes |
| forwardLabelText | 右边区域文案 | string |	no | iOS/Android | yes | 
| forwardLabelTextStyle | 右边区域文案样式 | TextStyle |	no | iOS/Android | yes |   
| onPressBack | 左边区域点击回调 | Function |	no | iOS/Android | yes | 
| onPressForward | 右边区域点击回调 | Function |	no | iOS/Android | yes | 
| proportion | 渲染区域布局占比 | number[] |	no | iOS/Android | yes |
| renderItem | 自定义每个渲染区域 | Function | no | iOS/Android | yes |

### 16. Picker - 筛选器

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
 | style | 样式 | ViewStyle | no | iOS/Android | yes | 
 | label | 按钮展示内容 | string/Function |	no | iOS/Android | yes | 
 | activeIcon | 激活图标 | ReactElement |	no | iOS/Android | yes | 
 | inactiveIcon | 非激活图标 | ReactElement |	no | iOS/Android | yes | 
 | disabled | 是否禁用 | boolean |	no | iOS/Android | yes | 
 | cancelable | 点击蒙层是否关闭 | boolean |	no | iOS/Android | yes | 
 | onToggle | 激活状态切换回调 | Function |	no | iOS/Android | yes | 

### 17. Progress - 进度条

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 外层容器样式 | 	ViewStyle | no | iOS/Android | yes |
| barStyle | 进度条样式 | ViewStyle | no | iOS/Android | yes |
| percent | 进度（0-100区间） | number | no | iOS/Android | yes |
| easing | 是否需要动画 | boolean | no | iOS/Android | yes |
| duration | 动画持续时间（ms） | 	number | no | iOS/Android | yes |


### 18. Radio - 单选框组件

类似 HTML Radio 的单选框组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| iconPosition |  图标位置，支持 'left' 'right' | string | no | iOS/Android | yes |
| checkedIcon | 选中的图标 | ReactElement | no | iOS/Android | yes |
| uncheckedIcon |  未选中的图标 | ReactElement | no | iOS/Android | yes |
| value | 选中的值，与 Radio.Item 的 value 属性对应 | any | no | iOS/Android | yes |
| children | 子元素 | ReactChild[] \| ReactChild | false | iOS/Android | yes |
| onChange | 值变化回调函数 | Function | no | iOS/Android | yes |

Radio.Item Props
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 单选项样式  | ViewStyle | no | iOS/Android | yes |
| label |  选项文案 | string | yes | iOS/Android | yes |
| value | 选项值 | any | yes | iOS/Android | yes |
| disabled |  禁用选项 | boolean | no | iOS/Android | yes |
| renderItem | 自定义渲染项 | Function | no | iOS/Android | yes |


### 19. Rate - 评分组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 自定义样式  | ViewStyle | no | iOS/Android | yes |
| value |  分数 | number | no | iOS/Android | yes |
| total | 总分数 | number | no | iOS/Android | yes |
| icons |  图标元素集合 { <br/>&nbsp;&nbsp; empty: ReactElement\<any> <br/>&nbsp;&nbsp; full: ReactElement\<any> <br/>&nbsp;&nbsp; half?: ReactElement\<any> <br/> } | object | no | iOS/Android | yes |
| iconSize | 图标的尺寸 | number | no | iOS/Android | yes |
| iconSpace | 图标的间隔 | number | yes | iOS/Android | yes |
| enableHalf | 是否开启半分 | boolean | no | iOS/Android | yes |
| onChange | 评分变化的回调函数 | Function | no | iOS/Android | yes |

### 20. Scrollpicker - 滚动选择组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | true |
| list |  选择数据源，二维数组，第一层代表列，第二层代表选择项，选择项数据可以是对象（必须包含 label 属性）或者 string、number | Array | no | iOS/Android | yes |
| value | 选中的数据，一维数组，数组索引代表 list 列，数组值对应 list 行，所以其长度要和数据源 list 长度一致 | Array | no | iOS/Android | yes |
| proportion |  分区比例，注意和数据源长度保持一致 | Array| no | iOS/Android | yes |
| offsetCount | 选中项距离顶部的偏移个数 | number | no | iOS/Android | yes |
| onChange | 数据变化回调，该函数提供两个索引参数，第一个是列索引，第二个是行索引 | Function | no | iOS/Android | yes |
| renderItem | 自定义渲染项 | Function | no | iOS/Android | yes |

### 21. SlideModal - 滑动弹框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| styles | 自定义各层级元素样式  | { root: ViewStyle, container: ViewStyle, backdrop: ViewStyle, content: ViewStyle } | no | iOS/Android | yes |
| offsetX | 弹出位置 X 轴坐标 | number | no | iOS/Android | yes |
| offsetY | 弹出位置 Y 轴坐标 | number | no | iOS/Android | yes |
| direction | 	动画的方向，值为 'up' 'down' 'left' 'right' ['up', 'left' ] 等| string/string[]| no | iOS/Android | yes |
| align | 内容部分所处的位置 | string | no | iOS/Android | yes |
| fullScreenPatch | 全屏补丁，配置区域是否可以击穿 | boolean[] | no | iOS/Android | yes |
| children | 弹框内容 | ReactChild/ReactChild[] | no | iOS/Android | yes |

### 22. Slider - 滑块组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle\| RegisteredStyle<ViewStyle> | no | iOS/Android | yes |
| value | 当前值 | number | no | iOS/Android | yes |
| min | 最小值| number | no | iOS/Android | yes |
| max | 	最大值| number| no | iOS/Android | yes |
| disabled | 是否禁用 | boolean | no | iOS/Android | yes |
| step | 滑动最小单位 | number | no | iOS/Android | yes |
| marks | 刻度对应的标记值 | string[] / ReactElement[] | no | iOS/Android | yes |
| maxTrackColor | 最大一段滑轨的颜色 | string | no | iOS/Android | yes |
| minTrackColor | 最小一段滑轨的颜色 | string | no | iOS/Android | yes |
| midTrackColor | 中间一段滑轨的颜色 | string | no | iOS/Android | yes |
| onChange | 值改变回调 | Function | no | iOS/Android | yes |
| showTip | 是否显示气泡 | boolean | no | iOS/Android | yes |
| renderTip | 自定义气泡渲染内容，回调参数 isOther 标识当前为哪个滑块 | Function | no | iOS/Android | yes |
| renderThumb | 自定义滑块的显示，回调参数 isOther 标识当前为哪个滑块 | Function | no | iOS/Android | yes |

### 23. Stepper - 计数器组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| operatorStyle | 	操作按钮样式 | ViewStyle | no | iOS/Android | yes |
| operatorIconColor | 操作按钮图标颜色| string | no | iOS/Android | yes |
| max | 	最大值| number| no | iOS/Android | yes |
| min | 最小值 | number | no | iOS/Android | yes |
| value | 当前值 | number | no | iOS/Android | yes |
| step | 步长 | number | no | iOS/Android | yes |
| editable | 允许输入 | boolean | no | iOS/Android | yes |
| onChange | 值改变回调 | Function | no | iOS/Android | yes |

### 24. Switch - 开关组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| value | 	状态值 | boolean | no | iOS/Android | yes |
| disabled | 是否可以切换状态| boolean | no | iOS/Android | yes |
| rockerSize | 	滑块的尺寸，支持 'lg' 'sm'| string| no | iOS/Android | yes |
| activeColor | 打开状态颜色 | string | no | iOS/Android | yes |
| onChange | 值变化回调 | Function | no | iOS/Android | yes |

### 25. Tab - 标签页组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| dataContainerStyle | 	数据源容器的样式 | ViewStyle | no | iOS/Android | yes |
| dataItemContainerStyle | 数据源每一项的容器样式| ViewStyle | no | iOS/Android | yes |
| dataItemStyle | 	数据源每一项的样式| ViewStyle| no | iOS/Android | yes |
| activeColor | 激活状态颜色 | string | no | iOS/Android | yes |
| data | 	数据源，数组元素为对象，必须包含 label 和 value 属性 | Array | yes | iOS/Android | yes |
| value | 激活项的值，与数据源某项的 value 相等 | any | no | iOS/Android | yes |
| onChange | 状态切换时的回调，参数为数据源的选项和索引 | Function | no | iOS/Android | yes |
| renderItem | 自定义渲染项，函数参数为 item index active | Function | no | iOS/Android | yes |

Methods
.scrollTo(index: number)
滚动到 index 索引指定的选项。

### 26. Tag - 标签

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| textStyle | 	文本样式 | TextStyle | no | iOS/Android | yes |
| type | 类型，支持 'default' 'primary' 'danger' 'info' 'success' 'warning'| string | no | iOS/Android | yes |
| textColorInverse | 	文本反色 | boolean | no | iOS/Android | yes |

### 27. Timepicker - 时间选择器

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| hourStep | 	时步长 | number | no | iOS/Android | yes |
| minuteStep | 分步长| number | no | iOS/Android | yes |
| secondStep | 	秒步长| number| no | iOS/Android | yes |
| value | 	选定的时间字符串，'HH:mm:ss' 格式| string| no | iOS/Android | yes |
| onChange | 	数据变化回调| Function| no | iOS/Android | yes |

### 28. Tip - 提示框

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| body	 | 样式  | string/ReactElement | no | iOS/Android | yes |
| duration | 	时步长 | number | no | iOS/Android | yes |
| position | 分步长| string/string[] | no | iOS/Android | yes |

Methods
.show(msg: string, duration?: number, cancelable?: boolean, position?: string | string[])
这是一个类方法（静态方法）。
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| msg	 | 	展示文案  | string | no | iOS/Android | yes |
| duration | 	在多少毫秒后自动消失 | number | no | iOS/Android | yes |
| cancelable | 点击空白处是否关闭| boolean | no | iOS/Android | yes |
| position | 弹框展示位置，支持字符串与数组，例如：'top' 'center' ['top', 'left'] 等| string/string[] | no | iOS/Android | yes |

### 29. Topview - 顶层视图

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| add | 添加元素方法 | Function | no | iOS/Android | yes |
| remove | 移除元素方法 | Function | no | iOS/Android | yes | 

### 30. TreeView - 树形结构

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 按钮样式  | ViewStyle | no | iOS/Android | yes |
| activeIcon | 	激活状态图标 | ReactElement | no | iOS/Android | yes |
| inactiveIcon | 未激活状态图标| ReactElement | no | iOS/Android | yes |
| data | 	数据源，支持嵌套和扁平的树形结构| any[]| no | iOS/Android | yes |
| dataStructureType | 数据结构类型，支持 'nested'\|'flattened'| string| no | iOS/Android | yes |
| fieldKeys | 	数据项的 key 自定义，包括 idKey pIdKey childrenKey activeKey| any| no | iOS/Android | yes |
| onPress | 	点击某项回调，参数为点击项| Function| no | iOS/Android | yes |

### 31. Ruler - 刻度尺组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| direction |  刻度尺方向,支持'vertical'\|'horizontal' | string | no | iOS/Android | yes |

### 32. Popover - 弹层组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| offsetX | 弹出位置X轴坐标 | number | no | iOS/Android | yes |
| offsetY | 弹出位置Y轴坐标 | number | no | iOS/Android | yes |
| direction | 弹出方向 | string/string[] | no | iOS/Android | yes |
| align | 内容部分所处位置 | string | no | iOS/Android | yes |
| children | 弹出框展示内容 | string/ReactChild/ReactChild[] | yes | iOS/Android | yes |

### 33. Dropdown - 下拉选择组件
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 样式  | ViewStyle | no | iOS/Android | yes |
| direction | 方向 | string | no | iOS/Android | yes |
| checkedIcon | 选中图标 | ReactElement | no | iOS/Android | yes |
| uncheckedIcon | 未选中图标 | ReactElement | no | iOS/Android | yes |
| data | 数据源 | Array | yes | iOS/Android | yes |
| value | 选中项的值 | any | no | iOS/Android | yes |
| onOpen | 选中项变化的回调 | Function | no | iOS/Android | yes |
| onClose | 选中项变化的回调 | Function | no | iOS/Android | yes |
| onChange | 选中项变化的回调 | Function | no | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
