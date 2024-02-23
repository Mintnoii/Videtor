export const add = (a:number, b:number) => {
  return a + b
}
export class Renderer {
  static RenderEvent = {
    updateNode: 'updateNode',
    changeActiveNode: 'changeActiveNode'
  }
  private _isInited: boolean = false
  
  // private _fitFn = null
  // private eventDisapther = new EventDispatcher()

  // private roleRenderer = new RoleRenderer(this, this.eventDisapther)
  // private textRenderer = new TextRenderer(this, this.eventDisapther)
  // private imageRenderer = new ImageRenderer(this, this.eventDisapther)
  // private pagRenderer = new PagRenderer(this, this.eventDisapther)
  // private staticTempRenderer = new StaticTextTemplateRenderer(this, this.eventDisapther)
  // private videoRenderer = new VideoRenderer(this, this.eventDisapther)

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