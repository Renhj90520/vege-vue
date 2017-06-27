<template>
    <div>
        <div class="cart-empty padding-all" v-if="products==null||products.length==0">
            <p>
                <i class="glyphicon glyphicon-shopping-cart"></i>购物车是空的</p>
            <hr>
            <div class="recommandation">
                <p>为你推荐</p>
                <div class="row">
                    <router-link class="col-xs-6 col-sm-4 col-md-3 paddinghorizontal" tag="a" :to="{name:'productdetail',params:{id:suggestion.Id}}" v-for="suggestion in suggestions">
                        <div class="suggest-item">
                            <img class="img-responsive" :src="suggestion.Pictures[0].Path" alt>
                            <div class="suggest-item-info">
                                <p class="font-middle gray">{{suggestion.Name}}</p>
                                <p class="font-smaller gray" *ngIf="suggestion.Description.length>30">{{suggestion.Description.substring(0,30)+'...'}}</p>
                                <p class="font-smaller gray" *ngIf="suggestion.Description.length<=30">{{suggestion.Description}}</p>
                                <p class="font-large bold red">￥{{suggestion.Price}}/{{suggestion.UnitName}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    
        <div class="cart-info padding-all" v-if="products!=null&&products.length>0">
            <h5>选购的商品</h5>
            <hr>
            <div class="cart-list">
                <div class="cart-item" v-for="product in products">
                    <div class="float-left">
                        <img class="productimg img-responsive" :src="product.Pictures[0].Path" alt>
                    </div>
                    <div class="item-info">
                        <p class="font-large">{{product.Name}}</p>
                        <p class="red bold">￥{{product.Price}}/{{product.UnitName}}</p>
                        <p>
                            <button class="btn btn-primary btn-xs" @click="onDecrease(product)">
                                <i class="glyphicon glyphicon-minus"></i>
                            </button>
                            <input class="form-control inline" type="number" disabled v-model="product.Count" min="0">
                            <button class="btn btn-primary btn-xs" @click="onIncrease(product)">
                                <i class="glyphicon glyphicon-plus"></i>
                            </button>
                        </p>
                    </div>
                    <p class="red bold">小计：￥{{product.Cost}}</p>
                </div>
            </div>
    
            <div class="operator row">
                <div class="col-xs-8 total red bold">总计:￥{{totalCost}}
                    <span class="red bold" v-if="hasDelivery">含运费￥5(满20免运费)</span>
                </div>
                <div class="col-xs-4 button" @click="gotoOrder()">填选地址</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            products: [],
            suggestions: []
        }
    }
}
</script>
<style scoped>
.cart-info {
    padding-top: 10px;
}

.cart-info h5 {
    text-align: center;
}

.item-info {
    margin-left: 105px;
}

.cart-empty>p,
.recommandation>p {
    text-align: center;
}

.recommandation p {
    margin-bottom: 0px;
}

.row {
    margin: 0;
}

.suggest-item {
    height: 200px;
    overflow: hidden;
    position: relative;
    margin-bottom: 5px;
}

.suggest-item img {
    width: 100%;
    height: 100px;
}

.suggest-item-info p:nth-child(3) {
    position: absolute;
    bottom: 2px;
}
</style>

