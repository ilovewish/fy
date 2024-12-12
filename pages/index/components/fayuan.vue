<template>

	<!-- 法猿 -->
	<el-dialog id="fayuan" @mouseover.native="setMouseOver('fayuan','fayuan')" title="站点宗旨" :visible.sync="fayuanDialog"
		:modal="false" :close-on-click-modal="false" v-dialogDrag width="27%"
		:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.3)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.2) +'px'}">

		<el-card class="box-card" style="margin: 7px;">
			<div style="margin: 10px;"> 
					
					<div>作者网址：https://nanwish.love/</div>
					<div>网站搭建中，有Idea和热情的小伙伴，欢迎参与进来</div>
					<div>联系我：https://nanwish.love/about</div>
					<div>法猿，给有需要拿起法律知识维权的程序猿们提供的信息获取站点</div> 
					<div>包含：维权渠道、建议、案例、话术、和相关法律只是普及~</div> 
			</div>
			
		</el-card>

		

	</el-dialog>

</template>

<script>
	export default {
		name: "fayuan",
		data() {
			return {
				name: "fayuan",
				fayuanDialog: false, //弹出框
				screenWidth: document.documentElement.clientWidth, // 屏幕宽
				screeHeight: document.documentElement.clientHeight, // 屏幕高
			};
		},
		methods: {
			setMouseOver(id, name) {
				this.$emit('setMouseOver', id, name);
			},
			init(val) {
				if (val === 1) {
					this.fayuanDialog = true;
				}
				if (val === 2) {
					this.fayuanDialog = false;
				}
			}
		}
	};
</script>

<style>
</style>