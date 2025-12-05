import React, { useRef, useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { Checkbox, Icon } from "beeshell-ls";

import star from 'beeshell-ls/common/images/icons/star.png'
import star_o from 'beeshell-ls/common/images/icons/star-half-o.png'
import variables from 'beeshell-ls/common/styles/variables'

const getDate = () => {
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

    return { year, month, day, hours, minutes, seconds }
}

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
    const [value_8, setStateValue_8] = useState([])
    const [value_9, setStateValue_9] = useState([])
    const [value_10, setStateValue_10] = useState([])
    const [value_11, setStateValue_11] = useState([])
    const [value_12, setStateValue_12] = useState([])
    const [value_13, setStateValue_13] = useState([])
    const [value_14, setStateValue_14] = useState([])
    const [value_15, setStateValue_15] = useState([])
    const [value_16, setStateValue_16] = useState([])
    const [value_17, setStateValue_17] = useState([])
    const [value_18, setStateValue_18] = useState([])
    const [value_19, setStateValue_19] = useState([])
    const [value_20, setStateValue_20] = useState([])
    const [value_21, setStateValue_21] = useState([])
    const [value_22, setStateValue_22] = useState([])
    const [value_23, setStateValue_23] = useState([])
    const [callbackLogs, setCallbackLogs] = useState<any[]>([])
    const scrollViewRef = useRef(null)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 200, padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082', marginTop: 10 }}>
                <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
                    回调日志 (最新在顶部，可滚动查看)
                </Text>
                <View style={{ flex: 1, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082' }}>
                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 8 }}>
                        {callbackLogs.length > 0 ? (
                            callbackLogs.map(log => (
                                <View key={Math.random()} style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
                                        {log.time}
                                    </Text>
                                    {log.opt ? (
                                        <Text style={{ fontSize: 12, color: '#795548', lineHeight: 18 }}>
                                            {log.opt}
                                        </Text>
                                    ) : null}
                                </View>
                            ))
                        ) : (
                            <Text style={{ fontSize: 12, color: '#ffb74d', lineHeight: 18 }}>
                                暂无日志，点击测试用例体验回调事件
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </View>

            <View style={{ flex: 1, marginHorizontal: 10, borderRadius: 5, marginTop: 10 }}>
                <ScrollView>
                    <View style={{ borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>1. Checkbox的value和onChange属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【value和onChange不赋值】【状态为无法选中】</Text>
                            <Checkbox>
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【value和onChange赋值】【状态为可选中】</Text>
                            <Checkbox
                                value={value_1}
                                onChange={(value: []) => {
                                    setStateValue_1(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【value赋值onChange不赋值】【状态为无法选中】</Text>
                            <Checkbox value={value_2}>
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【value不赋值onChange赋值】【状态为无法选中】</Text>
                            <Checkbox onChange={(value: []) => { setStateValue_3(value) }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>2. Checkbox的style属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【style不赋值】【背景颜色默认】</Text>
                            <Checkbox
                                value={value_8}
                                onChange={(value: []) => {
                                    setStateValue_8(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【style赋值背景颜色】【背景颜色发生变化】</Text>
                            <Checkbox
                                style={{ backgroundColor: '#fffdf3' }}
                                value={value_9}
                                onChange={(value: []) => {
                                    setStateValue_9(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>
                        </View>
                    </View>


                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>3. Checkbox的iconPosition属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【iconPosition赋值'left'】【图标位于左侧】</Text>
                            <Checkbox
                                iconPosition={"left"}
                                value={value_6}
                                onChange={(value: []) => {
                                    setStateValue_6(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【iconPosition赋值'right'】【图标位于右侧】</Text>
                            <Checkbox
                                iconPosition={"right"}
                                value={value_7}
                                onChange={(value: []) => {
                                    setStateValue_7(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>4. Checkbox的showAllCheck属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【showAllCheck赋值true】【显示全选】</Text>
                            <Checkbox
                                showAllCheck={true}
                                value={value_4}
                                onChange={(value: []) => {
                                    setStateValue_4(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                                <Checkbox.Item value={2} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【showAllCheck赋值false】【不显示全选】</Text>
                            <Checkbox
                                showAllCheck={false}
                                value={value_5}
                                onChange={(value: []) => {
                                    setStateValue_5(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                                <Checkbox.Item value={2} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>5. Checkbox的checkedIcon属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【checkedIcon不赋值】【选中状态图标默认】</Text>
                            <Checkbox
                                value={value_10}
                                onChange={(value: []) => {
                                    setStateValue_10(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【checkedIcon赋值】【选中图标变为定义的图标】</Text>
                            <Checkbox
                                checkedIcon={<Icon type='star' source={star} size={20} tintColor={variables.mtdBrandPrimaryDark} />}
                                value={value_11}
                                onChange={(value: []) => {
                                    setStateValue_11(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>6. Checkbox的uncheckedIcon属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【uncheckedIcon不赋值】【未选中状态图标默认】</Text>
                            <Checkbox
                                value={value_12}
                                onChange={(value: []) => {
                                    setStateValue_12(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【uncheckedIcon赋值】【未选中图标变为定义的图标】</Text>
                            <Checkbox
                                uncheckedIcon={<Icon type='star' source={star_o} size={20} tintColor={variables.mtdGrayLightest} />}
                                value={value_13}
                                onChange={(value: []) => {
                                    setStateValue_13(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item value={1} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>7. Checkbox的children属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项为ReactChild】【正常渲染】</Text>
                            <Checkbox
                                value={value_14}
                                onChange={(value: []) => {
                                    setStateValue_14(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项为ReactChild[]】【正常渲染】</Text>
                            <Checkbox
                                value={value_15}
                                onChange={(value: []) => {
                                    setStateValue_15(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                {
                                    [
                                        <Checkbox.Item key={1} value={1} />,
                                        <Checkbox.Item key={2} value={2} />,
                                        <Checkbox.Item key={3} value={3} />
                                    ]
                                }
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>8. Checkbox.Item的label属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项不赋值label】【显示默认选项文本】</Text>
                            <Checkbox
                                value={value_18}
                                onChange={(value: []) => {
                                    setStateValue_18(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} />
                            </Checkbox>

                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项赋值label】【显示赋值的选项文本】</Text>
                            <Checkbox
                                value={value_19}
                                onChange={(value: []) => {
                                    setStateValue_19(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}>
                                <Checkbox.Item label={'赋值的选项文本'} value={1} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>9. Checkbox.Item的style属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项style赋值情况验证】</Text>
                            <Checkbox
                                value={value_16}
                                onChange={(value: []) => {
                                    setStateValue_16(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} label="style不赋值" />
                                <Checkbox.Item style={{ backgroundColor: '#fffdf3' }} label="style赋值赋值背景色" value={2} />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>10. Checkbox.Item的value属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项value多种赋值多种情况】</Text>
                            <Checkbox
                                value={value_20}
                                onChange={(value: []) => {
                                    setStateValue_20(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item label="value不赋值"/>
                                <Checkbox.Item value={1} label="value赋值1"/>
                                <Checkbox.Item value={null} label="value赋值null"/>
                                <Checkbox.Item value={undefined} label="value赋值undefined"/>
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>11. Checkbox.Item的disabled属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项赋值disabled为true和false两种情况验证】</Text>
                            <Checkbox
                                value={value_22}
                                onChange={(value: []) => {
                                    setStateValue_22(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} disabled={true} label="disabled={true}" />
                                <Checkbox.Item value={2} disabled={false} label="disabled={false}" />
                            </Checkbox>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, borderRadius: 4, borderWidth: 1, padding: 8, borderColor: '#c5c0c0ff' }}>
                        <Text style={{ fontSize: 12, lineHeight: 18 }}>12. Checkbox.Item的renderItem属性校验</Text>
                        <View style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 18 }}>【子选项使用renderItem和不使用两种情况验证】</Text>
                            <Checkbox
                                value={value_23}
                                onChange={(value: []) => {
                                    setStateValue_23(value)

                                    const { hours, minutes, seconds } = getDate()

                                    callbackLogs.unshift({
                                        time: `[${hours}:${minutes}:${seconds}] onChange`,
                                        opt: `当前选中值：${value}`
                                    })
                                    setCallbackLogs(callbackLogs)
                                }}
                            >
                                <Checkbox.Item value={1} label="不使用renderItem，默认显示" />
                                <Checkbox.Item value={2} renderItem={(checked) => (
                                    <View>
                                        <Text>使用renderItem，选中状态：</Text>
                                        <Text>{checked ? 'true' : 'false'}</Text>
                                    </View>
                                )} />
                            </Checkbox>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}