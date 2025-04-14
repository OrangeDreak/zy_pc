import{_ as D,r as g,m as V,I as j,c as x,o as y,d as s,a,w as o,e as n,t as l,q as c,v as C,h as u,k as O,b as P,O as F}from"./index-BwAutTYV.js";import{a as q}from"./orderList-Cl9_r-Fb.js";import"./request-ChjQmMKM.js";import"./currency-BaKDgkX2.js";const B={class:"package-detail"},I={class:"breadcrumb"},L={class:"status-bar"},Q={class:"status-text"},S={class:"package-no"},T={class:"submit-time"},U={class:"info-card"},W={class:"info-content"},$={class:"info-item"},E={class:"label"},M={class:"value"},R={class:"info-item full-width"},z={class:"value"},A={class:"info-card"},G={class:"info-content"},H={class:"info-row"},J={class:"info-item"},K={class:"value"},X={class:"info-item"},Y={class:"value"},Z={class:"info-card"},ss={class:"package-options"},ts={class:"option"},es={class:"option"},as={class:"info-card"},ls={class:"fee-details"},os={class:"bg-gray-50 flex justify-center"},is={class:"w-[1440px] p-8"},ns={class:"flex space-x-4"},ds={class:"flex-1 bg-gray-100 rounded-lg p-6"},cs={class:"space-y-4"},rs={class:"flex justify-between items-center"},_s={class:"flex items-center"},us={class:"text-xl font-medium"},ps={class:"flex justify-between items-center"},vs={class:"text-gray-900"},ms={class:"flex-1 rounded-lg p-6"},fs={key:0,class:"space-y-4"},gs={class:"flex justify-between items-center"},xs={class:"flex items-center"},ys={class:"text-xl font-medium text-red-500"},bs={class:"flex justify-between items-center"},ks={class:"text-gray-900"},hs={class:"info-card"},ws={class:"product-info"},Ns={class:"product-detail"},Ds={class:"product-name"},Vs={__name:"PackageDetail",setup(js){const p=j(),e=g({}),r=g("paper");V(()=>{p.query.id&&b()});const b=async()=>{await q.packageOrderDetail({packageOrderId:p.query.id}).then(_=>{_.code===200&&(e.value=_.data)})};return(_,t)=>{const k=n("el-link"),d=n("el-icon"),h=n("el-button"),v=n("el-radio"),m=n("QuestionFilled"),w=n("el-image"),f=n("el-table-column"),N=n("el-table");return y(),x("div",B,[s("div",I,[a(k,{type:"primary",onClick:t[0]||(t[0]=i=>_.$router.push("/orders"))},{default:o(()=>t[3]||(t[3]=[c("我的包裹")])),_:1}),a(d,null,{default:o(()=>[a(u(O))]),_:1}),t[4]||(t[4]=s("span",null,"包裹详情",-1))]),s("div",L,[a(d,{class:"status-icon"},{default:o(()=>[a(u(P))]),_:1}),s("span",Q,l(e.value.orderStatusDesc),1),s("div",S,[c(" 包裹编号："+l(e.value.packageOrderNo)+" ",1),a(h,{link:"",type:"primary",class:"copy-btn"},{default:o(()=>[a(d,null,{default:o(()=>[a(u(F))]),_:1})]),_:1})]),s("div",T,"提交时间："+l(e.value.gmtCreate),1)]),s("div",U,[t[5]||(t[5]=s("div",{class:"card-title"},"收货信息",-1)),s("div",W,[s("div",$,[s("span",E,l(e.value.firstName)+" "+l(e.value.lastName),1),s("span",M,l(e.value.mobile),1)]),s("div",R,[s("span",z,l(e.value.countryName)+"/"+l(e.value.provinceName)+"/"+l(e.value.cityName)+"/"+l(e.value.address),1)])])]),s("div",A,[t[9]||(t[9]=s("div",{class:"card-title"},"物流信息",-1)),s("div",G,[s("div",H,[s("div",J,[t[6]||(t[6]=s("span",{class:"label"},"寄送国家：",-1)),s("span",K,l(e.value.sendCountry),1)]),s("div",X,[t[7]||(t[7]=s("span",{class:"label"},"寄送线路：",-1)),s("span",Y,l(e.value.logisticsLineName),1)]),t[8]||(t[8]=s("div",{class:"info-item"},[s("span",{class:"label"},"物流跟踪："),s("span",{class:"value"},"--")],-1))])])]),s("div",Z,[t[12]||(t[12]=s("div",{class:"card-title"},"包装方式",-1)),s("div",ss,[s("div",ts,[a(v,{modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=i=>r.value=i),label:"paper",disabled:""},{default:o(()=>t[10]||(t[10]=[c(" 纸箱包装 ")])),_:1},8,["modelValue"])]),s("div",es,[a(v,{modelValue:r.value,"onUpdate:modelValue":t[2]||(t[2]=i=>r.value=i),label:"extra",disabled:""},{default:o(()=>t[11]||(t[11]=[c(" 免费服务 ")])),_:1},8,["modelValue"])])])]),s("div",as,[t[19]||(t[19]=s("div",{class:"card-title"},"运费明细",-1)),s("div",ls,[s("div",os,[s("div",is,[s("div",ns,[s("div",ds,[s("div",cs,[s("div",rs,[s("div",_s,[t[13]||(t[13]=s("span",{class:"text-gray-600"},"预估押金",-1)),a(d,{class:"ml-1 text-gray-400"},{default:o(()=>[a(m)]),_:1})]),s("span",us,"¥"+l(e.value.freightDeposit),1)]),s("div",ps,[t[14]||(t[14]=s("span",{class:"text-gray-600"},"包裹预估重量",-1)),s("span",vs,l(e.value.estimatePackageWeight)+"g",1)])])]),s("div",ms,[e.value.realFreightDeposit?(y(),x("div",fs,[s("div",gs,[s("div",xs,[t[15]||(t[15]=s("span",{class:"text-gray-600"},"最终支付",-1)),a(d,{class:"ml-1 text-gray-400"},{default:o(()=>[a(m)]),_:1})]),s("span",ys,"¥ "+l(e.value.realFreightDeposit),1)]),t[17]||(t[17]=s("div",{class:"flex justify-between items-center"},[s("span",{class:"text-gray-600"},"运费补款"),s("span",{class:"text-red-500"},"¥ 26.17")],-1)),s("div",bs,[t[16]||(t[16]=s("span",{class:"text-gray-600"},"实际称重",-1)),s("span",ks,l(e.value.realPackageWeight)+"g",1)])])):C("",!0)])])])]),t[18]||(t[18]=s("div",{class:"fee-row total"},[s("span",{class:"label"},"申报金额："),s("span",{class:"value"},"--")],-1))])]),s("div",hs,[t[20]||(t[20]=s("div",{class:"card-title"},"商品清单",-1)),a(N,{data:e.value.skuDetailList,style:{width:"100%"}},{default:o(()=>[a(f,{label:"商品详情","min-width":"400"},{default:o(({row:i})=>[s("div",ws,[a(w,{src:i.headPic,class:"product-image"},null,8,["src"]),s("div",Ns,[s("div",Ds,l(i.productName),1)])])]),_:1}),a(f,{label:"数量",width:"120",align:"center"},{default:o(({row:i})=>[c(" ×"+l(i.skuNum),1)]),_:1})]),_:1},8,["data"])])])}}},qs=D(Vs,[["__scopeId","data-v-ce36d0cf"]]);export{qs as default};
