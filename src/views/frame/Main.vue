<template>
<el-container class="container">
  <el-header class="header" style="padding:0">
    <div class="flexheader">
      <div class="flexheaderlt">
        <i @click="isCollapseFolder" :class="[isCollapse ? 'el-icon-folder' : 'el-icon-folder-opened']"></i>
        <img src="~@assets/img/github.jpg" alt="logo" height="60">
      </div>
      <div class="flexheaderrt">
        <div class="user">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="avatar" src="~@assets/img/gmd.jpg" alt="logo">
              HK<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-header>
  <el-container>
    <Aside :is-collapse.sync="isCollapse"></Aside>
    <el-main class="main">
      <transition name="el-fade-in" mode="out-in">
      <router-view />
      </transition>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from "@com/Aside.vue";
import {mapActions} from 'vuex';
  export default {
    components:{
      Aside
    },
    data() {
      return {
       isCollapse:true
      }
    },
    methods:{
       ...mapActions(["handleLoginOut"]),
      isCollapseFolder(){
        this.isCollapse=!this.isCollapse;
      },
      handleCommand(command) {
        if(command=="loginout"){
          this.handleLoginOut().then(()=>{
            this.$router.replace({
                name:"login"
              })
          }).catch(err=>{

          })
        }
        // this.$message('click on item ' + command);
      }
    },
  };
</script>

<style lang="scss">
  .container{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    min-width: 1200px;
    .header{
      background-color: #545c64;
      .flexheader{
        display: flex;
        .flexheaderlt{
          flex:none;
          i{
            position: absolute;
            top:20px;
            left: 13px;
            font-size: 20px;
          }
          img{
            margin-left:47px;
          }
        }
        .flexheaderrt{
          flex:auto;
          .user{
            float: right;
            margin-top: 10px;
            margin-right: 20px;
            .avatar{
              height: 40px;
              width: 40px;
              border-radius: 100%;
              vertical-align: middle;
            }
            .el-dropdown-link {
              cursor: pointer;
              color: #fff;
            }
            .el-icon-arrow-down {
              font-size: 12px;
            }
          }
        }
      }
    }
    .aside{
      background: #545c64;
    font-size: 12px;
    border-top: 1px solid #777;
    transition: all .2s ease-in-out;
    }
    .main{
      background-color: aliceblue
    }
    
  }
  .el-menu{
    border-right: none;
  }
</style>