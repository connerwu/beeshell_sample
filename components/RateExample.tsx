import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, ViewStyle, Alert, Switch, ToastAndroid } from 'react-native'

import { Rate, Icon } from 'beeshell-ls'

import variables from 'beeshell-ls/common/styles/variables'
// import styles from './PickerExample'

const customIconSize = 20
// 本地图标地址
const customIcons = {
  empty: <View style={{ backgroundColor: '#35e012ff', width: customIconSize, height: 40 }}></View>,
  half: <View style={{ backgroundColor: '#ec0b74ff', width: customIconSize, height: 40 }}></View>,
  full: <View style={{ backgroundColor: '#6c0addff', width: customIconSize, height: 40 }}></View>
}

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    <Text style={styles.header}>{label}</Text>
    <View style={{ width: 10 }} />
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

export default class RateScreen extends Component<any, any> {
  constructor (p) {
    super(p)
    
    this.state = {
      style:false,
      value: false,
      total: false,
      icons: false,
      iconSize: false,
      iconSpace: false,
      iconColor: false,
      enableHalf: false,
      onChange: false,
      changevalue: 1,
      // rateNumber: 2.5,
      // exampleIcons: customIcons
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     value1: 1
    //   })
    // }, 2000)
  }

  rateChange (val) {
    // this.setState({ rateNumber: val })
  }

  setRateProps(radioProps: { [key: string]: any }, key: string) {
    switch (key) {
      case 'style':
        radioProps[key] = this.state[key] ? {backgroundColor: '#18da28ff'} : {backgroundColor: '#f7efefff'};
        break;
      case 'value':
        radioProps[key] = this.state[key] ? 0 : this.state.changevalue;
        break;
      case 'total':
        radioProps[key] = this.state[key] ? 10 : 5;
        break;
      // case 'icons':
      //   radioProps[key] = this.state[key] ? {customIcons}: {};
        break;
      case 'iconSize':
        radioProps[key] = this.state[key] ? 20 : 10;
        break;
      case 'iconSpace':
        radioProps[key] = this.state[key] ? 80 : 40;
        break;
      case 'iconColor':
        radioProps[key] = this.state[key] ? '#2f0eebff' : '#c2eb0eff';
        break;
      case 'enableHalf':
        radioProps[key] = this.state[key] ? true : false;
        break;    
      default:
        break;
    }
  }

   

  render () {
    const { rateNumber, exampleIcons } = this.state

    const rateProps = {};
    const iconsProps = this.state.icons ? { icons: customIcons } : {};
    Object.keys(this.state).forEach((key) => {
      this.setRateProps(rateProps, key);
    });

    return (
      <View style={styles.body}>

        <Text style={styles.header}>基础</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>Value: {rateProps?.value}</Text>
          <Text>Total: {rateProps?.total}</Text>
          <Rate 
            value={this.state.changevalue}
            // value={rateProps.value}
            // total={rateProps.total}
            {...iconsProps}
            {...rateProps}
            onChange={(value) => {
                this.setState({ changevalue: value });
                this.state.onChange ? ToastAndroid.show(`回调函数onChange : Value--->${value}`, 3) : null
              }
            } 
          />
        </View>

        <LabelSwitch
              label="style：改变背景色"
              value={this.state.style}
              onValueChange={(value) => this.setState({ style: value })}
        />
        <LabelSwitch
              label="value：设置值"
              value={this.state.value}
              onValueChange={(value) => this.setState({ value: value })}
        />
        <LabelSwitch
              label="total设置Total总数"
              value={this.state.total}
              onValueChange={(value) => this.setState({ total: value})}
        />
        <LabelSwitch
              label="icons：设置自定义图标"
              value={this.state.icons}
              onValueChange={(value) => this.setState({ icons: value })}
        />
        <LabelSwitch
              label="iconSize：设置图标大小"
              value={this.state.iconSize}
              onValueChange={(value) => this.setState({ iconSize: value })}
        />
        <LabelSwitch
              label="iconSpace：设置图标间距"
              value={this.state.iconSpace}
              onValueChange={(value) => this.setState({ iconSpace: value })}
        />
        <LabelSwitch
              label="iconColor：设置图标颜色"
              value={this.state.iconColor}
              onValueChange={(value) => this.setState({ iconColor: value })}
        />
        <LabelSwitch
              label="enableHalf：支持半星"
              value={this.state.enableHalf}
              onValueChange={(value) => this.setState({ enableHalf: value })}
        />
        <LabelSwitch
              label="onChange：回调函数"
              value={this.state.onChange}
              onValueChange={(value) => this.setState({ onChange: value })}
        />

        
{/* 
        <Text style={styles.header}>自定义图标大小、间距</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>value2: {this.state.value2}</Text>
          <Rate value={this.state.value2} iconSize={40} enableHalf iconSpace={15} onChange={value => this.setState({ value2: value }) } />
        </View>

        <Text style={styles.header}>自定义图标</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>value3: {this.state.value3 || 0}</Text>
          <Rate
            total={3}
            value={this.state.value3 || 0}
            icons={customIcons}
            iconSpace={80}
            iconSize={customIconSize}
            enableHalf={true}
            onChange={(value) => {
              this.setState({ value3: value })
            }}
          />
        </View> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  pickerStyle: { backgroundColor: 'red', padding: 30, marginTop: 30 }
})