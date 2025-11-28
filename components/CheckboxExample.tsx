import React, { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { Checkbox, Icon } from "beeshell-ls";

import star from 'beeshell-ls/common/images/icons/star.png'
import star_o from 'beeshell-ls/common/images/icons/star-half-o.png'
import variables from 'beeshell-ls/common/styles/variables'

const box_items = [
    {
        value: 1,
        label: 'a'
    },
    {
        value: 2,
        label: 'b'
    },
    {
        value: 3,
        label: 'c'
    }
]

export default function CheckboxExample() {
    const [value_1, setStateValue_1] = useState([])
    const [value_2, setStateValue_2] = useState([])
    const [value_3, setStateValue_3] = useState([])
    const [value_4, setStateValue_4] = useState([])
    const [value_5, setStateValue_5] = useState([])
    const [value_6, setStateValue_6] = useState([])
    const [value_7, setStateValue_7] = useState([])
    return (
        <ScrollView>
            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>基础</Text>
                <Checkbox 
                    value={value_1}
                    onChange={(value: []) => {
                        setStateValue_1(value)
                    }}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>选中状态改变回调</Text>
                <Checkbox 
                    value={value_7}
                    onChange={(value: []) => {
                        setStateValue_7(value)
                        Alert.alert('选中值', `当前选中值：${value}`)
                    }}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>图标位置右</Text>
                <Checkbox 
                    value={value_2}
                    onChange={(value: []) => {
                        setStateValue_2(value)
                    }}
                    iconPosition="right"
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>可全选</Text>
                <Checkbox 
                    value={value_3}
                    onChange={(value: []) => {
                        setStateValue_3(value)
                    }}
                    showAllCheck={true}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义选中图标</Text>
                <Checkbox 
                    value={value_4}
                    onChange={(value: []) => {
                        setStateValue_4(value)
                    }}
                    checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义未选中图标</Text>
                <Checkbox 
                    value={value_5}
                    onChange={(value: []) => {
                        setStateValue_5(value)
                    }}
                    uncheckedIcon={<Icon type='star' source={star_o}  size={20} tintColor={variables.mtdGrayLightest} />}
                    style={{padding: 20}}>
                    {
                        box_items.map(item => 
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 12}}>自定义子选项</Text>
                <Checkbox 
                    value={value_6}
                    onChange={(value: []) => {
                        setStateValue_6(value)
                        Alert.alert('选中值', `选中状态：${value}`)
                    }}
                    style={{padding: 20}}>
                    <Checkbox.Item value={1} label={'自定义选项label'} />
                    <Checkbox.Item value={2} label={'自定义选项disabled'} disabled={true} />
                    <Checkbox.Item value={7} label={'自定义选项renderItem'} renderItem={(checked) => (
                        <View>
                            <Text>选中状态：</Text>
                            <Text>{checked ? 'true' : 'false'}</Text>
                        </View>
                    ) } />
                </Checkbox>
            </View>
        </ScrollView>
    )
}