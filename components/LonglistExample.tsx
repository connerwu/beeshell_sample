import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch
} from 'react-native'

import { Longlist, Picker, Icon } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

interface DataItem {
  id: number
}

const generateSimpleData = (total = 100) => {
  const list: DataItem[] = []
  for (let i = 1; i <= total; i++) {
    list.push({ id: i })
  }
  return { total, list }
}

const dataModal = generateSimpleData(100)

export default class LonglistScreen extends React.Component<any, any> {
  private fetchListTimes: number
  private _longlist: any
  private viewOffsetPicker: any // viewOffset选择器ref
  private viewPositionPicker: any // viewPosition选择器ref

  constructor(props) {
    super(props)
    this.fetchListTimes = 0
    this.state = {
      pageNo: 0,
      pagesize: 7,
      list: [],
      total: dataModal.total,
      eventLogs: [],
      inputScrollIndex: 0,
      isAnimated: true,
      viewOffset: 0, 
      viewPosition: 0.5, // 默认中间对齐
      isOffsetPickerOpen: false, // viewOffset选择器状态
      isPositionPickerOpen: false // viewPosition选择器状态
    }
  }

  // 添加事件日志的方法
  appendEventLog = (eventName: string, detail: string = '') => {
    const now = new Date()
    const pad = (value: number) => value.toString().padStart(2, '0')
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    const entry = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      event: eventName,
      detail
    }

    this.setState(prevState => {
      const nextLogs = [entry].concat(prevState.eventLogs || []).slice(0, 50) // 保留最新50条
      return { eventLogs: nextLogs }
    })
  }

  componentDidMount() {
    this.refreshState(1)
    setTimeout(() => {
      this.appendEventLog('Longlist', '列表实例初始化完成，可执行scrollToIndex')
    }, 1000)
  }

  fetchList(params) {
    const { pageNo, pagesize } = params

    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (pageNo - 1) * pagesize
        const endIndex = Math.min(startIndex + pagesize, dataModal.list.length)

        const currentPageList = dataModal.list.slice(startIndex, endIndex)

        resolve({
          total: dataModal.total,
          list: currentPageList
        })
      }, 1000)
    }).catch((e) => {
      console.log(e)
    })
  }

  modifyList(list, pageNo) {
    return list.map((item, index) => {
      return {
        ...item,
        label: `第 ${pageNo} 页，第 ${index + 1} 项`
      }
    })
  }

  refreshState(pageNo?: number) {
    pageNo = pageNo || (this.state.pageNo + 1)
    const params = {
      pageNo,
      pagesize: this.state.pagesize,
      id: '123456'
    }

    this.fetchListTimes++
    const tmpFetchListTimes = this.fetchListTimes
    return this.fetchList(params).then((resData: any) => {
      if (tmpFetchListTimes !== this.fetchListTimes) {
        return
      }
      const newList = this.modifyList(resData.list, pageNo)
      const oldList = (pageNo === 1 || this.state.list == null) ? [] : this.state.list

      this.setState({
        pageNo,
        list: oldList.concat(newList)
      })

      this.appendEventLog('fetchList', `数据加载成功 - 第${pageNo}页, 新增${newList.length}条数据, 总计${oldList.concat(newList).length}条`)
    }).catch((e) => {
      console.log(e)
      this.appendEventLog('fetchList', `数据加载失败 - 第${pageNo}页加载出错: ${e.message || '未知错误'}`)
    })
  }

  // 选择viewOffset的回调
  handleViewOffsetChange = (value) => {
    this.setState({ viewOffset: value, isOffsetPickerOpen: false }, () => {
      this.appendEventLog('ViewOffset', `偏移量设置为：${value}px（用于对比效果）`)
    })
  }

  // 选择viewPosition的回调
  handleViewPositionChange = (value) => {
    const positionLabel = value === 0 ? '顶部对齐' : value === 0.5 ? '中间对齐' : '底部对齐'
    this.setState({ viewPosition: value, isPositionPickerOpen: false }, () => {
      this.appendEventLog('ViewPosition', `对齐位置设置为：${value}（${positionLabel}）`)
    })
  }

  // 核心方法：新增viewOffset和viewPosition参数控制
  scrollToIndex = () => {
    const targetIndex = this.state.inputScrollIndex
    const { list, total, isAnimated, viewOffset, viewPosition } = this.state

    // 1. 基础校验：列表实例是否存在
    if (!this._longlist) {
      this.appendEventLog('scrollToIndex', '失败：Longlist实例未初始化')
      return
    }

    // 2. 兼容不同版本的flatList属性名（小写/大写）
    const flatListInstance = this._longlist.flatlist || this._longlist.flatList
    if (!flatListInstance) {
      this.appendEventLog('scrollToIndex', '失败：内部flatList实例未找到')
      return
    }

    // 3. 校验索引范围
    if (targetIndex < 0 || targetIndex >= total) {
      this.appendEventLog('scrollToIndex', `失败：索引${targetIndex}超出范围（0-${total-1}）`)
      return
    }

    // 4. 校验索引是否已加载，未加载则先加载对应页
    if (targetIndex >= list.length) {
      this.appendEventLog('scrollToIndex', `索引${targetIndex}未加载，先加载对应页面`)
      const targetPage = Math.ceil((targetIndex + 1) / this.state.pagesize)
      // 加载对应页后延迟执行滚动（确保渲染完成）
      this.refreshState(targetPage).then(() => {
        setTimeout(() => {
          try {
            flatListInstance.scrollToIndex({
              index: targetIndex,
              animated: isAnimated,
              viewOffset: viewOffset, // 动态偏移量
              viewPosition: viewPosition // 动态对齐位置
            })
            const positionLabel = viewPosition === 0 ? '顶部对齐' : viewPosition === 0.5 ? '中间对齐' : '底部对齐'
            this.appendEventLog('scrollToIndex',
              `成功：滚动到索引${targetIndex}（自动加载后）
              动画：${isAnimated ? '开启' : '关闭'} |
              偏移量：${viewOffset}px |
              对齐位置：${viewPosition}（${positionLabel}）`
            )
          } catch (e) {
            this.appendEventLog('scrollToIndex', `失败：${e.message}`)
          }
        }, 500)
      })
      return
    }

    // 5. 执行滚动（索引已加载）
    try {
      flatListInstance.scrollToIndex({
        index: targetIndex,
        animated: isAnimated,
        viewOffset: viewOffset, // 动态偏移量
        viewPosition: viewPosition // 动态对齐位置
      })
      const positionLabel = viewPosition === 0 ? '顶部对齐' : viewPosition === 0.5 ? '中间对齐' : '底部对齐'
      this.appendEventLog('scrollToIndex',
        `成功：滚动到索引${targetIndex}
        动画：${isAnimated ? '开启' : '关闭'} |
        偏移量：${viewOffset}px |
        对齐位置：${viewPosition}（${positionLabel}）`
      )
    } catch (e) {
      this.appendEventLog('scrollToIndex', `失败：${e.message}`)
    }
  }

  render() {
    const {
      list, total, inputScrollIndex, isAnimated,
      viewOffset, viewPosition, isOffsetPickerOpen, isPositionPickerOpen
    } = this.state

    // viewOffset选项数据
    const viewOffsetOptions = [
      { label: '20px', value: 20 },
      { label: '30px', value: 30 },
      { label: '40px', value: 40 }
    ]

    // viewPosition选项数据
    const viewPositionOptions = [
      { label: '0 (顶部)', value: 0 },
      { label: '0.5 (中间)', value: 0.5 },
      { label: '1 (底部)', value: 1 }
    ]

    // 对齐位置标签
    const getPositionLabel = (value) => {
      return value === 0 ? '顶部' : value === 0.5 ? '中间' : '底部'
    }

    return (
      <View style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}>
        {/* 操作区：索引输入 + viewOffset + viewPosition + 执行按钮 + 动画开关 */}
        <View style={{
          padding: 15,
          backgroundColor: '#e3f2fd',
          borderBottomWidth: 1,
          borderBottomColor: '#d1e7ff'
        }}>
          <Text style={{
            fontSize: 14,
            color: '#1976d2',
            fontWeight: 'bold',
            marginBottom: 10
          }}>scrollToIndex 示例（参数自定义）</Text>

          {/* 索引输入 + 两个Picker + 执行按钮 一行布局 */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
            flexWrap: 'wrap' // 适配小屏幕换行
          }}>
            <TextInput
              style={{
                width: 80,
                height: 40,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 4,
                paddingHorizontal: 8,
                fontSize: 14,
                textAlign: 'center'
              }}
              keyboardType="numeric"
              value={inputScrollIndex.toString()}
              onChangeText={(text) => {
                const num = Number(text) || 0
                this.setState({ inputScrollIndex: num })
              }}
              placeholder="输入索引"
            />

            {/* viewOffset选择器 */}
            <Picker
              ref={(c) => { this.viewOffsetPicker = c }}
              label={`偏移：${viewOffset}px`}
              disabled={false}
              cancelable={true}
              activeIcon={<Icon type='angle-up' size={14} tintColor='#1976d2' />}
              inactiveIcon={<Icon type='angle-down' size={14} tintColor='#666' />}
              onToggle={(active) => {
                this.setState({ isOffsetPickerOpen: active })
                this.appendEventLog('Picker', `偏移量选择器${active ? '打开' : '关闭'}`)
              }}
              style={{
                width: 150,
                height: 40,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 4,
                backgroundColor: '#fff'
              }}
            >
              {/* viewOffset选项列表 */}
              <View style={{
                backgroundColor: '#fff',
                padding: 10,
                width: '100%'
              }}>
                {viewOffsetOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 10,
                      borderBottomWidth: index < viewOffsetOptions.length - 1 ? 1 : 0,
                      borderBottomColor: '#eee'
                    }}
                    onPress={() => this.handleViewOffsetChange(item.value)}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: viewOffset === item.value ? '#1976d2' : '#333',
                      fontWeight: viewOffset === item.value ? 'bold' : 'normal'
                    }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Picker>

            {/* viewPosition选择器 */}
            <Picker
              ref={(c) => { this.viewPositionPicker = c }}
              label={`对齐：${viewPosition}(${getPositionLabel(viewPosition)})`}
              disabled={false}
              cancelable={true}
              activeIcon={<Icon type='angle-up' size={14} tintColor='#1976d2' />}
              inactiveIcon={<Icon type='angle-down' size={14} tintColor='#666' />}
              onToggle={(active) => {
                this.setState({ isPositionPickerOpen: active })
                this.appendEventLog('Picker', `对齐位置选择器${active ? '打开' : '关闭'}`)
              }}
              style={{
                width: 150,
                height: 40,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 4,
                backgroundColor: '#fff'
              }}
            >
              {/* viewPosition选项列表 */}
              <View style={{
                backgroundColor: '#fff',
                padding: 10,
                width: '100%'
              }}>
                {viewPositionOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 10,
                      borderBottomWidth: index < viewPositionOptions.length - 1 ? 1 : 0,
                      borderBottomColor: '#eee'
                    }}
                    onPress={() => this.handleViewPositionChange(item.value)}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: viewPosition === item.value ? '#1976d2' : '#333',
                      fontWeight: viewPosition === item.value ? 'bold' : 'normal'
                    }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Picker>

            <TouchableOpacity
              style={{
                backgroundColor: '#4caf50',
                padding: 10,
                borderRadius: 4,
                flex: 1,
                minWidth: 100,
                alignItems: 'center'
              }}
              onPress={this.scrollToIndex}
            >
              <Text style={{
                color: '#fff',
                fontSize: 14
              }}>执行滚动</Text>
            </TouchableOpacity>
          </View>

          {/* 动画开关控制 */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
          }}>
            <Text style={{
              fontSize: 14,
              color: '#333'
            }}>动画效果：</Text>
            <Switch
              value={isAnimated}
              onValueChange={(value) => {
                this.setState({ isAnimated: value })
                this.appendEventLog('Animated', `动画状态切换为：${value ? '开启' : '关闭'}`)
              }}
            />
            <Text style={{
              fontSize: 14,
              color: '#666'
            }}>
              {isAnimated ? '开启（平滑滚动）' : '关闭（瞬间跳转）'}
            </Text>
          </View>
        </View>

        {/* 日志显示区域 */}
        <View style={{
          height: 150,
          margin: 15,
          padding: 10,
          backgroundColor: '#fff8e1',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ffe082'
        }}>
          <Text style={{
            fontSize: 12,
            color: '#ff8f00',
            lineHeight: 18,
            fontWeight: 'bold'
          }}>
            回调日志 (最新在顶部，可滚动查看)
          </Text>

          <View style={{
            flex: 1,
            marginTop: 8,
            backgroundColor: '#fffdf3',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#ffe082'
          }}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{ padding: 8 }}
            >
              {this.state.eventLogs.length ?
                this.state.eventLogs.map(log => (
                  <View key={log.id} style={{ marginBottom: 8 }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#ff8f00',
                      lineHeight: 18,
                      fontWeight: 'bold'
                    }}>
                      [{log.timestamp}] {log.event}
                    </Text>
                    {log.detail ? (
                      <Text style={{
                        fontSize: 12,
                        color: '#795548',
                        lineHeight: 18,
                        whiteSpace: 'pre-wrap'
                      }}>
                        {log.detail}
                      </Text>
                    ) : null}
                  </View>
                )) : (
                  <Text style={{
                    fontSize: 12,
                    color: '#ffb74d',
                    lineHeight: 18
                  }}>
                    暂无日志，滑动列表体验回调事件
                  </Text>
                )
              }
            </ScrollView>
          </View>
        </View>

        {/* Longlist列表区域 */}
        <View style={{ flex: 1 }}>
          <Longlist
            style={{ flex: 1 }}
            ref={(c) => {
              this._longlist = c
            }}
            total={total}
            data={list}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
            windowSize={3}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    marginBottom: 12,
                    paddingVertical: 15,
                    paddingHorizontal: variables.mtdHSpacingXL,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1
                  }}>
                  <Text style={{ color: variables.mtdGrayBase, fontSize: 15 }}>{item.label}</Text>
                </View>
              )
            }}
            onEndReached={() => {
              this.appendEventLog('onEndReached', `触发加载更多 - 当前页数: ${this.state.pageNo}, 当前数据量: ${this.state.list.length}`)
              return this.refreshState()
            }}
            onEndReachedThreshold={0.2}
            onRefresh={() => {
              this.appendEventLog('onRefresh', '触发下拉刷新 - 重新加载第1页数据')
              return this.refreshState(1)
            }}
            renderFooter={(loading, data, total) => {
              if (loading) {
                return (
                  <View style={styles.footerLoading}>
                    <ActivityIndicator
                      size="small"
                      color={variables.mtdBrandPrimary}
                    />
                    <Text style={styles.footerText}>{'\u3000'}加载中...</Text>
                  </View>
                )
              }

              if (data.length > 0 && data.length >= total) {
                return (
                  <View style={styles.footerTips}>
                    <Text style={styles.footerText}>已加载全部 {total} 条数据～</Text>
                  </View>
                )
              }

              if (data.length === 0 && total === 0) {
                return (
                  <View style={styles.footerTips}>
                    <Text style={{color: '#999'}}>无更多数据啦~</Text>
                  </View>
                )
              }

              return null
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerLoading: {
    height: 50,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerTips: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  footerText: {
    color: variables.mtdGrayBase,
    fontSize: 14
  }
})