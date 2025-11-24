// import React, { Component } from 'react'
// import { ScrollView, View, Text, StyleSheet } from 'react-native'

// import { Switch, Form } from 'beeshell-ls'
// import variables from 'beeshell-ls/common/styles/variables'


// export default class SwitchScreen extends Component<{}, any> {
//   constructor (p) {
//     super(p)
//     this.state = {
//       valueA: true
//     }
//   }

//   componentDidMount () {
//     // setTimeout(() => {
//     //   this.setState({
//     //     valueA: false
//     //   })
//     // }, 2000)
//   }

//   onChange = (val) => {
//     console.log(val)
//   }

//   render () {
//     return (
//       <ScrollView
//         style={styles.body}>
//         <Form>
//           <Form.Item label='基础' hasLine>
//             <View style={{ alignItems: 'flex-end' }}>
//               <Switch value={this.state.valueA} onChange={(value) => { this.setState({ valueA: value }) }}/>
//             </View>
//           </Form.Item>

//           <Form.Item label='禁用' hasLine>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//               <Switch style={{ marginRight: 3 }} value disabled activeColor={variables.mtdGrayLight} />
//               <Switch value={false} disabled />
//             </View>
//           </Form.Item>

//           <Form.Item label='自定义'>
//             <View style={{ alignItems: 'flex-end' }}>
//               <Switch onChange={this.onChange} rockerSize='sm' />
//             </View>
//           </Form.Item>
//         </Form>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: variables.mtdFillBody,
//     flex: 1,
//   },
//   container: {
//     paddingHorizontal: variables.mtdHSpacingXL,
//   },
//   row: {
//     marginHorizontal: -variables.mtdHSpacingXL
//   },
//   header: {
//     paddingHorizontal: variables.mtdHSpacingXL,
//     paddingVertical: variables.mtdVSpacingL,
//     backgroundColor: variables.mtdFillBody,
//     fontWeight: 'bold',
//     color: variables.mtdGrayDark
//   },
//   panel: {
//     paddingHorizontal: variables.mtdHSpacingXL,
//     paddingVertical: variables.mtdVSpacingL,
//     backgroundColor: '#fff',
//   },

//   footer: {

//   }
// })

import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Switch, Picker, Form } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

const rockerSizes = ['lg', 'sm'] as const;
const activeColors = ['#ff0000', '#00ff00', '#0000ff'];

const LabelSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onChange={onValueChange} />
  </View>
);

export default class SwitchTestScreen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      disabled: false,
      rockerSize: 'lg',
      activeColor: variables.mtdBrandPrimaryDark,

       valueA: true
    };
  }

  render() {
    const { value, disabled, rockerSize, activeColor } = this.state;

    return (
      <ScrollView style={styles.body} contentContainerStyle={{ padding: 16 }}>

        {/* 预览区 */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ marginBottom: 10 }}>预览：</Text>

          <Switch
            value={value}
            disabled={disabled}
            rockerSize={rockerSize}
            activeColor={activeColor}
            onChange={(v) => {
              this.setState({ value: v })
              Alert.alert('onChange回调', `value: ${v}`)
          }}
          />
        </View>

        {/* value */}
        <LabelSwitch
          label="value"
          value={value}
          onValueChange={(v) => this.setState({ value: v })}
        />

        {/* disabled */}
        <LabelSwitch
          label="disabled"
          value={disabled}
          onValueChange={(v) => this.setState({ disabled: v })}
        />

        {/* rockerSize 下拉框 */}
        <View style={styles.row}>
          <Text style={styles.label}>rockerSize</Text>
          <Picker label={rockerSize} style={{ width: 120 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {rockerSizes.map(size => (
                <Button
                  key={size}
                  title={size}
                  onPress={() => this.setState({ rockerSize: size })}
                />
              ))}
            </View>
          </Picker>
        </View>

        {/* activeColor 下拉框 */}
         <View style={styles.row}>
          <Text style={styles.label}>activeColor</Text>
          <Picker label={activeColor} style={{ width: 120 }}>
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
              {activeColors.map(color => (
                <Button
                  key={color}
                  title={color}
                  onPress={() => this.setState({ activeColor: color })}
                />
              ))}
            </View>
          </Picker>
        </View>


         <Form>
           <Form.Item label='基础' hasLine>
             <View style={{ alignItems: 'flex-end' }}>
               <Switch value={this.state.valueA} onChange={(value) => { this.setState({ valueA: value }) }}/>
             </View>
           </Form.Item>

           <Form.Item label='禁用' hasLine>
             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
               <Switch style={{ marginRight: 3 }} value disabled activeColor={variables.mtdGrayLight} />
               <Switch value={false} disabled />
             </View>
           </Form.Item>

           <Form.Item label='自定义'>
             <View style={{ alignItems: 'flex-end' }}>
               <Switch onChange={this.onChange} rockerSize='sm' />
             </View>
           </Form.Item>
         </Form>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: variables.mtdFillBody
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  label: {
    fontSize: 14
  },
  input: {
    width: 150,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8
  }
});
