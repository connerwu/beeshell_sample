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
        };
    }

    handleChange = (date: string) => {
        this.setState({ date });
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
        const { date, useRenderItem, startDate, endDate, showEnglishCalendar } = this.state;

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