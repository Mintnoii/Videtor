import Konva from 'konva'

export interface IContainerInfo {
  target: HTMLDivElement
  configSize: number[]
}

/**
 * 计算容器的大小
 * @param containerInfo 容器信息
 * @returns {width: number, height: number, scale: number}
 */
export const caclContainerSize = (containerInfo: IContainerInfo) => {
  const { target, configSize } = containerInfo
  const [width, height] = configSize
  const targetParent = target.parentElement
  if (!targetParent) {
    console.log('target 缺少画布容器', target)
    return {
      width: 1,
      height: 1,
      scale: 1
    }
  }
  const ratio = width / height
  const c_width = targetParent.clientWidth
  const c_height = targetParent.clientHeight
  const cRatio = c_width / c_height

  let result_w, result_h, result_scale

  if (ratio > 1 && cRatio < ratio) {
    // 横屏 且 父容器比例小于目标比例
    // 根据父容器的宽度计算最终高度（result_h）
    result_h = (c_width * height) / width
    result_w = c_width
    result_scale = c_width / width
  } else {
    // 不满足上述条件，则表示 竖屏
    // 根据父容器的高度计算最终宽度（result_h）
    result_w = (c_height * width) / height
    result_h = c_height
    result_scale = result_w / width
  }

  return {
    width: result_w,
    height: result_h,
    scale: result_scale
  }
}

export const createStageAndLayer = (containerInfo: IContainerInfo) => {
  const containerSize = caclContainerSize(containerInfo)
  const { width, height, scale } = containerSize

  const customConfig: Konva.StageConfig = {
    name: 'canvasStage',
    container: containerInfo.target,
    width: width,
    height: height,
    // 通过偏移，设置画布的中心点为坐标原点
    offset: {
      x: -width / 2,
      y: -height / 2
    },
    scaleX: scale,
    scaleY: scale
  }

  const stage = new Konva.Stage(customConfig)

  const layer = new Konva.Layer({ name: 'canvasLayer' })
  // stage.add(layer)
  return {
    stage,
    layer
  }
}
