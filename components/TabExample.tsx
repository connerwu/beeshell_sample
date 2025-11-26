
import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native'
import { Tab, Button, Picker, Switch } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables';

const scrollToList = [ 5, 6, 1, 0, 1, 2, 3, 4 ]

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

export default class TabScreen extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      // props 调试项
      activeColor: '#007AFF',
      scrollable: false,
      customRender: false,

      // 可编辑样式
      style: {},
      dataContainerStyle: {},
      dataItemContainerStyle: {},
      dataItemStyle: {},

      // 动态数据
      data: [
        { value: 1, label: '标签1' },
        { value: 2, label: '标签2' },
        { value: 3, label: '标签3' }
      ],

      valueA: 1,
      valueC: 6,
      valueX: 1,
      scrollTimes: 0
    }
  }

  updateStyle = (key, text) => {
    try {
      const json = JSON.parse(text)
      this.setState({ [key]: json })
    } catch (e) {
      // 输入非法 JSON 不更新
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this._tab._scroller.scrollTo({ x: -80, y: 0, animated: true })
    // }, 3000)
  }

  handleChange = (key, value: number) => {
    this.setState({
      [key]: value
    } as any)
  }

  render() {
    const {
      activeColor,
      scrollable,
      customRender,
      style,
      dataContainerStyle,
      dataItemContainerStyle,
      dataItemStyle,
      data,
      value
    } = this.state

    return (
      <ScrollView style={styles.body}>

        {/* ---------- 基础示例 ---------- */}
        <Text style={styles.header}>Tabs 调试控制台</Text>

        <Tab
          ref={c => (this.tabUI = c)}
          style={style}
          dataContainerStyle={dataContainerStyle}
          dataItemContainerStyle={dataItemContainerStyle}
          dataItemStyle={dataItemStyle}
          activeColor={activeColor}
          value={value}
          scrollable={scrollable}
          
          data={data}
          renderItem={
            customRender
              ? (item, index, selected) => (
                  <View style={{ padding: 8 }}>
                    <View style={{
                      padding: 6,
                      borderRadius: 4,
                      backgroundColor: selected ? activeColor : '#eee'
                    }}>
                      <Text style={{ color: selected ? '#fff' : '#444' }}>
                        {item.label}
                      </Text>
                    </View>
                  </View>
                )
              : undefined
          }

          onChange={(item) => {
            this.setState({ value: item.value })
            Alert.alert('onChange回调', `value: ${item.value}`)
          }
           
        }
        />

        {/* ---------- 开关 ---------- */}
          <LabelSwitch
            label="scrollable"
            value={this.state.scrollable}
            onValueChange={v => this.setState({ scrollable: v })}
          />  
          <LabelSwitch
            label="自定义 renderItem"
            value={customRender}
            onValueChange={v => this.setState({ customRender: v })}
          />
      

        {/* ---------- activeColor ---------- */}

        <LabelPicker
          lable="activeColor"
          maps={['#ff0000', '#00ff00', '#0000ff', '#007AFF']}
          pickerTitle={activeColor}
          onValueChange={(text) => this.setState({ activeColor: text })}
        ></LabelPicker>

        {/* ---------- JSON Style 输入 ---------- */}
        <View style={styles.panel}>
          <LabelPicker
            lable="style"
            maps={['{"margin":10}', '{"marginHorizontal":20}', '{"marginVertical":15}']}
            pickerTitle={JSON.stringify(style)}
            onValueChange={(text) => this.updateStyle("style", text)}
          > </LabelPicker>

          <LabelPicker
            lable="dataContainerStyle"
            maps={['{"justifyContent":"center"}', '{"justifyContent":"flex-end"}', '{"flexWrap":"wrap"}']}
            pickerTitle={JSON.stringify(dataContainerStyle)}
            onValueChange={(text) => this.updateStyle("dataContainerStyle", text)}
          > </LabelPicker>

      
          <LabelPicker
            lable="dataItemContainerStyle"
            maps={['{"flex":null}', '{"paddingVertical":10}', '{"paddingHorizontal":15}']}
            pickerTitle={JSON.stringify(dataItemContainerStyle)}
            onValueChange={(text) => this.updateStyle("dataItemContainerStyle", text)}
          > </LabelPicker>

          <LabelPicker
          lable="dataItemStyle"
          maps={['{"padding":6}', '{"borderRadius":4}', '{"backgroundColor":"#eee"}']}  
          pickerTitle={JSON.stringify(dataItemStyle)}
          onValueChange={(text) => this.updateStyle("dataItemStyle", text)}
          > </LabelPicker>

        </View>

        {/* ---------- 动态数据编辑 ---------- */}
        <View style={styles.panel}>
          <Text style={styles.label}>动态操作 data</Text>

          <Button
            style={{ marginVertical: 10 }}
            type='primary'
            onPress={() => {
              const next = data.length + 1
              this.setState({
                data: [...data, { value: next, label: `标签${next}` }]
              })
            }}
          >
            添加一项
          </Button>

          <Button
            style={{ marginVertical: 10 }}
            type='danger'
            onPress={() => {
              this.setState({ data: data.slice(0, -1) })
            }}
          >
            删除最后一项
          </Button>

          <Button
            style={{ marginVertical: 10 }}
            type='danger'
            onPress={() => {
              this.tabUI.scrollTo(data.length - 1) 
            }}
          >
            scrollTo()
          </Button>
        </View>

        <Text style={styles.header}>基础</Text>
         <Tab
           value={this.state.value}
           data={[{
             value: 1,
             label: '全部'
           },
           {
             value: 2,
             label: '我关注的'
           },
           {
             value: 3,
             label: '我的粉丝'
           }]}
           onChange={ item => this.handleChange('value', item.value) }
        />

        <Text style={styles.header}>左对齐</Text>
        <Tab
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueA}
          data={[
            {
              value: 1,
              label: '我关注的'
            },
            {
              value: 2,
              label: '我的粉丝'
            }
          ]}
          onChange={ item => this.handleChange('valueA', item.value) }
        />

        <Text style={styles.header}>右对齐</Text>
        <Tab
          dataContainerStyle={{ justifyContent: 'flex-end' }}
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueV || 1}
          data={[
            {
              value: 1,
              label: '我关注的'
            },
            {
              value: 2,
              label: '我的粉丝'
            }
          ]}
          onChange={ item => this.handleChange('valueV', item.value) }
        />

        <Text style={styles.header}>横向换行</Text>
        <Tab
          dataContainerStyle={{ flexWrap: 'wrap' }}
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueU || 1}
          data={[
            {
              value: 1,
              label: '我关注的'
            },
            {
              value: 2,
              label: '我的粉丝'
            },
            {
              value: 3,
              label: '我喜欢的'
            },
            {
              value: 4,
              label: '我重视的'
            },
            {
              value: 5,
              label: '我不感兴趣的'
            }
          ]}
          onChange={ item => this.handleChange('valueU', item.value) }
        />

        <Text style={styles.header}>横向可滚动</Text>
        <Tab
          style={{ marginLeft: 0, marginRight: 0 }}
          ref={(c) => {
            this._tab = c
          }}
          value={this.state.valueC}
          scrollable={true}
          data={[
            {
              value: 1,
              label: '选项一'
            }, {
              value: 2,
              label: '选项二'
            }, {
              value: 3,
              label: '选项三'
            }, {
              value: 4,
              label: '选项四'
            }, {
              value: 5,
              label: '选项五'
            }, {
              value: 6,
              label: '选项六'
            }, {
              value: 7,
              label: '选项七'
            }
          ]}
          onChange={ item => this.handleChange('valueC', item.value) }
        />

        <Button
          style={{ margin: 20 }}
          type='primary'
          size='sm'
          textColorInverse
          onPress={() => {
            this._tab && this._tab.scrollTo(scrollToList[this.state.scrollTimes % scrollToList.length])
            this.setState({
              valueC: scrollToList[this.state.scrollTimes % scrollToList.length] + 1,
              scrollTimes: this.state.scrollTimes + 1
            })
          }}>
          点击滚动到第 {scrollToList[this.state.scrollTimes % scrollToList.length] + 1} 项
        </Button>
        <Text style={styles.header}>自定义选项</Text>
        <Tab
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueX}
          data={[
            {
              value: 1,
              label: '选项1'
            },
            {
              value: 2,
              label: '选项2'
            },
            {
              value: 3,
              label: '选项3'
            }
          ]}
          renderItem={(item, index, selected) => {
            return (
              <View style={{ paddingVertical: variables.mtdVSpacingXL, paddingHorizontal: variables.mtdHSpacingXL }}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 2,
                    backgroundColor: selected ? variables.mtdGrayBase : variables.mtdFillBody,
                    justifyContent: 'center'
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: selected ? '#fff' : variables.mtdGrayBase,
                    }}>
                    {item.label}
                  </Text>
                </View>
              </View>
            )
          }}
          onChange={ item => this.handleChange('valueX', item.value) }
        />     


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: variables.mtdFillBody,
    flex: 1,
  },
  header: {
    padding: 16,
    fontSize: 18,
    backgroundColor: '#f8f8f8',
    fontWeight: 'bold',
    color: '#333'
  },
  panel: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: '#666'
  },
  input: {
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
})
