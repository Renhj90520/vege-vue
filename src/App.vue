<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
$(document).ready(function () {
    $('.nav a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
});

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5f278482e77ec0bfd33079e7695d62e8";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
import Navbar from './components/shared/NavBar.vue'
export default {
  name: 'app',
  components: {
    appNavbar: Navbar
  }
}
</script>
<style>
/* You can add global styles to this file, and also import other style files */

body {
  padding-top: 50px;
  font-family: 微软雅黑;
}

.container {
  margin: 0;
  padding: 0;
}

.margin {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.padding-all {
  padding: 5px 5px 50px 5px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

.row {
  margin: 0;
}

.paddingvertical {
  padding: 5px 0;
}

.paddinghorizontal {
  padding: 0 5px;
}

.clear {
  clear: both;
}

.pic {
  float: left;
}

.info {
  margin-left: 105px;
  height: 100px;
}

.operator {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  background-color: #eee;
  text-align: center;
  margin: 0;
}

.operator .icon {
  padding-top: 8px;
  line-height: 5px;
  cursor: pointer;
}

.operator .button {
  padding: 15px 0;
  background-color: #f12f30;
  color: #fff;
  cursor: pointer;
}

.font-large {
  font-size: 18px;
}

.font-middle {
  font-size: 16px;
}

.font-small {
  font-size: 14px;
}

.font-smaller {
  font-size: 12px;
}

.gray {
  color: #444;
}

.bold {
  font-weight: bold;
}

.inline {
  width: 60px;
  display: inline;
}

.float-left {
  float: left;
}

.total {
  padding: 15px 0 0 10px;
  text-align: left
}

.center {
  text-align: center;
}

.right {
  float: right;
  padding-right: 10px;
}

.productimg {
  width: 100px;
  height: 100px;
}

.red {
  color: red;
}
</style>


