export default {
    cn: {
        message: {
            withdrawal: {
                button: "提现",
                title: "提现",
                subtitle: "您可提现的金额为",
                withdrawAll: "全部提现",
               
                modalTitle: "邀请奖励余额",
                submitButton: "申请提现",
                validation: {
                    accountRequired: "请输入支付宝账号",
                    accountLength: "支付宝账号长度不能少于4个字符",
                    nameRequired: "请输入支付宝姓名",
                    nameLength: "姓名长度不能少于2个字符"
                },
                messages: {
                    success: "提现成功",
                    error: "提现失败",
                    noPaymentPassword: "请先设置支付密码"
                },
                form:{
                    alipayAccount: {
                        label: "支付宝账账号",
                        placeholder: "请输入您的支付宝账号"
                    },
                    alipayName: {
                        label: "支付宝真实姓名",
                        placeholder: "请输入您的支付宝真实姓名"
                    },
                },
                withdrawalSuccess:{
                    first:"已成功提交提现申请，提现会自动退回到充值订单",
                    second:"到账时间为1-3天",
                    confirm:"我知道了"
                }
            }
        }
    },
    en: {
        message: {
            withdrawal: {
                button: "Withdraw",
                title: "Withdraw",
                subtitle: "Available withdrawal amount",
                withdrawAll: "Withdraw All",
               
                modalTitle: "Invitation Reward Balance",
                submitButton: "Request Withdrawal",
                validation: {
                    accountRequired: "Please enter your Alipay account",
                    accountLength: "Alipay account must be at least 4 characters",
                    nameRequired: "Please enter your Alipay name",
                    nameLength: "Name must be at least 2 characters"
                },
                messages: {
                    success: "Withdrawal successful",
                    error: "Withdrawal failed",
                    noPaymentPassword: "Please set payment password first"
                },
                form:{
                    alipayAccount: {
                        label: "Alipay Account",
                        placeholder: "Please enter your Alipay account"
                    },
                    alipayName: {
                        label: "Alipay Real Name",
                        placeholder: "Please enter your real name on Alipay"
                    },
                },
                withdrawalSuccess:{
                    first:"Your withdrawal application has been successfully submitted, and the withdrawal will be automatically returned to the recharge order",
                    second:"The arrival time is 1-3 days",
                    confirm:"Confirm"
                }
            }
        }
    }
}