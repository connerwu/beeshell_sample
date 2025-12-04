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
import { Popover, Button, Switch } from 'beeshell-ls'
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
export default class PopoverScreen extends Component<{}, any> {
  [propsName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      directionIndex: 0,
      cancelable: true,
      offsetX: 200,
      offsetY: 300,
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
        direction='down'
        onOpen={() => {
            console.log("onOpen");
            ToastAndroid.show(`横向位置:${this.state.offsetX}, 纵向位置：${this.state.offsetY}`, 3);
        }}
        onClosed={() => {
          
        }}>
        基础示例
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

       {/* 弹层向上弹出 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverA3.open().catch((e) => {
                console.log(e)
            })
        }}>
        弹层向上弹出
      </Button>
      <Popover
        ref={c => {
          this._popoverA3 = c
        }}
        offsetX={this.state.offsetX1}
        offsetY={this.state.offsetY1}
        direction='up'
        cancelable={true}
        onOpen={() => {
            console.log("onOpen");
            ToastAndroid.show(`横向位置:${this.state.offsetX1}, 纵向位置：${this.state.offsetY1}`, 3);
        }}
        onClosed={() => {
          
        }}>
        弹层向上弹出
      </Popover>

      {/* 切换弹层关闭状态 */}
      <LabelSwitch
        label="切换弹层可关闭状态"
        value={this.state.cancelable}
        onValueChange={(v) => {
            this.setState({ cancelable: v })
            if(v) {
              ToastAndroid.show(`点击弹层区域可以关闭`, 3);
            } else {
              ToastAndroid.show(`点击弹层区域不可以关闭`, 3);
            }
          }
        }
      />
      <Button
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverA2.open().catch((e) => {
                console.log(e)
            })
        }}>
        切换弹层关闭状态
      </Button>
      <Popover
        ref={c => {
          this._popoverA2 = c
        }}
        offsetX={this.state.offsetX1}
        offsetY={this.state.offsetY1}
        direction='down'
        cancelable={this.state.cancelable}
        fullScreenPatch={[false, true, true]}
        onOpen={() => {
            console.log("onOpen");
            ToastAndroid.show(`横向位置:${this.state.offsetX1}, 纵向位置：${this.state.offsetY1}`, 3);
        }}
        onClosed={() => {
          
        }}>
         { this.state.cancelable? '点击弹层区域可关闭': '点击弹层区域不可以关闭' }
      </Popover>

      {/* 自定义渲染内容 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverB.open().catch((e) => {
                console.log(e)
            })
        }}>
        自定义渲染内容
      </Button>
      <Popover
        ref={c => {
          this._popoverB = c
        }}
        screenHeight={screenHeight}
        offsetX={this.state.offsetXCustom}
        offsetY={this.state.offsetYCustom}
        direction='down'
        align='left'
        onOpen={() => {
          console.log("onOpen");
        }}
        onClosed={() => {
          console.log("onClosed")
        }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 16 }}>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>列表一</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>列表二</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>列表三</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>列表四</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>列表五</Text>
        </View>
      </Popover>

      {/* 弹层事件监听 */}
      <Button
        style={{ marginTop: 12 }}
        size='sm'
        type='primary'
        textColorInverse
        onPress={() => {
            this._popoverC.open().catch((e) => {
                console.log(e)
            })
        }}>
        弹层事件监听
      </Button>
      <Popover
        ref={c => {
          this._popoverC = c
        }}
        screenHeight={screenHeight}
        offsetX={this.state.offsetXCustom}
        offsetY={this.state.offsetYCustom}
        cancelable={this.state.cancelable}
        direction='down'
        align='left'
        onOpen={() => {
          console.log("onOpen");
          ToastAndroid.show(`弹层已打开`, 3);
        }}
        onClosed={() => {
          console.log("onClosed")
          ToastAndroid.show(`弹层已关闭`, 3);
        }}>
        这是弹层展示的内容
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
    marginBottom: 30,
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