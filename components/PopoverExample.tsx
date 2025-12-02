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
  ToastAndroid
} from 'react-native'
import { Popover, Button } from 'beeshell-ls'
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
export default class PopoverScreen extends Component<{}, any> {
  [propsName: string]: any

  constructor (props: any) {
    super(props)
    this.state = {
      directionIndex: 0,
      cancelable: true,
      offsetX: 200,
      offsetY: 300,
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
        direction={target.direction as any}
        align={target.align as any}
        cancelable={this.state.cancelable}
        onOpen={() => {
            console.log("onOpen");
        }}
        onClosed={() => {
          this.setState({
            directionIndex: (this.state.directionIndex + 1) % directionsWithAlign.length
          })
        }}>
        基础示例
      </Popover>

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