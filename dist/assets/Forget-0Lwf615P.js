import{_ as F,r as n,v as N,x as U,d as P,o as B,e as a,f as u,y as I,w as s,i as d,u as L,g as m,E as f}from"./index-1wkJ92Wy.js";import{a as w}from"./auth-CjHXZ0fA.js";import{C as M}from"./CommonHeader-8gnz00bh.js";import"./request-DAa1bAHQ.js";import"./currency-CN74YD4t.js";const R={class:"register-container"},S={class:"register-content"},T={class:"register-right"},q={class:"login-link"},D={__name:"Forget",setup($){const y=L(),p=n(null),v=n(!1),C=n(""),t=n({username:"",password:"",confirmPassword:"",inviteCode:"",agreement:!1}),V={email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"密码长度不能小于6位",trigger:"blur"}],agreement:[{validator:(l,e,r)=>{e?r():r(new Error("请阅读并同意用户协议和隐私声明"))},trigger:"change"}]},g=()=>{const l=new Date;C.value=l.toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).replace(/\//g,"-")};let c=null;N(()=>{g(),c=setInterval(g,1e3)}),U(()=>{c&&clearInterval(c)});const h=async()=>{try{const l=await w.sendEmailCode({email:t.value.email,emailScene:1});f.success("发送验证码成功，请查看邮箱")}catch{f.error("获取验证码失败")}},b=async()=>{p.value&&await p.value.validate(async l=>{if(l){v.value=!0;try{await w.handleForget({email:t.value.email,password:t.value.password,emailCaptcha:t.value.emailCaptcha}),f.success("修改密码成功"),y.push("/login")}catch(e){console.error("密码修改失败:",e)}finally{v.value=!1}}})};return(l,e)=>{const r=d("el-input"),i=d("el-form-item"),_=d("el-button"),k=d("el-link"),x=d("el-form"),E=d("el-card");return B(),P("div",R,[a(M),u("div",S,[e[10]||(e[10]=I('<div class="register-left" data-v-47aad0d7><div class="slogan" data-v-47aad0d7><div class="slogan-text" data-v-47aad0d7>中国购物，递送全球</div><div class="features" data-v-47aad0d7><div class="feature-item" data-v-47aad0d7><div class="feature-title" data-v-47aad0d7>免费保险</div><div class="feature-desc" data-v-47aad0d7>保证您的资金安全</div></div><div class="feature-item" data-v-47aad0d7><div class="feature-title" data-v-47aad0d7>7*12客服</div><div class="feature-desc" data-v-47aad0d7>全球覆盖</div></div><div class="feature-item" data-v-47aad0d7><div class="feature-title" data-v-47aad0d7>100+航运公司</div><div class="feature-desc" data-v-47aad0d7>可靠的售后服务</div></div></div></div></div>',1)),u("div",T,[a(E,{class:"register-card"},{default:s(()=>[e[9]||(e[9]=u("h2",{class:"register-title"},"找回密码",-1)),a(x,{ref_key:"formRef",ref:p,model:t.value,rules:V},{default:s(()=>[a(i,{prop:"email"},{default:s(()=>[a(r,{modelValue:t.value.email,"onUpdate:modelValue":e[0]||(e[0]=o=>t.value.email=o),placeholder:"输入您绑定的邮箱","prefix-icon":"Message"},null,8,["modelValue"])]),_:1}),a(i,{prop:"emailCaptcha"},{default:s(()=>[a(r,{modelValue:t.value.emailCaptcha,"onUpdate:modelValue":e[1]||(e[1]=o=>t.value.emailCaptcha=o),placeholder:"请输入邮箱验证码","prefix-icon":"Promotion"},{suffix:s(()=>[a(_,{class:"code-btn",type:"primary",disabled:l.isCaptchaDisabled,onClick:h},{default:s(()=>e[5]||(e[5]=[m(" 获取验证码 ")])),_:1},8,["disabled"])]),_:1},8,["modelValue"])]),_:1}),a(i,{prop:"password"},{default:s(()=>[a(r,{modelValue:t.value.password,"onUpdate:modelValue":e[2]||(e[2]=o=>t.value.password=o),type:"password",placeholder:"请输入重置密码","prefix-icon":"Lock","show-password":""},null,8,["modelValue"])]),_:1}),a(i,{prop:"password"},{default:s(()=>[a(r,{modelValue:t.value.confirmPassword,"onUpdate:modelValue":e[3]||(e[3]=o=>t.value.confirmPassword=o),type:"password",placeholder:"确认密码","prefix-icon":"Lock","show-password":""},null,8,["modelValue"])]),_:1}),a(i,null,{default:s(()=>[a(_,{type:"primary",class:"register-button",loading:v.value,onClick:b},{default:s(()=>e[6]||(e[6]=[m(" 确定 ")])),_:1},8,["loading"])]),_:1}),u("div",q,[e[8]||(e[8]=m(" 已有账号？")),a(k,{type:"primary",onClick:e[4]||(e[4]=o=>l.$router.push("/login"))},{default:s(()=>e[7]||(e[7]=[m("去登录")])),_:1})])]),_:1},8,["model"])]),_:1})])])])}}},J=F(D,[["__scopeId","data-v-47aad0d7"]]);export{J as default};
