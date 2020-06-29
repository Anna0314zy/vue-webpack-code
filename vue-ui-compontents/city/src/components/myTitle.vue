<template>
<div>
    <h1 v-if="type === 1" :fn="say">
        <slot></slot>
    </h1>
</div>
</template>    
<script>
export default{
    props:['type'],
    methods: {
          say() {
            alert(1)
        }
    }
}
</script>