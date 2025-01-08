export default {
    cn: {
        message: {
            cardOptions: {
                freeze: "冻结卡片",
                delete: "删除卡片",
                cautionTitle: "谨慎操作",
                cancel: "取消",
                recover: "解冻卡片",
                freezeCard: {
                    confirm: "确认冻结",
                    warning1: "冻结后该卡片将无法使用，且所有关联的服务将暂时停止。",
                    warning2: "冻结30天后银行会自动销卡，请谨慎操作。",
                    success: "冻结成功",
                    failed: "冻结失败"
                },
                deleteCard: {
                    confirm: "确认删除",
                    warning1: "删除后该卡片将永久移除，无法恢复！请确保您已备份所需信息。",
                    warning2: "删卡不退卡费，开新卡需要重新支付费用，请确认后再操作。",
                    error: "卡片余额不为0，请先提现",
                    success: "删除成功",
                    failed: "删除失败"
                },
                recoverCard: {
                    confirm: "确认恢复",
                    warning1: "恢复后该卡片将恢复使用，所有关联的服务将恢复。",
                    warning2: "请确认后再操作。",
                    success: "恢复成功",
                    failed: "恢复失败"
                },
                paymentTitle: "支付",
            }
        }
    },
    en: {
        message: {
            cardOptions: {
                freeze: "Freeze Card",
                delete: "Delete Card",
                cautionTitle: "Caution",
                cancel: "Cancel",
                recover: "Unfreeze Card",
                freezeCard: {
                    confirm: "Confirm Freeze",
                    warning1: "After freezing, this card will be unusable and all associated services will be suspended.",
                    warning2: "The bank will automatically cancel the card after 30 days of freezing. Please proceed with caution.",
                    success: "Freeze successfully",
                    failed: "Freeze failed"

                },
                deleteCard: {
                    confirm: "Confirm Delete",
                    warning1: "Once deleted, this card will be permanently removed and cannot be recovered! Please ensure you have backed up all necessary information.",
                    warning2: "Card fee is non-refundable. A new fee will be charged for opening a new card. Please confirm before proceeding.",
                    error: "Card balance must be zero. Please withdraw first",
                    success: "Delete successfully",
                    failed: "Delete failed"
                },
                recoverCard: {
                    confirm: "Confirm Recover",
                    warning1: "After recovery, this card will be available for use and all associated services will be resumed.",
                    warning2: "Please confirm before proceeding.",
                    success: "Recover successfully",
                    failed: "Recover failed",
                   
                },
                paymentTitle: "Payment",
            }
        }
    }
}