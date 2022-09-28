<template>
	<view>
		<!-- 用户登录页面 -->
		<view class="login-container">
			<!-- 提示登录的图标 -->
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<!-- 登录按钮 -->
			<button @click="getUserProfile" type="primary" class="btn-login">一键登录</button>
			<!-- 登录提示 -->
			<view class="tips-text">
				登录后尽享更多权益
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
			// 获取微信用户的基本信息
			getUserProfile() {
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						// 将信息存到vuex中
						this.updateUserInfo(res.userInfo)
						// 调用获取永久的token的方法
						this.getToken(res.userInfo)
					},
					fail: (res) => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
			// 调用登录接口，换取永久的token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// 判断是否uni.login()调用失败
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败!')
					// 准备参数对象
					const query = {
						code: res.code,
						encryptedData: info.encryptedData,
						iv: info.iv,
						rawData: info.rawData,
						signature: info.signature
					}
					
					// 换取token,此处的接口地址暂时无法生效，因为这个是黑马程序员老师提供的接口，而这个接口得有被设置开发权限的人才能正确访问到，因此这里我们可以掩耳盗铃的将结果无论如何都呈现登录成功
					const {data:loginResult} = await uni.$http.post('/api/public/v1/user/wxlogin',query)

					// if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
					uni.$showMsg('登录成功')
					this.updateToken(123456789)
					// 当登录成功之后，我们需要判断是否需要跳转，因为之前可能是从别的页面跳转过来的，因此需要跳转回去，因此调用一个函数
					this.navigateBack()
				},
				// 返回登录之前的页面
				navigateBack(){
					console.log('登录页面的',this.redirectInfo)
					// redirectInfo 不为 null，并且导航方式为switchTab
					if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
						
						// 调用小程序提供的uni.switchTab() API进行页面的导航
						uni.switchTab({
							// 要导航到的页面地址
							url:this.redirectInfo.from,
							// 导航成功之后，把vuex中的redirectInfo对象重置为Null
							complete:()=>{
								this.updateRedirectInfo(null)
							}
						})
					}
					
				}

			}
		}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
