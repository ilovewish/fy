<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
	
</script>

<style  lang="scss"> 
	/*每个页面公共css */ 
	@font-face {
	  font-family: "alimamFont";
	  font-weight: 400;
	  src: url("~@/static/font/AlimamaDongFangDaKai-Regular.ttf");
	  font-display: swap;
	} 
	.content {
		width: 100%;
		height: 100%;
		display: flex; 
		flex-direction: column;
		align-items: center;
		justify-content: center; 
		// background-image:url("./static/img/luxun.jpg");
		
		position:fixed;
		background-size:100% 100%;
	}
	// 覆盖层元素增加可穿透点击事件
	.el-dialog__wrapper{
		pointer-events:none;
	}
	
</style>
