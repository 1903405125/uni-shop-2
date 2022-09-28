<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button @click="chooseAddress" type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
			<view class="row2">

			</view>
		</view>
		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	
	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			// 选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				console.log(err,succ)
				// 2. 用户成功的选择了收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok'){
					this.updateAddress(succ)
				}
				// 3. 用户没有授权
				if(err && err.errMsg === 'chooseAddress:fail auth deny'  || err.errMsg === 'chooseAddress:fail authorize no response'){
					// 调用this.reAuth()方法，向用户重新发起授权申请      
					this.reAuth()
				}
			},
			// 调用此方法，重新发起收货地址的授权
			async reAuth(){
				// 3.1 提示用户对地址进行授权
				cosnt [err2,confirmResult] = await uni.showModal({
					content:'检测到您没打开地址权限，是否去设置打开？',
					confimText:"确认",
					cancelText:'取消'
				})
				
				// 判断弹框是否异常
				if(err2) return
				
				// 判断用户点击是的哪个按钮
				// 用户点击了取消按钮
				if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
				// 用户点击了确定按钮
				// 调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
				if(confirmResult.confirm) return uni.openSetting({
					success:(settingResult)=>{
						// 判断用户在授权时点击了同意还是拒绝
						if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功')
						if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权')
					}
				})
				
			}
		}, 
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 渲染收获信息的盒子
	.address-info-box {
		font-style: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
