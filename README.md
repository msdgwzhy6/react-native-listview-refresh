# react-native-listview-refresh

一个基于FlatList的列表下拉、上拉刷新控件。代码一共100多行，尽量写得简单易懂，方便各位根据自己的需求随意修改。
如果有bug或建议，欢迎提issue。

## 安装

### Yarn

```bash
$ yarn add react-native-listview-refresh
```

### 手动安装
下载源码，将RefreshListView.js拖入工程中


## 运行Demo

### 第一步
进入Example目录，执行：

```bash
yarn install
```

### 第二步

```bash
react-native run-ios
```

## Example

``` javascript

constructor(props) {
  super(props)

  this.state = {
    refreshState: RefreshState.Idle,
  }
}

render() {
  return (
    <RefreshListView
      data={this.state.dataList}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderCell}

      refreshState={this.state.refreshState}
      onHeaderRefresh={this.onHeaderRefresh}
      onFooterRefresh={this.onFooterRefresh}
    />
  )
}

// 开始下拉刷新
this.setState({refreshState: RefreshState.HeaderRefreshing})

// 开始上拉翻页
this.setState({refreshState: RefreshState.FooterRefreshing})

// 加载成功
this.setState({refreshState: RefreshState.Idle})

// 加载失败
this.setState({refreshState: RefreshState.Failure})

// 加载全部数据
this.setState({refreshState: RefreshState.NoMoreData})

// 服务器没有数据
this.setState({refreshState: RefreshState.EmptyData})
```

## Props

| Prop | Type | Description | Default |
| :- | :- | :- | :- |
| refreshState | number | 列表刷新状态：<br/>1、Idle（普通状态）<br/>2、HeaderRefreshing（头部菊花转圈圈中）<br/>3、FooterRefreshing（底部菊花转圈圈中）<br/>4、NoMoreData（已加载全部数据）<br/>5、Failure（加载失败） | None |
| onHeaderRefresh | (refreshState: number) => void | 下拉刷新回调方法<br/>refreshState参数值为RefreshState.HeaderRefreshing | None |
| onFooterRefresh | (refreshState: number) => void | 上拉翻页回调方法<br/>refreshState参数值为RefreshState.FooterRefreshing | None |
| data | Array | 同FlatList中的data属性 | None |
| footerRefreshingText | ?string | 自定义底部刷新中文字 | '数据加载中…' |
| footerFailureText | ?string | 自定义底部失败文字 | '点击重新加载' |
| footerNoMoreDataText | ?string | 自定义底部已加载全部数据文字 | '已加载全部数据' |
| footerEmptyDataText | ?string | 自定义空数据文字 | '暂时没有相关数据' |
| footerRefreshingComponent | ?any | 自定义底部刷新控件 | null |
| footerFailureComponent | ?any | 自定义底部失败控件 | null |
| footerNoMoreDataComponent | ?any | 自定义底部已加载全部数据控件 | null |
| footerEmptyDataComponent | ?any | 自定义空数据控件 | null |
