// 时间戳转格式 yyyy-MM-DD
export const timestampToTime = (type) => {
  const date = new Date()
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  if (type === 1) {
    return Y + '-' + M + '-' + D
  } else if (type === 2) {
    return Y + '-' + M
  }
}
