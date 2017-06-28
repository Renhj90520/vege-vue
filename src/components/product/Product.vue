<template>
    <div class="container">
        <div class="carousel slide" id="pictures" date-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#pictures" :data-slide-to="i" :class="{active:i==0}" v-for="(picture,i) in product.Pictures" :picture="picture" :i="i"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="item" v-for="(picture,i) in product.Pictures" :picture="picture" :i="i" :class="{active: i==0}">
                    <img class="img-responsive" :src="picture.Path" alt="pic" width="100%" height="300px">
                </div>
            </div>
            <a class="left carousel-control" data-slide="prev" href="#pictures" role="button">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" data-slide="next" href="#pictures" role="button">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="infodetail padding-all" v-if="product">
            <p class="font-middle gray bold">{{product.Name}}</p>
            <p class="font-small gray">{{product.Description}}</p>
            <p class="font-large red bold">￥{{product.Price}}/{{product.UnitName}}</p>
            <div>
                <button class="btn btn-primary btn-xs" @click="onDecrease">
                    <i class="glyphicon glyphicon-minus">
                    </i>
                </button>
                <input class="form-control inline" type="number" disabled :min="product.Step" v-model="product.Count">
                <button class="btn btn-primary btn-xs" @click="onIncrease">
                    <i class="glyphicon glyphicon-plus"></i>
                </button>
            </div>
            <p>{{product}}</p>
        </div>
        <div class="operator row">
            <div class="col-xs-3 icon">
                <p class="glyphicon glyphicon-heart-empty" @click="addFav(product.Id)" v-if="!isFavorite"></p>
                <p class="glyphicon glyphicon-heart red" @click="removeFav" v-if="isFavorite"></p>
                <p>关注</p>
            </div>
            <div class="col-xs-3 icon" @click="onCartClick">
                <p class="glyphicon glyphicon-shopping-cart"></p>
                <p>购物车</p>
                <span class="badge badge-importabt fixed">{{productInCart.length}}</span>
            </div>
            <div class="col-xs-6 button" @click="onAddCart">加入购物车</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { baseUrl } from '../shared/settings.js'
var utils = require('../shared/utils.js')
export default {
    data() {
        return {
            product: {},
            isFavorite: false,
            productInCart: [],
            favorite: {}
        }
    },
    created() {
        axios.get(baseUrl + 'products/' + this.$route.params.id)
            .then(res => {
                this.product = res.data.body.items[0];
                this.product.Count = 0;
                // this.product = res.data.body.items[0];
                this.productInCart = JSON.parse(sessionStorage.getItem('cartproducts')) || [];
                let pp = this.productInCart.find(p => p.Id == this.product.Id);
                if (pp) {
                    this.product.Count = pp.Count;
                    let index = this.productInCart.indexOf(pp);
                    this.productInCart[index] = this.product;
                } else {
                    this.product.Count = this.product.Step;
                }
            }).catch(function (err) {
                console.log(JSON.stringify(err))
            });
        let openid = sessionStorage.getItem('openid');
        let url = baseUrl + 'favorites/' + openid + '/' + this.$route.params.id;
        axios.get(url)
            .then(res => {
                if (res.data.state == 1) {
                    this.favorite = res.data.body;
                    if (this.favorite)
                        this.isFavorite = true;
                } else {
                    alert(res.data.message)
                }
            }).catch(function (err) {
                alert(err)
            })
    }, methods: {
        onDecrease() {
            this.product.Count = utils.subtraction(this.product.Count, this.product.Step)
            if (this.product.Count < this.product.Step) {
                this.product.Count = this.product.Step
            }
        },
        onIncrease() {
            this.product.Count = utils.add(this.product.Count, this.product.Step)
        },
        addFav() {
            let openid = sessionStorage.getItem('openid')
            axios.post(baseUrl + 'favorites', { OpenId: openid, ProductId: this.product.Id })
                .then(res => {
                    if (res.data.state == 1) {
                        this.isFavorite = true
                    }
                })
        },
        onCartClick() {
            sessionStorage.setItem('cartproducts', JSON.stringify(this.productInCart))
            this.$router.push('/cart')
        },
        onAddCart() {
            let pc = this.productInCart.find(p => p.Id == this.product.Id)
            if (!pc) {
                this.productInCart.push(this.product);
            } else {
                alert('该商品已加入购物车！');
            }
        },
        removeFav() {
            axios.delete(baseUrl + 'favorites/' + this.favorite.Id)
                .then(res => {
                    if (res.data.state == 1) {
                        this.isFavorite = false
                    }
                })
        }
    }
}
</script>
<style scoped>
.fixed {
    position: absolute;
    top: 16px;
    right: 4px;
}

.badge-importabt {
    background-color: #f12f30;
}

#pictures {
    min-height: 260px;
}

.carousel-inner>.item>img {
    height: 300px;
}
</style>
