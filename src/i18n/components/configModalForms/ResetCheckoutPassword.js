export default {
    cn: {
        message: {
            paymentPassword: {
                titles: {
                    modify: '修改支付密码',
                    set: '设置支付密码'
                },
                input: {
                    new: '输入新支付密码',
                    confirm: '确认新支付密码',
                    otp: '请输入验证码',
                    sendTo: '发送至 +86 {phone}'
                },
                buttons: {
                    sendOtp: '发送验证码',
                    modify: '修改支付密码',
                    set: '设置支付密码'
                },
                validation: {
                    required: '请输入新支付密码',
                    length: '支付密码必须是6位数字',
                    confirmRequired: '请再次输入新支付密码',
                    mismatch: '两次输入的密码不一致',
                    sameAsOld: '新密码不能与原密码相同',
                    otpRequired: '请输入验证码',
                    otpLength: '验证码必须是6位数字'
                },
                messages: {
                    otpSuccess: '验证码发送成功',
                    otpFailed: '验证码发送失败',
                    modifySuccess: '修改成功',
                    modifyFailed: '修改失败',
                    loading: '加载中...'
                }
            }
        }
    },
    en: {
        message: {
            paymentPassword: {
                titles: {
                    modify: 'Modify Payment Password',
                    set: 'Set Payment Password'
                },
                input: {
                    new: 'Enter New Payment Password',
                    confirm: 'Confirm New Payment Password',
                    otp: 'Enter Verification Code',
                    sendTo: 'Send to +86 {phone}'
                },
                buttons: {
                    sendOtp: 'Send Code',
                    modify: 'Modify Payment Password',
                    set: 'Set Payment Password'
                },
                validation: {
                    required: 'Please enter new payment password',
                    length: 'Payment password must be 6 digits',
                    confirmRequired: 'Please confirm new payment password',
                    mismatch: 'Passwords do not match',
                    sameAsOld: 'New password cannot be the same as old password',
                    otpRequired: 'Please enter verification code',
                    otpLength: 'Verification code must be 6 digits'
                },
                messages: {
                    otpSuccess: 'Verification code sent successfully',
                    otpFailed: 'Failed to send verification code',
                    modifySuccess: 'Modified successfully',
                    modifyFailed: 'Modification failed',
                    loading: 'Loading...'
                }
            }
        }
    }
}