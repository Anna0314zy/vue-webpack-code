<template>
    <div class="table-wrapper" ref="tableWrapper">
<!--        表头-->
        <div :style="{'height':height + 'px'}" class="scroll-box" ref="scrollBox">
            <table :class="['table', {border:border, stripe:stripe}]" ref="table">
                <thead>
                <tr>
                    <th style="width:50px">
                        <input type="checkbox" :checked="checkedAll" ref="checkedAll" @change="changeAll">
                    </th>
                    <th v-for="column in columns" :key="column.key">
                        <div class="th-head">
                            {{column.title}}
                            <span v-if="column.key in orderBy" @click="sortChange">排序</span>
                        </div>
                    </th>

                </tr>
                </thead>
                <!--        表体-->
                <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td style="width:50px">
                        <input type="checkbox" @change="changeItem(row, $event)" :checked="isChecked(row)">
                    </td>
                    <td v-for="column in columns" :key="column.key">
                        {{row[column.key]}}
                    </td>
                </tr>

                </tbody>
            </table>
            <div class="el-table__column-resize-proxy"></div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: "zf-table.vue",
        props: {
            selectedItems: {
                type: Array,
                default: () => []
            },
            orderBy: {
                type: Object,
                default: () => {}
            },
            columns: {
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
            },
            border: {
                type: Boolean,
                default: false
            },
            stripe: {
                type: Boolean,
                default: false
            },
            height: {
                type:Number,
                default: 300
            }
        },
        computed: {
            checkedAll() {
                return this.data.length === this.selectedItems.length
            }
        },
        watch: {
            selectedItems() {
                if (this.data.length !== this.selectedItems.length) {
                    if (this.selectedItems.length !==0) {
                        console.log('半选')
                       return this.$refs.checkedAll.indeterminate = true;
                    }
                }
                this.$refs.checkedAll.indeterminate = false;
            }
        },
        mounted() {
           if(this.height) {
               //固定表头必须有height属性
               this.table = this.$refs.table;
               this.tableWrapper = this.$refs.tableWrapper;
               //拷贝一个空表格
               let copyTable = this.$refs.table.cloneNode();//不传参数true只能拷贝父节点
               let thead = this.table.children[0];
               //先取高度再移走
               this.tableWrapper.style.paddingTop = thead.getBoundingClientRect().height + 'px';

               copyTable.appendChild(thead);//将thead移动到新新的空表格上
               //被拷贝的元素就没有了
               this.tableWrapper.appendChild(copyTable);//将拷贝后的插入到新的表格中
               copyTable.classList.add('fixed-header')
           }

        },
        methods: {
            sortChange() {
                console.log('排序');
            },
            isChecked(row) {
                return this.selectedItems.some(item => item.id === row.id);
            },
            changeAll(e) {
                console.log(e.target.checked, 'e---');
                this.$emit('update:selectedItems', e.target.checked ? this.data : []);
            },
            changeItem(row, e) {
                let copySelectedItems = _.cloneDeep(this.selectedItems);
                if (e.target.checked) {//选中
                    copySelectedItems.push(row);
                }else {//删除
                    let idx = copySelectedItems.findIndex(item => item.id === row.id)
                    copySelectedItems.splice(idx, 1);
                }
                this.$emit('update:selectedItems', copySelectedItems);
                console.log(copySelectedItems);
            }
        }
    }
</script>

<style scoped lang="stylus">
.table-wrapper {
    width 80%;
    margin 0 auto;
    position relative;
    .scroll-box {
        overflow-y auto;
    }
    .el-table__column-resize-proxy {
        position: absolute;
        left: 200px;
        top: 0;
        bottom: 0;
        /* width: 0; */
        border-left: 1px solid red;
        z-index: 10;
    }
    .fixed-header {
        position absolute;
        top:0;
        left:0;
        width 100%

    }
    .table {
        border-collapse collapse;
        border-spacing 0
        width 100%;
        border 1px solid #ccc;
        &.border {
            border 1px solid #ccc;
        }
        th {
            background-color #ccc
        }
        th, td {
            border-bottom 1px solid #ccc
            padding 5px;
            text-align left
        }
        &.stripe {
            tbody {
                tr:nth-child(even) {
                    background-color #eeeeee
                }
            }
        }

    }


}
</style>