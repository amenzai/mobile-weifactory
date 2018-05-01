<template>
  <div>
    <x-header :left-options="{showBack: false}">用户登录</x-header>
    <group class="weui-cells_form">
      <x-input title="用户名" name="username" placeholder="请输入用户名" required v-model="userInfo.username"></x-input>
      <x-input title="密码" name="password" placeholder="请输入密码" required v-model="userInfo.password" type="password"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="submit">登录</x-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      window.sessionStorage.clear();
    },
    methods: {
      submit() {
        if (!this.userInfo.username) {
          this.$vux.toast.show({
            text: '请输入用户名',
            type: 'warn'
          })
          return
        } else if (!this.userInfo.password) {
          this.$vux.toast.show({
            text: '请输入密码',
            type: 'warn'
          })
          return
        }
        this.$ajax.post('register/login', this.userInfo).then(res => {
          this.$store.commit('UPDATE_USERID', res.data.userId);
          this.$vux.toast.show({
            text: '登录成功',
            time: 1000,
            type: 'success'
          })
          this.$router.push('/')
        })
      }
    }
  }
</script>
