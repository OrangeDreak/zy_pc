import{r as e}from"./request-DAa1bAHQ.js";const o={getOrderList(r){return e({url:"/app/tp/order/orderList",method:"post",data:r})},getQcOrderList(r){return e({url:"/app/tp/order/qcOrderList",method:"post",data:r})},myPackageOrderList(r){return e({url:"/app/package-order/myPackageOrderList",method:"post",data:r})},packageOrderDetail(r){return e({url:"/app/package-order/detail",method:"get",params:r})},getSharingCode(r){return e({url:"/app/tp/order/getSharingCode",method:"get",params:r})},decodeSharingCode(r){return e({url:"/app/tp/order/decodeSharingCode",method:"post",data:r})},sharingListForBusiness(r){return e({url:"/app/tp/order/sharingListForBusiness",method:"post",data:r})},updateAttentionMark(r){return e({url:"/app/tp/order/updateAttentionMark",method:"post",data:r})},getSharingCode(r){return e({url:"/app/tp/order/getSharingCode",method:"get",params:r})},getOrderCount(r){return e({url:"/app/tp/order/count",method:"get",params:r})},packageOrderCancel(r){return e({url:"/app/package-order/packageOrderCancel",method:"post",data:r})}};export{o as a};
