import RegisterForm from "./RegisterForm";
import OtpLoginForm from "./OtpLoginForm";
import PasswordLoginForm from "./PasswordLoginForm";


export default {
    cn: {
        message: {
            registerForm: RegisterForm.cn.message,
            ...OtpLoginForm.cn.message,
            ...PasswordLoginForm.cn.message
        }
    },
    en: {
        message: {
            registerForm: RegisterForm.en.message,
            ...OtpLoginForm.en.message,
            ...PasswordLoginForm.en.message
        }
    }
}