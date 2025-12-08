import React, { Component } from 'react'
import { ScrollView, View, Text,StyleSheet } from 'react-native'

import { Button, Modal, Input } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'


export default class ModalScreen extends Component<{}, any> {
  [prpsName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      foo: 0,
      inputInfo2: '2222',
      eventLogs: []
    }
  }

  appendEventLog = (eventName, detail = '') => {
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const log = {
      id: Date.now() + Math.random(),
      time,
      event: eventName,
      detail
    }
    this.setState(prev => ({
      eventLogs: [log, ...prev.eventLogs].slice(0, 20)
    }))
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: variables.mtdHSpacingXL }}>
           {/* 日志区域 */}
            <View style={styles.logArea}>
                <Text style={styles.logTitle}>操作日志</Text>
                    <ScrollView style={styles.logList}>
                      {this.state.eventLogs.length ?
                        this.state.eventLogs.map(log => (
                          <View key={log.id} style={styles.logItem}>
                            <Text style={styles.logEvent}>[{log.time}] {log.event}</Text>
                            {log.detail && <Text style={styles.logDetail}>{log.detail}</Text>}
                          </View>
                        )) :
                      <Text style={styles.emptyLog}>查看日志</Text>
                      }
                    </ScrollView>
            </View>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modal1.open()
          }}>
          基础
        </Button>
        <Modal
          ref={c => {
            this.modal1 = c
          }}
          cancelable>
          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容{this.state.foo || ''}</Text>
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modal2.open()
          }}>
          点击蒙层不消失
        </Button>
        <Modal
          ref={c => {
            this.modal2 = c
          }}
          cancelable={false}>
          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>点击蒙层不消失</Text>
            <Button size='sm' onPress = {()=>this.modal2.close()}>关闭</Button>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalXOffset.open()
          }}>
          X轴偏移100
        </Button>
        <Modal
          ref={c => {
            this.modalXOffset = c
          }}
          offsetX={100}
          cancelable
          scrollable>
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalYOffset.open()
          }}>
          Y轴偏移300
        </Button>
        <Modal
          ref={c => {
            this.modalYOffset = c
          }}
          offsetY={300}
          cancelable
          scrollable>
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => this.animatedXModal.open()}>
          从左下角弹出(animatedTranslateX = 0 animatedTranslateY=0 )
        </Button>
        <Modal
          ref={c => this.animatedXModal = c}
          cancelable
          animatedTranslateX={0}
          animatedTranslateY={900}
          onOpen={() => this.appendEventLog('animatedTranslateX', '弹窗从X轴200位置弹出')}>
          <View style={styles.modalContent}>
            <Text>从左下角弹出(animatedTranslateX = 0 animatedTranslateY = 900)</Text>
            <Text style={styles.noteText}>（默认从屏幕中间弹出）</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => this.animatedYModal.open()}>
          从右上角弹出(animatedTranslateX = 0 animatedTranslateY=0 )
        </Button>
        <Modal
          ref={c => this.animatedYModal = c}
          cancelable
          animatedTranslateX={400}
          animatedTranslateY={0}
          onOpen={() => this.appendEventLog('animatedTranslateY', '弹窗从Y轴150位置弹出')}>
          <View style={styles.modalContent}>
            <Text>从右上角弹出(animatedTranslateX=400 animatedTranslateY=0 )</Text>
            <Text style={styles.noteText}>（默认从屏幕中间弹出）</Text>
          </View>
        </Modal>
        
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalX.open()
          }}>
          内容溢出可滚动
        </Button>
        <Modal
          ref={c => {
            this.modalX = c
          }}
          scrollable
          style={{ marginVertical: 150 }}
          cancelable>
          <View
            style={{
              width: 200,
              height: 1000,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
            <Input
              style={{ width: '100%' }}
              value={this.state.inputInfo2}
              onChange={(value) => {
                this.setState({
                  inputInfo2: value
                })
              }}
            />
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalY.open()
          }}>
          内容溢出不可滚动
        </Button>
        <Modal
          ref={c => {
            this.modalY = c
          }}
          scrollable={false}
          style={{ marginVertical: 150 }}
          cancelable>
          <View
            style={{
              width: 200,
              height: 1000,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
            <Input
              style={{ width: '100%' }}
              value={this.state.inputInfo2}
              onChange={(value) => {
                this.setState({
                  inputInfo2: value
                })
              }}
            />
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalBackdrop.open()
          }}>
          自定义蒙层颜色(backdropColor)
        </Button>
        <Modal
          ref={c => {
            this.modalBackdrop = c
          }}
          backdropColor="rgba(255, 0, 0, 0.3)"
          cancelable>
          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>红色背景蒙层颜色{this.state.foo || ''}</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalScreen.open()
          }}>
          自定义屏幕宽高(screenWidth screenHeight)
        </Button>
        <Modal
          ref={c => {
            this.modalScreen = c
          }}
          screenWidth={300}
          screenHeight={300}
          cancelable>
          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>screenWidth:300  screenHeight:300</Text>
          </View>
        </Modal>
       
        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalContainerStyle.open()
          }}>
          演示 containerStyle 作用
        </Button>
        <Modal
          ref={c => {
            this.modalContainerStyle = c
          }}
          cancelable
          containerStyle={{
            padding: 30,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>containerStyle 控制外层容器</Text>
            <Text style={{ fontSize: 10, color: '#999', marginTop: 5 }}>
              弹框靠左上对齐
            </Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => {
            this.modalStyle.open()
          }}>
          演示 style 作用
        </Button>
        <Modal
          ref={c => {
            this.modalStyle = c
          }}
          cancelable
          style={{
            backgroundColor: 'pink',
            borderRadius: 20,
            padding:10
          }}>
          <View
            style={{
              width: '100%',
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10
            }}>
            <Text>style 控制弹框本身</Text>
            <Text style={{ fontSize: 10, color: '#999', marginTop: 5 }}>
              弹框圆角/背景都是style控制
            </Text>
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12, marginBottom: 12 }}
          type='primary'
          textColorInverse
          size='sm'
          onPress={() => this.callbackModal.open()}>
          触发回调事件
        </Button>
        
        <Modal
          ref={c => this.callbackModal = c}
          cancelable
          onOpen={() => this.appendEventLog('onOpen', '弹窗开始打开')}
          onOpened={() => this.appendEventLog('onOpened', '弹窗打开完成')}
          onClose={(reason) => this.appendEventLog(
            'onClose', 
            `弹窗开始关闭`
          )}
          onClosed={(reason) => this.appendEventLog(
            'onClosed', 
            `弹窗关闭完成`
          )}>
          <View
            style={{
              width: 200,
              minHeight: 100,
              padding: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  logArea: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fff8e1',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffe082'
  },
  logTitle: {
    fontSize: 12,
    color: '#ff8f00',
    fontWeight: 'bold'
  },
  logList: {
    height: 120,
    marginTop: 8,
    backgroundColor: '#fffdf3',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe082',
    padding: 8
  },
  logItem: {
    marginBottom: 8
  },
  logEvent: {
    fontSize: 12,
    color: '#ff8f00'
  },
  logDetail: {
    fontSize: 12,
    color: '#795548'
  },
  emptyLog: {
    fontSize: 12,
    color: '#ffb74d'
  },
  modalContent: {
    width: 220,
    minHeight: 100,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8
  }
})