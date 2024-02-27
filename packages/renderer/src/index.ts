import Konva from 'konva'
import { EventEmitter, IKonvaEventEmitter } from '@/libs'
import ImageRenderer from '@/modules/img-renderer'
import { createStageAndLayer } from '@/utils'

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
  // viewPortSize: ViewPortSize
  stage!: Konva.Stage
  layer!: Konva.Layer
  /**
   * 初始化 renderer
   * @param target
   * @param viewPortSize
   * @param transformerConfig
   * @returns
   */
  init(
    target: HTMLDivElement
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

    // if (!target || !viewPortSize) {
    //   return
    // }

    // if (transformerConfig) {
    //   this.transformerConfig = transformerConfig
    // }
    this.target = target
    // this.viewPortSize = viewPortSize

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
      configSize: [600, 600]
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
   * @param segmentInfo
   * @param frame
   * @param isLazy 是否预加载片头片尾主视频等大资源
   * @returns
   */
  //  segmentInfo: SegmentInfo,
  //   frame: number,
  //   isLazy: boolean = true,
  //   excludedTypes: Array<SegmentNodeDataType> = []
  async render(frameInfo: any) {
    console.log('render')
    if (!this.stage || !this.layer) {
      return
    }
    const layer = this.layer
    // var width = window.innerWidth;
    //   var height = window.innerHeight;

    const imageObj = new Image()
    imageObj.onload = function () {
      const yoda = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 106,
        height: 118
      })

      // add the shape to the layer
      layer.add(yoda)
      layer.batchDraw()
    }
    imageObj.src = frameInfo.url
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
