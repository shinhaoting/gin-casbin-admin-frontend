import { http } from "@/utils/http";
// 获取验证码
export const getVerifyCode = () => {
    return http.request("get", "/api/auth/captcha");
};
//# sourceMappingURL=verify.js.map