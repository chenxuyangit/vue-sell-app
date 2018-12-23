import { get } from './helpers'

// api/seller
// mock的数据 在hash下可以查看
const getSeller = get('api/seller')
const getGoods = get('api/goods')

export {
  getSeller,
  getGoods
}
