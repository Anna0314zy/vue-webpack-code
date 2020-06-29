<template>
<div>
    <ul v-if="!render">
        <li v-for="l in list" :key="l">
            {{l}}
        </li>
    </ul>
    <template v-else>
       <div v-for="l in list" :key="l">
            <List :render="render" :a="l"></List>
       </div>
    </template>
</div>
</template>    

<script>
import List from './list.js'
export default{
    props:['list', 'render'],
    components: {List}
}
</script>