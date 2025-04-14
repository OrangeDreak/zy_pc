import{_ as F,r as c,m as U,n as N,c as P,o as S,a as t,d as o,t as l,w as i,e as d,g as q,q as p,E as _}from"./index-BwAutTYV.js";import{a as w}from"./auth-CqkiSt5J.js";import{C as B}from"./CommonHeader-BRJFjOJH.js";import"./request-ChjQmMKM.js";import"./currency-BaKDgkX2.js";const D={class:"register-container"},I={class:"register-content"},L={class:"register-left"},M={class:"slogan"},R={class:"slogan-text"},z={class:"features"},A={class:"feature-item"},G={class:"feature-title"},H={class:"feature-desc"},j={class:"feature-item"},J={class:"feature-title"},K={class:"feature-desc"},O={class:"feature-item"},Q={class:"feature-title"},W={class:"feature-desc"},X={class:"register-right"},Y={class:"register-title"},Z={class:"login-link"},x={__name:"Forget",setup(ee){const y=q(),m=c(null),g=c(!1),C=c(""),s=c({username:"",password:"",confirmPassword:"",inviteCode:"",agreement:!1}),$={email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"密码长度不能小于6位",trigger:"blur"}],agreement:[{validator:(e,a,n)=>{a?n():n(new Error("请阅读并同意用户协议和隐私声明"))},trigger:"change"}]},v=()=>{const e=new Date;C.value=e.toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).replace(/\//g,"-")};let f=null;U(()=>{v(),f=setInterval(v,1e3)}),N(()=>{f&&clearInterval(f)});const V=async()=>{try{const e=await w.sendEmailCode({email:s.value.email,emailScene:1});_.success("发送验证码成功，请查看邮箱")}catch{_.error("获取验证码失败")}},b=async()=>{m.value&&await m.value.validate(async e=>{if(e){g.value=!0;try{await w.handleForget({email:s.value.email,password:s.value.password,emailCaptcha:s.value.emailCaptcha}),_.success("修改密码成功"),y.push("/login")}catch(a){console.error("密码修改失败:",a)}finally{g.value=!1}}})};return(e,a)=>{const n=d("el-input"),u=d("el-form-item"),h=d("el-button"),k=d("el-link"),E=d("el-form"),T=d("el-card");return S(),P("div",D,[t(B),o("div",I,[o("div",L,[o("div",M,[o("div",R,l(e.$t("login.tip1")),1),o("div",z,[o("div",A,[o("div",G,l(e.$t("login.tip2")),1),o("div",H,l(e.$t("login.tip3")),1)]),o("div",j,[o("div",J,l(e.$t("login.tip4")),1),o("div",K,l(e.$t("login.tip5")),1)]),o("div",O,[o("div",Q,l(e.$t("login.tip6")),1),o("div",W,l(e.$t("login.tip7")),1)])])])]),o("div",X,[t(T,{class:"register-card"},{default:i(()=>[o("h2",Y,l(e.$t("login.accountSecurity")),1),t(E,{ref_key:"formRef",ref:m,model:s.value,rules:$},{default:i(()=>[t(u,{prop:"email"},{default:i(()=>[t(n,{modelValue:s.value.email,"onUpdate:modelValue":a[0]||(a[0]=r=>s.value.email=r),placeholder:e.$t("login.emailTip1"),"prefix-icon":"Message"},null,8,["modelValue","placeholder"])]),_:1}),t(u,{prop:"emailCaptcha"},{default:i(()=>[t(n,{modelValue:s.value.emailCaptcha,"onUpdate:modelValue":a[1]||(a[1]=r=>s.value.emailCaptcha=r),placeholder:e.$t("login.emailCodeTip"),"prefix-icon":"Promotion"},{suffix:i(()=>[t(h,{class:"code-btn",type:"primary",disabled:e.isCaptchaDisabled,onClick:V},{default:i(()=>[p(l(e.$t("login.getEmailCode")),1)]),_:1},8,["disabled"])]),_:1},8,["modelValue","placeholder"])]),_:1}),t(u,{prop:"password"},{default:i(()=>[t(n,{modelValue:s.value.password,"onUpdate:modelValue":a[2]||(a[2]=r=>s.value.password=r),type:"password",placeholder:e.$t("login.passwordTip1"),"prefix-icon":"Lock","show-password":""},null,8,["modelValue","placeholder"])]),_:1}),t(u,{prop:"password"},{default:i(()=>[t(n,{modelValue:s.value.confirmPassword,"onUpdate:modelValue":a[3]||(a[3]=r=>s.value.confirmPassword=r),type:"password",placeholder:e.$t("login.passwordConfirm"),"prefix-icon":"Lock","show-password":""},null,8,["modelValue","placeholder"])]),_:1}),t(u,null,{default:i(()=>[t(h,{type:"primary",class:"register-button",loading:g.value,onClick:b},{default:i(()=>[p(l(e.$t("login.confirm")),1)]),_:1},8,["loading"])]),_:1}),o("div",Z,[p(l(e.$t("login.haveAccount")),1),t(k,{type:"primary",onClick:a[4]||(a[4]=r=>e.$router.push("/login"))},{default:i(()=>[p(l(e.$t("login.login2")),1)]),_:1})])]),_:1},8,["model"])]),_:1})])])])}}},ie=F(x,[["__scopeId","data-v-7199b78c"]]);export{ie as default};
