<template>
  <div class="hello">
    <div class="main">
      <h1>{{ msg }}</h1>
      <h6>只是一个简单的基于VUE搭建的前端页面</h6>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return{
      msg:"HelloWorld"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  
    position: absolute;
  top:50%;
  margin-top: -50px;
  margin-left: -220px;
  left: 50%;
  h1{
  margin: 0;
  font-size: 100px;
  color: #fff;
  text-shadow: #000 0px 0px 10px;
  }
  h6{
  font-size: 20px;
  text-shadow: #000 0px 0px 10px;
  text-align: center;
}
}
</style>
