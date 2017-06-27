<template>
    <div class="container">
        <div class="padding-all">
            <p class="center">
                <i class="glyphicon glyphicon-list-alt"></i>我的订单</p>
            <hr>
            <div class="order-list">
                <div class="order-item" v-for="order in orders">
                    <p>
                        <span class="left">{{order.State|orderstate}}</span>
                        <span class="red" v-if="order.State==2">{{order.CancelReason}}</span>
                    </p>
                    <p>{{order.CreateTime|mydate}}</p>
                    <router-link tag="a" class="col-xs-12 paddingvertical" :to="{path:'productdetail',params:{id:product.Id}}" v-for="product in order.Products">
                        <div class="clear">
                            <div class="pic">
                                <img class="productimg img-responsive" :src="product.Pictures[0].Path" alt>
                            </div>
                            <div class="info">
                                <p class="font-middle gray">{{product.Name}}</p>
                                <p class="font-middle gray">数量：{{product.Count}}</p>
                                <p class="font-large bold red">￥{{product.Price}}/{{product.UnitName}}</p>
                            </div>
                        </div>
                        </a>
                        <p>共{{order.Products.length}}件商品 合计
                            <span class="red bold">￥{{order.total}}
                                <span class="red bold" v-if="order.DeliveryCharge>0">含￥{{order.DeliveryCharge}}运费</span>
                            </span>
                        </p>
                        <p></p>
                        <hr>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orders: []
        }
    }
}
</script>
