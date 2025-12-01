import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Badge, Button } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        padding: 16,
    },
    panel: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 16,
    },
})

export default class BadgeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [1, 0, 5, 9, 'A', 99, '减', '领券', '双旦大促'],
            showBasic: false,
            showMini: false,
            showCustom: false,
            showCombined: false,
        }
    }

    toggle = (key) => {
        this.setState((prevState) => ({
            [key]: !prevState[key],
        }))
    }

    render() {
        const { list, showBasic, showMini, showCustom, showCombined } = this.state
        return (
            <ScrollView style={styles.body}>
                <View style={styles.container}>
                    {/* 基础 */}
                    <Button
                        size="sm"
                        type="primary"
                        textColorInverse
                        onPress={() => this.toggle('showBasic')}
                    >
                        基础
                    </Button>
                    {showBasic && (
                        <View style={[styles.panel, { flexDirection: 'row' }]}>
                            {list.map((item, index) => (
                                <Badge style={{ marginRight: 3 }} key={index} label={item} />
                            ))}
                        </View>
                    )}

                    {/* Mini */}
                    <Button
                        size="sm"
                        type="primary"
                        textColorInverse
                        style={{ marginTop: 12 }}
                        onPress={() => this.toggle('showMini')}
                    >
                        Mini
                    </Button>
                    {showMini && (
                        <View style={[styles.panel, { flexDirection: 'row' }]}>
                            {list.map((item, index) => (
                                <Badge style={{ marginRight: 3 }} key={index} />
                            ))}
                        </View>
                    )}

                    {/* 自定义样式 */}
                    <Button
                        size="sm"
                        type="primary"
                        textColorInverse
                        style={{ marginTop: 12 }}
                        onPress={() => this.toggle('showCustom')}
                    >
                        自定义样式
                    </Button>
                    {showCustom && (
                        <View style={[styles.panel, { flexDirection: 'row', alignItems: 'center' }]}>
                            {list.slice(0, 5).map((item, index) => (
                                <Badge
                                    key={index}
                                    style={{
                                        marginRight: 3,
                                        backgroundColor: 'transparent',
                                        borderColor: variables.mtdBrandPrimaryDark,
                                    }}
                                    label={item}
                                    labelStyle={{ color: variables.mtdBrandPrimaryDark }}
                                />
                            ))}

                            {list.slice(5, 9).map((item, index) => (
                                <Badge
                                    key={index}
                                    style={{
                                        marginRight: 3,
                                        backgroundColor: variables.mtdBrandInfo,
                                        borderColor: variables.mtdBrandInfo,
                                    }}
                                    label={item}
                                />
                            ))}
                            <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandSuccess }} />
                            <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandWarning }} />
                            <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandPrimary }} />
                        </View>
                    )}

                    {/* 组合使用 */}
                    <Button
                        size="sm"
                        type="primary"
                        textColorInverse
                        style={{ marginTop: 12 }}
                        onPress={() => this.toggle('showCombined')}
                    >
                        组合使用
                    </Button>
                    {showCombined && (
                        <View style={[styles.panel, { flexDirection: 'row', alignItems: 'center' }]}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 10,
                                    backgroundColor: variables.mtdGrayLight,
                                    borderRadius: 4,
                                }}
                            >
                                <Badge style={{ position: 'absolute', top: 0, right: 0 }} />
                            </View>

                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: variables.mtdGrayLight,
                                    borderRadius: 4,
                                }}
                            >
                                <Badge style={{ position: 'absolute', top: -5, right: -5 }} label="99+" />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        )
    }
}