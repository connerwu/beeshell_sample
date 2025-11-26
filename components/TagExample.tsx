import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextStyle
} from 'react-native'

import { Tag, Picker, Button, Switch  } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables';


const LabelPicker = ({ lable, maps, onValueChange,pickerTitle }) => (
        <View style={styles.row}>
          <Text style={styles.label}>{lable}</Text>
          <Picker label={pickerTitle} style={{ width: 240 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {maps.map(v => (
                <Button
                  key={v}
                  onPress={() => onValueChange(v)} 
                >{v}</Button>
              ))}
            </View>
          </Picker>
        </View>
); 

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

export default class TagScreen extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      autoplay: true,

      style: {},
      textStyle: {},
      type: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning',
      textColorInverse: false
    }
  }

  indexChange (index) {
    this.setState({
      currentIndex: index
    })
  }

     updateStyle = (key, text) => {
    try {
      const json = JSON.parse(text)
      this.setState({ [key]: json })
    } catch (e) {
      // 输入非法 JSON 不更新
    }
  }

  render () {
       const {
            style,
            textStyle,
            type,
            textColorInverse
          } = this.state
    
    return (
      <ScrollView
        style={styles.body}>
        {/* ---------- 基础示例 ---------- */}
        <Text style={styles.header}>Tag 调试控制台</Text>    
        <View style={[ styles.panel, { flexDirection: 'row', flexWrap: 'wrap' } ]}>
          <Tag
            style={style}
            textStyle={textStyle}
            type={type}
            textColorInverse={textColorInverse} 
          >
            测试 Tag A示例
          </Tag>
          <Tag
            style={style}
            textStyle={textStyle}
            type={type}
            textColorInverse={textColorInverse} 
          >
            测试 Tag B示例
          </Tag>
          <Tag
            style={style}
            textStyle={textStyle}
            type={type}
            textColorInverse={textColorInverse} 
          >
            测试 Tag C示例
          </Tag>
        </View>
        
        <LabelSwitch
          label='textColorInverse'
          value={this.state.textColorInverse}
          onValueChange={v => this.setState({ textColorInverse: v })}
        />

        <LabelPicker
          lable='type'
          maps={['default', 'primary', 'danger', 'info', 'success', 'warning']}
          pickerTitle={type}
          onValueChange={v => this.setState({ type: v })}
        />

        <LabelPicker
          lable='style'
          maps={[
            '{ "marginRight": 5, "marginBottom": 5, "borderRadius": 11 }',
            '{ "marginRight": 5, "marginBottom": 5, "borderColor": "#ffadd2", "backgroundColor": "#fff0f6" }',
            '{ "marginRight": 5, "marginBottom": 5, "borderColor": "#ffa39e", "backgroundColor": "#fff0f6" }',
            '{ "marginRight": 5, "borderColor": "#91d5ff", "backgroundColor": "#e6f7ff" }'
          ]}
          pickerTitle={JSON.stringify(style)}
          onValueChange={v => this.updateStyle("style", v )}
        />
        <LabelPicker
          lable='textStyle'
          maps={[ 
            JSON.stringify({ fontSize: 15, fontStyle: 'normal', color: '#eb2f96' }),
            JSON.stringify({ fontSize: 50, fontStyle: 'italic', color: '#f5222dff' }),
            JSON.stringify({ fontSize: 5, color: '#1890ff' })]}
          pickerTitle={JSON.stringify(textStyle)}
          onValueChange={v => this.updateStyle("textStyle", v)}
        />


        <Text style={styles.header}>基础</Text>
        <View style={[ styles.panel, { flexDirection: 'row', flexWrap: 'wrap' } ]}>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='default'>默认 default</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='primary' textColorInverse>首选项 primary</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='success'>成功 success</Tag>
          <Tag style={{ marginRight: 5 }} type='info'>一般信息 info</Tag>
          <Tag style={{ marginRight: 5 }} type='warning'>警告 warning</Tag>
          <Tag style={{ marginRight: 5 }} type='danger'>危险 danger</Tag>
        </View>

        <Text style={styles.header}>自定义样式</Text>
        <View style={[ styles.panel, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>自定义圆角</Tag>

          <Tag style={{ marginRight: 5, marginBottom: 5, borderColor: '#ffadd2', backgroundColor: '#fff0f6' }} textStyle={{ color: '#eb2f96' }}>自定义颜色 magenta</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5, borderColor: '#ffa39e', backgroundColor: '#fff0f6' }} textStyle={{ color: '#f5222d' }}>自定义颜色 red</Tag>
          <Tag style={{ marginRight: 5, borderColor: '#91d5ff', backgroundColor: '#e6f7ff' }} textStyle={{ color: '#1890ff' }}>自定义颜色 blue</Tag>
        </View>
      </ScrollView>
    )
  }
}
const styles =  StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  container: {
    paddingHorizontal: variables.mtdHSpacingXL,
  },
  row: {
    // marginHorizontal: -variables.mtdHSpacingXL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%'
  },
  header: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: variables.mtdFillBody,
    fontWeight: 'bold',
    color: variables.mtdGrayDark
  },
  panel: {
    paddingHorizontal: variables.mtdHSpacingXL,
    paddingVertical: variables.mtdVSpacingL,
    backgroundColor: '#fff',
  },

  footer: {

  }
})