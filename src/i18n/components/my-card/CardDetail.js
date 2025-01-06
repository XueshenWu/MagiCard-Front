export default {
    cn: {
        message: {
            payable: "可支付",
            openNewCard: "开新卡",
            cardInfo: {
                cardNumber: "卡号",
                cvv: "安全码/CVC/CVV",
                expiryDate: "有效期",
                name: "姓名",
                copyAll: "复制全部",
                copy: "复制"
            },
            billingAddress: {
                title: "账单地址",
                address1: "地址1",
                city: "城市",
                postalCode: "邮编",
                state: "州"
            },
            modal: {
                enterPaymentPassword: "请输入您的支付密码",
                passwordProtection: "您的支付密码将用于保护您的账户安全",
                confirmPassword: "确认密码"
            },
            messages: {
                copySuccess: "复制成功",
                copyFailed: "复制失败"
            },
            cardDetails: {
                format: "卡号: {cardNumber}\n有效期: {month}月 / {year2} 年 (或 {month}月 / {year4} 年)\n安全码: {cvv}\n姓名: {name}"
            },
            dateFormat: {
                expiry: "{month}月 / {year2} 年 (或 {month}月 / {year4} 年)",
                placeholder: "**月 / **年"
            },
            addressDetails: {
                format: "地址1: {address}\n城市: {city}\n邮编: {postalCode}\n州: {state}{stateNameCn}",
                stateSeparator: " / "
            }

        }
    },
    en: {
        message: {
            payable: "Payable",
            openNewCard: "Open New Card",
            cardInfo: {
                cardNumber: "Card Number",
                cvv: "Security Code/CVC/CVV",
                expiryDate: "Expiry Date",
                name: "Name",
                copyAll: "Copy All",
                copy: "Copy"
            },
            billingAddress: {
                title: "Billing Address",
                address1: "Address 1",
                city: "City",
                postalCode: "Postal Code",
                state: "State"
            },
            modal: {
                enterPaymentPassword: "Please enter your payment password",
                passwordProtection: "Your payment password will be used to protect your account",
                confirmPassword: "Confirm Password"
            },
            messages: {
                copySuccess: "Copy successful",
                copyFailed: "Copy failed"
            },
            cardDetails: {
                format: "Card Number: {cardNumber}\nExpiry Date: {month}/{year2} (or {month}/{year4})\nSecurity Code: {cvv}\nName: {name}"
            },
           
            dateFormat: {
                expiry: "{month}/{year2} (or {month}/{year4})",
                placeholder: "** /**"
            },
            addressDetails: {
                format: "Address 1: {address}\nCity: {city}\nPostal Code: {postalCode}\nState: {state}{stateNameCn}",
                stateSeparator: " / "
            }
        }
    }
}