import{r as b}from"./request-Ci6vZ18k.js";import{_ as A,r as s,o as G,c as H,b as k,e as l,w as t,f as u,S as J,y as K,j as c,l as E,m as O,d as Q,T as W,E as x}from"./index-CAD5YEHZ.js";import"./auth-BVoTKOlD.js";const V={getUsers(n){return b({url:"/api/users",method:"get",params:n})},createUser(n){return b({url:"/api/users",method:"post",data:n})},updateUser(n,d){return b({url:`/api/users/${n}`,method:"put",data:d})},deleteUser(n){return b({url:`/api/users/${n}`,method:"delete"})}},X={class:"user-list"},Y={class:"dialog-footer"},Z={__name:"UserList",setup(n){const d=s(!1),z=s([]),S=s(0),f=s(1),U=s(10),g=s({username:""}),i=s(!1),_=s("edit"),o=s({id:"",username:"",email:"",password:""}),C=s(!1),F={username:[{required:!0,message:"请输入用户名",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},m=async()=>{d.value=!0;try{const r=await V.getUsers({page:f.value,pageSize:U.value,...g.value});z.value=r.list,S.value=r.total}finally{d.value=!1}},L=()=>{f.value=1,m()},$=()=>{m()},q=r=>{_.value="edit",i.value=!0,o.value={...r}},N=async()=>{editFormRef.value&&await editFormRef.value.validate(async r=>{if(r){C.value=!0;try{_.value==="edit"?(await V.updateUser(o.value.id,o.value),x.success("更新成功")):(await V.createUser(o.value),x.success("创建成功")),i.value=!1,m()}catch(e){console.error("保存失败:",e)}finally{C.value=!1}}})},R=async r=>{try{await W.confirm("确认删除该用户吗？","提示",{type:"warning"}),await V.deleteUser(r.id),x.success("删除成功"),m()}catch(e){console.error("删除失败:",e)}};return G(()=>{m()}),(r,e)=>{const w=u("el-input"),p=u("el-form-item"),v=u("el-button"),B=u("el-form"),y=u("el-table-column"),T=u("el-table"),D=u("el-pagination"),M=u("el-card"),P=u("el-dialog"),j=J("loading");return k(),H("div",X,[l(M,null,{default:t(()=>[l(B,{inline:!0,model:g.value},{default:t(()=>[l(p,{label:"用户名"},{default:t(()=>[l(w,{modelValue:g.value.username,"onUpdate:modelValue":e[0]||(e[0]=a=>g.value.username=a),placeholder:"请输入用户名"},null,8,["modelValue"])]),_:1}),l(p,null,{default:t(()=>[l(v,{type:"primary",onClick:L},{default:t(()=>e[8]||(e[8]=[c("搜索")])),_:1})]),_:1})]),_:1},8,["model"]),K((k(),E(T,{data:z.value},{default:t(()=>[l(y,{prop:"username",label:"用户名"}),l(y,{prop:"email",label:"邮箱"}),l(y,{prop:"createTime",label:"创建时间"}),l(y,{label:"操作"},{default:t(a=>[l(v,{type:"primary",size:"small",onClick:I=>q(a.row)},{default:t(()=>e[9]||(e[9]=[c(" 编辑 ")])),_:2},1032,["onClick"]),l(v,{type:"danger",size:"small",onClick:I=>R(a.row)},{default:t(()=>e[10]||(e[10]=[c(" 删除 ")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[j,d.value]]),l(D,{"current-page":f.value,"onUpdate:currentPage":e[1]||(e[1]=a=>f.value=a),"page-size":U.value,"onUpdate:pageSize":e[2]||(e[2]=a=>U.value=a),total:S.value,onCurrentChange:$},null,8,["current-page","page-size","total"])]),_:1}),l(P,{modelValue:i.value,"onUpdate:modelValue":e[7]||(e[7]=a=>i.value=a),title:_.value==="edit"?"编辑用户":"新增用户",width:"500px"},{footer:t(()=>[Q("span",Y,[l(v,{onClick:e[6]||(e[6]=a=>i.value=!1)},{default:t(()=>e[11]||(e[11]=[c("取消")])),_:1}),l(v,{type:"primary",onClick:N,loading:C.value},{default:t(()=>e[12]||(e[12]=[c(" 确定 ")])),_:1},8,["loading"])])]),default:t(()=>[l(B,{ref:"editFormRef",model:o.value,rules:F,"label-width":"80px"},{default:t(()=>[l(p,{label:"用户名",prop:"username"},{default:t(()=>[l(w,{modelValue:o.value.username,"onUpdate:modelValue":e[3]||(e[3]=a=>o.value.username=a)},null,8,["modelValue"])]),_:1}),l(p,{label:"邮箱",prop:"email"},{default:t(()=>[l(w,{modelValue:o.value.email,"onUpdate:modelValue":e[4]||(e[4]=a=>o.value.email=a)},null,8,["modelValue"])]),_:1}),_.value==="add"?(k(),E(p,{key:0,label:"密码",prop:"password"},{default:t(()=>[l(w,{modelValue:o.value.password,"onUpdate:modelValue":e[5]||(e[5]=a=>o.value.password=a),type:"password","show-password":""},null,8,["modelValue"])]),_:1})):O("",!0)]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])}}},ae=A(Z,[["__scopeId","data-v-67a77176"]]);export{ae as default};
