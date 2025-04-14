import{_ as ee,z as te,A as ae,r as h,B as U,m as se,e as k,c,o,C as ie,v as y,D as le,d as t,t as i,q as v,F as L,f as A,h as P,G as z,a as d,w as f,H as pe,I as he,J as j,K as ve,i as X,L as Z}from"./index-BwAutTYV.js";import{l as _e,p as ge,_ as me,a as fe,e as ye}from"./order-C0kTsjPC.js";import{f as M,a as G,b as be}from"./tools-DlxY66FA.js";import{S as $e}from"./index-CubC8P_4.js";import{C as ke}from"./CommonHeader-BRJFjOJH.js";import"./request-ChjQmMKM.js";import"./currency-BaKDgkX2.js";const we={class:"line-detail"},Ce={class:"box"},Ie={class:"limit"},Te={class:"item-title"},Pe={class:"limit-table"},xe={class:"top"},We={class:"min-weight flex-1"},Le={class:"max-weight flex-1"},Ne={class:"middle"},De={class:"bottom"},Se={class:"product-type"},Fe={class:"header"},Ee={class:"item"},Be={class:"item"},Me={class:"con"},qe={class:"title"},ze={class:"cost"},Ue={class:"title"},Ae={key:0},Ve={class:"priceText"},He={class:"keText"},Oe={key:1},Re={class:"priceText"},je={class:"keText"},Ge={key:2},Je={class:"priceText"},Ke={key:0,class:"line-detail loadingBox"},Ye={__name:"line-detail",props:{id:{type:[String,Number],required:!0,default:""},selectedLine:{type:[String,Number],default:""},fatherData:{type:Object,default:()=>{}},countryName:{type:String,default:""}},setup(J){const{proxy:w}=te(),{t:F}=ae(),C=J,E=h(),B=h(),N=async()=>{var p,I;console.log(C.fatherData),u.value=!0;const _={logisticsLineId:(p=C.fatherData)==null?void 0:p.logisticsLineId,logisticsLineCostId:(I=C.fatherData)==null?void 0:I.logisticsLineCostId},s=await _e(_);s!=null&&s.success&&(u.value=!1,g.data=s==null?void 0:s.data,E.value.innerHTML=s==null?void 0:s.data.sizeLimit,B.value.innerHTML=s==null?void 0:s.data.volumeChargeLimit,l.value[0].firstWeightPrice=s==null?void 0:s.data.firstWeightPrice,l.value[0].firstWeight=s==null?void 0:s.data.firstWeight,l.value[0].additionalWeightPrice=s==null?void 0:s.data.additionalWeightPrice,l.value[0].additionalWeight=s==null?void 0:s.data.additionalWeight,l.value[0].servicePrice=s==null?void 0:s.data.servicePrice,l.value[0].additionalWeight=s==null?void 0:s.data.additionalWeight,l.value[0].fuelCost=s==null?void 0:s.data.fuelCost,l.value[0].logisticsProviderProcessingFee=s==null?void 0:s.data.logisticsProviderProcessingFee,l.value[0].operationFee=s==null?void 0:s.data.operationFee)};U({area:void 0,timeRange:[]});const u=h(!1),g=U({data:{}});h({area:"GD-EUB To USA-美国",tips:"01/27-02/11",ageingProgress:[{label:"0-7",value:0},{label:"8-15",value:27},{label:"16-25",value:87.25},{label:"26-40",value:17},{label:">40",value:1}],rateProgress:[{label:w.$t("estimate.NotYetDelivered"),value:0}],limitInfo:{minW:null,maxW:2e3,size:"长宽高之和不得大于90cm | 最长边不得大于60cm",vo:"该路线按照包裹实际重量计费。",productInfo:[{title:"服饰",typeInfo:[{enabled:!0,type:"普货"},{enabled:!0,type:"普通品牌"},{enabled:!0,type:"普货"},{enabled:!1,type:"普货"}]},{title:"饰品",typeInfo:[{enabled:!0,type:"普货"},{enabled:!0,type:"普通品牌"},{enabled:!0,type:"普货"},{enabled:!1,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"},{enabled:!0,type:"普通品牌"},{enabled:!0,type:"普货"},{enabled:!1,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"}]},{title:"鞋子",typeInfo:[{enabled:!0,type:"普货"}]}]}});const l=h([{firstWeightPrice:null,additionalWeightPrice:null,servicePrice:null,firstWeight:null,additionalWeight:null,fuelCost:null,logisticsProviderProcessingFee:null,operationFee:null}]),m=()=>({style:{height:"50px",padding:"0px","font-size":"12px"}}),x=()=>({style:{"font-size":"12px",padding:"13px 16px",background:"#fdfdfd"}}),V=[{title:w.$t("estimate.firstWeightPrice"),dataIndex:"firstWeightPrice",align:"center",width:"16.6%",customCell:m,customHeaderCell:x},{title:w.$t("estimate.additionalWeightPrice"),dataIndex:"additionalWeightPrice",align:"center",width:"16.6%",customCell:m,customHeaderCell:x},{title:w.$t("estimate.carrierProcessingFee"),dataIndex:"logisticsProviderProcessingFee",align:"center",width:"16.6%",key:"price",customCell:m,customHeaderCell:x},{title:w.$t("estimate.fuelCharge"),dataIndex:"fuelCost",align:"center",width:"16.6%",key:"price",customCell:m,customHeaderCell:x},{title:w.$t("estimate.operationFee"),dataIndex:"operationFee",align:"center",width:"16.6%",key:"price",customCell:m,customHeaderCell:x},{title:w.$t("estimate.servicePrice"),dataIndex:"servicePrice",align:"center",key:"price",width:"16.6%",customCell:m,customHeaderCell:x}];return se(()=>{N()}),(_,s)=>{const p=k("a-table"),I=k("a-spin");return o(),c(L,null,[ie(t("div",we,[t("div",Ce,[t("section",Ie,[t("div",Te,i(_.$t("estimate.PackageRestrictions")),1),t("div",Pe,[t("div",xe,[t("div",We,i(_.$t("estimate.estTip9"))+" "+i(g.data.packageWeightMin?g.data.packageWeightMin+"g":"--"),1),t("div",Le,i(_.$t("estimate.estTip10"))+" "+i(g.data.packageWeightMax?g.data.packageWeightMax+"g":"--"),1)]),t("div",Ne,[v(i(_.$t("estimate.estTip11"))+" ",1),t("span",{ref_key:"refSizeLimit",ref:E},null,512)]),t("div",De,[v(i(_.$t("estimate.estTip12"))+" ",1),t("span",{ref_key:"refVolumeChargeLimit",ref:B},null,512)])]),t("div",Se,[t("div",Fe,[t("div",Ee,[s[0]||(s[0]=t("span",{class:"circle disabled"},null,-1)),v(i(_.$t("estimate.estTip13")),1)]),t("div",Be,[s[1]||(s[1]=t("span",{class:"circle enabled"},null,-1)),v(i(_.$t("estimate.estTip14")),1)])]),t("div",Me,[(o(!0),c(L,null,A(g.data.productTypeLabelList,(W,D)=>(o(),c("div",{key:D,class:"item"},[t("div",qe,i(P(M)(W,"labelName","en"))+":",1),(o(!0),c(L,null,A(W.children,b=>(o(),c("div",{key:b.labelId,class:z(["tag",b.logisticsLineSupportFlag?"no":"yes"])},i(P(M)(b,"labelName","en")),3))),128))]))),128))])])])]),t("div",ze,[t("div",Ue,i(_.$t("estimate.estTip15")),1),d(p,{"data-source":l.value,bordered:"",columns:V,pagination:!1},{bodyCell:f(({column:W,record:D,index:b,text:S})=>[W.dataIndex==="firstWeightPrice"?(o(),c("div",Ae,[t("span",Ve,"¥ "+i(P(G)(S,!1)),1),t("span",He,"/"+i(D.firstWeight)+" g",1)])):W.dataIndex==="additionalWeightPrice"?(o(),c("div",Oe,[t("span",Re,"¥ "+i(P(G)(S,!1)),1),t("span",je,"/"+i(D.additionalWeight)+" g",1)])):W.key==="price"?(o(),c("div",Ge,[t("span",Je,[S!==null?(o(),c(L,{key:0},[v("¥ "+i(P(G)(S,!1)),1)],64)):(o(),c(L,{key:1},[v("-")],64))])])):y("",!0)]),_:1},8,["data-source"])])],512),[[le,!u.value]]),u.value?(o(),c("div",Ke,[d(I)])):y("",!0)],64)}}},Qe=ee(Ye,[["__scopeId","data-v-a7f4c50e"]]),Xe={class:"estima"},Ze={class:"form"},et={class:"title"},tt={class:"tips"},at={class:"con"},st={class:"left"},it={class:"popOut"},lt={class:"form-item country-select-box"},ot={class:"label required"},nt={class:"value-con country-con"},ct={key:0,class:"close-icon"},dt={class:"form-item w420"},rt={class:"label required"},ut={class:"value-con"},pt={class:"popOut"},ht={class:"productTypeSelect"},vt={class:"selectAb"},_t={class:"form-item w420"},gt={class:"flex-1"},mt={class:"label"},ft={class:"value-con"},yt={class:"flex-1"},bt={class:"label"},$t={class:"value-con"},kt={class:"flex-1"},wt={class:"label"},Ct={class:"value-con"},It={class:"right"},Tt={key:0},Pt={key:0,class:"table-data"},xt={class:"tips"},Wt={class:"line-data"},Lt={class:"con"},Nt={class:"poster"},Dt={class:"img"},St=["src"],Ft={class:"ff-p4 qa-text insurance-desc"},Et={key:0,class:"insurance",src:me,alt:""},Bt={class:"name"},Mt={key:0,class:"tax"},qt={class:"amount"},zt={class:"col999 qa"},Ut={class:"ff-p4 qa-text"},At={class:"num"},Vt={class:"time"},Ht={class:"col999"},Ot={class:"day"},Rt={class:"desc col999"},jt={key:0,class:"block-word desc-text"},Gt={key:1,class:"desc-text"},Jt={class:"action"},Kt={class:"btn-box"},Yt={class:"edit-btn-box"},Qt={key:0,class:"notice"},Xt={class:"tipBottomBoxInner"},Zt={key:1,class:"no-data"},ea={class:"tips"},ta={key:2},aa={key:1,class:"no-data no-data-empty no-data-loading"},sa={__name:"index",setup(J){const w=ae(),F=he(),C=h(!1),E=h(!1),{proxy:B}=te(),N=h(!1),u=h(null),g=U({data:[]}),l=U({country:null,weight:null,productType:[],length:"",width:"",height:""});h(!1);const m=h(),x=()=>{m.value.openPopver()},V=()=>{u.value="",l.country=null,m.value.countrySearch(u.value)},_=()=>{u.value===""&&(l.country=null),m.value.countrySearch(u.value)},s=a=>{l.country=a.id,u.value=`${a.areaEnName} ${a.areaName}`},p=h(),I=h([]),W=a=>{console.log(a,"i"),p.value=a},D=async()=>{const a=await ge();g.data=((a==null?void 0:a.data)||[]).map(e=>(e.labelNameEn=e.labelNameEn.replace("&amp;","&"),e))},b=async()=>{if(!l.country&&l.country!==0){Z.warning(B.$t("estimate.please_select_country"));return}if(!l.weight){Z.warning(B.$t("estimate.pleaseInputWeight"));return}C.value=!0,N.value=!0,console.log(l.productType);const a=[],e=g.data.map(r=>r.labelId);l.productType.forEach(r=>{if(r.length===1&&e.indexOf(r[0])>-1){const H=e.indexOf(r[0]),O=g.data[H].children.map(q=>q.labelId);a.push(...O)}else a.push(...r)});const $={areaLibraryId:l.country,weight:Number(l.weight),labelId:a,length:Number(l.length),width:Number(l.width),height:Number(l.height)};try{const r=await ye($);E.value=!0,I.value=r==null?void 0:r.data,C.value=!1,N.value=!1}catch{C.value=!1,N.value=!1}},S=({labels:a,selectedOptions:e})=>{if(a.length>1)return a.join("/");if(a.length===1){let $="";return e[0].children.forEach(r=>{$+=`${M(e[0],"labelName","En")}/${M(r,"labelName","En")};`}),$}},oe=a=>{let e=a.target.value.replace(/[^0-9.]/g,"");e=e.replace(/(\..*?)\./g,"$1"),e=e.replace(/(\.\d{2})./g,"$1"),e.startsWith(".")&&(e=`0${e}`),e=e.replace(/^(0+)(\d)/,"$2"),console.log(e,"value"),l.weight=e},ne=a=>{let e=a.target.value.replace(/[^0-9.]/g,"");e=e.replace(/(\..*?)\./g,"$1"),e=e.replace(/(\.\d{1})./g,"$1"),e.startsWith(".")&&(e=`0${e}`),e=e.replace(/^(0+)(\d)/,"$2"),console.log(e,"value"),e>1e4&&(e="10000"),l.length=e},ce=a=>{let e=a.target.value.replace(/[^0-9.]/g,"");e=e.replace(/(\..*?)\./g,"$1"),e=e.replace(/(\.\d{1})./g,"$1"),e.startsWith(".")&&(e=`0${e}`),e=e.replace(/^(0+)(\d)/,"$2"),console.log(e,"value"),e>1e4&&(e="10000"),l.width=e},de=a=>{let e=a.target.value.replace(/[^0-9.]/g,"");e=e.replace(/(\..*?)\./g,"$1"),e=e.replace(/(\.\d{1})./g,"$1"),e.startsWith(".")&&(e=`0${e}`),e=e.replace(/^(0+)(\d)/,"$2"),console.log(e,"value"),e>1e4&&(e="10000"),l.height=e};return pe(()=>{var a;D(),F.query.productWeight&&(l.weight=(a=F==null?void 0:F.query)==null?void 0:a.productWeight)}),se(()=>{}),(a,e)=>{const $=k("a-input"),r=k("svg-icon"),H=k("a-cascader"),O=k("el-button"),q=k("a-popover"),K=k("a-button"),Y=k("a-spin"),re=k("a-empty");return o(),c("div",Xe,[d(ke),t("div",Ze,[t("div",et,i(a.$t("estimate.ShippingCostEstimate")),1),t("div",tt,i(a.$t("estimate.estTip1")),1),t("div",at,[t("div",st,[t("div",it,[t("div",lt,[t("span",ot,i(a.$t("estimate.WarehouseTo")),1),d($e,{ref_key:"refSelectCountry",ref:m,onCountryChange:s},{default:f(()=>[t("div",nt,[d($,{value:u.value,"onUpdate:value":e[0]||(e[0]=n=>u.value=n),bordered:!1,placeholder:a.$t("estimate.selectCountry"),style:{width:"100%",padding:"0 11px"},onClick:j(x,["stop"]),onChange:_},{suffix:f(()=>[u.value?(o(),c("span",ct,[d(P(ve),{onClick:j(V,["stop"])})])):y("",!0)]),_:1},8,["value","placeholder"]),d(r,{class:"arrow-icon",name:"arrow-down",onClick:e[1]||(e[1]=j(()=>{},["stop"]))})])]),_:1},512)])]),t("div",dt,[t("span",rt,i(a.$t("estimate.weight")),1),t("div",ut,[d($,{value:l.weight,"onUpdate:value":e[2]||(e[2]=n=>l.weight=n),bordered:!1,placeholder:a.$t("estimate.pleaseInputWeight"),style:{width:"100%"},onChange:oe,onPressEnter:b},null,8,["value","placeholder"])])]),t("div",pt,[t("div",ht,[d(H,{ref:"refProductType",value:l.productType,"onUpdate:value":e[3]||(e[3]=n=>l.productType=n),options:g.data,multiple:"","show-search":"","expand-trigger":"hover","max-tag-count":1,style:{height:"36px",width:"484px","line-height":"36px","margin-right":"16px",background:"#fff","border-radius":"4px"},"field-names":{label:P(w).locale.value=="zh"?"labelName":"labelNameEn",value:"labelId"},"display-render":S,placeholder:a.$t("estimate.selectPlaceholder")},null,8,["value","options","field-names","placeholder"]),d(r,{class:"arrow-icon",name:"arrow-down"}),t("div",vt,[t("span",null,i(a.$t("estimate.ProductTypes")),1)])])]),t("div",_t,[t("div",gt,[t("span",mt,i(a.$t("estimate.long")),1),t("div",ft,[d($,{value:l.length,"onUpdate:value":e[4]||(e[4]=n=>l.length=n),bordered:!1,placeholder:"cm",style:{width:"100%"},onChange:ne,onPressEnter:b},null,8,["value"])])]),t("div",yt,[t("span",bt,i(a.$t("estimate.width")),1),t("div",$t,[d($,{value:l.width,"onUpdate:value":e[5]||(e[5]=n=>l.width=n),bordered:!1,placeholder:"cm",style:{width:"100%"},onChange:ce,onPressEnter:b},null,8,["value"])])]),t("div",kt,[t("span",wt,i(a.$t("estimate.height")),1),t("div",Ct,[d($,{value:l.height,"onUpdate:value":e[6]||(e[6]=n=>l.height=n),bordered:!1,placeholder:"cm",style:{width:"100%"},onChange:de,onPressEnter:b},null,8,["value"])])])])]),t("div",It,[d(O,{class:"search-btn",type:"primary",loading:C.value,onClick:b},{default:f(()=>[v(i(a.$t("estimate.Inquire")),1)]),_:1},8,["loading"])])])]),N.value?y("",!0):(o(),c("div",Tt,[I.value.length?(o(),c("div",Pt,[t("div",xt,i(a.$t("estimate.estTip2")),1),t("div",Wt,[d(Y,{spinning:C.value},{default:f(()=>[(o(!0),c(L,null,A(I.value,(n,T)=>{var Q;return o(),c("div",{key:T,class:z(["list",n.checkFlag===0?"disabled":""])},[t("div",{class:z({box:!0,boxActive:p.value===T})},[t("div",Lt,[t("div",Nt,[t("div",Dt,[t("img",{class:"icon",src:n.logisticsLineIcon,alt:""},null,8,St),d(q,{trigger:"click",placement:"right"},{content:f(()=>[t("pre",Ft,i(n.insuranceDesc),1)]),default:f(()=>[n.configureInsurance?(o(),c("img",Et)):y("",!0)]),_:2},1024)]),t("div",Bt,i(P(M)(n,"logisticsLineName","en")),1),n.includeTaxes?(o(),c("div",Mt,i(a.$t("estimate.taxExemption")),1)):y("",!0)]),t("div",qt,[t("div",zt,[v(i(a.$t("estimate.TransportationCosts"))+" ",1),d(q,null,{content:f(()=>[t("pre",Ut,i(n.volumeWeightDesc),1)]),default:f(()=>[e[8]||(e[8]=t("img",{src:fe,alt:""},null,-1))]),_:2},1024)]),t("div",At,i(P(be)(n,"totalFreightPrice")),1)]),t("div",Vt,[t("span",Ht,i(a.$t("estimate.ShippingTime")),1),t("div",null,[v(i(n.logisticsTimeMin)+"-"+i(n.logisticsTimeMax)+" ",1),t("span",Ot,i(a.$t("estimate.dayText")),1)])]),t("div",Rt,[p.value===T?(o(),c("pre",jt,i(n.logisticsLineDesc)+`
                      `,1)):(o(),c("div",Gt,i(n.logisticsLineDesc),1))]),t("div",Jt,[t("div",Kt,[p.value!==T?(o(),X(K,{key:0,color:"#FF1E05",class:"btn",onClick:R=>W(T)},{default:f(()=>[v(i(a.$t("estimate.lookDetail")),1)]),_:2},1032,["onClick"])):y("",!0)]),t("div",Yt,[ie(d(K,{color:"#666",plain:"",class:"edit-btn",onClick:e[7]||(e[7]=R=>p.value=void 0)},{default:f(()=>[v(i(a.$t("estimate.pack_up")),1)]),_:2},1536),[[le,p.value===T]])])])]),n.notice?(o(),c("div",Qt,i(n.notice),1)):y("",!0)],2),((Q=n.uncheckDesc)==null?void 0:Q.length)>0?(o(),c("div",{key:0,class:z({tipBottomBox:!0,tipBottomBoxActive:p.value===T})},[t("div",Xt,[v(i(a.$t("estimate.UnavailableReason"))+"： ",1),(o(!0),c(L,null,A(n.uncheckDesc,(R,ue)=>(o(),c(L,{key:ue},[v(i(R)+"；",1)],64))),128))])],2)):y("",!0),p.value===T?(o(),X(Qe,{key:1,id:T,"selected-line":p.value,"father-data":n,"country-name":u.value},null,8,["id","selected-line","father-data","country-name"])):y("",!0)],2)}),128))]),_:1},8,["spinning"])])])):!I.value.length&&!E.value?(o(),c("div",Zt,[t("span",ea,i(a.$t("estimate.estTip4")),1)])):(o(),c("div",ta,[d(re,{class:"no-data no-data-empty"})]))])),N.value?(o(),c("div",aa,[d(Y)])):y("",!0)])}}},ua=ee(sa,[["__scopeId","data-v-1b082320"]]);export{ua as default};
