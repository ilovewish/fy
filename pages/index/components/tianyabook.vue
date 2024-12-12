<template>
	
	<!-- 天涯文章的集合 -->
	<el-dialog  id="tianyabook" @mouseover.native="setMouseOver('tianyabook','tianyabook')" title="天涯文章" :visible.sync="tianyaDialog" :modal="false" :close-on-click-modal="false" v-dialogDrag
		width="37%" 
		:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.3)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.2) +'px'}">
		
	  <iframe src="https://xxx.com/"  scrolling="auto" frameborder="0" width="100%" height="600px"></iframe>
	  
	</el-dialog> 
	
</template>

<script>
	export default {
	  name: "tianyabook",
	  data() {
	    return {
	      name: "tianyabook", 
	      tianyaDialog: false, //弹出框
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
					this.tianyaDialog = true;
				}
				if (val === 2) {
					this.tianyaDialog = false;
				}
			} 
	  }
	};
</script>

<style>
</style>