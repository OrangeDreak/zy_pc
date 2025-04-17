import request from '@/utils/request'

export const getArea = (params) => {
  return request({
    url: "/app/area/listByLevel",
    method: "get",
    params,
  });
}
export const getAgreementList = (params) => {
  return request({
    url: "/app/article/agreementList",
    method: "get",
    params,
  });
}
export const getArticle = (params) => {
  return request({
    url: "/app/article/detail",
    method: "get",
    params,
  });
}
export const getArticleList = (params) => {
  return request({
    url: "/app/article/articleList",
    method: "get",
    params,
  });
}