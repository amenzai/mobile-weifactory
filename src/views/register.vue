<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <van-tabs type="card" class="mt10" @click="switchTab">
      <van-tab title="普通用户"></van-tab>
      <van-tab title="专家"></van-tab>
    </van-tabs>
    <van-cell-group class="mt10">
      <van-field v-model="form.userName" placeholder="请输入用户名" />
      <van-field v-model="form.userPassword" placeholder="请输入密码" type="password" />
      <van-field v-model="form.enpassword" placeholder="请确认密码" type="password" />
      <van-field v-model="form.userEmail" placeholder="请输入邮箱" />
      <van-field v-model="form.userPhone" placeholder="请输入手机号" />
      <van-field center v-model="form.codeNum" label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="sendCode" :loading="smslogining" :disabled="smsDis">{{ smsText }}</van-button>
      </van-field>
    </van-cell-group>
    <p class="gray p15">密码长度不少于八位字符且包含数字和字母</p>
    <div class="p15">
      <van-button size="large" type="primary" :loading="logining" @click="submit">注册</van-button>
    </div>
    <p class="fr p15">已有账号？<span class="blue" @click="$router.push('/login')">立即登录</span></p>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      logining: false,
      smslogining: false,
      smsText: "获取验证码",
      smsDis: false,
      form: {
        roleId: 2,
        userName: "",
        userPassword: "",
        enpassword: "",
        userEmail: "",
        userPhone: "",
        codeNum: ""
      }
    }
  },
  methods: {
    switchTab(i) {
      if (i === 0) {
        this.form.roleId = 2
      } else {
        this.form.roleId = 4
      }
      console.log(i)
    },
    sendCode() {
      const mobileReg = /^1[34578]\d{9}$/
      if (!this.form.userPhone || !mobileReg.test(this.form.userPhone)) {
        this.$toast('请输入正确的手机号')
        return
      }
      this.smslogining = true;
      const send = {
        cell: this.form.userPhone
      };
      this.$http
        .post("register/smsCode", send)
        .then(res => {
          this.smslogining = false;
          this.smsDis = true;
          var count = 120;
          var ret = setInterval(() => {
            --count;
            if (count === 0) {
              this.smsDis = false;
              this.smsText = "获取验证码";
              clearInterval(ret);
            } else {
              this.smsText = "重新发送(" + count + "s)";
            }
          }, 1000);
        })
        .catch(() => {
          this.smslogining = false;
        });
    },
    submit() {
      const passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!this.form.userName || !this.form.userPassword || !this.form.enpassword || !this.form.userEmail || !this.form.userPhone || !this.form.codeNum) {
        this.$toast('以上每一项都要填哟')
        return
      }
      if (!passReg.test(this.form.userPassword)) {
        this.$toast('密码格式不正确')
        return
      }
      if (!emailReg.test(this.form.userEmail)) {
        this.$toast('邮箱格式不正确')
        return
      }
      if (this.form.enpassword !== this.form.userPassword) {
        this.$toast('两次输入的密码不一致')
        return
      }
      this.logining = true
      setTimeout(() => {
        this.logining = false
      }, 3000)
      this.$http
        .post("register/doRegister", this.form)
        .then(res => {
          this.logining = false;
          if (this.form.roleId === 4) {
            this.$router.push("/audit");
          } else {
            this.$dialog.alert({
              title: '提示',
              message: '注册成功，马上登录'
            }).then(() => {
              this.$router.push("/login");
            })
          }
        })
        .catch(() => {
          this.logining = false;
        });
    }
  }
}
</script>
<style scoped lang="less">
</style>
