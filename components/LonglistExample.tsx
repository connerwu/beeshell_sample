import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { Longlist } from 'beeshell-ls'
import variables from 'beeshell-ls/common/styles/variables'

interface DataItem{
  id:number
}


const generateSimpleData = (total = 100) => {
  const list:DataItem[] = [];
  for (let i = 1; i <= total; i++) {
    list.push({ id: i }); 
  }
  return { total, list };
};

const dataModal = generateSimpleData(100);

export default class LonglistScreen extends React.Component<any, any> {
  private fetchListTimes: number
  private _longlist: any

  constructor(props) {
    super(props)
    this.fetchListTimes = 0
    this.state = {
      pageNo: 0,
      pagesize: 7,
      list: [],
      total: dataModal.total 
    }
  }

  componentDidMount() {
    this.refreshState(1);
  }

  fetchList(params) {
    const { pageNo, pagesize } = params;

    return new Promise((resolve) => {
      setTimeout(() => {
    
        const startIndex = (pageNo - 1) * pagesize;
        const endIndex = Math.min(startIndex + pagesize, dataModal.list.length);
        
        const currentPageList = dataModal.list.slice(startIndex, endIndex);

        resolve({
          total: dataModal.total,
          list: currentPageList
        });
      }, 1000);
    }).catch((e) => {
      console.log(e);
    });
  }

 
  modifyList(list, pageNo) {
    return list.map((item, index) => {
      return {
        ...item,
        label: `第 ${pageNo} 页，第 ${index + 1} 项` 
      };
    });
  }

  refreshState(pageNo?: number) {
    pageNo = pageNo || (this.state.pageNo + 1);
    const params = {
      pageNo,
      pagesize: this.state.pagesize,
      id: '123456',
    };

    this.fetchListTimes++;
    const tmpFetchListTimes = this.fetchListTimes;
    return this.fetchList(params).then((resData: any) => {
      if (tmpFetchListTimes !== this.fetchListTimes) {
        return;
      }
      const newList = this.modifyList(resData.list, pageNo);
      const oldList = (pageNo === 1 || this.state.list == null) ? [] : this.state.list;

      this.setState({
        pageNo,
        list: oldList.concat(newList), 
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    const { list, total } = this.state;

    return (
      <View style={{ backgroundColor: variables.mtdFillBody, flex: 1 }}>
        <Longlist
          style={{flex:1}}
          ref={(c) => {
            this._longlist = c;
          }}
          total={total}
          data={list}
          keyExtractor={(item, index) => {
            return index.toString(); 
          }}
          initialNumToRender= {5}
          windowSize={3}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginBottom: 12,
                  paddingVertical: 30,
                  paddingHorizontal: variables.mtdHSpacingXL,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 1,
                }}>
                <Text style={{ color: variables.mtdGrayBase, fontSize: 15 }}>{item.label}</Text>
              </View>
            );
          }}
          onEndReached={() => {
            return this.refreshState();
          }}
          onEndReachedThreshold={0.2}
          onRefresh={() => {
            return this.refreshState(1);
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
              );
            }

            if (data.length > 0 && data.length >= total) {
              return (
                <View style={styles.footerTips}>
                  <Text style={styles.footerText}>已加载全部 {total} 条数据～</Text>
                </View>
              );
            }

            if (data.length === 0 && total === 0) {
              return (
                <View style={styles.footerTips}>
                  <Text style={styles.footerText}>无更多数据啦~</Text>
                </View>
              );
            }

            return null;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerLoading: {
    height:50,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerTips: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: variables.mtdGrayBase,
    fontSize: 14,
  },
});