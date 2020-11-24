<template>
<div>
  <cube-form :model="model" @submit="submitHandler">
    <MHeader>登录</MHeader>
<!--    <my-co></my-co>-->
    <cube-form-group>
      <cube-form-item :field="fields[0]"></cube-form-item>
      <cube-form-item :field="fields[1]"></cube-form-item>
    </cube-form-group>
    <cube-form-group>
      <cube-button type="submit">Submit</cube-button>
    </cube-form-group>
  </cube-form>

</div>
</template>

<script>
import { mapActions } from 'vuex';

import * as types from '@/store/action-type';

import MHeader from '@/components/MHeader.vue';

// import loadable from '../../utils/loadable.vue';

// import p  from '../Profile/index.vue'

export default {
  components: {
    MHeader
    // myCo: loadable(() => import('../Profile/index.vue')),
  },
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      fields: [
        {
          type: 'input',
          modelKey: 'username',
          label: '用户名',
          props: {
            placeholder: '请输入用户名',
          },
          rules: {
            required: true,
          },
        },
        {
          type: 'input',
          modelKey: 'password',
          label: '密码',
          props: {
            placeholder: '请输入用户名',
          },
          rules: {
            required: true,
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([types.LOGIN]),
    async submitHandler(e) {
      e.preventDefault();
      try {
        await this[types.LOGIN](this.model);
        //登录 从哪个页面跳转过来的 待会跳转回去呢
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="stylus">
  .login {
    &-form {
      width: 80%;
      margin: 0 auto;

      img {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        display: block;
        margin-bottom: 40px;
      }
    }
  }
</style>
