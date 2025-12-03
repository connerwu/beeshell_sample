import { useState } from "react";

// beeshell-ls components
import { Progress, Button } from 'beeshell-ls'

// react-native
import { View, Text, ScrollView } from "react-native";

export default function ProgressExample() {
    const [percentVal, setPercentVal] = useState(70)
    
    return (
        <ScrollView>
            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>基础 [percent值： {percentVal}]</Text>
                <Progress percent={percentVal} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>style和barStyle样式 [percent值： {percentVal}]</Text>
                <Progress style={{ height: 16, borderRadius: 8, backgroundColor: '#21a5c3ff' }} barStyle={{ height: 16, borderRadius: 8, backgroundColor: '#0000CD' }} percent={percentVal} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>有动画，动画持续2000ms [percent值： {percentVal}]</Text>
                <Progress percent={percentVal} duration={2000} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>没有动画 [percent值： {percentVal}]</Text>
                <Progress percent={percentVal} easing={false} />
            </View>

            <View style={{ padding: 12 }}>
                <Button
                    onPress={() => {
                        setPercentVal(Math.floor((Math.random()*100)+1))
                    }}
                    >随机设置值</Button>
            </View>
        </ScrollView>
    )
}
