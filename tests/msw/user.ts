import { http, HttpResponse } from 'msw';
import URL from '../../src/api/api-list';

export const userHandlers = [
    http.post(URL.user.passwordLogin, () => {
        return HttpResponse.json({
            code: 200,
            message: 'success',
            data: {
                token: 'test-token',
                userCard: {
                    userId: 1
                }
            }
        })
    }),
    http.post(URL.user.smsLogin, () => {
        return HttpResponse.json({
            code: 200,
            message: 'success',
            data: {
                token: 'test-token',
                userCard: {
                    userId: 1
                }
            }
        })
    }),
    http.post(URL.user.userInfo, () => {
        return HttpResponse.json({
            code: 200,
            msg: '获取用户信息成功',
            data: {
                userId: 1,
                name: 'test',
                phone: '13877788888',
                loginPassword: null
            }
        })
    }),
    http.post(URL.user.smsCode, ()=>{
        return HttpResponse.json({
            code: 200,
            msg: 'success',
            data: {}
        })
    })
]