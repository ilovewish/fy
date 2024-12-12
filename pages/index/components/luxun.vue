<template>
	<!-- 鲁迅语录 -->
	<el-dialog  id="luxun" @mouseover.native="setMouseOver('luxun','luxun')" title="《呐喊》" :visible.sync="luxunDialog" :modal="false" :close-on-click-modal="false" v-dialogDragNoRz
		width="20%"
		:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.3)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.2) +'px'}">
		<el-card style="width: 100%;padding: 0;" body-style="{ padding: '0px' }">
			<img src="../../../static/img/luxun.jpg" class="image">
			<div style="padding: 14px;">
				<p>{{showLuXun}}<a href="http://www.5156edu.com/html/50826/1.html"
						style="text-decoration: none;color: black;" target="_blank">--鲁迅《呐喊》</a></p>
			</div>
		</el-card>
	</el-dialog>
	<!-- 鲁迅语录 -->
</template>

<script>
	export default {
		data() {
			return {
				luxunDialog: false,
				screenWidth: document.documentElement.clientWidth, // 屏幕宽
				screeHeight: document.documentElement.clientHeight, // 屏幕高
				showLuXun: "从那一回以后，我便觉得医学并非一件紧要事，凡是愚弱的国民，即使体格如何健全，如何茁壮，也只能做毫无意义的示众的材料和看客，病死多少是不必以为不幸的。所以我们的第一要著，是在改变他们的精神，而善于改变精神的是，我那时以为当然要推文艺，于是想提倡文艺运动了",

			};
		},
		methods: {
			setMouseOver(id, name) {
				this.$emit('setMouseOver', id, name);
			},
			init(val) {
				if (val === 1) {
					this.luxunDialog = true;
				}
				if (val === 2) {
					this.luxunDialog = false;
				}
			}
		}
	};
</script>

<style>
	.image {
		width: 100%;
		display: block;
		border-radius: 10px 10px 0 0;
	}
</style>