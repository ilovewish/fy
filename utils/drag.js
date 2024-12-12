import Vue from 'vue'
/*
*  使用方法
*  将以下代码复制到一个drag.js文件中，然后在入口文件main.js中导入：import ‘./util/drog.js’；
*  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
*  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层
*  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
*/
// v-dialogDrag: 弹窗拖拽+水平方向伸缩+可以限制超出屏幕边缘 弹窗拖拽可缩放
Vue.directive('dialogDrag', {
	
	 bind(el, binding, vnode, oldVnode) {
	      //弹框可拉伸最小宽高
	      let minWidth = 250;
	      let minHeight = 200;
	      //初始非全屏
	      let isFullScreen = false;
	      //当前宽高
	      let nowWidth = 0;
	      let nowHight = 0;
	      //当前顶部高度
	      let nowMarginTop = 0;
	      //获取弹框头部（这部分可双击全屏）
	      const dialogHeaderEl = el.querySelector('.el-dialog__header');
	      //弹窗
	      const dragDom = el.querySelector('.el-dialog');
	      //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
	      dragDom.style.overflow = "auto";
	      //清除选择头部文字效果
	      dialogHeaderEl.onselectstart = new Function("return false");  
	      //头部加上可拖动cursor
	      dialogHeaderEl.style.cursor = 'move';
	      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
	      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
	      let moveDown = (e) => {
	        // 鼠标按下，计算当前元素距离可视区的距离
	        const disX = e.clientX - dialogHeaderEl.offsetLeft;
	        const disY = e.clientY - dialogHeaderEl.offsetTop;
	        // 获取到的值带px 正则匹配替换
	        let styL, styT;
	        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
	        if (sty.left.includes('%')) {
	          styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100);
	          styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100);
	        } else {
	          styL = +sty.left.replace(/px/g, '');
	          styT = +sty.top.replace(/px/g, '');
	        }
	        const bodyWidth = document.body.clientWidth
	        const bodyHeight = document.body.clientHeight // 获取屏幕高度
	        document.onmousemove = function (e) {
	          // 通过事件委托，计算移动的距离 
	          const l = e.clientX - disX;
	          const t = e.clientY - disY;
	          // console.log("鼠标移动到的位置",e.clientX, e.clientY)
	
	          // 限制不让拖出屏幕 *****
	          if(e.clientY<20 || e.clientY > bodyHeight -100){
	            return 
	          }
	          if(e.clientX<100 || e.clientX > bodyWidth -100){
	            return 
	          }
	
	        // 移动当前元素  
	          dragDom.style.left = `${l + styL}px`;
	          dragDom.style.top = `${t + styT}px`;
	          //将此时的位置传出去
	          //binding.value({x:e.pageX,y:e.pageY})
	        }
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	      dialogHeaderEl.onmousedown = moveDown;
	
	      // 底部可以拖动 start
	      const dialogFooterEl = el.querySelector('.el-dialog__footer');
	      let moveDownFoot = (e) => {
	        // 鼠标按下，计算当前元素距离可视区的距离
	        const disX = e.clientX - dialogFooterEl.offsetLeft;
	        const disY = e.clientY - dialogFooterEl.offsetTop;
	
	        let  height = document.getElementsByClassName("summaryDialog")[0].getElementsByClassName('el-dialog')[0].offsetHeight 
	        // console.log("99999小结height",height)
	        const height2 = height -56
	
	        // 获取到的值带px 正则匹配替换
	        let styL, styT;
	        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
	        if (sty.left.includes('%')) {
	          styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100);
	          styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100);
	        } else {
	          styL = +sty.left.replace(/px/g, '');
	          styT = +sty.top.replace(/px/g, '');
	        }
	        const bodyWidth = document.body.clientWidth
	        const bodyHeight = document.body.clientHeight // 获取屏幕高度
	        document.onmousemove = function (e) {
	          // 通过事件委托，计算移动的距离 
	          const l = e.clientX - disX;
	          const t = e.clientY - disY;
	
	          // 限制不让拖出屏幕 *****
	          if(e.clientY<100 || e.clientY > bodyHeight -20){
	            return 
	          }
	          if(e.clientX<100 || e.clientX > bodyWidth -100){
	            return 
	          }
	
	          // 移动当前元素  
	          dragDom.style.left = `${l + styL}px`;
	          dragDom.style.top = `${t + styT -height2  }px`;
	          //将此时的位置传出去
	          //binding.value({x:e.pageX,y:e.pageY})
	        }
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	      // dialogFooterEl.style.cursor = 'move';
	      // dialogFooterEl.onmousedown = moveDownFoot;
	      // 底部可以拖动 end
	
	
	      //双击头部效果
	      dialogHeaderEl.ondblclick = (e) => {
	        if (isFullScreen == false) {
	          nowHight = dragDom.clientHeight;
	          nowWidth = dragDom.clientWidth;
	          nowMarginTop = dragDom.style.marginTop;
	          dragDom.style.left = 0;
	          dragDom.style.top = 0;
	          dragDom.style.height = "100VH";
	          dragDom.style.width = "100VW";
	          dragDom.style.marginTop = 0;
	          isFullScreen = true;
	          dialogHeaderEl.style.cursor = 'initial';
	          dialogHeaderEl.onmousedown = null;
	        } else {
	          dragDom.style.height = "auto";
	          dragDom.style.width = nowWidth + 'px';
	          dragDom.style.marginTop = nowMarginTop;
	          isFullScreen = false;
	          dialogHeaderEl.style.cursor = 'move';
	          dialogHeaderEl.onmousedown = moveDown;
	        }
	      }
	      
	      //拉伸(右下方)
	      let resizeEl=document.createElement("div");
	      dragDom.appendChild(resizeEl); 
	      //在弹窗右下角加上一个10-10px的控制块
	      resizeEl.style.cursor = 'se-resize';
	      resizeEl.style.position = 'absolute';
	      resizeEl.style.height = '10px';
	      resizeEl.style.width = '10px';
	      resizeEl.style.right = '0px';
	      resizeEl.style.bottom = '0px';
	      resizeEl.style.zIndex = '99';
	      //鼠标拉伸弹窗
	      resizeEl.onmousedown = (e) => {
	        // 记录初始x位置
	        let clientX = e.clientX;
	        // 鼠标按下，计算当前元素距离可视区的距离
	        let disX = e.clientX - resizeEl.offsetLeft;
	        let disY = e.clientY - resizeEl.offsetTop;
	        document.onmousemove = function (e) {
	          e.preventDefault(); // 移动时禁用默认事件
	          
	          // 通过事件委托，计算移动的距离
	          let x = e.clientX - disX + (e.clientX - clientX);//这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
	          let y = e.clientY - disY;
	          //比较是否小于最小宽高
	          dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
	          dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
	          };
	        //拉伸结束
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	
	      //拉伸(左下方)
	      let resizeElLeft=document.createElement("div");
	      dragDom.appendChild(resizeElLeft); 
	      //在弹窗右下角加上一个10-10px的控制块
	      resizeElLeft.style.cursor = 'sw-resize';
	      resizeElLeft.style.position = 'absolute';
	      resizeElLeft.style.height = '10px';
	      resizeElLeft.style.width = '10px';
	      resizeElLeft.style.left = '0px';
	      resizeElLeft.style.bottom = '0px';
	      resizeElLeft.style.zIndex = '99';
	      //鼠标拉伸弹窗
	      resizeElLeft.onmousedown = (e) => {
	        // 记录初始x位置
	        let clientX = e.clientX;
	        // 鼠标按下，计算当前元素距离可视区的距离
	
	        let disX = dragDom.clientWidth;  // 鼠标按下 记录元素的宽
	
	        let disY = e.clientY - resizeElLeft.offsetTop;
	        document.onmousemove = function (e) {
	          e.preventDefault(); // 移动时禁用默认事件
	          
	          // 通过事件委托，计算移动的距离
	          let x = disX + (clientX - e.clientX)*2;//这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
	          let y = e.clientY - disY;
	          //比较是否小于最小宽高
	          dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
	          dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
	          };
	        //拉伸结束
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	      
	      //拉伸(右边)
	      let resizeElR=document.createElement("div");
	      dragDom.appendChild(resizeElR); 
	      //在弹窗右下角加上一个10-10px的控制块
	      resizeElR.style.cursor = 'w-resize';
	      resizeElR.style.position = 'absolute';
	      resizeElR.style.height = '100%';
	      resizeElR.style.width = '10px';
	      resizeElR.style.right = '0px';
	      resizeElR.style.top = '0px';
	      //鼠标拉伸弹窗
	      resizeElR.onmousedown = (e) => {
	        let elW = dragDom.clientWidth;
	        let EloffsetLeft = dragDom.offsetLeft;
	        // 记录初始x位置
	        let clientX = e.clientX;
	        document.onmousemove = function (e) {
	          e.preventDefault(); // 移动时禁用默认事件
	          //右侧鼠标拖拽位置
	          if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
	              //往左拖拽
	              if (clientX > e.clientX) {
	                  if (dragDom.clientWidth < minWidth) {
	                    console.log(111)
	                  } else {
	                      dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px';
	                  }
	              }
	              //往右拖拽
	              if (clientX < e.clientX) {
	                  dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px';
	              }
	          }
	         
	        };
	        //拉伸结束
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	      
	      //拉伸(左边)
	      let resizeElL=document.createElement("div");
	      dragDom.appendChild(resizeElL); 
	      //在弹窗右下角加上一个10-10px的控制块
	      resizeElL.style.cursor = 'w-resize';
	      resizeElL.style.position = 'absolute';
	      resizeElL.style.height = '100%';
	      resizeElL.style.width = '10px';
	      resizeElL.style.left = '0px';
	      resizeElL.style.top = '0px';
	      //鼠标拉伸弹窗
	      resizeElL.onmousedown = (e) => {
	        let elW = dragDom.clientWidth;
	        let EloffsetLeft = dragDom.offsetLeft;
	        // 记录初始x位置
	        let clientX = e.clientX;
	        document.onmousemove = function (e) {
	          e.preventDefault(); // 移动时禁用默认事件
	          //左侧鼠标拖拽位置
	          if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
	              //往左拖拽
	              if (clientX > e.clientX) {
	                  dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px';
	              }
	              //往右拖拽
	              if (clientX < e.clientX) {
	                  if (dragDom.clientWidth < minWidth) {
	                    console.log(222)
	                  } else {
	                      dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px';
	          
	                  }
	              }
	          }
	         
	        };
	        //拉伸结束
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	      
	      // 拉伸(下边)
	      let resizeElB=document.createElement("div");
	      dragDom.appendChild(resizeElB); 
	      //在弹窗右下角加上一个10-10px的控制块
	      resizeElB.style.cursor = 'n-resize';
	      resizeElB.style.position = 'absolute';
	      resizeElB.style.height = '10px';
	      resizeElB.style.width = '100%';
	      resizeElB.style.left = '0px';
	      resizeElB.style.bottom = '0px';
	      //鼠标拉伸弹窗
	      resizeElB.onmousedown = (e) => {
	       let EloffsetTop = dragDom.offsetTop;
	       let ELscrollTop = el.scrollTop;
	        let clientY = e.clientY;
	        let elH = dragDom.clientHeight;
	        document.onmousemove = function (e) {
	          e.preventDefault(); // 移动时禁用默认事件
	          //底部鼠标拖拽位置
	          if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
	              //往上拖拽
	              if (clientY > e.clientY) {
	                  if (dragDom.clientHeight < minHeight) {
	                    console.log(333)
	                  } else {
	                      dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px';
	                  }
	              }
	              //往下拖拽
	              if (clientY < e.clientY) {
	                  dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px';
	              }
	          }
	        };
	        //拉伸结束
	        document.onmouseup = function (e) {
	          document.onmousemove = null;
	          document.onmouseup = null;
	        };
	      }
	    }
  
})















/* 双击全屏和缩小 可以拖拽大小 但是不能限制
 bind(el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高
    const minWidth = 400
    const minHeight = 300
    // 初始非全屏
    let isFullScreen = false
    // 当前顶部高度
    let nowMarginTop = 0
    // 获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // 弹窗
    const dragDom = el.querySelector('.el-dialog')
    // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    dragDom.style.overflow = 'auto'
    // 清除选择头部文字效果
    // dialogHeaderEl.onselectstart = new Function("return false");
    // 头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    const moveDown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      // 获取到的值带px 正则匹配替换
      let styL, styT
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    dialogHeaderEl.onmousedown = moveDown
    // 当前宽高
    let nowWidth = 0
    // let nowHight = 0
    // 双击头部全屏效果
    dialogHeaderEl.ondblclick = e => {
      if (isFullScreen === false) {
        // nowHight = dragDom.clientHeight
        nowWidth = dragDom.clientWidth
        nowMarginTop = dragDom.style.marginTop
        dragDom.style.left = 0
        dragDom.style.top = 0
        dragDom.style.height = '100VH'
        dragDom.style.width = '100VW'
        dragDom.style.marginTop = 0
        isFullScreen = true
        dialogHeaderEl.style.cursor = 'initial'
        dialogHeaderEl.onmousedown = null
      } else {
        dragDom.style.height = 'auto'
        dragDom.style.width = nowWidth + 'px'
        dragDom.style.marginTop = nowMarginTop
        isFullScreen = false
        dialogHeaderEl.style.cursor = 'move'
        dialogHeaderEl.onmousedown = moveDown
      }
    }
    dragDom.onmousemove = function(e) {
      // let moveE = e
      if (
        e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 ||
        dragDom.offsetLeft + 10 > e.clientX
      ) {
        dragDom.style.cursor = 'w-resize'
      } else if (
        el.scrollTop + e.clientY >
        dragDom.offsetTop + dragDom.clientHeight - 10
      ) {
        dragDom.style.cursor = 's-resize'
      } else {
        dragDom.style.cursor = 'default'

        dragDom.onmousedown = null
      }
      dragDom.onmousedown = e => {
        const clientX = e.clientX
        const clientY = e.clientY
        const elW = dragDom.clientWidth
        const elH = dragDom.clientHeight
        const EloffsetLeft = dragDom.offsetLeft
        const EloffsetTop = dragDom.offsetTop
        dragDom.style.userSelect = 'none'
        const ELscrollTop = el.scrollTop
        // 判断点击的位置是不是为头部
        if (
          clientX > EloffsetLeft &&
          clientX < EloffsetLeft + elW &&
          clientY > EloffsetTop &&
          clientY < EloffsetTop + 100
        ) {
          // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
        } else {
          document.onmousemove = function(e) {
            // 移动时禁用默认事件
            e.preventDefault()
            // 左侧鼠标拖拽位置
            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
              // 往左拖拽
              if (clientX > e.clientX) {
                dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
              }
              // 往右拖拽
              if (clientX < e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  console.log()
                } else {
                  dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                }
              }
            }
            // 右侧鼠标拖拽位置
            if (
              clientX > EloffsetLeft + elW - 10 &&
              clientX < EloffsetLeft + elW
            ) {
              // 往左拖拽
              if (clientX > e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  console.log()
                } else {
                  dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                }
              }
              // 往右拖拽
              if (clientX < e.clientX) {
                dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
              }
            }
            // 底部鼠标拖拽位置
            if (
              ELscrollTop + clientY > EloffsetTop + elH - 20 &&
              ELscrollTop + clientY < EloffsetTop + elH
            ) {
              // 往上拖拽
              if (clientY > e.clientY) {
                if (dragDom.clientHeight < minHeight) {
                  console.log()
                } else {
                  dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                }
              }
              // 往下拖拽
              if (clientY < e.clientY) {
                dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
              }
            }
          }
          // 拉伸结束
          document.onmouseup = function(e) {
            document.onmousemove = null

            document.onmouseup = null
          }
        }
      }
    }
  } */