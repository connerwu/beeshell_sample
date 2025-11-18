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

### 1. Theme - 主题

Theme 为全局主题配置，用于统一应用的视觉风格。

**静态方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| set | 设置主题配色方案，支持完整主题对象或部分属性修改 | function | yes | iOS/Android | yes |
| themes | 获取所有内置主题配色方案（default、black、violet） | object | - | iOS/Android | yes |

**主题属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| isLandscape | 是否横屏 | bool | no | iOS/Android | yes |
| statusBarHeight | 获取状态栏高度 | number | no | iOS/Android | yes |
| screenInset | 屏幕内容内嵌区域 | object | no | iOS/Android | yes |

### 2. Label - 标签

用于显示文本的组件，支持多种预设样式。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 标签类型 (default, title, detail, danger) | string | no | iOS/Android | yes |
| size | 字号大小 (xl, lg, md, sm, xs) | string | no | iOS/Android | yes |
| text | 文本内容 | string/number | no | iOS/Android | yes |
| numberOfLines | 显示行数 | number | no | iOS/Android | yes |

### 3. Button - 按钮

各种样式的按钮组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 按钮类型 (default, primary, secondary, danger, link) | string | no | iOS/Android | yes |
| size | 按钮大小 (xl, lg, md, sm, xs) | string | no | iOS/Android | yes |
| title | 按钮标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| onPress | 点击事件 | function | no | iOS/Android | yes |

### 4. Checkbox - 复选框

支持单选和多选的复选框组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| checked | 是否选中 | bool | no | iOS/Android | yes |
| defaultChecked | 默认是否选中 | bool | no | iOS/Android | yes |
| size | 图标大小 (lg, md, sm) | string | no | iOS/Android | yes |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| checkedIcon | 选中图标 | element | no | iOS/Android | yes |
| checkedIconStyle | 选中图标样式 | ImageStyle | no | iOS/Android | yes |
| uncheckedIcon | 未选中图标 | element | no | iOS/Android | yes |
| uncheckedIconStyle | 未选中图标样式 | ImageStyle | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| hitSlop | 触摸区域扩展 | object | no | iOS/Android | yes |
| onChange | 状态改变事件 | function | no | iOS/Android | yes |

### 5. Input - 输入框

单行或多行文本输入组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| size | 输入框大小 (lg, md, sm) | string | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| underlineColorAndroid | Android 下划线颜色 | string/'rgba(0, 0, 0, 0)' | no | Android |yes |
| onChangeText | 文本改变事件 | function | no | iOS/Android | yes |

### 6. Select - 选择框

类似 HTML Select 的下拉选择组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| size | 选择框大小 (lg, md, sm) | string | no | iOS/Android | yes |
| value | 选中值 | any | no | iOS/Android | yes |
| valueStyle | 选中值文本样式 | style | no | iOS/Android | yes |
| items | 下拉列表项数组 | array | no | iOS/Android | yes |
| getItemValue | 获取列表项值函数 | function | no | iOS/Android | yes |
| getItemText | 获取列表项显示文本函数 | function | no | iOS/Android | yes |
| pickerType | 选择器类型 (auto, pull, popover) | string | no | iOS/Android | yes |
| pickerTitle | 选择器标题 | string | no | iOS/Android | yes |
| editable | 是否可编辑 | bool | no | iOS/Android | yes |
| icon | 右侧图标 | element | no | iOS/Android | yes |
| iconTintColor | 图标颜色 | string | no | iOS/Android | yes |
| placeholder | 占位文本 | string | no | iOS/Android | yes |
| placeholderTextColor | 占位文本颜色 | string | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| onSelected | 选中事件 | function | no | iOS/Android | yes |

### 7. Stepper - 步进器

数字增减控制组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| defaultValue | 默认值 | number | no | iOS/Android | yes |
| value | 当前值 | number | no | iOS/Android | yes |
| step | 步进值 | number | no | iOS/Android | yes |
| max | 最大值 | number | no | iOS/Android | yes |
| min | 最小值 | number | no | iOS/Android | yes |
| valueStyle | 值文本样式 | style | no | iOS/Android | yes |
| valueFormat | 值格式化函数 | function | no | iOS/Android | yes |
| subButton | 减少按钮 | element | no | iOS/Android | yes |
| addButton | 增加按钮 | element | no | iOS/Android | yes |
| showSeparator | 是否显示分隔线 | bool | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| editable | 是否可编辑 | bool | no | iOS/Android | yes |
| onChange | 值改变事件 | function | no | iOS/Android | yes |

### 8. SearchInput - 搜索输入框

带搜索图标的输入框组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 组件样式 | ViewStyle | no | iOS/Android | yes |
| inputStyle | 输入框样式 | style | no | iOS/Android | yes |
| iconSize | 图标大小 | number | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |
| underlineColorAndroid | Android 下划线颜色 | string/'rgba(0, 0, 0, 0)' | no | Android | yes |
| onChangeText| 文本改变事件 | function | no | iOS/Android | yes |

### 9. Badge - 徽章

用于显示通知数量或状态的小标记。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 徽章类型 (capsule, square, dot) | string | no | iOS/Android | yes |
| count | 显示数字 | number | no | iOS/Android | yes |
| countStyle | 数字文本样式 | style | no | iOS/Android | yes |
| maxCount | 最大显示数字，超过显示+号 | number | no | iOS/Android | yes |

### 10. Popover - 气泡

气泡弹出框组件

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| arrow | 三角形箭头的位置 ( none, topLeft, top, topRight, rightTop, right, rightBottom, bottomRight, bottom, bottomLeft, leftBottom, left, leftTop)| string | no | iOS/Android | yes |
| paddingCorner | 箭头与角点距离 | number | no | iOS/Android | yes |

### 11. NavigationBar - 导航栏

页面顶部导航栏组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 导航栏类型 (auto, ios, android, harmony) | string | no | iOS/Android | yes |
| title | 标题 | string/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| leftView | 左侧视图 | element | no | iOS/Android | yes |
| rightView | 右侧视图 | element | no | iOS/Android | yes |
| tintColor | 染色（左右按钮颜色） | string | no | iOS/Android | yes |
| background | 背景视图 | element | no | iOS/Android | yes |
| hidden | 是否隐藏 | bool | no | iOS/Android | yes |
| animated | 隐藏/显示动画 | bool | no | iOS/Android | yes |
| statusBarStyle | 状态栏样式 (default, light-content, dark-content) | string | no | iOS/Android | yes |
| statusBarColor | 状态栏颜色 | string | no | iOS/Android | yes |
| statusBarHidden | 状态栏隐藏 | bool | no | iOS/Android | yes |
| statusBarInsets | 状态栏占位 | bool | no | iOS | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Title | 导航条标题组件 | class | - | iOS/Android | yes |
| Button | 导航条按钮组件 | class | - | iOS/Android | yes |
| LinkButton| 导航条链接按钮组件 | class | - | iOS/Android | yes |
| IconButton | 导航条图标按钮组件 | class | - | iOS/Android | yes |
| BackButton | 导航条返回按钮组件 | class | - | iOS/Android | yes |

**NavigationBar.Title**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| text | 显示文本 | string/number | no | iOS/Android | yes |
| numberOfLines | 显示行数 | number | no | iOS/Android | yes |
| allowFontScaling| 是否允许系统自动缩放字体大小 | bool | no | iOS | yes |

**NavigationBar.Button**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| hitSlop | 触摸区域扩展 | class | no | iOS/Android | yes |

**NavigationBar.LinkButton**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 按钮标题 | string/number | no | iOS/Android | yes |

**NavigationBar.IconButton**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| icon | 按钮图标 | ImageSource | no | iOS/Android | yes |

**NavigationBar.BackButton**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string\number | no | iOS/Android | yes |
| icon | 按钮图标 | ImageSource | no | iOS/Android | yes |

### 12. ListRow - 列表行

列表行组件，常用于设置页面。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| detail | 详情 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| detailStyle | 详情样式 | style | no | iOS/Android | yes |
| detailMultiLine | 详情多行显示 | bool | no | iOS/Android | yes |
| icon | 左侧图标 | element/ImageSource | no | iOS/Android | yes |
| accessory | 右侧附件 (none, auto, empty, indicator, check) | string/element | no | iOS/Android | yes |
| topSeparator | 顶部分隔线 (none, full, indent) | string | no | iOS/Android | yes |
| bottomSeparator | 底部分隔线 (none, full, indent) | string | no | iOS/Android | yes |
| titlePlace | 标题位置 (left, top, none) | string | no | iOS/Android | yes |
| swipeActions | 左右滑动操作按钮数组 | array | no | iOS/Android | yes |
| onPress | 点击事件 | function | no | iOS/Android | yes |
| activeOpacity | 点击不透明度 | number | no | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| SwipeActionButton | 滑动按钮组件 | class | - | iOS/Android | yes |

**ListRow.SwipeActionButton**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 显示样式类型(default, danger) | string | no | iOS/Android | yes |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |


### 13. Carousel - 走马灯

图片轮播组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| carousel | 是否自动轮播 | bool | no | iOS/Android | yes |
| interval | 自动轮播间隔时间（毫秒） | number | no | iOS/Android | yes |
| direction | 轮播方向 (forward, backward) | string | no | iOS/Android | yes |
| startIndex | 起始页面索引 | number | no | iOS/Android | yes |
| cycle | 是否循环播放 | bool | no | iOS/Android | yes |
| control | 页面指示器 | bool/element | no | iOS/Android | yes |
| horizontal |  横向滚动 | bool | no | iOS/Android | yes |
| pagingEnabled | 分页滚动| bool | no | iOS/Android | yes |
| showsHorizontalScrollIndicator | 显示横向滚动条 | bool | no | iOS/Android | yes |
| showsVerticalScrollIndicator | 显示竖向滚动条 | bool | no | iOS/Android | yes |
| alwaysBounceHorizontal | 总是横向弹性滚动 | bool | no | iOS/Android | yes |
| alwaysBounceVertical | 总是纵向弹性滚动 | bool | no | iOS/Android | yes |
| bounces | 弹性滚动 | bool | no | iOS/Android | yes |
| automaticallyAdjustContentInsets | 自动调整内容内边距 | bool | no | iOS/Android | yes |
| scrollEventThrottle | 滚动事件的触发频率| number | no | iOS/Android | yes |
| onChange | 页面改变事件 | function | no | iOS/Android | yes |
| scrollToPage | 滚动到指定页面 | function | - | iOS/Android | yes |
| scrollToNextPage | 滚动到下一页 | function | - | iOS/Android | yes |

**Carousel.Control 组件：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| dot | 页面指示点元素 | element | no | iOS/Android | yes |
| activeDot | 当前页面指示点元素 | element | no | iOS/Android | yes |

### 14. Projector - 幻灯机

多页显示组件，具有视图缓存功能。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| index | 当前显示索引 | number | no | iOS/Android | yes |
| slideStyle | 幻灯片样式 | ViewStyle | no | iOS/Android | yes |

### 15. SegmentedBar - 分段工具条

分段选择条组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| justifyItem | Item 排列模式 (fixed, scrollable) | string | no | iOS/Android | yes |
| indicatorType | 指示器类型 (none, boxWidth, itemWidth, customWidth) | string | no | iOS/Android | yes |
| indicatorPosition | 指示器位置 (top, bottom) | string | no | iOS/Android | yes |
| indicatorLineColor | 指示器线条颜色 | string | no | iOS/Android | yes |
| indicatorLineWidth | 指示器线条宽度 | number | no | iOS/Android | yes |
| indicatorWidth | 自定义指示器宽度 | number | no | iOS/Android | yes |
| indicatorPositionPadding | 指示器位置内边距 | number | no | iOS/Android | yes |
| animated | 是否启用动画 | bool | no | iOS/Android | yes |
| autoScroll | 自动滚动到中心 | bool | no | iOS/Android | yes |
| activeIndex | 活动索引 | number | no | iOS/Android | yes |
| onChange | 选项改变事件 | function | no | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Item | 分段工具条组件 Item 组件 | class | - | iOS/Android | yes |

**SegmentedBar.Item 属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| activeTitleStyle | 激活标题样式 | style | no | iOS/Android | yes |
| badge | 徽章 | string/number/element | no | iOS/Android | yes |
| active | 是否激活 | bool | no | iOS/Android | yes |

### 16. SegmentedView - 分段器

分段视图容器组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 分段器类型 (projector, carousel) | string | no | iOS/Android | yes |
| barPosition | 工具条位置 (top, bottom) | string | no | iOS/Android | yes |
| barStyle | 工具条样式 | style | no | iOS/Android | yes |
| justifyItem | Item 宽度分配 (fixed, scrollable) | string | no | iOS/Android | yes |
| indicatorType | 指示器类型 (none, boxWidth, itemWidth) | string | no | iOS/Android | yes |
| indicatorPosition | 指示器位置 (top, bottom) | string | no | iOS/Android | yes |
| indicatorLineColor | 指示器颜色 | string | no | iOS/Android | yes |
| indicatorLineWidth | 指示器宽度 | number | no | iOS/Android | yes |
| indicatorPositionPadding | 指示器位置内边距 | number | no | iOS/Android | yes |
| animated | 是否启用动画 | bool | no | iOS/Android | yes |
| autoScroll | 自动滚动 | bool | no | iOS/Android | yes |
| activeIndex | 活动索引 | number | no | iOS/Android | yes |
| onChange | 页面改变事件 | function | no | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Sheet | 分段器 Sheet 组件 | class | - | iOS/Android | yes |


**SegmentedView.Sheet 属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| activeTitleStyle | 激活标题样式 | style | no | iOS/Android | yes |
| badge | 徽章 | string/number/element | no | iOS/Android | yes |

### 17. TabView - 标签页

底部标签页导航组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 类型 (projector, carousel) | string | no | iOS/Android | yes |
| barStyle | TabBar 工具条样式 | style | no | iOS/Android | yes |
| activeIndex | 活动 Sheet 序号 | number | no | iOS/Android | yes |
| onChange | 页面改变事件 | function | no | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Sheet | 标签页 Sheet 组件 | class | - | iOS/Android | yes |
| Button | 标签页按钮组件 | class | - | iOS/Android | yes |


**TabView.Sheet 属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | Sheet类型 (sheet, button) | string | no | iOS/Android | yes |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| icon | 图标 | ImageSource/element | no | iOS/Android | yes |
| activeIcon | 激活图标 | ImageSource/element | no | iOS/Android | yes |
| badge | 徽章 | string/number/element | no | iOS/Android | yes |
| onPress | 点击事件 | function | no | iOS/Android | yes |

**TabView.Button 属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| activeTitleStyle | 激活标题样式 | style | no | iOS/Android | yes |
| icon | 图标 | ImageSource/element | no | iOS/Android | yes |
| activeIcon | 激活图标 | ImageSource/element | no | iOS/Android | yes |
| badge | 徽章 | string/number/element | no | iOS/Android | yes |
| active | 是否激活 | bool | no | iOS/Android | yes |

### 18. TransformView - 可变视图

支持缩放和拖动的视图组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| containerStyle | 容器样式 | style | no | iOS/Android | yes |
| maxScale | 最大缩放比例 | number | no | iOS/Android | yes |
| minScale | 最小缩放比例 | number | no | iOS/Android | yes |
| magnetic | 磁性边缘 | bool | no | iOS/Android | yes |
| tension | 拉动张力系数 | number | no | iOS/Android | yes |
| onWillTransform | 变换开始事件 | function | no | iOS/Android | yes |
| onTransforming | 变换进行中事件 | function | no | iOS/Android | yes |
| onDidTransform | 变换结束事件 | function | no | iOS/Android | yes |
| onWillMagnetic | 磁性边框效果开始前调用 | function | no | iOS/Android | yes |
| onDidMagnetic | 磁性边框效果结束时调用 | function | no | iOS/Android | yes |
| onPress | 点击事件 | function | no | iOS/Android | yes |
| onLongPress | 长按事件 | function | no | iOS/Android | yes |

### 19. AlbumView - 相册视图

图片相册浏览组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| images | 图片数组 | array | yes | iOS/Android | yes |
| thumbs | 缩略图数组 | array | no | iOS/Android | yes |
| index | 当前显示索引 | number | no | iOS/Android | yes |
| defaultIndex | 默认显示索引 | number | no | iOS/Android | yes |
| maxScale | 最大缩放比例 | number | no | iOS/Android | yes |
| space | 图片间距 | number | no | iOS/Android | yes |
| control | 页面指示器 | element | no | iOS/Android | yes |
| onWillChange | 页面将要改变事件 | function | no | iOS/Android | yes |
| onChange | 页面改变事件 | function | no | iOS/Android | yes |
| onPress | 点击事件 | function | no | iOS/Android | yes |
| onLongPress | 长按事件 | function | no | iOS/Android | yes |
| onWillLoadImage | 将要加载图片事件 | function | no | iOS/Android | yes |
| onLoadImageSuccess | 加载成功事件 | function | no | iOS/Android | yes |
| onLoadImageFailure | 加载失败事件 | function | no | iOS/Android | yes |

### 20. Wheel - 滚轮

滚轮选择器组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| items | 选项数组 | array | yes | iOS/Android | yes |
| itemStyle | 选项样式 | style | no | iOS/Android | yes |
| holeStyle | 当前项窗口样式 | style | no | iOS/Android | yes |
| maskStyle | 当前项上下蒙版样式 | style | no | iOS/Android | yes |
| holeLine | 当前项窗口分隔线 | string | no | iOS/Android | yes |
| index | 当前索引 | number | no | iOS/Android | yes |
| defaultIndex | 默认索引 | number | no | iOS/Android | yes |
| onChange | 选项改变事件 | function | no | iOS/Android | yes |

### 21. Overlay - 浮层

浮层显示组件。

**静态方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示浮层视图 | function | yes | iOS/Android | yes |
| hide | 隐藏浮层视图 | function | yes | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| View | 浮层组件 | class | - | iOS/Android | yes |
| PullView | 拖拉效果浮层组件 | class | - | iOS/Android | yes |
| PopView | 弹出效果浮层组件 | class | - | iOS/Android | yes |
| PopoverView | 气泡效果浮层组件 | class | - | iOS/Android | yes |

**Overlay.View - 浮层**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| style | 浮层样式 | style | no | iOS/Android | yes |
| modal | 是否模态 | bool | no | iOS/Android | yes |
| animated | 是否启用动画 | bool | no | iOS/Android | yes |
| overlayOpacity | 背景不透明度 | number | no | iOS/Android | yes |
| overlayPointerEvents | 背景触摸事件 (auto, none) | string | no | iOS/Android | yes |
| autoKeyboardInsets | 自动键盘占位 | bool | no | iOS/Android | yes |
| onAppearCompleted | 浮层显示完成事件 | function | no | iOS/Android | yes |
| onDisappearCompleted | 浮层消失完成事件 | function | no | iOS/Android | yes |
| onCloseRequest | 浮层关闭请求事件 | function | no | iOS/Android | yes |

**Overlay.PullView - 拖拉浮层**

继承 Overlay.View 所有属性，额外支持：

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| side | 抽屉弹出方向 (top, bottom, left, right) | string | no | iOS/Android | yes |
| containerStyle | 容器样式 | style | no | iOS/Android | yes |
| rootTransform | 根变换 (none, translate, scale) | string/array | no | iOS/Android | yes |

**Overlay.PopView - 弹出浮层**

继承 Overlay.View 所有属性，额外支持：

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 显示类型 (zoomOut, zoomIn, custom) | string | no | iOS/Android | yes |
| containerStyle | 弹出框容器样式 | style | no | iOS/Android | yes |
| customBounds | 自定义边界 | object | no | iOS/Android | yes |

**Overlay.PopoverView - 气泡浮层**

继承 Overlay.View 所有属性，额外支持：

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| popoverStyle | 气泡样式 | style | no | iOS/Android | yes |
| fromBounds | 起始边界 | object | yes | iOS/Android | yes |
| direction | 箭头方向 (up, down, left, right) | string | no | iOS/Android | yes |
| autoDirection | 自动调整方向 | bool | no | iOS/Android | yes |
| directionInsets | 方向偏移 | number | no | iOS/Android | yes |
| align | 对齐方式 (start, center, end) | string | no | iOS/Android | yes |
| alignInsets | 对齐偏移 | number | no | iOS/Android | yes |
| showArrow | 是否显示箭头 | bool | no | iOS/Android | yes |
| paddingCorner | 圆角内边距 | number | no | iOS/Android | yes |
| overlayOpacity | 气泡不透明度 | number | no | iOS/Android | yes |


### 22. Toast - 轻提示

 提示框

**静态方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示提示 | function | no | iOS/Android | yes |
| message | 显示消息 | function | no | iOS/Android | yes |
| success | 显示成功提示 | function | no | iOS/Android | yes |
| fail | 显示失败提示 | function | no | iOS/Android | yes |
| smile | 显示笑脸提示 | function | no | iOS/Android | yes |
| sad | 显示难过提示 | function | no | iOS/Android | yes |
| info | 显示信息提示 | function | no | iOS/Android | yes |
| stop | 显示停止提示 | function | no | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
|ToastView| Toast 内容显示组件 | class | - | iOS/Android | yes |
| defaultDuration | 轻提示框显示时长 | string | no | iOS/Android | yes |
| defaultPosition | 轻提示框显示位置 | string | no | iOS/Android | yes |
| messageDefaultDuration | message 函数的 duration 参数默认值 | string | no | iOS/Android | yes |
| messageDefaultPosition | message 函数的 position 参数默认值 | string | no | iOS/Android | yes |

**Toast.ToastView**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| text | 轻提示文本 | string/number/element | no | iOS/Android | yes |
| icon | 	图标(none, success, fail, smile, sad, info, stop) | string/ImageSource/element | no | iOS/Android | yes |
| position | 轻提示框显示位置(top, bottom, center) | string | no | iOS/Android | yes |

### 23. ActionSheet - 操作选单

底部操作选单

**静态方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示操作选单 | function | - | iOS/Android | yes |

**静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| ActionSheetView| ActionSheet 内容显示组件 | class | no | iOS/Android | yes |

**ActionSheet.ActionSheetView**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| items | 操作项数组 | array | yes | iOS/Android | yes |
| cancelItem | 取消按钮 | object | no | iOS/Android | yes |


**ActionSheet.ActionSheetView 静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Item| ActionSheet 操作选单项显示组件 | class | no | iOS/Android | yes |

**ActionSheet.ActionSheetView.Item**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| type | 类型 | string | no | iOS/Android | yes |
| title | 标题 | string/number/element | yes | iOS/Android | yes |
| topSeparator | 上分隔线(none, full, indent) | string/element | no | iOS/Android | yes |
| bottomSeparator | 下分隔线(none, full, indent) | string/element | no | iOS/Android | yes |
| disabled | 是否禁用 | bool | no | iOS/Android | yes |

### 24. ActionPopover - 操作气泡

气泡式操作菜单

**静态方法：**
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示操作气泡 | function | yes | iOS/Android | yes |

**静态属性：**
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| ActionPopoverView	 | ActionPopover 内容显示组件 | class | yes | iOS/Android | yes |

**ActionPopover.ActionPopoverView**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| items | 操作项数组 | array | yes | iOS/Android | yes |
| direction | 气泡方向 (up, down, left, right) | string | no | iOS/Android | yes |
| align | 对齐方式 (start, center, end) | string | no | iOS/Android | yes |
| showArrow | 是否显示箭头 | bool | no | iOS/Android | yes |

**ActionPopover.ActionPopoverView 静态属性**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Item | ActionPopover 操作项显示组件 | class | no | iOS/Android | yes |

**ActionPopover.ActionPopoverView.Item属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 项标题 | string/number/element | yes | iOS/Android | yes |
| leftSeparator | 是否显示左分隔线 | bool | no | iOS/Android | yes |
| rightSeparator | 是否显示右分隔线 | bool | no | iOS/Android | yes |

### 25. PullPicker - 上拉选择器

底部上拉式选择器。

**静态方法:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示选择器 | function | - | iOS/Android | yes |

**静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| PullPickerView | PullPicker 内容显示组件 | class | - | iOS/Android | yes |

**PullPicker.PullPickerView**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 列表标题 | string | no | iOS/Android | yes |
| items | 可选项列表 | array | yes | iOS/Android | yes |
| selectedIndex | 当前已选择项编号 | 	number | no | iOS/Android | yes |
| getItemText | 取 items 数组元素的显示文本 | function | no | iOS/Android | yes |
| onSelected | 选择某项时的回调函数 | function | no | iOS/Android | yes |

**PullPicker.PullPickerView静态属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| item | PullPicker 可选项显示组件 | class | - | iOS/Android | yes |

**PullPicker.PullPickerView.Item属性**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| selected | 	是否已选中 | bool | no | iOS/Android | yes |

### 26. PopoverPicker - 气泡选择器

气泡式选择器。

**静态方法:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示选择器 | function | - | iOS/Android | yes |

**静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| PopoverPickerView | PopoverPicker 内容显示组件 | class | - | iOS/Android | yes |

**PopoverPicker.PopoverPickerView属性**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| items | 选项数组 | array | yes | iOS/Android | yes |
| selectedIndex | 选中索引 | number | no | iOS/Android | yes |
| getItemText | 取 items 数组元素的显示文本 | function | no | iOS/Android | yes |
| shadow | 是否显示阴影 | bool | no | iOS | yes |
| direction | 箭头方向 (up, down, left, right) | string | no | iOS/Android | yes |
| align | 对齐方式 (start, center, end) | string | no | iOS/Android | yes |
| showArrow | 是否显示箭头 | bool | no | iOS/Android | yes |
| onSelected | 选中事件 | function | no | iOS/Android | yes |

**PopoverPicker.PopoverPickerView静态属性**
| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Item | PopoverPicker 可选项显示组件 | class | - | iOS/Android | yes |

**PopoverPicker.PopoverPickerView.Item属性**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 标题 | string/number/element | no | iOS/Android | yes |
| selected | 是否已选中 | bool | no | iOS/Android | yes |

### 27. Menu - 菜单

弹出菜单。

**静态方法:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示菜单 | function | - | iOS/Android | yes |

**静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| MenuView | Menu 内容显示组件 | class | - | iOS/Android | yes |

**Menu.MenuView属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| items | 菜单项数组 | array | no | iOS/Android | yes |
| shadow | 是否显示阴影 | bool | no | iOS | yes |
| direction | 箭头方向 (up, down, left, right) | string | no | iOS/Android | yes |
| align | 对齐方式 (start, center, end) | string | no | iOS/Android | yes |
| showArrow | 是否显示箭头 | bool | no | iOS/Android | yes |

**Menu.MenuView静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| Item| Menu 菜单项显示组件 | class | - | iOS/Android | yes |

**Menu.MenuView.Item属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 项标题 | string/number/element | no | iOS/Android | yes |
| icon | 图标 | element/ImageSource | no | iOS/Android | yes |

### 28. Drawer - 抽屉

侧边抽屉。

**静态方法:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| open | 打开抽屉 | function | - | iOS/Android | yes |

**静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| DrawerView | Drawer 内容显示组件 | class | - | iOS/Android | yes |

**Drawer.DrawerView属性**

Drawer.DrawerView 组件继承 Overlay.PullView 组件的全部属性和事件。

### 29. ModalIndicator - 模态指示器

模态加载指示器。

**静态方法:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| show | 显示指示器 | function | - | iOS/Android | yes |
| hide | 隐藏指示器 | function | - | iOS/Android | yes |

**静态属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| IndicatorView | ModalIndicator 内容显示组件 | class | - | iOS/Android | yes |

**ModalIndicator.IndicatorView参数：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| text | 提示文本 | string/number/element | no | iOS/Android | yes |
| position | 显示位置 | string | no | iOS/Android | yes |
| size | 指示器大小 | string | no | iOS/Android | yes |
| color | 指示器颜色 | string | no | iOS/Android | yes |

### 30. TeaNavigator - Tea导航器

应用根导航器组件。

**属性:**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| rootView | 根组件 | element | - | iOS/Android | yes |

**上下文：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| navigator | 返回 navigator 组件 | function | - | iOS/Android | yes |

### 31. BasePage - 基础页面

页面基类组件。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| scene | 转场效果 | object | no | iOS/Android | yes |
| autoKeyboardInsets | 自动键盘占位 | bool | no | iOS/Android | yes |
| keyboardTopInsets | 键盘顶部偏移 | number | no | iOS/Android | yes |

**变量：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| navigator | 导航器对象 | object | - | iOS/Android | yes |
| didMount | 是否已挂载 | bool | - | iOS/Android | yes |
| isFocused | 是否已聚焦 | bool | - | iOS/Android | yes |

**生命周期方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| onWillFocus | 将要获得焦点 | function | no | iOS/Android | yes |
| onDidFocus | 已获得焦点 | function | no | iOS/Android | yes |
| onHardwareBackPress | 硬件返回键 | function | no | Android/Harmony | yes |
| renderPage | 页面渲染函数 | function | yes | iOS/Android | yes |

### 32. NavigationPage - 导航页面

带导航栏的页面组件（继承 BasePage）。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| title | 导航栏标题 | string | no | iOS/Android | yes |
| showBackButton | 是否显示返回按钮 | bool | no | iOS/Android | yes |
| navigationBarInsets | 导航栏占位 | bool | no | iOS/Android | yes |
| scene | 转场效果 | object | no | iOS/Android | yes |

**可重写方法：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| renderNavigationTitle | 渲染导航栏标题 | function | no | iOS/Android | yes |
| renderNavigationLeftView | 渲染导航栏左视图 | function | no | iOS/Android | yes |
| renderNavigationRightView | 渲染导航栏右视图 | function | no | iOS/Android | yes |
| renderNavigationBar | 渲染导航栏 | function | no | iOS/Android | yes |

## 遗留问题


## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/teaset/blob/master/LICENSE) ，请自由地享受和参与开源。
