<template>
	<!-- <view class="content" ref="backImgTag" :style="{'background-image':'url('+this.bgUrls[this.currentBgIndex]+')'}"> -->
	<view class="content" ref="backImgTag" :style="{'background-color':'white'}">
		<!-- 悬浮控制按钮 -->
		<el-dialog id="xuanfu" class="controlCss" @mouseover.native="setMouseOver('xuanfu','xuanfu')" title="Control"
			ref="Temp" :visible.sync="buttonControl" :modal="false" :close-on-click-modal="false"
			:close-on-press-escape="false" :show-close="false" v-dialogDragNoRz width="14%"
			:style="{'padding-top': ''+ Math.floor(Math.random()*this.screeHeight-this.screeHeight*0.25)+'px','padding-left':' '+  Math.floor(Math.random()*this.screenWidth-this.screenWidth*0.2) +'px'}">
			<el-row :gutter="2">
				<el-col :span="6">
					<div @click="laodongfaInit()" class="grid-content bg-purple">劳动法</div>
					<div @click="fayuanInit()" class="grid-content bg-purple">法猿</div>
				</el-col>
				<el-col :span="6">
					<div @click="searchInit()" class="grid-content bg-purple">搜索</div>
				</el-col>
				<el-col :span="6">
					<div @click="tianyaBook()" class="grid-content bg-purple">天涯</div>
				</el-col>
				<el-col :span="6">
					<div @click="toggleFullScreen()" class="grid-content bg-purple">{{fullScreenText}}</div>
				</el-col>
			</el-row>

		</el-dialog>
		<!-- 悬浮控制按钮 -->

		<!-- 弹窗组件 -->
		<!-- 鲁迅语录 -->
		<luxunDialog @setMouseOver="setMouseOver" ref="luxunDialog"></luxunDialog>
		<!-- 搜索 -->
		<searchDialog @setMouseOver="setMouseOver" ref="searchDialog"></searchDialog>
		<!-- 劳动法 -->
		<laodongfaDialog @setMouseOver="setMouseOver" ref="laodongfaDialog"></laodongfaDialog>
		<!-- 弹窗组件 -->
		<browserDialog @setMouseOver="setMouseOver" ref="browserDialog"></browserDialog>
		<!-- 浏览器 -->
		<tianyaDialog  @setMouseOver="setMouseOver" ref="tianyaDialog"></tianyaDialog>
		<!-- 天涯文章 -->
		<fayuanDialog  @setMouseOver="setMouseOver" ref="fayuanDialog"></fayuanDialog>
		<!-- 法猿 -->
	</view>
</template>

<script>
	// 设置z-index的显示数字
	let indexCount = 2100;

	// 引入全屏插件
	import screenfull from 'screenfull'
	import searchDialog from './components/search.vue'
	import luxunDialog from './components/luxun.vue'
	import laodongfaDialog from './components/laodongfa.vue'
	import browserDialog from './components/browser.vue'
	import tianyaDialog from './components/tianyabook.vue'
	import fayuanDialog from './components/fayuan.vue'
	export default {
		components: {
			searchDialog,
			luxunDialog,
			laodongfaDialog,
			browserDialog,
			tianyaDialog,
			fayuanDialog
		},
		data() {
			return {
				title: '法猿',
				buttonControl: false,
				bgUrls: [
					
				],
				currentBgIndex: 4, // 记录当前背景图索引
				screenWidth: document.documentElement.clientWidth, // 屏幕宽
				screeHeight: document.documentElement.clientHeight, // 屏幕高
				leftRoundMath: 0,
				rightRoundMath: 0,
				iFullScreen: false,
				fullScreenText: "全屏",
			}
		},
		watch: {
			screeHeight(val) {
				let that = this;
				// console.log("实时屏幕高度：", val, that.screeHeight);
			},
			screenWidth(val) {
				let that = this;
				// console.log("实时屏幕宽度：", val, that.screenWidth);
			}
		},
		onLoad() {
			this.randomNum(0, 17);
			this.setDiaLogLocation();
		},
		created() {
			this.buttonControl = true;
			this.roundMath(0.2);
		},
		mounted() {

			/* 延时五秒关闭鲁迅名言 */
			setTimeout(() => {
				this.$refs.luxunDialog.init(2);
			}, 9000);

			/* 设置全局水印 */
			// this.$watermark.set("️法猿⚖");

			this.initDialog();
			window.onresize = () => {
				return (() => {
					//窗口缩放自动获取页面宽高
					window.fullWidth = document.documentElement.clientWidth;
					window.fullHeight = document.documentElement.clientHeight;
					this.screenWidth = window.fullWidth; //宽
					this.screeHeight = window.fullHeight; //高
					//窗口缩放自动获取元素宽高
					this.tempWidth = this.$refs.Temp.offsetWidth //宽
					this.tempHeight = this.$refs.Temp.offsetHeight //高
				})()
			}
		},

		methods: {
			// 页面全屏事件
			toggleFullScreen() {
				// 判断当前浏览器是否支持全屏
				if (screenfull.isEnabled) {
					//当前页面是否全屏
					if (!screenfull.isFullscreen) {
						this.iFullScreen = !this.iFullScreen
						screenfull.request()
						this.fullScreenText = "取消全屏";
					} else {
						this.iFullScreen = !this.iFullScreen
						screenfull.exit()
						this.fullScreenText = "全屏";
					}
				} else {
					//提醒 无法全屏浏览
					this.$message({
						message: '你的浏览器不支持全屏',
						type: 'warning'
					})
				}
			},
			randomNum(minNum, maxNum) {
				parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				this.currentBgIndex = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
			},
			roundMath(val) {
				// val是传来的宽   
				this.leftRoundMath = Math.floor(Math.random() * this.screenWidth - this.screenWidth * val);
				this.rightRoundMath = Math.floor(Math.random() * this.screeHeight - this.screeHeight * 0.2);
			},
			jump() {
				uni.navigateTo({
					url: '/pages/home/index'
				});
			},
			setDiaLogLocation() {},
			searchInit() {
				this.$refs.searchDialog.init(1);
			},
			initDialog() {
				this.$refs.luxunDialog.init(1);
			},
			laodongfaInit() {
				this.$refs.laodongfaDialog.init(1);
			},
			browserInit() {
				this.$refs.browserDialog.init(1);
			},
			tianyaBook(){
				this.$refs.tianyaDialog.init(1);
			},
			fayuanInit(){
				this.$refs.fayuanDialog.init(1);
			},
			setMouseOver(id, name) {
				indexCount++;
				document.getElementById(id).style.zIndex = indexCount;
			},
		}
	}
</script>


<style>
	.el-card__body,
	.el-main {
		/* padding: 20px; */
		width: 300px;
	}
</style>