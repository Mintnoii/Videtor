/**
 * 节点的data类型
 * data类型和该节点的渲染方式息息相关
 *
 * 其中对片头片尾类型加了pag的区分，而不是直接片头数据，内部再用另外一个字段表示真正的数据类型。
 * 以及text分为了普通文本节点，静态文本节点，pag文本节点
 * 做如此详细的划分，是为了能够通过data中的type就直接知道如何渲染该节点。
 * 其中rendermgr中的渲染分发器就是通过数据类型进行分发的。
 */
export const enum NodeType {
  // scene = 'scene', // 场景
  // head_pag = 'head_pag', // 片头（pag）
  // tail_pag = 'tail_pag', // 片尾（pag）

  // head_video = 'head_video', // 片头（视频）
  // tail_video = 'tail_video', // 片尾（视频）

  role = 'role', // 角色

  widget_container = 'wdiget_container', // container
  widget_text = 'widget_text', // 普通文本节点
  widget_text_static_tempate = 'widget_text_static_tempate', // 静态文字模板（字幕也是用该结构）
  // widget_text_pag = 'widget_text_pag', // 动态文字模板(pag形式)
  widget_image = 'widget_image', // 图片节点：支持png,gif,apng
  widget_video = 'widget_video', // 视频节点

  caption = 'caption', // 字幕
  audio = 'audio',
  // 暂不设置
  none = 'none'
}

export interface BaseData {
  /**数据唯一标识 */
  dataId?: string

  /**父节点唯一标识：当是widget_container，widget_text_static_template等树状结构时，子节点会记录其父节点的parentDataId */
  parentDataId?: string

  /**来源id：模板id，标记节点来源id，譬如字幕节点，需用到该字段，用来标识字幕用的是什么字体 */
  fromId?: string

  /**来源tag：用来定位节点来源所属标识，譬如-前景背景 */
  fromTags?: string

  /**节点类型 */
  type: NodeType
  /**节点名称 */
  name: string

  /**
   * data中涉及到时间的单位默认都是毫秒
   *
   * 如果设置了FPS字段，那么data中涉及到时间的单位默认则为帧
   * */
  FPS?: number

  /**在不同上下文结构中，用来存放一些业务上下文相关的其他字段 */
  // extraData?: any
}

/**
 * 基础图层数据：roleNode，widgetNode，captionData等直接绘制在viewport上的元素
 */
export interface BaseLayerData extends BaseData {
  width: number
  height: number

  scale: number
  x: number
  y: number
  /**旋转 */
  rotation: number
  /**透明度 */
  alpha: number

  /**特效类型 */
  effectType?: string
  /**特效过渡时间: 单位毫秒 */
  transitionTime?: number
}

/**
 * 图片节点的预览静图为空，则取url当预览静图
 * 预览动图为空的话，则去url当预览动图
 */
export interface WidgetImageData extends BaseLayerData {
  type: NodeType.widget_image
  url: string
  /**预览静图 */
  previewStaticUrl?: string
  /**预览动图 */
  previewAnimationUrl?: string

  fillMode?: string

  /**渲染时是否循环，譬如时长为3秒，拉到6秒之后，是渲染2遍，还是渲染一遍之后定格在最后一帧 */
  loop?: boolean

  mask?: {
    url: string
    width?: number
    height?: number
    x?: number
    y?: number
  }

  background?: {
    url: string
    width?: number
    height?: number
    x?: number
    y?: number
  }
}

/**widgetData */
export type WidgetData = WidgetImageData
// | WidgetContainerData
// | WidgetVideoData
// | WidgetTextData
// | WidgetTextStaticTemplateData
// | WidgetTextPag

/**图层数据：
 *  场景（3D）;
 *  片头片尾（场景轴的补充，没有场景轴，则没有片头片尾轴）；
 *  角色（3D兼容2D：如果场景轴中带有角色的渲染，那么没有角色轴）；
 *  widget（2D）；
 *  caption（2D）；
 * */
// export type LayerData = SceneData | HeadTailData | RoleData | WidgetData | CaptionData
export type LayerData = WidgetData

/**所有片段节点 */
/**图层数据；音频数据 */
// export type SegmentNodeData = LayerData | AudioData
export type RenderNodeData = LayerData

/**
 * 片段节点：一段SegmentInfo中，是片段生存空间信息+诸多片段节点的合集
 * 一个片段节点清晰的记录了该节点所在的层级，以及他的生命周期，节点属性等数据
 */
export interface SegmentRenderNode<T extends RenderNodeData = RenderNodeData> {
  /**
   * 节点唯一标识
   */
  nid: string

  /**
   * 节点处在哪个轴上
   * 节点的轴类型一般控制节点在轴上应该处在什么位置以及轴所在层级以及能出现多少个相同类型的轴。
   * 譬如片头片尾轴，该轴只能出现1次，且片头片尾的顺序也被限制，轴的层级也相对受限，其本身的data数据是pag相关的数据，但是将其放在片头片尾上，
   * 则片头片尾的trigger则会固定，不可随意设置了。但是片头片尾的在画布上的渲染逻辑却依然使用pag的方式进行渲染，读取片头片尾内容也依然使用pag的方式读取。
   *
   * 如果想了解具体的轴特性，可参考TRACK_TYPE的注释部分
   */
  // trackType: TRACK_TYPE | SUB_TRACK_TYPE

  /**
   * 节点轴id
   * axisId数值越小，渲染时的层级越往下，其中audio的处理不受axisId影响，audio元素的axisId<=-1000
   */
  // axisId: number

  /**
   * 默认值：false
   * 节点是否可编辑属性：如果设置为true，则节点属性被冻结，不能再更改其任何属性，但可整体替换
   * 这里要说明一下：
   *    每个节点的可编辑属性和节点自身的类型以及所处的轴有密切关系，节点的disabled设置为falase，并不代表节点的所有属性可以任意更改。
   *    譬如片头片尾的宽高，旋转等在塞入到segmentInfo之后就已经确定，在修改片段信息的过程中，片头片尾的宽高，旋转等是不可以修改的。
   *    但是片头片尾中的可编辑文本内容是可以变更的，如果片头片尾节点的disabled设置为true，那么片头片尾节点的可编辑内容也不可更改
   */
  // disabled: boolean

  /**
   * 默认值：true
   * 可替换，这里的可替换指的是整体替换节点，而不是像片头片尾中替换某一个图片或者文字的概念（这个是编辑节点的属性）
   * canReplace和disabled这2个字段是独立的。
   * 有些节点disabled可以为true,canReplace为true的情况下，节点虽然不可编辑，但是可以整体替换（譬如有言中的演播室的前景背景）
   */
  // canReplace: boolean

  /**
   * 默认值：true
   * 节点是否能展示
   * 如果设置为false，则该节点不展示。
   */
  // visible: boolean

  /**
   * 节点在片段中何时出现的时间点
   * 注： 目前单位只有帧
   */
  // trigger: number

  /**
   * 节点在片段中的出现的持续时长，trigger+duration则是该节点在片段中的结束时间点
   * 注： 目前单位只有帧
   */
  // duration: number

  /**
   * 注：data中所有有涉及到时间的字段（这些字段的单位不受segmentInfo中的timelineUnit这些所控制），
   *    其单位默认都为毫秒，如果设置了FPS，则单位为帧。
   *
   * 节点数据（描述节点本身特性的数据，用来渲染图像或者用来播放）：
   * 分为layerData（能以图像的形式展现在屏幕上），audioData（能以音频的方式出现）
   * layerData：
   *    通用属性（x,y,rotation,scale,width,height,alpha等）
   *    特有属性（譬如widget_text_pag，则有pagNodes等属性，widget_image，则有mask，background等属性）
   * audioData：
   *    音频相关属性
   */
  data: T

  /**
   * 在不同上下文结构中，用来存放一些业务上下文相关的其他字段
   * 举个例子：
   *    譬如ssml转为segmentInfo时，一些ssml中的冗余字段可以放到这里，方便transform回去的时候再塞到ssml中
   */
  // extraData?: any
}

/**
 * 渲染器所持有的渲染节点类型
 */
export interface IRenderNode<T = null, K = null> {
  /**唯一标识 */
  nid: string
  /**数据 */
  data: SegmentRenderNode<LayerData>
  /**渲染节点容器 */
  // container: Konva.Group | Konva.Text
  /**渲染节点核心控制器：pag渲染，图片渲染等会用到 */
  // coreProcess: T
  /**节点所需要的素材：扩展字段，暂时无用 */
  // assets: K

  /**节点是否被损坏了 */
  // isDestroyed?: boolean
}
