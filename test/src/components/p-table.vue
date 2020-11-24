<template>
  <div class="p-table">
    <section class="table-wap">
      <el-dropdown :hide-on-click="false" trigger="click">
        <el-button type="info" size="mini" plain>
          排序筛选&nbsp;<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="p-table-filter">
          <el-tree
            ref="dragTree"
            :data="cols"
            draggable
            :allow-drop="allowDrop"
          >
            <template #default="{ data }">
              <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
              <span class="custom-tree-node">
                <span>{{ data.label }}</span>
                <el-checkbox
                  v-model="data.hidden"
                  :true-label="0"
                  :false-label="1"
                  @change="handleHiddenChanges"
                ></el-checkbox>
              </span>
            </template>
          </el-tree>
        </el-dropdown-menu>
      </el-dropdown>
      <!--表格-->
      <el-table
        ref="dTable"
        :data="currentValue"
        style="width: 100%"
        max-height="500px"
        :stripe="stripe"
        fit
        :highlight-current-row="true"
        :border="true"
        v-loading="loading"
        size="mini"
        @current-change="handleTableCurrentChange"
        @sort-change="handleSortChange"
        @selection-change="selectionChange"
        :row-class-name="rowClassName"
        :span-method="spanMethod"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        lazy
        :load="loadFunc"
      >
        <!--显示多选按钮-->
        <el-table-column
          v-if="showCheckbox && total > 0"
          type="selection"
          width="50"
        ></el-table-column>

        <!--显示序号-->
        <el-table-column
          v-if="showIndex && total > 0"
          type="index"
          label="序号"
          width="50"
        ></el-table-column>
        <!--显示展开-->
        <el-table-column v-if="isExpand && total > 0" type="expand" width="30">
          <!-- 插槽 -->
          <template #default="props">
            <slot
              name="expandSlot"
              :props="{ row: props.row, columns: cols }"
            ></slot>
          </template>
        </el-table-column>

        <template v-for="(itm, idx) in cols">
          <el-table-column
            v-if="currentValue && currentValue.length > 0 && !itm.hidden"
            :key="itm.label + idx"
            :prop="itm.prop"
            :label="itm.label"
            :min-width="itm.width"
            show-overflow-tooltip
            :fixed="itm.fixed"
            class="table-btn"
            :sortable="itm.sortable"
            :align="itm.align"
          >
            <template v-if="itm.opts" #default="scope">
              <!--type="text"-->
              <!--控制操作按钮是否显示，opts中有showProps字段则视为判断按钮是否显示否则全部显示
                                showProps的值是一个判断按钮的字段名，这个字段名的值==0为隐藏、1为显示v-if="scope.row.opreateAuthMap[o.showProps]"-->
              <template v-for="o in itm.opts">
                <span v-if="o.showProps" :key="o.label">
                  <el-button
                    v-if="
                      scope.row.opreateAuthMap &&
                      scope.row.opreateAuthMap[o.showProps]
                    "
                    :class="[
                      {
                        danger: o.type === 'danger',
                        isSpecialBtnFlag: o.isSpecialBtnFlag,
                      },
                    ]"
                    :key="o.label"
                    size="mini"
                    :type="o.type"
                    :style="{ color: o.btnColor }"
                    plain
                    class="tableButton"
                    @click="
                      () => o.callback(scope.row, scope.column, scope.$index)
                    "
                    >{{ o.label }}
                  </el-button>
                </span>
                <span :key="o.showProps" v-else>
                  <el-button
                    :class="[{ danger: o.type === 'danger' }]"
                    :key="o.label"
                    size="mini"
                    :type="o.type"
                    plain
                    class="tableButton"
                    @click="
                      () => o.callback(scope.row, scope.column, scope.$index)
                    "
                    >{{ o.label }}
                  </el-button>
                </span>
              </template>
            </template>
            <!-- 如果需要自定义slot -->
            <template v-else-if="itm.customizeSlotName" #default="scope">
              <!--type="moreLines"-->
              <!-- slot 有name代表具名插槽  :props 给插槽传参(就是v-bind :传参的意思) -->
              <slot
                :name="itm.customizeSlotName"
                :props="{
                  row: scope.row,
                  column: scope.column,
                  $index: scope.$index,
                }"
              ></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100, 300]"
        :page-size="pageSize"
        :layout="small ? 'prev, pager, next' : layout"
        :total="total"
        :small="small"
        v-if="total > 0 && showPagination"
      >
      </el-pagination>
    </section>
  </div>
</template>
<script>
import bus from "../libs/eventbus";
import mergeCellRules from "../js/mergeCellRules";
import _ from "lodash";
import * as utils from "../js/utils";

export default {
  name: "p-table",
  comments: {},
  props: {
    value: {
      // 表格数据
      type: Array,
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    columns: {
      // 表格显示配置
      type: Array,
      default: () => [],
    },
    func: Function, // 加载所需函数
    changeFunc: Function, // 选择行时的回调函数

    // 显示多选
    showCheckbox: {
      type: Boolean,
      default: false,
    },

    // 显示table前 序号
    showIndex: {
      type: Boolean,
      default: false,
    },
    // table行的 className
    rowClassName: Function,

    // 开启表格合并
    tableMerge: {
      type: Boolean,
      default: false,
    },

    // 頁面合并規則
    ruleList: {
      type: Array,
      default: () => [],
    },

    // 显示展开收起 按钮
    hideToggleBtn: {
      type: Boolean,
      default: false,
    },
    // 是否显示展开
    isExpand: {
      type: Boolean,
      default: false,
    },
    // 是否开启斑马条纹
    stripe: {
      type: Boolean,
      default: true,
    },
    load: {
      type: Function,
      default: () => {},
    },
    layout: {
      // 分页的默认样式
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
  },
  data() {
    return {
      routeName: `${this.$route.name}${this.tableId ? this.tableId : ""}`,
      trueName: this.$options.name + "_" + this._uid,
      cols: this.columns, // 显示列
      currentValue: this.value, // 当前list数据
      loading: false, // loading标识
      page: 1, // 当前页数
      pageSize: 20, // 分页记录数
      pageSort: null, // 排序，升序直接用字段名，降序用：字段名+空格+desc
      total: 0, // 总记录数
      // 合并规则
      rules: [],
      // 默认屏幕大小
      clientHeight: "",
      // 固定表头设置最大高度
      tableMaxHeight: "",
      // checkbox 多选的数据
      multipleList: [],
    };
  },
  computed: {
    // p-table 操作列 显示还是隐藏
    isHidden() {
      let hiddenRightFixedStatus = false;
      let hiddenRightFixed = this.cols.find((i) => {
        return i.label === "操作";
      });
      if (hiddenRightFixed && hiddenRightFixed.hidden === 1) {
        hiddenRightFixedStatus = true;
      }
      return hiddenRightFixedStatus;
    },
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },
    page() {
      // 翻页
      if (!this.loading) this.getList();
      // console.log('page', this.page);
    },
    pageSize() {
      // 调整页面记录数
      if (!this.loading) this.getList({ page: 1 });
    },
    pageSort() {
      // 排序
      if (!this.loading) this.getList();
    },
    cols() {
      this.columnsSave();
    },
  },
  created() {
    // console.log('ptable----created执行了---this.$router.direct()--', this.$router.direct());
    bus.$on(this.trueName + ".init", this.init); // 初始化外部init。 Author by Dio Zhu. on 2019.3.19
    bus.$on(this.$options.name + ".init", this.init); // 初始化外部init。 Author by Dio Zhu. on 2019.3.19
    [].forEach.call(this.cols, (v, i) => {
      if (!v.hidden && v.label) this.$set(this.cols[i], "hidden", 0);
      // 默认操作隐藏 2019-12-04 产品提的需求
      if (!v.hidden && v.label === "操作") this.$set(this.cols[i], "hidden", 1);
      if (!v.orderNum) this.$set(this.cols[i], "orderNum", 0);
    });
    this.columnsLoad();

    // p-table 小屏显示 10条数据 默认显示15条 固定高度...

    if (window.screen.availHeight < 900) {
      // this.pageSize = parseInt(process.env.VUE_APP_PAGESIZE_min);
      this.tableMaxHeight = 410;
    } else {
      this.tableMaxHeight = 620;
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.computedElTableHeight();
      // resize 时调整
      window.addEventListener(
        "resize",
        _.debounce(() => {
          this.computedElTableHeight();
        }, 500)
      );
    });
  },

  // 当使用keep 进入时 init
  activated() {
    if (this.$router.direct() > 0) {
      // in
      this.init(); // 初始化
    } else {
      bus.$on(this.trueName + ".init", this.init); // 初始化外部init。 Author by Dio Zhu. on 2019.3.19
      bus.$on(this.$options.name + ".init", this.init); // 初始化外部init。 Author by Dio Zhu. on 2019.3.19
    }
  },

  // 当使用keep 离开时 注销
  deactivated() {
    bus.$off(this.trueName + ".init", this.init);
    bus.$off(this.$options.name + ".init", this.init);
  },

  beforeDestroy() {
    bus.$off(this.trueName + ".init", this.init);
    bus.$off(this.$options.name + ".init", this.init);
  }, // 用完记得卸载。。。Author by Dio Zhu. on 2018.6.1
  methods: {
    init() {
      this.currentValue = [];
      this.page = 1;
      this.total = 0;
      this.getList();
    },
    getList({ page } = {}) {
      // 根据func获取表格数据。 Author by Dio Zhu. on 2019.3.18
      if (typeof this.func !== "function") return;
      // console.log(`p-table.${this.trueName}.getList...`);
      this.loading = true;
      if (page) this.page = page;
      let params = {
        pageNumber: page || this.page,
        pageSize: this.pageSize,
      };
      if (this.pageSort) params.pageSort = this.pageSort;
      // api.getList(params).then(res => {
      this.func(params)
        .then((res) => {
          if (!res) return;
          if (!res.list) return;
          console.log(res.list);
          this.currentValue = res.list;
          // 如果当前list 下没有数据，并且分页不在当前页 回第一页
          if (!res.list.length && this.page !== 1) {
            this.page = 1;
            this.init();
            // console.error('不是在第一页，页面没数据');
          }
          // console.log(res.list.length);
          this.total = res.totalCount;

          // console.log(this.ruleList);
          // 有要合并表格規則時在去处理数据
          if (this.ruleList && this.ruleList.length > 0) {
            this.rules = mergeCellRules(this.currentValue, this.ruleList);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 计算表格高度，表格最大到窗口底部显示
    computedElTableHeight() {
      // 可是区域的高度
      let clientHeight = document.body.clientHeight;
      // console.log(clientHeight);

      // 获取el-table 的BoundingClientRect 对象
      let clientRectObj = document
        .querySelector(".el-table")
        .getBoundingClientRect();
      // console.log('p-table 获取的 el-table getBoundingClientRect', clientRectObj);

      // 分页的高度
      let elPaginationHeight = 48;
      // console.log('p-table 计算分页的高度为：', elPaginationHeight);

      // 计算后的elTable高度 =   (可视区域高度  -  elTable的BoundingClientRect 的bottom） + elTable的BoundingClientRect 的 height
      let computedHeight =
        clientHeight -
        clientRectObj.bottom -
        elPaginationHeight +
        clientRectObj.height;
      // console.log('p-table 计算后的高度：', computedHeight);
      // el-table 重新付高度
      this.tableMaxHeight = computedHeight;
    },

    allowDrop(draggingNode, dropNode, type) {
      // 排序筛选的拖拽。 Author by Dio Zhu. on 2019.3.18
      // 操作列拖拽时会造成页面结构混乱，所以这一项禁止拖拽与被换位置 Author by liangyuan. on 2019.8.22
      // 因为 选项顺序存在localStroage 中了 可能操作项不在最后  其他项改变位置还是会影响他
      // 所以columnsLoad中是否对cols做处理，保证操作一直在数组中最后面
      let nodeFlag =
        draggingNode.data.label !== "操作" && dropNode.data.label !== "操作";
      return type !== "inner" && nodeFlag;
    },
    columnsSave() {
      // 保存列顺序及隐藏标识
      let cur = [];
      // [].forEach.call(this.cols, v => cur.push({ prop: v.prop, hidden: !!v.hidden }));
      [].forEach.call(this.cols, (v) =>
        cur.push({ prop: v.prop, hidden: v.hidden })
      );
      console.log("handleSave: ", this.routeName, cur);
      if (this.routeName)
        utils
          .getLocalStorage("TABLES")
          .set(this.routeName, JSON.stringify(cur));
    },
    columnsLoad() {
      // 从localstorage读取列顺序及显示与否。。。重置当前表格。 mod by Dio Zhu. on 2019.3.15
      let localTables = utils.getLocalStorage("TABLES").get(this.routeName);
      // console.log('p-table.columensLoad: ', localTables);
      if (localTables) localTables = JSON.parse(localTables);
      console.log(localTables, "localTables");
      // console.log('p-table.columnsLoad.localTables', localTables);
      if (localTables) {
        [].forEach.call(localTables, (v, i) => {
          // let obj = this.cols.find(m => m.prop === v.prop);
          // if (obj) {
          //     obj.orderNum = i;
          //     obj.hidden = v.hidden;
          // }
          let idx = this.cols.findIndex((m) => m.prop === v.prop);
          // console.log(idx);
          if (idx >= 0) {
            this.$set(this.cols[idx], "orderNum", i);
            // this.$set(this.cols[idx], 'hidden', !!v.hidden);
            this.$set(this.cols[idx], "hidden", v.hidden);
          }
          // console.log('p-table.columnsLoad.this.cols[idx]:', this.cols[idx]);
          // console.log('===> ', idx, v, i);
        });
        this.cols = this.cols.sort((a, b) => a.orderNum - b.orderNum);

        // console.error('p-table.columnsLoad.this.cols', this.cols);
        // let arr = this.cols.sort((a, b) => a.orderNum - b.orderNum);
        // this.$set(this, 'cols', arr);
        // this.$nextTick(() => { this.$refs.dTable.doLayout(); });

        this.tableLayout();
      }
      // console.log('handleLoad: ', localTables);
    },
    // 右侧 操作按钮 收起隐藏
    handleToggleRightFixed(hiddenIndex) {
      [].forEach.call(this.cols, (v, i) => {
        if (v.label === "操作") this.$set(this.cols[i], "hidden", hiddenIndex);
      });

      // cols 修改后没有触发， 手动调一次
      this.columnsSave();
    },
    tableLayout() {
      // console.log('p-table.tableLayout!');
      this.$nextTick(() => {
        this.$refs.dTable.doLayout();
      });
    },
    handleHiddenChanges() {
      // 字段隐藏checkbox事件触发，防止watch对象没反应，不触发columnsSave。 Author by Dio Zhu. on 2019.3.21
      this.columnsSave();
    },
    handleSizeChange(val) {
      // 修改分页记录数，触发watch重新拉取数据。 add by Dio Zhu. on 2019.3.18
      // console.log('t-table.handleSizeChange: ', val);
      // this.$emit('getCurrentPage', val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // 翻页，触发watch重新拉取数据。 add by Dio Zhu. on 2019.3.18
      // console.log('t-table.handleCurrentChange: ', val);
      // this.$emit('getPage', val);
      this.page = val;
    },
    handleSortChange(obj) {
      // 排序，触发watch重新拉取数据。 add by Dio Zhu. on 2019.3.18
      // console.log('t-table.handleSortChange: ', obj);
      if (obj.order === "ascending") {
        this.pageSort = obj.prop;
      } else if (obj.order === "descending") {
        this.pageSort = obj.prop + " desc";
      } else {
        this.pageSort = null;
      }
    },
    selectionChange(val) {
      // 多选 返回选中的值，提交给父组件使用
      if (this.showCheckbox) {
        this.$emit("selectionChange", val);
      }
      this.multipleList = val;
    },
    handleTableCurrentChange(currentRow, oldCurrentRow) {
      if (typeof this.changeFunc === "function")
        this.changeFunc(currentRow, oldCurrentRow);
    },
    setCurrentRow(row) {
      // this.$refs.dTable.setCurrentRow(row);
      // if (row) this.$nextTick(() => this.$refs.dTable.setCurrentRow(row));
      if (row)
        this.$nextTick(() =>
          this.$refs.dTable.setCurrentRow(this.currentValue[row])
        );
    },

    // 合并表格
    spanMethod(obj) {
      if (this.ruleList && this.ruleList.length > 0) {
        return {
          rowspan: this.rules[obj.column.property][obj.rowIndex],
          colspan: 1,
        };
      }
    },
    async loadFunc(tree, treeNode, resolve) {
      this.loading = true;
      let res = await this.load();
      resolve(res);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.p-table {
  width: 100%;
  border-radius: 3px;

  .el-table__expand-icon {
    float: left !important;
  }

  /*多选按钮*/
  th {
    .cell {
      .el-checkbox {
        line-height: 1;
      }
    }

    /*表格header 操作 的样式调增*/
    .icon-right-fill {
      margin-right: 10px;
      /*color: #e6a23c;*/
      cursor: pointer;
      font-size: 16px;
      float: left;
    }

    .icon-left {
      margin-right: 10px;
      /*color: #67c23a;*/
      cursor: pointer;
      font-size: 16px;
    }
  }

  // 排序按钮
  .caret-wrapper {
    height: 0;

    .sort-caret {
      &.ascending {
        top: -13px;
      }

      &.descending {
        bottom: 0;
        top: 0px;
      }
    }
  }

  .expand-wrapper {
    margin: 5px 0;
    padding: 0 55px;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;

    .info-block {
      line-height: 35px;

      .label {
        padding-right: 12px;
      }

      margin-right: 30px;
    }
  }

  p.line {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .operations {
    position: relative;
    padding: 10px 0;
    text-align: right;

    .all-check-box {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .el-button--primary {
      min-width: 90px;
      height: 32px !important;
      background-color: #3c9ccb;
      border: 1px solid #3c9ccb;
    }

    .el-button--danger {
      height: 32px !important;
    }

    .el-button--info {
      height: 32px !important;
    }
  }

  /*让表格支持文字选择复制*/
  div {
    user-select: text;
  }
  /*根据UI需求去掉表格底部线*/
  .el-table {
    border: 1px solid #f1f1f1;

    /*表格头部加个底色 wjl*/
    .el-table__header-wrapper {
      border-bottom: 1px solid #f1f1f1;
    }

    .el-table__body-wrapper {
      border-top: none;
    }

    &:before {
      height: 0;
    }

    .el-table__header-wrapper {
      th {
        background-color: #edf3ff;
        padding: 6px 0;
      }
    }
    /*修改普通表格按钮样式*/
    tbody {
      tr {
        td:last-child {
          .el-tooltip {
            /*text-align: left;*/

            .el-button--primary.is-plain {
              color: #3c9ccb;
              background: transparent !important;
              border-color: transparent !important;
            }
          }
        }

        &.hover-row {
          &:hover {
            color: #00aeff;
          }
        }
      }
    }
    /*修改table 树 展开后的样式 2009 12 14*/
    .el-table__row--level-1 {
      td {
        padding: 6px 0 !important;

        .table__indent {
          visibility: hidden;
        }
      }
      td:nth-child(2) {
        .el-tooltip {
          display: flex;
        }
      }
      .el-table-column--selection {
        visibility: hidden !important;
      }
    }
  }

  /*2019-11-6修改最后一项 没有操作时的 对齐方式*/
  .el-table__fixed-right {
    th {
      background-color: #edf3ff;
      padding: 6px 0;
    }
    tbody {
      tr {
        td:last-child {
          .el-tooltip {
            text-align: left;
          }
        }
      }
    }
  }
  .el-table__fixed-right-patch {
    background-color: #edf3ff;
  }
  /*2019-11-1 shenwenfei 页面滚动条放到tbale中时，定制滚动条走了默认宽高*/
  .el-table--scrollable-y {
    .el-table__fixed-right {
      right: 6px !important;
    }
  }

  .el-table--scrollable-x {
    .el-table__fixed-right {
      bottom: 9px !important;
    }
  }

  .el-table--scrollable-x.el-table--scrollable-y {
    .el-table__fixed-right {
      bottom: 6px !important;
    }
  }

  .el-table__fixed-body-wrapper {
    padding-bottom: 10px;
  }

  .el-table.card {
    border: none;

    .el-table__body-wrapper {
      .el-table__body {
        width: 100% !important;
      }
    }
  }

  .tableButton {
    padding: 3px 4px;
  }

  .cell {
    padding: 0 10px;
    text-align: left;

    .set-back p {
      text-align: center;
    }
  }

  th:first-child .cell,
  td:first-child .cell {
    padding: 0 10px !important;
  }

  .el-table-column--selection .cell {
    text-align: center !important;
  }

  th.is-center .cell,
  td.is-center .cell {
    text-align: center;
  }

  th.is-right .cell,
  td.is-right .cell {
    text-align: right;
  }
  .el-pagination {
    text-align: right;
    padding: 8px 0;

    button {
      background: transparent;
      /*&:disabled {*/
      /*background: transparent;*/
      /*}*/
    }

    .el-pager {
      li {
        background: transparent;
      }
    }
  }
  .el-dropdown {
    margin-left: 10px;
  }
  .p-table-filter {
    .custom-tree-node {
      /* label和checkbox两端对齐 */
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .el-checkbox {
        padding: 0 0 0 20px;
      }
    }
  }
  .el-dropdown {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .el-dropdown-menu {
    .el-tree-node__label,
    .custom-tree-node {
      margin: 0 30px 0 0;

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
