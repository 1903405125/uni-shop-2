export default {
	// 开启命名空间
	namespaced:true,
	// state数据
	state:()=>({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功之后的token字符串
		token:uni.getStorageSync('token') || '',
		// 用户的基本信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的object对象{openType,from}
		redirectInfo:null
	}),
	// 方法
	mutations:{
		// 更新重定向的信息对象
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		},
		// 更新token字符串
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		// 将token字符串持久化存储到本地
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		// 更新用户的基本信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			// 不要忘记同时还要存进本地存储哦
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 将userinfo持久化存储到本地
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		//更新收货地址
		updateAddress(state,address){
			state.address = address
			// 不要忘记了还得将数据存到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 将address持久化存储到本地mutations方法
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	// 数据包装器
	getters:{
		// 收获详细地址的计算属性
		addstr(state){
			if(!state.address.provinceName) return ''
			// 拼接省，市，区，详细地址的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}