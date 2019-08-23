<template>
  <div class="hello">
    <div class="main">
      <el-form :model="ruleForm" label-position="top" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "login",
  data() {
      return {
        ruleForm: {
          userName:"",
          password: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 16, message: '字母数字下划线', trigger: 'blur',pattern:/^\w+$/ }
          ],
          password: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 16, message: '请输入正确的密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions(["handleLogin"]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleLogin(this.ruleForm).then(()=>{
              this.$router.replace({
                name:"home"
              })

            }).catch(err=>{
              
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: url("~@/assets/img/loginbg.jpg") 0/100% no-repeat;
  .main{
    position: absolute;
    top:50%;
    margin-top: -150px;
    margin-left: -200px;
    left:50%;
    width: 400px;
    height: 300px;
    background-color: rgba(256,256,256,.6);
    padding: 15px;
  }
}
</style>
