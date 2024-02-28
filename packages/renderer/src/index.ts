import Konva from 'konva'
import { EventEmitter, IKonvaEventEmitter } from '@/libs'
import BaseRenderer from '@/modules/base-renderer'
import ImageRenderer from '@/modules/img-renderer'
import { createStageAndLayer } from '@/utils'
import {
  ViewPortSize,
  IRenderInfo,
  IRenderNode,
  NodeType,
  SegmentRenderNode,
  LayerData
} from '@/types'
export class Renderer {
  static RenderEvent = {
    updateNode: 'updateNode',
    changeActiveNode: 'changeActiveNode'
  }
  private _isInited: boolean = false
  // const setup = (container: IKonvaContainer) => {
  //   const containerSize = caclContainerSize(container)
  //   const { width, height } = containerSize
  //   initStageAndLayer({ target: container.target, configSize: [width, height] })
  //   setStageInfo(containerSize)
  // }
  // private _fitFn = null
  private eventDisapther: IKonvaEventEmitter = EventEmitter()

  // private roleRenderer = new RoleRenderer(this, this.eventDisapther)
  // private textRenderer = new TextRenderer(this, this.eventDisapther)
  private imageRenderer = new ImageRenderer(this, this.eventDisapther)
  // private pagRenderer = new PagRenderer(this, this.eventDisapther)
  // private staticTempRenderer = new StaticTextTemplateRenderer(this, this.eventDisapther)
  // private videoRenderer = new VideoRenderer(this, this.eventDisapther)
  target: HTMLDivElement
  viewPortSize: ViewPortSize
  stage!: Konva.Stage
  layer!: Konva.Layer

  rendererMap: {
    [propStr: string]: BaseRenderer
  } = {
    // [SegmentNodeDataType.scene]: new SceneRender(this, this.eventDisapther),

    [NodeType.widget_image]: this.imageRenderer
    // [SegmentNodeDataType.role]: this.roleRenderer,
    // [SegmentNodeDataType.widget_text]: this.textRenderer
    // [SegmentNodeDataType.head_pag]: this.pagRenderer,
    // [SegmentNodeDataType.tail_pag]: this.pagRenderer,
    // [SegmentNodeDataType.widget_text_pag]: this.pagRenderer,
    // [SegmentNodeDataType.widget_text_static_tempate]: this.staticTempRenderer,
    // [SegmentNodeDataType.caption]: this.staticTempRenderer,
    // [SegmentNodeDataType.widget_video]: this.videoRenderer
    // [SegmentNodeDataType.widget_text_template]: new TextTemplateRenderer(),
  }

  /**
   * 初始化 renderer
   * @param target
   * @param viewPortSize
   * @param transformerConfig
   * @returns
   */
  init(
    target: HTMLDivElement,
    options: {
      viewPortSize: ViewPortSize
    }
    // viewPortSize: ViewPortSize,
    // transformerConfig: TransformerConfig = {
    //   rotateEnabled: true,
    //   resizeEnabled: true
    // }
  ) {
    // 已经初始化过了，不再初始化
    if (this._isInited) {
      return
    }

    if (!target || !options.viewPortSize) {
      return
    }

    // if (transformerConfig) {
    //   this.transformerConfig = transformerConfig
    // }
    this.target = target
    this.viewPortSize = options.viewPortSize

    // this.animation = new Konva.Animation(() => {})
    this.initStageAndLayer()
    // this.animation.addLayer(this.layer)
    // this.initTransformer()
    // this.addEventListener()

    this._isInited = true
  }

  private initStageAndLayer() {
    const { stage, layer } = createStageAndLayer({
      target: this.target,
      configSize: [this.viewPortSize.width, this.viewPortSize.height]
    })
    this.stage = stage
    this.layer = layer
    this.stage.add(this.layer)

    // todo
    // this.fitStageIntoParentContainer()
    // this._fitFn = this.fitStageIntoParentContainer.bind(this)
    // window.addEventListener('resize', this._fitFn)
  }
  /**
   *
   * @param renderInfo 渲染的信息
   * @returns
   */
  async render(renderInfo: IRenderInfo, frame: number) {
    if (!this.stage || !this.layer) {
      return
    }

    // 如果片段duration是-1，那么animation启动，自动驱动绘制，duration为-1时，gif，apng等需要自动播放，此时需要一个animation自动驱动
    // if (segmentInfo.duration === INFINITE_DURATION) {
    //   this.animation.start()
    // } else {
    //   this.animation.stop()
    // }

    // 清理画布
    // this.removeAll(excludedTypes)
    // 找到当前帧需要渲染的节点
    // const arr: Array<SegmentNode> = getSegmentNodesFromFrame(segmentInfo, frame)
    for (const key of Object.keys(this.rendererMap)) {
      const arr: SegmentRenderNode[] = renderInfo.children
      const renderList = arr.filter((segmentNode) => {
        return segmentNode.data.type === key
      })
      // 图片渲染器
      const renderer = this.rendererMap[NodeType.widget_image]
      renderer.draw({
        renderInfo,
        frameIndex: frame,
        layer: this.layer,
        // transformer: this.transformer,
        segmentNodes: renderList as Array<SegmentRenderNode<LayerData>>
      })
    }

    // // 分发渲染节点到不同的渲染器上进行绘制
    // for (let key of Object.keys(this.rendererMap)) {
    //   const renderer = this.rendererMap[key]
    //   // 如果没找到渲染器或者该类型的数据被排除渲染，则跳过
    //   if (
    //     !renderer ||
    //     excludedTypes.some((type) => {
    //       return type === key
    //     })
    //   ) {
    //     continue
    //   }
    //   const renderList = arr.filter((segmentNode) => {
    //     return segmentNode.data.type === key
    //   })
    //   if (isLazy) {
    //     renderer.draw(
    //       {
    //         segmentInfo,
    //         renderFrameNum: frame,
    //         layer: this.layer,
    //         transformer: this.transformer,
    //         segmentNodes: renderList as Array<SegmentNode<LayerData>>
    //       },
    //       isLazy
    //     )
    //   } else {
    //     await renderer.draw(
    //       {
    //         segmentInfo,
    //         renderFrameNum: frame,
    //         layer: this.layer,
    //         transformer: this.transformer,
    //         segmentNodes: renderList as Array<SegmentNode<LayerData>>
    //       },
    //       isLazy
    //     )
    //   }
    // }

    // // 重新设置transformer TODO 这里要稍微加个延迟，防止transformer时，active节点transform不成功：具体原因待排查
    // setTimeout(() => {
    //   this.rehandleTransformerNode()
    // }, 100)

    // // sort elements
    // this.sortLayerElements()
  }
  // const renderElements = (nodes: UIEventNode[]) => {
  //   setTransformerNodes([])
  //   hideKonvaElements()
  //   // 初始化数据
  //   calcInitialNode(nodes)
  //   const { newNodes, replaceNodes, updateAttrNodes } = groupByDataMap(nodes)
  //   newNodes.length && console.log(newNodes, '画布未有元素 => 新增元素')
  //   newNodes.forEach((node) => addElement(node))

  //   updateAttrNodes.length && console.log(updateAttrNodes, '画布已有元素 => 只更新属性')
  //   updateAttrNodes.forEach((node) => updateElementAttrs(node))

  //   replaceNodes.length && console.log(replaceNodes, '画布已有元素 => 替换元素')
  //   replaceNodes.forEach((node) => replaceElement(node))

  //   return nodes
  // }
  // stageScale: number = 1

  // rendererMap: {
  //   [propStr: string]: BaseRenderer
  // } = {
  //   // [SegmentNodeDataType.scene]: new SceneRender(this, this.eventDisapther),
  //   [SegmentNodeDataType.role]: this.roleRenderer,
  //   [SegmentNodeDataType.widget_text]: this.textRenderer,
  //   [SegmentNodeDataType.widget_image]: this.imageRenderer,
  //   [SegmentNodeDataType.head_pag]: this.pagRenderer,
  //   [SegmentNodeDataType.tail_pag]: this.pagRenderer,
  //   [SegmentNodeDataType.widget_text_pag]: this.pagRenderer,
  //   [SegmentNodeDataType.widget_text_static_tempate]: this.staticTempRenderer,
  //   [SegmentNodeDataType.caption]: this.staticTempRenderer,
  //   [SegmentNodeDataType.widget_video]: this.videoRenderer
  //   // [SegmentNodeDataType.widget_text_template]: new TextTemplateRenderer(),
  // }

  // target: HTMLElement
  // viewPortSize: ViewPortSize

  // stage!: Konva.Stage
  // layer!: Konva.Layer
  // animation!: Konva.Animation

  // transformer!: Konva.Transformer
  // transformerConfig!: TransformerConfig
  // curEnabledAnchors = Anchors_CORNER

  // curSegmentInfo: SegmentInfo
  // curSelectNode: SegmentNode

  // iconCanvas?: HTMLCanvasElement
}
