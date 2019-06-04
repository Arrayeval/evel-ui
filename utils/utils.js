const imp = {}
/**
 * @fun  阻止滚动击穿
 * @params e: 事件对象 event
 * @param firstY: touchStart事件触发时的 e.targetTouches[0].clientY , 记录着首次触屏的位置
 * @param clientY: touchMove事件 e.targetTouches[0].clientY ， 记录着move事件结束时的触屏位置
 * @param dom: 滑动的dom节点
 * */
imp.preventTouchScroll = (e, firstY, clientY, dom) => {
  if (clientY > firstY &&  dom.scrollTop === 0) { // 下滑    
    e.cancelable && e.preventDefault()
  } else if (clientY < firstY && dom.scrollHeight <= dom.scrollTop  + dom.offsetHeight) { // 上滑
    e.cancelable && e.preventDefault()
  }
}
export default imp;