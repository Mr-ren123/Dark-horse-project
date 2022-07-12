import request from "@/utils/request"


export const login = data => {
    return request({
        method: "POST",
        url: "/v1_0/authorizations",
        data
    })
}
// 表单验证
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}