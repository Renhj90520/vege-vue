<template>
    <div class="container">
        <div class="padding-all">
            <div class="address-list">
                <p v-for="(address,i) in addresses">
                    <span>
                        <input :id="'add'+i" name="address" type="radio" v-model="address.ischecked" @change="onAddressChange(address)">
                        <label :for="'add'+i">{{address.Street}}</label>
                        <br> {{address.Name}} {{address.Phone}}</span>
                    <span class="right">
                        <i class="glyphicon glyphicon-remove" role="button" @click="onAddrRemove(address)"></i>
                    </span>
                </p>
                <button class="btn btn-primary" data-target="#addaddress" data-toggle="modal">新建地址</button>
    
                <div class="modal fade" id="addaddress">
                    <div class="jumbotron">
                        <form method="post">
                            <div class="form-group">
                                <label for="username">姓名</label>
                                <input v-validate="required" class="form-control" id="username" name="username" type="text" v-model="newAddr.Name">
                                <p class="error-label" v-show="fields.username&&fields.username.touched&&errors.has('username')">姓名不能为空</p>
                            </div>
                            <div class="form-group">
                                <label for="userphone">电话</label>
                                <input v-validate="'required'" class="form-control" id="userphone" name="userphone" type="number" v-model="newAddr.Phone">
                                <p class="error-label" v-show="fields.userphone&&fields.userphone.touched&&errors.has('userphone')">电话不能为空</p>
                            </div>
                            <div class="form-group">
                                <span>新疆省</span>
                                <span>昌吉市</span>
                            </div>
                            <div class="form-group">
                                <label for="userstreet">详细地址</label>
                                <input v-validate="required" class="form-control" id="userstreet" name="userstreet" type="textarea" v-model="newAddr.Street">
                                <p class="error-label" v-show="fields.userstreet&&fields.userstreet.touched&&errors.has('userstreet')">详细地址不能为空</p>
                            </div>
                            <button class="btn btn-primary" data-target="#addaddress" data-toggle="modal" type="submit" @click="onAddAddress">添加</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12 paddingvertical" v-for="product in products">
                    <div class="pic">
                        <img class="productimg img-responsive" :src="product.Pictures[0].Path" alt>
                    </div>
                    <div class="info">
                        <p class="name">{{product.Name}}</p>
                        <p class="name red bold">￥{{product.Price}}/{{product.UnitName}}
                            <span class="right">
                                <button class="btn btn-primary btn-xs" @click="onDecrease(product)">
                                    <i class="glyphicon glyphicon-minus"></i>
                                </button>
                                <input class="form-control inline" type="number" disabled v-model="product.Count" min="0">
                                <button class="btn btn-primary btn-xs" @click="onIncrease(product)">
                                    <i class="glyphicon glyphicon-plus"></i>
                                </button>
                            </span>
                        </p>
                        <p class="item-total red bold">小计：￥{{product.Cost}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="operator row">
            <div class="col-xs-8 total red bold">总计:￥{{totalCost}}
                <span class="red bold" v-if="hasDelivery">含运费￥5(满20免运费)</span>
            </div>
            <div class="col-xs-4 button" @click="gotoOrders">确认购买</div>
        </div>
    </div>
</template>
<script>
import { baseUrl } from '../shared/settings.js'
import axios from 'axios'
var utils = require('../shared/utils.js')
export default {
    data() {
        return {
            addresses: [],
            newAddr: {},
            products: [],
            totalCost: 0,
            hasDelivery: false,
            checkedaddress: {}
        }
    },
    created() {
        let openid = sessionStorage.getItem('openid');
        axios.get(baseUrl + 'addresses/' + openid)
            .then(res => {
                if (res.data.state == 1) {
                    this.addresses = res.data.body
                    if (this.addresses && this.addresses.length > 0) {
                        this.checkedaddress = addresses[0]
                    }
                } else {
                    alret(res.data.message)
                }
            }).catch(err => {
                alert(err)
            })
        this.products = JSON.parse(sessionStorage.getItem("cartproducts")) || [];
        this.products.forEach(p => { p.Cost = utils.mutiple(p.Count, p.Price) });
        this.handleDelievery();
    },
    methods: {
        onAddAddress() {
            let openid = sessionStorage.getItem('openid') || '123';//TODO
            this.newAddr.OpenId = openid;
            axios.post(baseUrl + 'addresses', this.newAddr)
                .then(res => {
                    if (res.data.state == 1) {
                        this.checkedaddress = res.data.body
                        this.addresses.push(res.data.body)
                    }
                }).catch(err => {
                    alert(err)
                })
        },
        gotoOrders() {
            let address = this.addresses.filter(a => a.ischecked);
            if (address && address.length > 0) {
                let openid = sessionStorage.getItem('openid');
                let order = {
                    // createtime: this.getNow(),
                    DeliveryCharge: 0,
                    State: 0, AddressId: address[0].Id, OpenId: openid, products: this.products.map(p => {
                        return { ProductId: p.Id, Count: p.Count, Price: p.Price }
                    })
                };
                if (this.hasDelivery) {
                    order.DeliveryCharge = 5;
                }
                this.orderService.addOrder(order, null)
                    .subscribe(res => {
                        if (res.state == 1) {
                            this.router.navigate(['orderlist'], { replaceUrl: true });
                            sessionStorage.removeItem('cartproducts');
                        } else {
                            alert(res.message);
                        }
                    }, err => {
                        if (err) {
                            alert(err);
                        }
                    })
            } else {
                alert('请填选地址');
            }
        },
        onDecrease(product) {
            product.Count = utils.subtraction(product.Count, product.Step);
            if (product.Count < 0) {
                product.Count = 0;
            }
            product.Cost = utils.mutiple(product.Count, product.Price);
            this.handleDelievery();
            sessionStorage.setItem("cartproducts", JSON.stringify(this.products));
        },
        onIncrease(product) {
            product.Count = utils.add(product.Count, product.Step);
            product.Cost = utils.mutiple(product.Count, product.Price);

            this.handleDelievery();
            sessionStorage.setItem("cartproducts", JSON.stringify(this.products));
        },
        handleDelievery() {
            let total = this.products.map(p => utils.mutiple(p.Price, p.Count)).reduce((x, y) => utils.add(x, y));
            if (total < 20 && total > 0) {
                this.hasDelivery = true;
                this.totalCost = utils.add(total, 5);
            } else {
                this.hasDelivery = false;
                this.totalCost = total;
            }
        }
    }
}
</script>
<style scoped>
.modal {
    padding: 20px;
}

.item-total {
    font-size: 16px;
    color: red;
}

.error-label {
    font-size: 14px;
    color: red;
    margin-top: 5px;
}
</style>
