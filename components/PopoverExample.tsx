import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Platform,
  StatusBar,
  ToastAndroid,
} from 'react-native'
import { Popover, Button, Switch, Scrollpicker, Radio } from 'beeshell-ls'
import variables from '../common/customTheme'

const window = Dimensions.get('window')
const screenHeight = Platform.OS === 'ios' ? window.height : window.height - StatusBar.currentHeight
const directionsWithAlign = [
  {
    direction: ['right'],
    align: 'up'
  },
  {
    direction: ['right'],
    align: 'down',
  },
  {
    direction: ['right'],
  },
  {
    direction: ['left'],
    align: 'down',
  },
  {
    direction: ['left'],
    align: 'up'
  },
  {
    direction: ['up'],
    align: 'right'
  },
   {
    direction: ['up'],
    align: 'left'
  },
  {
    direction: ['up', 'left'],
  },
  {
    direction: ['down'],
    align: 'left'
  },
  {
    direction: ['down'],
    align: 'right'
  },
]

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ marginTop: 12 }}>
    <Text>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

const DirectionRadioGroup = ({ label, value, onValueChange }) => (
  <View style={{ marginTop: 12, display: 'flex' }}>
    <Text>{label}</Text>
    <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      <Radio
        style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        value={value.toString()}
        onChange={onValueChange}>
        <Radio.Item label='up' value={'up'} />
        <Radio.Item label='down' value={'down'} />
        <Radio.Item label='left' value={'left'} />
        <Radio.Item label='right' value={'right'} />
        <Radio.Item label='up,left' value={'up,left'} />
      </Radio>
    </View>
  </View>
)
const AlignRadioGroup = ({label, value, onValueChange}) => (
  <View style={{ marginTop: 12 }}>
    <Text>{label}</Text>
    <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      <Radio
        style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        value={value}
        onChange={onValueChange}>
        <Radio.Item label='left' value={'left'} />
        <Radio.Item label='right' value={'right'} />
        <Radio.Item label='up' value={'up'} />
        <Radio.Item label='down' value={'down'} />
        <Radio.Item label='center' value={'center'} />
      </Radio>
    </View>
  </View>
)
export default class PopoverScreen extends Component<{}, any> {
  [propsName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      direction: 'down',
      align: 'left',
      fullScreenPatch: [true, true, true],
      directionIndex: 0,
      cancelable: true,
      offsetX: 200,
      offsetY: 400,
      offsetX1: 300,
      offsetY1: 500,
      offsetXCustom: 200,
      offsetYCustom: 300,
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
  }
  
  render () {
    const target = directionsWithAlign[this.state.directionIndex]
    return (
      <ScrollView
      style={styles.body}
      contentContainerStyle={styles.container}>
      
      <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>注意：direction和align的值不能选择一致</Text>
      {/* 切换弹层方向 */}
      <DirectionRadioGroup
        label="切换direction弹出方向"
        value={this.state.direction}
        onValueChange={(v) => {
            const directionData = v.split(',')
            this.setState({ direction: directionData })
            ToastAndroid.show(`弹出方向设置为：${directionData}`, 3);
          }
        }
      />
      {/* 切换内容方向 */}
      <AlignRadioGroup
        label="切换align内容位置"
        value={this.state.align}
        onValueChange={(v) => {
            this.setState({ align: v })
            ToastAndroid.show(`弹出内容位置设置为：${v}`, 3);
          }
        }
      />

      {/* 基础示例 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverA.open().catch((e) => {
                console.log(e)
            })
        }}>
        基础示例
      </Button>
      <Popover
        ref={c => {
          this._popoverA = c
        }}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        cancelable={true}
        style={{width: '100%'}}
        screenHeight={screenHeight}
        align={this.state.align}
        direction={this.state.direction}
        fullScreenPatch={this.state.fullScreenPatch}
        onOpen={() => {
            console.log("onOpen");
            ToastAndroid.show(`横向位置:${this.state.offsetX}, 纵向位置：${this.state.offsetY}, 弹出方向为：${this.state.direction}, 弹出内容位置为：${this.state.align}`, 3);
        }}
        onClosed={() => {
          
        }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 16 }}>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>基础示例视图</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>基础示例视图</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>基础示例视图</Text>
        </View>
      </Popover>

      {/* 修改弹出位置 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverA1.open().catch((e) => {
                console.log(e)
            })
        }}>
        修改弹出位置
      </Button>
      <Popover
        ref={c => {
          this._popoverA1 = c
        }}
        offsetX={this.state.offsetX1}
        offsetY={this.state.offsetY1}
        direction='down'
        cancelable={true}
        onOpen={() => {
            console.log("onOpen");
            ToastAndroid.show(`横向位置:${this.state.offsetX1}, 纵向位置：${this.state.offsetY1}`, 3);
        }}
        onClosed={() => {
          
        }}>
        修改弹出位置
      </Popover>
  
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL
  },
  container: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 50,
    paddingBottom: 50,
    color: variables.mtdGrayDark
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 15,
    color: variables.mtdGrayDark
  },
});