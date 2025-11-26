import React, { Component } from 'react'
import { Button, Picker, Datepicker } from 'beeshell-ls'
import variables from '../common/customTheme'
import { View, Text, ScrollView, StyleSheet} from 'react-native';

export default class DatepickerScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(p) {
    super(p)
    this.state = {
      value: '',
      startYear: 2018,
      numberOfYears: 10,
      date: 'undefined',
      proportion: [2, 1, 1]
    }
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.body}>
          {/* 1. 基础示例 */}
          <Text style={{marginTop: 30}}>基础示例</Text>
          <Datepicker
            onChange={(v) => {
              this.setState({
                value: v
              })
            }}
          />
          
          {/* 2. 设置开始年份*/}
          <Text style={{marginTop: 30}}>设置开始年份</Text>
          <Datepicker
            startYear={2023}
            onChange={(v) => {
              this.setState({
                value: v
              })
            }}
          />

          {/* 3. 设置年数*/}
          <Text style={{marginTop: 30}}>设置年数</Text>
          <Datepicker
            numberOfYears={6}
            onChange={(v) => {
              this.setState({
                value: v
              })
            }}
          />

          {/* 4. 设置开始日期*/}
          <Text style={{marginTop: 30}}>设置开始日期</Text>
          <Datepicker
            date={'2021-05-04'}
            onChange={(v) => {
              this.setState({
                value: v
              })
            }}
          />

          {/* 5. 间隔布局*/}
          <Text style={{marginTop: 30}}>设置年月日布局间隔</Text>
          <Datepicker
            proportion={[2,4,6]}
            onChange={(v) => {
              this.setState({
                value: v
              })
            }}
          />
          
         {/* 显示当前时间 */}
          <Text style={styles.info}>当前 value：{this.state.value}</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody,
    paddingHorizontal: variables.mtdHSpacingXL
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 15,
    color: variables.mtdGrayDark
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    fontSize: 16
  },
  info: {
    fontSize: 16,
    marginVertical: 5
  }
});