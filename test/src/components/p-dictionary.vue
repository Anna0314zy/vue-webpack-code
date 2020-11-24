<template>
    <div class="p-dictionary">
        <!--下拉-->
        <template v-if="type === 'select'">
            <el-select clearable v-model="currentValue" :placeholder="placeholder" size="mini" :disabled="disabled">
                <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.value"></el-option>
            </el-select>
        </template>
        <!--下拉多选-->
        <template v-if="type === 'select-multiple'">
            <el-select
                clearable
                v-model="currentValue"
                multiple
                collapse-tags
                :placeholder="placeholder"
                size="mini"
                :disabled="disabled"
            >
                <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.value"></el-option>
            </el-select>
        </template>

        <!--单选-->
        <template v-else-if="type === 'radio'">
            <el-radio-group v-model="currentValue">
                <el-radio v-for="(item, idx) in list" :key="idx" :label="item.value" :disabled="disabled"
                    >{{ item.name }}
                </el-radio>
            </el-radio-group>
        </template>

        <!--多选-->
        <template v-else-if="type === 'checkbox'">
            <el-checkbox-group v-model="currentValue">
                <el-checkbox v-for="(item, idx) in list" :label="item.value" :key="idx">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </template>
    </div>
</template>
<script>
import * as api from '../js/api.js';
import * as utils from '../js/utils.js';

/**
 * p-dictionary
 * 封装的字典组件，支持radio、下拉框两种布局方式
 *              -- Author by Dio Zhu. on 2019-3-25
 * 新增checkbox
 *              -- Author by zouyu on 2019-7-8
 */
export default {
    name: 'p-dictionary',
    props: {
        type: {
            // 样式，默认：radio， select
            type: String,
            default: 'radio'
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        code: String, // 要查询的字典code
        // value值
        value: {
            type: [String, Number, Array],
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        disabled: Boolean
    },
    data() {
        return {
            trueName: this.$options.name + '_' + this._uid, // 当前组件名（多组件同屏刷新，注册事件用）
            currentValue: this.value, // 当前数据
            current: '', // 当前字典项对象，可用于检索
            currentDisabled: this.disabled, // 可用标识
            list: [],

            // select 下拉多选
            currentValueList: []
        };
    },
    watch: {
        value: {
            handler(val) {
                if (typeof val === 'object') {
                    this.currentValue = val;
                } else {
                    this.currentValue = Number(val) ? Number(val) : val;
                }
            },
            deep: true,
            immediate: true
        },
        currentValue(val) {
            this.$emit('input', val);
            let obj = this.list.find(v => v.value === val);
            if (obj && obj.name) this.current = obj;
        },
        current(val) {
            this.$emit('handleChange', val);
        },
        disabled(val) {
            this.currentDisabled = val;
        },
        currentDisabled(val) {
            this.$emit('handleDisabled', val);
        }
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 数据初始化。 Author by Dio Zhu. on 2019.3.18
            // console.log(`p-dictionary.${this._uid}.init...`, this.trueName);
            this.getDictionary().then(res => {
                if (!res || !res.length) return;
                [].forEach.call(res, v => {
                    // 变更value的类型，把字符串改为number，数据库业务表记录的都是整形，后台接口继承修改麻烦，前端处理。 Author by Dio Zhu. on 2019.4.19
                    v.value = Number(v.value) ? Number(v.value) : v.value;
                });
                this.list = res;
                // this.currentValue = res[0].id; // 默认值
                this.setCache(res); // 设置缓存
            });
        },
        getDictionary() {
            // return Promise.resolve([
            //     { id: this.code + '_ID_1', name: '测试项1', value: this.code + '_VALUE_1' },
            //     { id: this.code + '_ID_2', name: '测试项2', value: this.code + '_VALUE_2' },
            //     { id: this.code + '_ID_3', name: '测试项3', value: this.code + '_VALUE_3' },
            //     { id: this.code + '_ID_4', name: '测试项4', value: this.code + '_VALUE_4' },
            //     { id: this.code + '_ID_5', name: '测试项5', value: this.code + '_VALUE_5' },
            //     { id: this.code + '_ID_6', name: '测试项6', value: this.code + '_VALUE_6' }
            // ]);
            // // TODO:以下是正式代码，以上是测试代码，待数据库初始化数据后，切回正式代码。 Author by Dio Zhu. on 2019.3.29
            // 获取对应code的字典项list
            let cached = this.getCache(this.code); // 优先查看缓存，如果有，直接返回
            // console.log('p-dictionary.getDictionary.cached: ', cached);
            if (cached && cached.length) return Promise.resolve(cached);
            // session没有缓存的，拉接口
            return api.getDictionaryItemByCode({ code: this.code }).then(res => {
                // console.log(res);
                return res;
            });
        },
        setCache(obj) {
            // 获取数据后cache，保存在session中。 Author by Dio Zhu. on 2019.3.21
            utils.getSessionStorage('SYSTEM').set(this.code, JSON.stringify(obj));
        },
        getCache(code) {
            // 从session中获取缓存。 Author by Dio Zhu. on 2019.3.21
            let obj = utils.getSessionStorage('SYSTEM').get(code);
            if (!obj) return [];
            return JSON.parse(obj);
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.p-dictionary {
}
</style>
