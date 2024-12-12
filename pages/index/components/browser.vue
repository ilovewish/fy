<template>
	<!-- 嵌入浏览器搜索 -->
	 
		<el-dialog  id="browser" @mouseover.native="setMouseOver('browser','browser')" title="百度搜索" :visible.sync="browserDialog" :modal="false" :close-on-click-modal="false" v-dialogDrag
			width="77%" 
			:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.3)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.2) +'px'}">
			
	      <iframe src="http://www.baidu.com/"  scrolling="auto" frameborder="0" width="100%" height="400px"></iframe>
	      
	    </el-dialog> 
</template>

<script>

export default {
  name: "indexJK",
  data() {
    return {
      name: "indexJK", 
      browserDialog: false, //弹出框
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
				this.browserDialog = true;
			}
			if (val === 2) {
				this.browserDialog = false;
			}
		} 
  }
};
</script> 
<style>
</style>