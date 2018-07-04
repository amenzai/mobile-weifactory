<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div class="p15 tc">
      <img src="http://img.weifactory.vastsum.net/mobile-bg.jpg" alt="" width="80%">
    </div>
    <van-cell-group class="mt10">
      <van-field v-model="form.username" placeholder="请输入用户名"/>
      <van-field v-model="form.password" placeholder="请输入密码" type="password"/>
    </van-cell-group>
    <div class="p15">
      <van-button size="large" type="primary" :disabled="isDisabled" @click="submit">登录</van-button>
    </div>
    <p class="fr p15"><span class="blue" @click="$router.push('/register')">注册新用户</span></p>
  </div>
</template>
<script>
import storage from 'good-storage'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '', //  admin
        password: '' //  123456
        // rememberMe: false
      },
      isDisabled: false
    }
  },
  created() {
    storage.session.clear()
  },
  methods: {
    submit() {
      if (!this.form.username && !this.form.password) {
        this.$toast('用户名和密码不能为空')
        return
      }
      this.isDisabled = true
      setTimeout(() => {
        this.isDisabled = false
      }, 3000)
      this.$http
        .post('register/login', this.form)
        .then(res => {
          this.isDisabled = false
          const userData = res.data
          this.$store.commit('UPDATE_USER', userData)
          this.$store.commit('UPDATE_USERID', userData.userId)
          this.$router.push('/index')
        })
        .catch(() => {
          this.isDisabled = false
        })
    }
  }
}
</script>
<style scoped lang="less">
</style>
