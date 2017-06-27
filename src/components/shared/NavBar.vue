<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button class="navbar-toggle collapsed" data-target="#navbar" data-toggle="collapse">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">生鲜派送</a>
    </div>
    <div class="navbar-collapse collapse" id="navbar">
      <ul class="nav navbar-nav">
        <router-link tag="li" active-class="active" to="/productlist"><a>商品列表</a></router-link>
        <router-link tag="li" active-class="active" to="/cart"><a>购物车</a></router-link>
        <router-link tag="li" active-class="active" to="/orderlist"><a>我的订单</a></router-link>
        <router-link tag="li" active-class="active" to="/favorite"><a>我的收藏</a></router-link>
      </ul>
    </div>
  </div>
</nav>
</template>
