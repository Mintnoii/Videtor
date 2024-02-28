export const getImgUrlType = (url: string) => {
  const match = /\.([a-z]+)(?:[?#]|$)/i.exec(url)
  // 取得匹配到的后缀并转换为小写 没有匹配到后缀，返回空字符串
  const ext = match ? match[1].toLowerCase() : ''
  // 判断后缀是否属于目前已支持的图片资源类型
  return ['jpg', 'jpeg', 'gif', 'png', 'webp'].includes(ext) ? ext : ''
}
