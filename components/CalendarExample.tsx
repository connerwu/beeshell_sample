import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Calendar } from 'beeshell-ls';
import variables from 'beeshell-ls/common/styles/variables';

// 定义日志条目类型
interface EventLogEntry {
    id: string;
    timestamp: string;
    event: string;
    detail: string;
}

export default class CalendarScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: '2018-05-20',
            locale: 'zh-cn',
            useRenderItem: false,
            startDate: '2018-01-01',
            endDate: '2018-12-31',
            showEnglishCalendar: false,
            eventLogs: [], // 新增日志状态
        };
    }

    // appendEventLog 方法
    appendEventLog = (eventName: string, detail: string = '') => {
        const now = new Date();
        const pad = (value: number) => value.toString().padStart(2, '0');
        const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const entry: EventLogEntry = {
            id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
            timestamp,
            event: eventName,
            detail,
        };
        this.setState((prevState: any) => {
            const nextLogs = [entry].concat(prevState.eventLogs).slice(0, 50);
            return { eventLogs: nextLogs };
        });
    };

    handleChange = (date: string) => {
        this.setState({ date });
        // 仅对此回调添加日志
        this.appendEventLog('日期选择', `选中日期: ${date}`);
    };

    toggleRenderItem = () => {
        this.setState((prev) => ({ useRenderItem: !prev.useRenderItem }));
    };

    toggleDateRange = () => {
        const { startDate } = this.state;
        if (startDate === '2018-01-01') {
            this.setState({ startDate: '2019-01-01', endDate: '2019-12-31' });
        } else {
            this.setState({ startDate: '2018-01-01', endDate: '2018-12-31' });
        }
    };

    toggleEnglishCalendar = () => {
        this.setState((prev) => ({
            showEnglishCalendar: !prev.showEnglishCalendar,
        }));
    };

    render() {
        const { date, useRenderItem, startDate, endDate, showEnglishCalendar, eventLogs } = this.state;

        const renderItem = useRenderItem
            ? (item: any, currentDate: string, desc: boolean) => {
                const day = item.dateModel.format('D');
                const isSelected = currentDate === date;
                if (isSelected) {
                    return (
                        <View style={styles.customItem}>
                            <Text style={styles.customItemText}>{day}</Text>
                        </View>
                    );
                }
                return (
                    <Text style={{ color: desc ? '#ccc' : '#333', fontSize: 14 }}>
                        {day}
                    </Text>
                );
            }
            : undefined;

        const calendarToRender = showEnglishCalendar ? (
            <Calendar
                key="en"
                style={{ padding: 12 }}
                locale="en"
                format="YYYY-MM-DD"
                date={date}
                startDate={startDate}
                endDate={endDate}
                onChange={this.handleChange}
                renderItem={renderItem}
            />
        ) : (
            <Calendar
                key="zh"
                style={{ padding: 12 }}
                locale="zh-cn"
                format="YYYY-MM-DD"
                date={date}
                startDate={startDate}
                endDate={endDate}
                onChange={this.handleChange}
                renderItem={renderItem}
            />
        );

        return (
            <ScrollView style={styles.body}>

                {/* ===== 回调事件日志显示区域 ===== */}
                <View style={{ padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
                        回调日志 (最新在顶部，可滚动查看)
                    </Text>
                    <View style={{ height: 180, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082' }}>
                        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 8 }}>
                            {eventLogs.length > 0 ? (
                                eventLogs.map(log => (
                                    <View key={log.id} style={{ marginBottom: 8 }}>
                                        <Text style={{ fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold' }}>
                                            [{log.timestamp}] {log.event}
                                        </Text>
                                        {log.detail ? (
                                            <Text style={{ fontSize: 12, color: '#795548', lineHeight: 18 }}>
                                                {log.detail}
                                            </Text>
                                        ) : null}
                                    </View>
                                ))
                            ) : (
                                <Text style={{ fontSize: 12, color: '#ffb74d', lineHeight: 18 }}>
                                    暂无日志，点击日历日期体验回调事件
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </View>

                {/* 主日历 */}
                <Text style={styles.header}>Calendar Preview</Text>
                <View style={styles.panel}>
                    {calendarToRender}
                </View>

                {/* 配置面板 */}
                <Text style={styles.header}>Props Configuration</Text>
                <View style={styles.panel}>
                    <View style={styles.row}>
                        <Text>locale</Text>
                        <Text>{showEnglishCalendar ? 'English (en)' : 'Chinese (zh-cn)'}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>format</Text>
                        <Text>YYYY-MM-DD</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>renderItem</Text>
                        <TouchableOpacity onPress={this.toggleRenderItem}>
                            <Text style={{ color: variables.mtdBrandPrimary }}>
                                {useRenderItem ? 'Enabled' : 'Disabled'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <Text>startDate / endDate</Text>
                        <TouchableOpacity style={styles.button} onPress={this.toggleDateRange}>
                            <Text style={styles.buttonText}>
                                {startDate} ~ {endDate}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <Text>Show English Calendar</Text>
                        <TouchableOpacity onPress={this.toggleEnglishCalendar}>
                            <Text style={{ color: variables.mtdBrandPrimary }}>
                                {showEnglishCalendar ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
                    Selected date: {date}
                </Text>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f5f5f9',
        padding: 16,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    panel: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    button: {
        backgroundColor: variables.mtdBrandPrimary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
    },
    customItem: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: variables.mtdBrandPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customItemText: {
        color: '#fff',
        fontSize: 14,
    },
});