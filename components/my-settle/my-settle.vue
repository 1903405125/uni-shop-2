<template>
	<view>
		<!-- 最外层的容器 -->
		<view class="my-settle-container">
			<!-- 全选区域 -->
			<label class="radio" @click="changeAllState">
				<radio color="#C00000" :checked="isFullCheck"></radio>
			</label>
			<!-- 合计区域 -->
			<view class="amount-box">
				合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
			</view>

			<!-- 结算按钮 -->
			<view class="btn-settle" @click="settlement">
				结算({{checkedCount}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
			// 倒计时的秒数
			seconds:3,
			// 定时器的Id
			timer:null
			};
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token','redirectInfo']),
			// 是否全选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			// 微信支付
			async payOrder(){
				// 【第一步】：创建订单
				// 组织订单的信息对象
				const orderInfo = {
					// 开发期间，注释掉真实的订单价格
					// order_price:this.checkedGoodsAmount
					// 写死订单总价为1分钱
					order_price:0.01,
					// 收货地址
					consignee_addr:this.addstr,
					// 商品信息：通过filter筛选出有勾选的商品然后再通过map筛选出想要的属性进行重构为新的数组
					goods:this.cart.filter(x=>x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
				}
				// 将订单的信息对象带过去发起请求创建订单
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo) 
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				// 得到服务器响应的“订单编号”
				const orderNumber = res.message.order_number
				
				// 【第二步】：订单预支付
				// 将订单编号带过去发起请求获取订单的支付信息
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				// 判断
				if(res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
				// 得到订单支付相关的必要参数
				const payInfo = res2.message.pay
				
				// 【第三步】：发起微信支付
				const [err,succ] = await uni.requestPayment(payInfo)
				// 未完成支付
				if(err) return uni.$showMsg('订单未支付！')
				// 完成了支付，进一步查询支付的结果
				const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				// 检测到订单未支付
				if(res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				// 检测到订单支付完成
				uni.showToast({
					title:'支付完成！',
					icon:'success'
				})
			},
			// 展示倒计时的提示消息
			showTips(n){
				// 调用uni.showToast()方法，展示提示消息
				uni.showToast({
					// 不展示任何图标
					icon:'none',
					// 提示的消息
					title:'请登录后再结算！'+n+'秒后自动跳转到登录页',
					// 为页面添加透明遮罩，防止点击穿透
					mask:true,
					// 1.5秒后自动消失
					duration:1500
				})
			},
			// 点击了结算按钮
			settlement(){
				// 1. 先判断是否勾选了要结算的商品
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				// 2. 在判断用户是否选择了收货地址
				if(!this.addstr) return uni.$showMsg('请选择收货地址！')
				// 3.最后判断用户是否登录了
				// if(!this.token) return uni.$showMsg('请先登录！')
				if(!this.token) return this.delayNavigate()
				
				// 实现微信支付功能
				this.payOrder()
			},
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			// label的点击事件处理函数
			changeAllState(){
				// 修改购物车种所有商品的选中状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 延迟导航到my页面
			delayNavigate(){
				// 每次展示的时候要先将秒数重置为3，防止下次用不了
				this.seconds = 3
				// 展示出提示消息
				this.showTips(this.seconds)
				// 然后创建一个定时器，每过一秒就将秒数减一并展示出新的提示消息
				this.timer =  setInterval(()=>{
					// 让秒数减一
					this.seconds--
					
					// 在每次重新展示之前先判断秒数是否<=0，如果是则将定时器清除并跳转到my页面
					if(this.seconds<=0){
						// 先清除定时器
						clearInterval(this.timer)
						// 跳转到my页面
						uni.switchTab({
							url:'/pages/my/my',
							// 页面跳转成功之后的回调函数
							success:()=>{
								console.log('第一次',this.redirectInfo)
								// 调用vuex的方法，将跳转信息进行存储
								this.updateRedirectInfo({
									// 跳转的方式
									openType:'switchTab',
									// 从哪个页面跳转过去的
									from:'/pages/cart/cart'
								})
								console.log('第二次',this.redirectInfo)
							}
						})
						// 最后直接return出去，不要再展示了
						return
					}
					
					
					
					
					// 然后展示
					this.showTips(this.seconds)
				},1000)
				
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		/* 底部固定定位 */
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;
		  .radio {
		    display: flex;
		    align-items: center;
		  }
		
		  .amount {
		    color: #c00000;
		  }
		
		  .btn-settle {
		    height: 50px;
		    min-width: 100px;
		    background-color: #c00000;
		    color: white;
		    line-height: 50px;
		    text-align: center;
		    padding: 0 10px;
		  }
	}
</style>
