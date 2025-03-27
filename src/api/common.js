import request from '@/utils/request'

export const getArea = (params) => {
  return request({
    url: "/app/area/listByLevel",
    method: "get",
    params,
  });
}