import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { Button, BottomModal } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

const window = Dimensions.get('window');

const localStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class BottomModalScreen extends Component {
  private bottomModal1: any = null;
  private bottomModal2: any = null;
  private bottomModal3: any = null;
  private bottomModal4: any = null;
  private bottomModal5: any = null;
  private bottomModal6: any = null;
  private bottomModal7: any = null;
  private bottomModal8: any = null;
  private bottomModal_titleStyle: any = null;

  render() {
    return (
      <ScrollView style={localStyles.body} contentContainerStyle={localStyles.container}>
        {/* ========== 1. leftCallback / rightCallback ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          onPress={() => this.bottomModal1?.open()}
        >
          leftCallback / rightCallback
        </Button>
        <BottomModal
          testID="bottomModal1"
          ref={(c) => (this.bottomModal1 = c)}
          leftCallback={() => Alert.alert('回调', '点击了取消')}
          rightCallback={() => Alert.alert('回调', '点击了完成')}
        >
          <View style={localStyles.modalContent}>
            <Text>点击按钮触发回调</Text>
          </View>
        </BottomModal>

        {/* ========== 2. title ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal2?.open()}
        >
          title
        </Button>
        <BottomModal
          testID="bottomModal2"
          ref={(c) => (this.bottomModal2 = c)}
          title="请选择品类"
          leftCallback={() => console.log('取消')}
          rightCallback={() => console.log('确认')}
        >
          <View style={localStyles.modalContent}>
            <Text>自定义标题文本</Text>
          </View>
        </BottomModal>

        {/* ========== 3. titleStyle ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal_titleStyle?.open()}
        >
          titleStyle
        </Button>
        <BottomModal
          testID="bottomModal3"
          ref={(c) => (this.bottomModal_titleStyle = c)}
          title="红色加粗标题"
          titleStyle={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}
          leftCallback={() => { }}
          rightCallback={() => { }}
        >
          <View style={localStyles.modalContent}>
            <Text>标题样式定制</Text>
          </View>
        </BottomModal>

        {/* ========== 4. leftLabelText / rightLabelText ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal3?.open()}
        >
          leftLabelText / rightLabelText
        </Button>
        <BottomModal
          testID="bottomModal4"
          ref={(c) => (this.bottomModal3 = c)}
          leftLabelText="否"
          rightLabelText="是"
          leftCallback={() => console.log('选择“否”')}
          rightCallback={() => console.log('选择“是”')}
        >
          <View style={localStyles.modalContent}>
            <Text>自定义按钮文字</Text>
          </View>
        </BottomModal>

        {/* ========== 5. leftLabelTextStyle / rightLabelTextStyle ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal4?.open()}
        >
          leftLabelTextStyle / rightLabelTextStyle
        </Button>
        <BottomModal
          testID="bottomModal5"
          ref={(c) => (this.bottomModal4 = c)}
          leftLabelText="放弃"
          rightLabelText="提交"
          leftLabelTextStyle={{ color: variables.mtdBrandDanger }}
          rightLabelTextStyle={{ color: variables.mtdBrandSuccess }}
          leftCallback={() => console.log('放弃操作')}
          rightCallback={() => console.log('提交成功')}
        >
          <View style={localStyles.modalContent}>
            <Text>自定义按钮样式</Text>
          </View>
        </BottomModal>

        {/* ========== 6. 隐藏左侧按钮 (leftLabelText=null) ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal5?.open()}
        >
          leftLabelText
        </Button>
        <BottomModal
          testID="bottomModal6"
          ref={(c) => (this.bottomModal5 = c)}
          leftLabelText={null}
          rightLabelText="我知道了"
          rightCallback={() => console.log('用户已知晓')}
        >
          <View style={localStyles.modalContent}>
            <Text>仅显示右侧按钮</Text>
          </View>
        </BottomModal>

        {/* ========== 7. 隐藏右侧按钮 (rightLabelText=null) ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal6?.open()}
        >
          rightLabelText
        </Button>
        <BottomModal
          testID="bottomModal7"
          ref={(c) => (this.bottomModal6 = c)}
          rightLabelText={null}
          leftLabelText="返回"
          leftCallback={() => console.log('点击返回')}
        >
          <View style={localStyles.modalContent}>
            <Text>仅显示左侧按钮</Text>
          </View>
        </BottomModal>

        {/* ========== 8. titleContainer (自定义标题区域) ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal7?.open()}
        >
          titleContainer
        </Button>
        <BottomModal
          testID="bottomModal8"
          ref={(c) => (this.bottomModal7 = c)}
          titleContainer={
            <View style={{ paddingVertical: 8, backgroundColor: '#e6f7ff', alignItems: 'center' }}>
              <Text style={{ color: '#1890ff', fontSize: 16 }}>自定义标题容器</Text>
            </View>
          }
          leftCallback={() => { }}
          rightCallback={() => { }}
        >
          <View style={localStyles.modalContent}>
            <Text>整个标题区域被替换</Text>
          </View>
        </BottomModal>

        {/* ========== 9. leftLabel / rightLabel (自定义按钮元素) ========== */}
        <Button
          size="sm"
          type="primary"
          textColorInverse
          style={{ marginTop: 12 }}
          onPress={() => this.bottomModal8?.open()}
        >
          leftLabel / rightLabel (React 元素)
        </Button>
        <BottomModal
          testID="bottomModal9"
          ref={(c) => (this.bottomModal8 = c)}
          leftLabel={
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#ffe58f',
                borderRadius: 4,
              }}
            >
              <Text style={{ color: '#faad14' }}>自定义左</Text>
            </TouchableOpacity>
          }
          rightLabel={
            <View style={{ padding: 8 }}>
              <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>✓ 确认</Text>
            </View>
          }
          leftCallback={() => console.log('点击了左侧自定义区域')}
          rightCallback={() => this.bottomModal8?.close()}
        >
          <View style={localStyles.modalContent}>
            <Text>左右按钮均为自定义元素</Text>
          </View>
        </BottomModal>
      </ScrollView>
    );
  }
}