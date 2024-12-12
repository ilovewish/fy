<template>
	<!-- 劳动法弹窗部分-->
	<el-dialog id="laodongfa" @mouseover.native="setMouseOver('laodongfa','laodongfa')"  ref="Temp" title="中华人民共和国劳动法" :visible.sync="laodongfaDialog" :modal="false"
		:close-on-click-modal="false" v-dialogDrag width="45%"
		:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.3)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.45) +'px'}">
		<iframe width="100%" height="600px" style=" position: relative;" :src="fileUrl" frameborder="0">
		</iframe>
	</el-dialog>
	<!-- 劳动法弹窗部分-->

</template>

<script>
	export default {
		data() {
			return {
				laodongfaDialog: false,
				screenWidth: document.documentElement.clientWidth, // 屏幕宽
				screeHeight: document.documentElement.clientHeight, // 屏幕高
				//这里需要写网络地址
				fileUrl: "../../../static/中华人名共和国劳动法.doc",

			};
		},
		methods: {
			setMouseOver(id, name) {
				this.$emit('setMouseOver', id, name);
			},
			init(val) {
				if (val === 1) {
					this.laodongfaDialog = true;
				}
			}
		}
	};
</script>

<style>
</style>