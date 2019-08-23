<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
  <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
    <el-breadcrumb-item>参数配置</el-breadcrumb-item>
    <el-breadcrumb-item>版本管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btngroup">
      <el-button type="primary"  icon="el-icon-brush" @click="handelFilter">筛选</el-button>
      <el-button type="primary"  icon="el-icon-plus" @click="handelAdd">新增</el-button>
    </div>
    <!-- <transition name="el-fade-in" mode="out-in"> -->
    <div class="filterbox" v-show="showfilter">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label=" 版本号">
          <el-input v-model="formInline.verisonNO" placeholder="请输入版本号" clearable></el-input>
        </el-form-item>
        <el-form-item label="APP">
          <el-select v-model="formInline.app" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="App1" value="App1"></el-option>
            <el-option label="App2" value="App2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- </transition> -->
    <el-table
    :data="tableData"
    stripe
    style="width: 100%;margin-top:10px;">
    <el-table-column
      prop="versionNo"
      label="版本号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="APP">
    </el-table-column>
    <el-table-column
      prop="sys"
      label="系统">
    </el-table-column>
     <el-table-column
      prop="type"
      label="更新方式">
    </el-table-column>
    <el-table-column
      prop="state"
      label="生效状态">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-dialog title="新增版本" :visible.sync=" dialogFormVisible">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" height="200">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
 data(){
   return{
     formInline:{
       verisonNO:"",
       app:""
     },
     showfilter:false,
     tableData: [],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogFormVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
   }
 },
 async created(){
   let{
     versionList=[],
     total=0
   }=await this.$service({
     url:"/parameter/version/list.json",
     method:"get",
     data:{
       page:1
     }
   }).then(res=>{
     if(res.data.resultCode=="0000"){
       return res.data.data;
     }else{{
       return {}
     }}
   }).catch(function (error) {
    console.log(error);
    return {};
  });
  this.tableData=versionList;
 },
 methods:{
   handelFilter(){
     this.showfilter=!this.showfilter
   },
   handelAdd(){
     this.dialogFormVisible=true;
   },
   onSubmit(){

   },
   resetForm(formName){
     this.$refs[formName].resetFields();
   },
   handleEdit(index, row){
     console.log(index, row);
   },
   handleDelete(index, row){
     console.log(index, row);
   }
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb{
  background-color: #eee;
  padding: 10px;
}
.btngroup{
  float: right;
  margin: 40px 0 10px 0;
  height: 40px;
}
.filterbox{
  clear: both;
  background-color: #eee;
  padding: 15px;
}
.el-form-item{
  margin-bottom: 0
}
</style>
