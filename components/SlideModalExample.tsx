

import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TextInput, Switch, Dimensions, Platform, StatusBar } from 'react-native'
import { SlideModal, SlideModalProps, Picker, Button } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const window = Dimensions.get('window')
const screenHeight = Platform.OS === 'ios' ? window.height : window.height - StatusBar.currentHeight
const directonsWithAlign = [
  { direction: ['right'], align: 'up' },
  { direction: ['up', 'right'] },
  { direction: ['up'], align: 'right' },
  { direction: ['down'], align: 'right' },
  { direction: ['down', 'right'] },
  { direction: ['right'], align: 'down' },
  { direction: ['left'], align: 'down' },
  { direction: ['down', 'left'] },
  { direction: ['down'], align: 'left' },
  { direction: ['up'], align: 'left' },
  { direction: ['up', 'left'] },
  { direction: ['left'], align: 'up' }
]


const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
)

const LabelInput = ({ label, value, onChangeText }) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={String(value)}
      keyboardType="default"
      onChangeText={onChangeText}
    />
  </View>
)

interface State {
  direction: 'up' | 'down' | 'left' | 'right'
  align: 'left' | 'right' | 'up' | 'down' | 'center'
  offsetX: number
  offsetY: number
  fullScreenPatch: boolean[]
  modalOpen: boolean,
   directionIndex: number,
      offsetX2: number,
      offsetY2: number,
      offsetX3: number,
      offsetY3: number,
      offsetX4: number,
      offsetY4: number,
      offsetX5: number,
      offsetY5: number
}

export default class SlideModalTestScreen extends Component<any, State> {
  constructor(props) {
    super(props)
    this.state = {
      direction: 'down',
      align: 'center',
      offsetX: 100,
      offsetY: 400,
      fullScreenPatch: [true, true, true],
      modalOpen: false,

      directionIndex: 0,
      offsetX2: 0,
      offsetY2: 0,
      offsetX3: 0,
      offsetY3: 0,
      offsetX4: 0,
      offsetY4: 0,
      offsetX5: 0,
      offsetY5: 0
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true })
    this.slideModal?.open()
  }

    handleClosePinwheel = () => {
    this.slideModalA.close()
    this.slideModalB.close()
    this.slideModalC.close()
    this.slideModalD.close()
  }

  renderModalContent_1 = (props) => {
    const {
      direction, align, offsetX = 0, offsetY = 0, fullScreenPatch, styles
    } = props
    return (
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>测试属性</Text>
        <Text>direction: {JSON.stringify(direction)}</Text>
        <Text>align: {align}</Text>
        <Text>offsetX: {offsetX}</Text>
        <Text>offsetY: {offsetY}</Text>
        {fullScreenPatch && <Text>fullScreenPatch: {fullScreenPatch.map(v => v ? 'T' : 'F').join(',')}</Text>}
        {styles && <Text>自定义样式: {JSON.stringify(styles)}</Text>}
      </View>
    )
  }


  renderModalContent = () => {
    const { direction, align, offsetX, offsetY, fullScreenPatch } = this.state
    return (
      <View style={{ backgroundColor: '#fff', padding: 12 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>测试 SlideModal 属性</Text>
        <Text>direction: {direction}</Text>
        <Text>align: {align}</Text>
        <Text>offsetX: {offsetX}</Text>
        <Text>offsetY: {offsetY}</Text>
        <Text>fullScreenPatch: {fullScreenPatch.map(v => v ? 'T' : 'F').join(', ')}</Text>
      </View>
    )
  }

  render() {
    const { direction, align, offsetX, offsetY, fullScreenPatch } = this.state

    const directions = ['up', 'down', 'left', 'right'] as const
    const aligns = ['left', 'right', 'up', 'down', 'center'] as const

    const target = directonsWithAlign[this.state.directionIndex]
    const contentEl = <View style={{ backgroundColor: '#fff', width: 50, height: 40 }} />

    const centerX = window.width / 2
    const centerY = window.height / 2

    return (
      <ScrollView style={styles.body} contentContainerStyle={{ padding: 16 }}>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>direction</Text>
          <Picker
            label={direction}
            style={{ width: 150 }}
          >
            <View
              style={{
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 200,
                      borderTopColor: '#ddd',
                      borderTopWidth: StyleSheet.hairlineWidth
                      }}>
                      {directions.map((d) => <Button key={d} type="primary" onPress={()=>{this.setState({ direction: d })}}>{d}</Button>)}
            </View>
            
          </Picker>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>align</Text>
          <Picker
            label={align}
            style={{ width: 150 }}
          >
            {aligns.map(a => <Button key={a} type="primary" onPress={()=>{this.setState({ align: a })}}>{a}</Button>)}
          </Picker>
        </View>

        <LabelInput
          label="offsetX"
          value={offsetX}
          onChangeText={(v) => this.setState({ offsetX: Number(v) })}
        />
        <LabelInput
          label="offsetY"
          value={offsetY}
          onChangeText={(v) => this.setState({ offsetY: Number(v) })}
        />
        <LabelSwitch
          label="fullScreenPatch 1"
          value={fullScreenPatch[0]}
          onValueChange={(v) => this.setState({ fullScreenPatch: [v, fullScreenPatch[1], fullScreenPatch[2]] })}
        />
        <LabelSwitch
          label="fullScreenPatch 2"
          value={fullScreenPatch[1]}
          onValueChange={(v) => this.setState({ fullScreenPatch: [fullScreenPatch[0], v, fullScreenPatch[2]] })}
        />
        <LabelSwitch
          label="fullScreenPatch 3"
          value={fullScreenPatch[2]}
          onValueChange={(v) => this.setState({ fullScreenPatch: [fullScreenPatch[0], fullScreenPatch[1], v] })}
        />

        <View style={{ marginVertical: 12 }}>
          <Button type="primary" onPress={this.openModal} ><Text>"打开 SlideModal"</Text></Button>
        </View>

        <SlideModal<SlideModalProps>
          ref={(c) => { this.slideModal = c }}
          screenHeight={screenHeight}
          direction={direction}
          align={align}
          offsetX={offsetX}
          offsetY={offsetY}
          fullScreenPatch={fullScreenPatch}
          cancelable={true}
          onClose={() => console.log('Modal Close')}
        >
          {this.renderModalContent()}
        </SlideModal>

      
         <Button  type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => this.slideModalR.open()}>
           <Text>'基础'</Text>
         </Button>
         <SlideModal<SlideModalProps>
          ref={c => { this.slideModalR = c }}
          screenHeight={screenHeight}
          cancelable={true}
        >
          {this.renderModalContent_1({ direction: 'down', align: 'center' })}
        </SlideModal>

        <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => this.slideModalX.open()}>
          <Text>'自定义样式styles'</Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModalX = c }}
          styles={{
            container: { top: 100, bottom: 100, left: 100, right: 100 },
            backdrop: [{ backgroundColor: 'red' }],
            content: { width: '100%' }
          }}
          screenHeight={screenHeight}
          cancelable={true}
        >
          {this.renderModalContent_1({
            direction: 'down',
            align: 'center',
            styles: { container: { top: 100, bottom: 100 }, backdrop: [{ backgroundColor: 'red' }], content: { width: '100%' } }
          })}
        </SlideModal>

        {/* <View ref={el => { this.btnEl2 = el }} />
        <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => {
          try {
            this.btnEl2.measure((fx, fy, width, height, px, py) => {
              this.setState({ offsetX2: px + 130, offsetY2: py }, () => {
                setTimeout(() => { this.slideModal2.open() }, 500)
              })
            })
          } catch (e) { console.log(e) }
        }}>
          <Text>'指定位置，自定义滑动方向，全屏'</Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModal2 = c }}
          screenHeight={screenHeight}
          offsetX={this.state.offsetX2}
          offsetY={this.state.offsetY2}
          direction={target.direction as any}
          align={target.align as any}
          cancelable={true}
          fullScreenPatch={[true, true, true]}
          onClose={(...args) => { console.log(args, 'close') }}
          onClosed={(...args) => {
            console.log(args, 'closed')
            this.setState({ directionIndex: (this.state.directionIndex + 1) % directonsWithAlign.length })
          }}
        >
          {this.renderModalContent_1({
            direction: target.direction,
            align: target.align,
            offsetX: this.state.offsetX2,
            offsetY: this.state.offsetY2,
            fullScreenPatch: [true, true, true]
          })}
        </SlideModal> */}

        {/* <View ref={el => { this.btnEl3 = el }} />
        <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => {
          this.btnEl3.measure((fx, fy, width, height, px, py) => {
            this.setState({ offsetY3: py + height }, () => { setTimeout(() => this.slideModal3.open(), 300) })
          })
        }}>
          <Text>'指定位置、下滑、全屏'</Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModal3 = c }}
          screenHeight={screenHeight}
          fullScreenPatch={[true, true, true]}
          offsetX={0}
          offsetY={this.state.offsetY3}
          direction='down'
          cancelable={true}
        >
          {this.renderModalContent_1({
            direction: 'down',
            align: 'center',
            offsetX: 0,
            offsetY: this.state.offsetY3,
            fullScreenPatch: [true, true, true]
          })}
        </SlideModal> */}

        {/* <View ref={el => { this.btnEl4 = el }} />
        <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => {
          this.btnEl4.measure((fx, fy, width, height, px, py) => {
            this.setState({ offsetX4: px + width, offsetY4: py + height }, () => { setTimeout(() => this.slideModal4.open(), 300) })
          })
        }}>
          <Text>'指定位置、左滑、局部'</Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModal4 = c }}
          screenHeight={screenHeight}
          offsetX={this.state.offsetX4}
          offsetY={this.state.offsetY4}
          direction='left'
          cancelable={true}
        >
          {this.renderModalContent_1({
            direction: 'left',
            align: 'center',
            offsetX: this.state.offsetX4,
            offsetY: this.state.offsetY4
          })}
        </SlideModal> */}

        {/* <View ref={el => { this.btnEl5 = el }} />
        <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => {
          this.btnEl5.measure((fx, fy, width, height, px, py) => {
            this.setState({ offsetX5: px, offsetY5: py + height }, () => { setTimeout(() => this.slideModal5.open(), 300) })
          })
        }}>
          <Text>'指定位置、右滑'</Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModal5 = c }}
          screenHeight={screenHeight}
          offsetX={this.state.offsetX5}
          offsetY={0}
          direction='right'
          cancelable={true}
        >
          {this.renderModalContent_1({
            direction: 'right',
            align: 'center',
            offsetX: this.state.offsetX5,
            offsetY: 0
          })}
        </SlideModal> */}

        {/* <Button type="primary" style={{ marginTop: 12 }} size='sm' onPress={() => {
          this.slideModalA.open()
          this.slideModalB.open()
          this.slideModalC.open()
          this.slideModalD.open()
        }}>
          <Text>'大风车' </Text>
        </Button>
        <SlideModal<SlideModalProps>
          ref={c => { this.slideModalA = c }}
          screenHeight={screenHeight}
          offsetX={centerX}
          offsetY={centerY}
          cancelable={true}
          direction={directonsWithAlign[0].direction as any}
          align={directonsWithAlign[0].align as any}
          onClose={this.handleClosePinwheel}
        >
          {this.renderModalContent_1({
            direction: directonsWithAlign[0].direction,
            align: directonsWithAlign[0].align,
            offsetX: centerX,
            offsetY: centerY
          })}
        </SlideModal>

        <SlideModal<SlideModalProps>
          ref={c => { this.slideModalB = c }}
          screenHeight={screenHeight}
          offsetX={centerX}
          offsetY={centerY}
          cancelable={true}
          direction={directonsWithAlign[3].direction as any}
          align={directonsWithAlign[3].align as any}
          onClose={this.handleClosePinwheel}
        >
          {this.renderModalContent_1({
            direction: directonsWithAlign[3].direction,
            align: directonsWithAlign[3].align,
            offsetX: centerX,
            offsetY: centerY
          })}
        </SlideModal>

        <SlideModal<SlideModalProps>
          ref={c => { this.slideModalC = c }}
          screenHeight={screenHeight}
          offsetX={centerX}
          offsetY={centerY}
          cancelable={true}
          direction={directonsWithAlign[6].direction as any}
          align={directonsWithAlign[6].align as any}
          onClose={this.handleClosePinwheel}
        >
          {this.renderModalContent_1({
            direction: directonsWithAlign[6].direction,
            align: directonsWithAlign[6].align,
            offsetX: centerX,
            offsetY: centerY
          })}
        </SlideModal>

        <SlideModal<SlideModalProps>
          ref={c => { this.slideModalD = c }}
          screenHeight={screenHeight}
          offsetX={centerX}
          offsetY={centerY}
          cancelable={true}
          direction={directonsWithAlign[9].direction as any}
          align={directonsWithAlign[9].align as any}
          onClose={this.handleClosePinwheel}
        >
          {this.renderModalContent_1({
            direction: directonsWithAlign[9].direction,
            align: directonsWithAlign[9].align,
            offsetX: centerX,
            offsetY: centerY
          })}
        </SlideModal> */}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6
  },
  switchLabel: {
    fontSize: 14
  },
  input: {
    width: 120,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8
  },
  container: {
    paddingHorizontal: variables.mtdHSpacingXL,
  }
})
