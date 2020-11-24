/**
 * rawSource 源数据
 * */
let rawSource = [];
/**
 * rawSourceCount 元数据的记录数，即总行数
 * */
let rawSourceCount = 0;
/**
 * allProps 所有的列对应的属性
 * */
let allProps = [];
/**
 * columns 存放元数据转换后的列数据，一列为一个数组
 * */
let columns = {};
/**
 * mergeCellRule 最终要返回的规则对象
 * */
let mergeCellRule = {};

function getType(val) {
    return Object.prototype.toString
        .call(val)
        .split(' ')[1]
        .slice(0, -1);
}

/**
 * 转换数据，将数据源以列的模式进行存储，一列为一个数组，将转换后的数据存储在columns中
 * */
function transSourceToColumns(raw, allProps) {
    raw.forEach(function(row) {
        allProps.forEach(function(prop) {
            columns[prop].push(row[prop]);
        });
    });
    // console.table(columns);
}
/**
 * 确认要进行合并的列，不需要进行合并的列对应的合并规则始终为1组成的数组
 * */
function initOptions(options) {
    // if(options===undefined){
    //   setNoMergeRule();
    // }
    // options为数组的情况
    // console.log(options);
    if (Array.isArray(options)) {
        if (options.length === 0) {
            setNoMergeRule();
        } else {
            setMergeRuleByArray(options);
        }
    }
}
/**
 * 为不需要合并的列设置规则，如果不指定props，默认为所有列均不合并
 * */
function setNoMergeRule(props) {
    let noMerge = props === undefined ? allProps : props;
    noMerge.forEach(function(prop) {
        mergeCellRule[prop] = new Array(rawSourceCount);
        mergeCellRule[prop].fill(1);
    });
    // console.log(mergeCellRule)
}
/**
 * 根据options数组设置合并规则
 * options中的项有两种情况 字符串 或 数组（表示当前属性依赖的属性）
 * 字符串表示只在当前列进行合并，合并规则为列中的行的值相等
 * 数组表示当前属性依赖的属性，合并规则为列中的行的依赖值相等且当前属性的值相等
 * */
function setMergeRuleByArray(options) {
    let noMerge = allProps.slice(0);
    for (let i = 0, len = options.length; i < len; i++) {
        if (getType(options[i]) === 'String') {
            setRule(columns, options[i]);
            // 从不合并的列集合中过滤掉当前列
            noMerge = filterNoMerge(noMerge, options[i]);
            continue;
        }
        if (getType(options[i]) === 'Object') {
            let key = Object.keys(options[i])[0];
            // 从不合并的列集合中过滤掉当前列
            setRule(columns, key, options[i][key]);
            if (key !== undefined) {
                noMerge = filterNoMerge(noMerge, key);
            }
        }
    }
    setNoMergeRule(noMerge);
}
/**
 * 根据依赖设置合并规则
 * 如果没有提供depend，则只合并当前列，合并依据是行的值相等
 * source Object 数据源
 * prop String 要合并的列对应的属性
 * depend undefined | Array
 * */
function setRule(source, prop, depend) {
    let start = 0;
    let count = 1;
    let columnsSource = source[prop];
    if (columnsSource.length === 1) {
        setRangeRule(mergeCellRule[prop], 0, 1);
    }
    if (!depend || depend.length === 0) {
        for (let i = 1, len = columnsSource.length; i < len; i++) {
            let prev = columnsSource[i - 1];
            let cur = columnsSource[i];
            if (cur === prev) {
                count++;
            } else {
                setRangeRule(mergeCellRule[prop], start, count);
                start = i;
                count = 1;
            }
            if (i === len - 1) {
                setRangeRule(mergeCellRule[prop], start, count);
            }
        }
    } else {
        for (let i = 1, len = columnsSource.length; i < len; i++) {
            let prev = columnsSource[i - 1];
            let cur = columnsSource[i];
            let rs = compareDepend(source, i, depend);
            if (rs && cur === prev) {
                count++;
            } else {
                setRangeRule(mergeCellRule[prop], start, count);
                start = i;
                count = 1;
            }
            if (i === len - 1) {
                setRangeRule(mergeCellRule[prop], start, count);
            }
        }
    }
    // console.log(mergeCellRule);
}
/**
 * 处理依赖比较
 * */
function compareDepend(source, curIndex, depend) {
    return depend.every(function(prop) {
        let prev = source[prop][curIndex - 1];
        let cur = source[prop][curIndex];
        return cur === prev;
    });
}
/**
 * 设置指定范围的合并规则
 * */
function setRangeRule(sourceRule, start, count) {
    // console.log('-------------', count);
    sourceRule[start] = count;
    let i = 1;
    while (i < count) {
        sourceRule[start + i] = 0;
        i++;
    }
}
/**
 * 过滤掉需要合并的列，返回不需要合并的列
 * */
function filterNoMerge(noMerge, prop) {
    return noMerge.filter(function(v) {
        return v !== prop;
    });
}
/**
 * 初始化
 * 获取所有列对应的属性名称
 * 格式化数据源（以列的方式存储数据）
 * 初始化规则对象mergeCellRule
 * */
function init(source, options) {
    // 页面可能有多个表格，闭包原理会造成相互污染，因此要在初始时重新赋值
    rawSource = [];
    rawSourceCount = 0;
    allProps = [];
    columns = {};
    mergeCellRule = {};

    if (source.length <= 0) return;
    rawSource = source;
    rawSourceCount = rawSource.length;
    allProps = Object.keys(rawSource[0]);
    allProps.forEach(function(prop) {
        columns[prop] = [];
        mergeCellRule[prop] = [];
    });
    transSourceToColumns(rawSource, allProps);
    initOptions(options);
}

/**
 * 功能：返回整个表格的合并规则
 * source: 数据源 Array
 * options: 展示在表格中的列的名称，对应source数组中每项中相关的属性，如果不提供，默认展示所有列
 *
 * */
export default function(source, options) {
    init(source, options);
    // console.table(mergeCellRule);
    return mergeCellRule;
}
