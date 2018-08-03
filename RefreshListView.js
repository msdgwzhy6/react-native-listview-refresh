import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes, RefreshControl} from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}

type Props = {
  refreshState: number,
  onHeaderRefresh: Function,
  onFooterRefresh?: Function,
  data: Array<any>,

  listRef?: any,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  footerEmptyDataText?: string,

  footerRefreshingComponent?: any,
  footerFailureComponent?: any,
  footerNoMoreDataComponent?: any,
  footerEmptyDataComponent?: any,

  renderItem: Function,
}

type State = {

}

class RefreshListView extends PureComponent<Props, State> {

  static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据',
  }

  componentWillReceiveProps(nextProps: Props) {
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
  }

  onHeaderRefresh = () => {

    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
    }
  }

  onEndReached = (info: {distanceFromEnd: number}) => {

    if (this.shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
    }
  }

  shouldStartHeaderRefreshing = () => {

    if (this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing) {
      return false
    }

    return true
  }

  shouldStartFooterRefreshing = () => {

    let {refreshState, data} = this.props
    if (data.length == 0) {
      return false
    }

    return (refreshState == RefreshState.Idle)
  }

  render() {

    let {renderItem, ...rest} = this.props

    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        refreshControl={
          this.props.onHeaderRefresh?<RefreshControl
          colors={['#00ff00',"#9Bd35A", "#689F38",]}
          refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
          onRefresh={this.onHeaderRefresh}
        />:false}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={this.props.disabledSeparator?false:this.renderSeparator}
        renderItem={renderItem}

        {...rest}
      />
    )
  }

  renderSeparator = () => (
    <View style={{height: 1, backgroundColor: '#e0e0e0'}} />
  )

  renderFooter = () => {
    let footer = null

    let {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
    } = this.props

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = (<View style={styles.footerContainer} />)
        break
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity onPress={() => {
            if (this.props.data.length == 0) {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
            } else {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
            }
          }}
          >
            {footerFailureComponent ? footerFailureComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity onPress={() => {
            this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
          }}
          >
            {footerEmptyDataComponent ? footerEmptyDataComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? footerRefreshingComponent : (
          <View style={styles.footerContainer} >
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, {marginLeft: 7}]}>{footerRefreshingText}</Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent ? footerNoMoreDataComponent : (
          <View style={styles.footerContainer} >
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        )
        break
      }
    }

    return footer
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555'
  }
})

export default RefreshListView
