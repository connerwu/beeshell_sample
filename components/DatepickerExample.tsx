import React, { Component } from 'react'
import { Button, Picker, Datepicker } from 'beeshell-ls'
import variables from '../common/customTheme'
import { View, Text, ScrollView, StyleSheet} from 'react-native';

export default class DatepickerScreen extends Component<{}, State> {
  [propName: string]: any

  constructor(props) {
    super(props)
    this.state = {
      dateValue: '2018-1-1',
      startYear: 2018,
      numberOfYears: 10,
      date: 'undefined',
      proportion: [2, 1, 1]
    }
  }

  componentDidMount () {
  }
  
  changeDate = (value: any) => {
    this.setState({
      dateValue: value
    })
  }

  render() {
    const { dateValue } = this.state
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          {/* 1. 基础示例 */}
          <Text style={styles.textStyle}>基础示例</Text> 
          <Datepicker />     
          
          {/* 2. 设置开始年份*/}
          <Text style={styles.textStyle}>设置开始年份</Text>
          <Datepicker
            startYear={2023}
          />

          {/* 3. 设置年数*/}
          <Text style={styles.textStyle}>设置年数</Text>
          <Datepicker
            numberOfYears={10}
          />

          {/* 4. 设置开始日期*/}
          <Text style={styles.textStyle}>设置开始日期</Text>
          <Datepicker
            date={'2021-05-04'}
          />

          {/* 5. 间隔布局*/}
          <Text style={styles.textStyle}>设置年月日布局间隔</Text>
          <Datepicker
            proportion={[2,4,6]}
          />

           {/* 6. 修改日期*/}
          <Text style={styles.textStyle}>修改日期</Text>
          <Datepicker
            date={dateValue}
            onChange={this.changeDate}
          />    
          <Text style={styles.textStyle}>选择的日期值：{ dateValue }</Text>
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
  container: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 30,
    color: variables.mtdGrayDark
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 30,
    color: variables.mtdGrayDark
  },
});