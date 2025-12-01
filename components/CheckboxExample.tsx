import React, { useRef, useState } from "react";
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
    const [callbackLogs, setCallbackLogs] = useState<any[]>([])
    const scrollViewRef = useRef(null)
    return (
        <ScrollView>
            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>基础</Text>
                <Checkbox
                    value={value_1}
                    onChange={(value: []) => {
                        setStateValue_1(value)
                    }}
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>选中状态改变回调</Text>
                <Text style={{ fontSize: 14, marginBottom: 4 }}>回调日志</Text>
                <ScrollView ref={scrollViewRef} style={{ height: 100, padding: 12, backgroundColor: '#FFFFE0' }}>
                    {
                        callbackLogs.map(item => (
                            <View style={{paddingBottom: 4}} key={Math.random()}>
                                <Text>{item.time}</Text>
                                <Text>{item.opt}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <Checkbox
                    value={value_7}
                    onChange={(value: []) => {
                        // 获取当前时间的 Date 对象
                        const currentDate = new Date();

                        // 获取时间戳（毫秒）
                        const timestamp = currentDate.getTime();

                        // 获取各个时间组成部分
                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1; // 月份从0开始，需要+1
                        const day = currentDate.getDate();
                        const hours = currentDate.getHours();
                        const minutes = currentDate.getMinutes();
                        const seconds = currentDate.getSeconds();

                        setStateValue_7(value)
                        setCallbackLogs(callbackLogs.concat([
                            {
                                time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds} onChange`,
                                opt: `当前选中值：${value}`
                            }
                        ]))
                        setTimeout(() => {
                            scrollViewRef.current.scrollToEnd()
                        })
                    }}
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>图标位置右</Text>
                <Checkbox
                    value={value_2}
                    onChange={(value: []) => {
                        setStateValue_2(value)
                    }}
                    iconPosition="right"
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>可全选</Text>
                <Checkbox
                    value={value_3}
                    onChange={(value: []) => {
                        setStateValue_3(value)
                    }}
                    showAllCheck={true}
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>自定义选中图标</Text>
                <Checkbox
                    value={value_4}
                    onChange={(value: []) => {
                        setStateValue_4(value)
                    }}
                    checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>自定义未选中图标</Text>
                <Checkbox
                    value={value_5}
                    onChange={(value: []) => {
                        setStateValue_5(value)
                    }}
                    uncheckedIcon={<Icon type='star' source={star_o} size={20} tintColor={variables.mtdGrayLightest} />}
                    style={{ padding: 12 }}>
                    {
                        box_items.map(item =>
                            <Checkbox.Item key={item.value} value={item.value} label={item.label} />
                        )
                    }
                </Checkbox>
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>自定义子选项</Text>
                <Checkbox
                    value={value_6}
                    onChange={(value: []) => {
                        setStateValue_6(value)
                    }}
                    style={{ padding: 12 }}>
                    <Checkbox.Item value={1} label={'自定义选项label'} />
                    <Checkbox.Item value={2} label={'自定义选项disabled'} disabled={true} />
                    <Checkbox.Item value={7} label={'自定义选项renderItem'} renderItem={(checked) => (
                        <View>
                            <Text>选中状态：</Text>
                            <Text>{checked ? 'true' : 'false'}</Text>
                        </View>
                    )} />
                </Checkbox>
            </View>
        </ScrollView>
    )
}