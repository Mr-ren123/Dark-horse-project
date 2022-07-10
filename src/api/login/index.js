import request from "@/utils/request";

//登录请求
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
//发送验证码请求
export const sendCode = (module) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${module}`,
  });
};

//获取用户个人信息
export const getInformation = (token) => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
