import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

interface State {
  count: number
}

export default class IconScreen extends Component<{}, State> {
  constructor(p: any) {
    super(p)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: variables.mtdHSpacingXL }}>

        <View style={componentStyles.row}>
          <View style={componentStyles.content}>
            <Icon size={20} type='angle-down' />
            <Text style={componentStyles.title}>默认样式</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon
              size={20}
              type='angle-up'
              tintColor={variables.mtdBrandPrimary}
              style={componentStyles.iconWithStyle}
            />
            <Text style={componentStyles.title}>自定义样式</Text>
          </View>
        </View>

        <View style={componentStyles.row}>
          <View style={componentStyles.content}>
            <Icon size={20} type='angle-left' />
            <Text style={componentStyles.title}>size = 20</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={30} type='angle-right' />
            <Text style={componentStyles.title}>size = 30 </Text>
          </View>
        </View>

        <View style={componentStyles.row}>
          <View style={componentStyles.content}>
            <Icon size={20} type='check' />
            <Text style={componentStyles.title}>默认 tintColor</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='times' tintColor='#9c27b0' />
            <Text style={componentStyles.title}>自定义 tintColor</Text>
          </View>
        </View>

        <View style={componentStyles.row}>
          <View style={componentStyles.content}>
            <Icon size={20} type='star' />
            <Text style={componentStyles.title}>图标类型type</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon
              size={40}
              source={{
                uri: 'http://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png'
              }}
              tintColor={variables.mtdBrandPrimary}
              style={componentStyles.customImageStyle}
            />
            <Text style={componentStyles.title}>自定义图片</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const componentStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  content: {
    alignItems: 'center',
    width: 120,
    padding: 12,
    marginHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdGrayLighter,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: 5,
    fontSize: 10,
    color: '#666'
  },
  iconWithStyle: {
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: variables.mtdBrandPrimary,
    shadowColor: variables.mtdBrandPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customImageStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: variables.mtdBrandPrimaryLight,
    resizeMode: 'cover'
  }
})