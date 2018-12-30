import { get } from './helpers'

// api/seller
// mock的数据 在hash下可以查看
const getSeller = get('api/seller')
const getGoods = get('api/goods')
const getRatings = get('api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
