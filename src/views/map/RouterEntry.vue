<template>
  <div>
    <el-button type="primary" @click="showmap">showmap</el-button>
    <el-button type="primary" @click="addmaker">addmaker</el-button>
    <el-button type="primary" @click="renmovemaker">renmovemaker</el-button>
    <div id="container"></div>
  </div>
</template>

<script>
import loadScripts from "@/utils/script-util.js";
import gmd from "@/assets/img/logo.png";
export default {
  name: "amap",
  data() {
    return {
      map: null,
      marker: null,
      markerlist: [],
      icon: null
    };
  },
  beforeRouteEnter(to, form, next) {
    loadScripts(
      "https://webapi.amap.com/maps?v=1.4.15&key=f5b5a98b3d64458995363870a5713cbf"
    ).then(() => {
      next();
    });
  },
  created() {},
  methods: {
    showmap() {
      this.map = new window.AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      // map.remove(marker)
    },
    addmaker() {
      // 创建 AMap.Icon 实例：
      this.icon = new window.AMap.Icon({
        size: new window.AMap.Size(30, 40), // 图标尺寸
        image: gmd, // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new window.AMap.Size(30, 40) // 根据所设置的大小拉伸或压缩图片
      });

      // 将 Icon 实例添加到 marker 上:
      // this.marker = new AMap.Marker({
      //     position: new AMap.LngLat(116.39, 39.9),
      //     offset: new AMap.Pixel(-15, -40),
      //     icon: this.icon, // 添加 Icon 实例
      //     title: '北京',
      //     zoom: 13
      // });
      this.markerlist = [
        new window.AMap.Marker({
          position: new window.AMap.LngLat(116.405467, 39.907761),
          offset: new window.AMap.Pixel(-15, -40),
          icon: this.icon, // 添加 Icon 实例
          title: "北京",
          zoom: 13
        }),
        new window.AMap.Marker({
          position: new window.AMap.LngLat(116.39, 39.9),
          offset: new window.AMap.Pixel(-15, -40),
          icon: this.icon, // 添加 Icon 实例
          title: "北京",
          zoom: 13
        }),
        new window.AMap.Marker({
          position: new window.AMap.LngLat(116.397428, 39.90923),
          offset: new window.AMap.Pixel(-15, -40),
          icon: this.icon, // 添加 Icon 实例
          title: "北京",
          zoom: 13
        }),
        new window.AMap.Marker({
          position: new window.AMap.LngLat(116.418481, 39.90833),
          offset: new window.AMap.Pixel(-15, -40),
          icon: this.icon, // 添加 Icon 实例
          title: "北京",
          zoom: 13
        })
      ];
      this.map.add(this.markerlist);
    },
    renmovemaker() {
      // this.marker.setIcon(this.icon);
      this.map.clearMap();
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 600px;
  height: 400px;
}
</style>
