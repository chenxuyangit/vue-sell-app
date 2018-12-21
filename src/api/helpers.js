// 封装函数，来获取数据
import axios from 'axios'

const ERR_OK = 0

export function get (url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        console.log(res.data)
        return data
      }
    }).catch((e) => {
      console.log('数据传输失败')
    })
  }
}
