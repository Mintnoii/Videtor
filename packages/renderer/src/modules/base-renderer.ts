import Konva from 'konva'
import { IRenderNode, SegmentRenderNode, IRenderInfo, LayerData } from '@/types'
import { EventEmitter, IKonvaEventEmitter } from '@/libs'

export interface RendererFrameInfo {
  // 片段信息
  renderInfo: IRenderInfo
  // 渲染第几帧
  frameIndex: number
  // 渲染容器
  layer: Konva.Layer
  // 渲染 transformer
  // transformer: Konva.Transformer
  // 渲染数据
  segmentNodes: Array<SegmentRenderNode<LayerData>>
}

export default abstract class BaseRenderer {
  // 渲染器实例
  protected renderer: any
  /**当前绘制信息 */
  protected curDrawInfo: RendererFrameInfo
  /**当前绘制是否是懒绘制：懒绘制是指无需关心帧数据是否准备完毕 */
  protected curDrawIsLazy: boolean

  protected curRenderInfo: IRenderInfo
  protected curFrameIndex: number
  protected curLayer: Konva.Layer

  protected eventEmitter: IKonvaEventEmitter

  // todo 这里的类型需要修改
  constructor(renderer: any, eventEmitter: IKonvaEventEmitter) {
    this.renderer = renderer
    this.eventEmitter = eventEmitter
  }
  /**创建renderNode */
  protected createRenderNode(frameNode: SegmentRenderNode<LayerData>): IRenderNode<any, any> {
    const node = {
      nid: frameNode.nid,
      data: frameNode,
      container: new Konva.Group()
      // coreProcess: null,
      // assets: null
    }
    return node
  }

  // async draw(renderInfo: RendererFrameInfo) {
  //   this.curRenderInfo = renderInfo
  //   this.frameIndex = renderInfo.index
  // }

  /**
   * renderer绘制一批 renderNode
   * @param drawInfo
   * @param isLazy
   * @param notFill
   */
  async draw(drawInfo: RendererFrameInfo, options?: { isLazy: boolean; notFill: boolean }) {
    const { isLazy = true, notFill = false } = options || {}
    this.curDrawInfo = drawInfo
    this.curDrawIsLazy = isLazy

    this.curRenderInfo = this.curDrawInfo.renderInfo
    this.curFrameIndex = this.curDrawInfo.frameIndex
    this.curLayer = this.curDrawInfo.layer
    // this.curTransformer = this.curDrawInfo.transformer

    const allPromises = []

    // 这里不能在for循环中await，因为在lazy渲染时，是不会等待draw的过程，所以先收集promise，最后返回promise all
    for (const node of this.curDrawInfo.segmentNodes) {
      allPromises.push(this.drawRenderNode(node, notFill))
    }

    return Promise.all(allPromises)
  }
  async drawRenderNode(renderNode: SegmentRenderNode<LayerData>, notFill: boolean = false) {
    // trackLogsStart(LOGS_TYPE.beforeFillWork)
    // let renderNode = this.cacheRenderNodeMap.get(segmentNode.nid)
    console.log(renderNode, 'renderNode')
    // 创建
    // if (!renderNode) {
    //   renderNode = this.createRenderNode(segmentNode as SegmentNode<LayerData>)
    //   const nodeContainer: Konva.Group | Konva.Text = renderNode.container
    //   nodeContainer.id(renderNode.nid)
    //   nodeContainer.draggable(!renderNode.data.disabled)
    //   this.cacheRenderNodeMap.set(segmentNode.nid, renderNode)
    //   this.addElementEventListener(nodeContainer)
    // }

    // 首先更新数据
    // renderNode.data = segmentNode
    // const nodeContainer: Konva.Group | Konva.Text = renderNode.container
    // this.setElementOffset(nodeContainer)

    // 更新
    // this.updateRenderNodeAttrs(renderNode)
    // if (renderNode.isDestroyed) {
    //   // 更新完renderNode数据之后，如果发现节点被损坏了，那么直接终止后续异步渲染填充
    //   return this.drawSegmentNode(segmentNode, notFill)
    // }

    // if (judgeSegmentNodeIsInFrame(segmentNode, this.curRenderFrame)) {
    //   this.curLayer.add(nodeContainer)
    //   this.curRenderNodes.push(renderNode)
    // } else {
    //   this.removeRenderNode(segmentNode.nid)
    // }

    // trackLogsEnd(LOGS_TYPE.beforeFillWork)
    // 异步填充
    // if (!notFill) {
    //   // 异步填充（如果懒绘制则无需等待绘制结果）
    //   if (this.curDrawIsLazy) {
    //     this.fillRenderNode(renderNode)
    //   } else {
    //     await this.fillRenderNode(renderNode)
    //     trackLogsStart(LOGS_TYPE.drawTime, this)
    //     /**切记不能移除：该函数能确保渲染时能拿到准确的帧数据 */
    //     this.curLayer.draw()
    //     trackLogsEnd(LOGS_TYPE.drawTime, this)
    //   }
    // }
  }
}
