import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Switch, Alert, TextInput, Slider as RNSlider, ToastAndroid } from 'react-native'
import { Slider } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

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
      // keyboardType="numeric"
      onChangeText={onChangeText}
    />
  </View>
)

export default class SliderScreen extends Component<any, any> {

    constructor(props) {
    super(props)
    this.state = {
      value: 50,
      rangeValue: [20, 80],
      min: 0,
      max: 100,
      step: 1,
      range: false,
      vertical: false,
      showTip: true,
      trackWeight: 8,
      thumbSize: 24,
      minTrackColor: variables.mtdGrayLight,
      midTrackColor: variables.mtdGrayLightest,
      maxTrackColor: variables.mtdGrayLighter,
      onChangeAlert: false,
      valueL: 0,//非属性
      valueA: 2,
      valueX: [ 100, 800 ],
      disabled: false,
      renderTipChange: false,
      renderThumbChange: false
    }
  }

  handleChange = (value: number | number[]) => {
    if (this.state.range) {
      this.setState({ rangeValue: value as number[] })
    } else {
      this.setState({ value: value as number })
    }
    if (this.state.onChangeAlert) {
      // Alert.alert('onChange回调', `Value: ${JSON.stringify(value)}`)
      ToastAndroid.show(`onChange回调 Value: ${JSON.stringify(value)}`, 3);
    }

    if (this.state.renderTipChange) {
 
    }

    console.log(value)
    this.setState({
      valueL: value
    })
  }

    handleChange_1 = (value: number | number[]) => {
    console.log(value)
    this.setState({
      valueL: value
    })
  }

  // constructor (p) {
  //   super(p)
  //   this.state = {
  //     valueL: 0,
  //     valueA: 2,
  //     valueX: [ 100, 800 ],
  //     disabled: false
  //   }
  // }
  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     valueA: 4,
    //     valueL: 300,
    //     disabled: true
    //   })
    // }, 2000)
  }
  // handleChange = (value) => {
  //   console.log(value)
  //   this.setState({
  //     valueL: value
  //   })
  // }

    render() {
    const {
      value, rangeValue, min, max, step, range, vertical, disabled, showTip,
      trackWeight, thumbSize, minTrackColor, midTrackColor, maxTrackColor
    } = this.state

    const currentValue = range ? rangeValue : value

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>Slider 属性测试 Demo</Text>

        <View style={[
          styles.panel,
          vertical && { height: 300, justifyContent: 'center' }   // ← 纵向时才生效
        ]}>
          <Slider
            style={vertical ? { height: 260 } : { width: '100%' }}  // ← 关键
            value={currentValue}
            min={Number(min)}
            max={Number(max)}
            step={Number(step)}
            range={range}
            vertical={vertical}
            disabled={disabled}
            showTip={showTip}
            trackWeight={Number(trackWeight)}
            thumbSize={Number(thumbSize)}
            minTrackColor={minTrackColor}
            midTrackColor={midTrackColor}
            maxTrackColor={maxTrackColor}
            renderTip={this.state.renderTipChange ? (v) => <Text>{Array.isArray(v) ? v.join(' ~ ') : v}</Text> : undefined}
            renderThumb={this.state.renderThumbChange ? (index) => (
                      <View style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: '#007AFF',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ color: '#fff', fontSize: 10 }}>
                          {Array.isArray(currentValue) ? currentValue[index] : currentValue}
                        </Text>
                      </View>
                    ) : undefined}
            onChange={this.handleChange}
          />
          {/* <Text style={{ marginTop: 10 }}>
            当前值: {JSON.stringify(currentValue)}
          </Text> */}
        </View>

        <LabelSwitch
          label="range 双滑块"
          value={range}
          onValueChange={(v) => {
            if (v) {
            // 开启 range 时初始化左滑块值，防止 NaN
            this.setState({ range: true}, () => {
              setTimeout(()=>{this.setState({rangeValue:[10, 50]})},100)
            })
              } else {
                this.setState({ range: false })
              }
          }}
        />
        <LabelSwitch
          label="vertical 纵向"
          value={vertical}
          onValueChange={(v) => this.setState({ vertical: v })}
        />
        <LabelSwitch
          label="disabled 禁用"
          value={disabled}
          onValueChange={(v) => this.setState({ disabled: v })}
        />
        <LabelSwitch
          label="showTip 显示气泡"
          value={showTip}
          onValueChange={(v) => this.setState({ showTip: v })}
        />
        <LabelSwitch
          label="onChange 回调弹窗"
          value={this.state.onChangeAlert}
          onValueChange={(v) => this.setState({ onChangeAlert: v })}
        />
        <LabelSwitch
          label="renderTip 重新渲染气泡内容"
          value={this.state.renderTipChange}  
          onValueChange={(v) => this.setState({ renderTipChange: v })}
        />
        <LabelSwitch
          label="renderThumb 重新渲染滑块内容"
          value={this.state.renderThumbChange}  
          onValueChange={(v) => this.setState({ renderThumbChange: v })}
        />

        <LabelInput
          label="min 最小值"
          value={min}
          onChangeText={(v) => this.setState({ min: Number(v) })}
        />
        <LabelInput
          label="max 最大值"
          value={max}
          onChangeText={(v) => this.setState({ max: Number(v) })}
        />
        <LabelInput
          label="step 步长"
          value={step}
          onChangeText={(v) => this.setState({ step: Number(v) })}
        />
        {/* <LabelInput
          label="trackWeight 滑轨粗细"
          value={trackWeight}
          onChangeText={(v) => this.setState({ trackWeight: Number(v) })}
        />
        <LabelInput
          label="thumbSize 滑块大小"
          value={thumbSize}
          onChangeText={(v) => this.setState({ thumbSize: Number(v) })}
        /> */}
        <LabelInput
          label="minTrackColor 小段颜色"
          value={minTrackColor}
          onChangeText={(v) => this.setState({ minTrackColor: v })}
        />
        <LabelInput
          label="midTrackColor 中段颜色"
          value={midTrackColor}
          onChangeText={(v) => this.setState({ midTrackColor: v })}
        />
        <LabelInput
          label="maxTrackColor 终端颜色"
          value={maxTrackColor}
          onChangeText={(v) => this.setState({ maxTrackColor: v })}
        />

       <View
        style={[styles.body]}>

        <Text style={styles.header}>标尺滑块:marks</Text>
        <View style={[styles.panel]}>
          <Slider
            style={{ marginTop: 10 }}
            value={this.state.valueA}
            min={1}
            max={6}
            step={1}
            marks={['普通', '快速', '高速', '极速', '光速', 'VIP']}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}
          />
        </View>

        {/* <Text style={styles.header}>气泡滑块</Text>
        <View style={[styles.panel]}>
          <Slider
            value={this.state.valueL}
            onChange={this.handleChange_1}
            max={1500}
            showTip={true}
          />
        </View> */}
        {/* <Text style={styles.header}>禁用滑块</Text>
        <View style={[styles.panel]}>
          <Slider
            max={1500}
            value={500}
            minTrackColor={variables.mtdGrayLighter}
            disabled={true}
          />
        </View> */}

        <Text style={styles.header}>
          {`自定义滑块 style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: variables.mtdBrandDanger, opacity: 0.7 }}`}
        </Text>
        <View style={[styles.panel]}>
          <Slider
            max={1500}
            value={500}
            thumbSize={50}
            renderThumb={() => {
              return (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: variables.mtdBrandDanger,
                    opacity: 0.7
                  }}>
                </View>
              )
            }}
          />
        </View>

        {/* <Text style={styles.header}>双滑块、自定义颜色、粗细</Text>
        <View style={[styles.panel]}>
          <Slider
            range
            maxTrackColor={variables.mtdGrayLightest}
            minTrackColor={variables.mtdGrayLightest}
            midTrackColor={this.state.disabled ? variables.mtdGrayLighter : variables.mtdBrandDanger}
            max={1500}
            trackWeight={20}
            value={this.state.valueX}
            disabled={this.state.disabled}
            showTip={true}
            onChange={(value) => {
              this.setState({
                valueX: value
              })
            }}
          />
        </View> */}

        {/* <Text style={styles.header}>纵向</Text>
        <View style={[styles.panel, { height: 150, flexDirection: 'row' }]}>
          <Slider style={{ flex: 1, justifyContent: 'center' }} vertical max={1500} value={500} showTip={true}/>
          <Slider style={{ flex: 1, justifyContent: 'center' }} vertical max={100} value={50} showTip={true}/>
        </View> */}
      </View>

      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL,
  },
  header: {
    fontWeight: 'bold',
    paddingVertical: variables.mtdVSpacingL,
    color: variables.mtdGrayDark
  },
  panel: {
    // paddingVertical: variables.mtdVSpacingL,
    // paddingHorizontal: variables.mtdHSpacingXL,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    // alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    alignItems: 'stretch', // ← 关键
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  switchLabel: {
    fontSize: 14,
    color: variables.mtdGrayDark
  },
  input: {
    width: 60,
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: 'center'
  }
})
