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
                <Text style={{ fontSize: 16, marginBottom: 4 }}>基础</Text>
                <Progress percent={percentVal} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>样式添加</Text>
                <Progress style={{ height: 16, borderRadius: 8 }} barStyle={{ height: 16, borderRadius: 8 }} percent={percentVal} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>动画持续2000ms</Text>
                <Progress style={{ height: 16, borderRadius: 8 }} barStyle={{ height: 16, borderRadius: 8 }} percent={percentVal} duration={2000} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>没有动画</Text>
                <Progress style={{ height: 16, borderRadius: 8 }} barStyle={{ height: 16, borderRadius: 8 }} percent={percentVal} easing={false} />
            </View>

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>设置进度条颜色</Text>
                <Progress style={{ height: 16, borderRadius: 8 }} barStyle={{ height: 16, borderRadius: 8, backgroundColor: '#0000CD' }} percent={percentVal} duration={2000} />
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
