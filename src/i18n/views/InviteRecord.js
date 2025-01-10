export default {
  cn: {
    message: {
      invitation: {
        code: "邀请码",
        copyLink: "复制链接",
        reward: "邀请 1 位用户返 2 美金。",
        balance: "邀请奖励余额",
        withdraw: "奖励提现",
        stats: {
          monthlyReferrals: "本月推荐人数",
          totalReferrals: "总推荐人数",
          rechargedUsers: "已充值人数",
          totalReward: "总奖励金额"
        },
        table: {
          all: "全部",
          title: "支付会员邀请",
          filterStatus: "按状态筛选",
          filterMonth: "按月筛选",
          refresh: "刷新",
          columns: {
            date: "日期",
            status: "状态",
            invitee: "被邀请人",
            reward: "奖励金额"
          },
          status: {
            registered: {
              concise: "仅注册",
              full: "仅注册",
              reward: '已注册，未支付'
            },
            subscribed:{
              concise: "已开户",
              full: "已开户,未充值",
              reward: '已注册,已开户,未充值'
            },
            recharged: {
              concise: "已充值",
              full: "已开户,已充值",
              reward: '+$2'
            },
            filterStatus:{
              concise:"按状态筛选",
              full:"按状态筛选"
            },
            all:{
              concise:"全部",
              full:"全部"
            }
          },
          dateFormat: "{year} 年 {month} 月",
        },
        modal: {
          changeCode: {
            title: "修改邀请码",
            label: "邀请码",
            cancel: "取消",
            confirm: "确认"
          },
          withdraw: {
            title: "邀请奖励余额",
            available: "你可提现的奖励金额为",
            withdrawAll: "全部提现"
          }
        }
      }
    }
  },
  en: {
    message: {
      invitation: {
        code: "Invitation Code",
        copyLink: "Copy Link",
        reward: "Get $2 for each invited user.",
        balance: "Reward Balance",
        withdraw: "Withdraw",
        stats: {
          monthlyReferrals: "Monthly Referrals",
          totalReferrals: "Total Referrals",
          rechargedUsers: "Recharged Users",
          totalReward: "Total Rewards"
        },
        table: {
          all: "All",
          title: "Member Invitations",
          filterStatus: "Filter by Status",
          filterMonth: "Filter by Month",
          refresh: "Refresh",
          columns: {
            date: "Date",
            status: "Status",
            invitee: "Invitee",
            reward: "Reward Amount"
          },
          status: {
            registered: {
              concise: "Registered",
              full: "Registered",
              reward: 'Registered, Not Recharged'
            },
            subscribed:{
              concise: "Not Subscribed",
              full: "Subscribed, Not Recharged",
              reward: 'Subscribed, Not Recharged'

            },
            recharged: {
              concise: "Subscribed",
              full: "Subscribed, Recharged",
              reward: '+$2'
            },
            filterStatus:{
              concise:"Filter by Status",
              full:"Filter by Status"
            },
            all:{
              concise:"All",
              full:"All"
            }
          },
          dateFormat: "{month} / {year}",
        },
        modal: {
          changeCode: {
            title: "Change Invitation Code",
            label: "Invitation Code",
            cancel: "Cancel",
            confirm: "Confirm"
          },
          withdraw: {
            title: "Reward Balance",
            available: "Available for withdrawal",
            withdrawAll: "Withdraw All"
          }
        }
      }
    }
  }
}