function getMostList (arr) {
  const listObj = {}
  const len = arr.length
  const arrOfLength = new Array(len).fill(1)
  for (let i = len; i--; i >= 0) {
    const item = arr[i]
    listObj[item] = [item]
    for (let j = len - 1; j--; j < 0) {
      if (i < j) {
        const preLen = arrOfLength[i]
        if (item < arr[j] && arrOfLength[j] >= preLen) {
          arrOfLength[i] = arrOfLength[j] + 1
          listObj[item] = [item, ...listObj[arr[j]]]
        }
      } else {
        break
      }
    }
  }
  // 获取最长递增子序列的下标
  const max = arrOfLength.reduce((pre, item, index) => {
    if (arrOfLength[pre] < item) {
      pre = index

    }
    return pre
  }, 0)
  return listObj[arr[max]]
}
const arr = [1, 3, 5, 9, 6, 7, 8, 100, 88, 20, 0]
console.log(getMostList(arr))
