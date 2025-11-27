import React, { Component, ReactNode } from "react";

// beeshell-ls components
import { Progress, Button } from 'beeshell-ls'

// react-native
import { View, Text, StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({

})

export default class ProgressExample extends Component<{}, any> {

    constructor(props: {}) {
        super(props)

        this.state = {
            value_1: 90,

            value_2: 90,
            duration_2: 2000,

            value_3: 90,
            easing_3: false
        }
    }

    render(): ReactNode {
        return (
            <ScrollView>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>默认</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_1} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>动画持续2000ms</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_2} duration={this.state.duration_2} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 24 }}>没有动画</Text>
                    <Progress style={{ height: 20 }} barStyle={{ height: 20 }} percent={this.state.value_3} easing={this.state.easing_3} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Button
                        onPress={() => {
                            this.setState({
                                value_1: Math.floor((Math.random()*100)+1),
                                value_2: Math.floor((Math.random()*100)+1),
                                value_3: Math.floor((Math.random()*100)+1)
                            })
                        }}
                        >随机设置值</Button>
                </View>
            </ScrollView>
        )
    }
}
