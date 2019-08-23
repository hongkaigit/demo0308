<template>
<el-aside class="aside" :width=" isCollapse ? '65px':'200px' ">
  <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>参数配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/version">版本管理</el-menu-item>
          <el-menu-item index="/hotfix">热更新</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>A/B test</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/abtest">功能配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
       <el-menu-item index="5" disabled="">
        <i class="el-icon-location"></i>
        <span slot="title">开发中</span>
      </el-menu-item>
    </el-menu>
</el-aside>
</template>

<script>
import { type } from 'os';
export default {
  name:"Aside",
  data(){
    return {
      
    }
  },
  props:{
      isCollapse:{
        type:Boolean,
        default:true
      }
    },
  methods:{
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(index,indexpath){
      // console.log(index,indexpath);
       this.$router.push({
        path:index
      })
    }
  },
  watch:{
    isCollapse(newval){
      this.$emit("update:isCollapse",newval);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>