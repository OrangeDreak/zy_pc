import{r as e}from"./request-Db42XEdn.js";const o={login(r){return e({url:"/app/user/login",method:"post",data:r})},sendEmailCode(r){return e({url:"/app/user/sendEmailCode",method:"post",data:r})},register(r){return e({url:"/app/user/register",method:"post",data:r})},handleForget(r){return e({url:"/app/user/forgetPassword",method:"post",data:r})}};export{o as a};
