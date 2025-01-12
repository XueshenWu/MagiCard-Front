import { test, expect } from '@playwright/test';
import URL from '../src/api/api-list';




test.describe("Test OTP Login and Password Login", ()=>{

    test.beforeAll(async ({ page }) => {
        await page.goto(URL.frontend)
    })


})



test("login", async ({ page }) => {

    await page.route(URL.user.passwordLogin, async route => {
        const postData = JSON.parse(route.request().postData() ?? "{}");
        console.log("postData", postData);
        expect(postData).toHaveProperty("phone");
        expect(postData).toHaveProperty("password");
        expect(postData).toHaveProperty("geeTest");
        route.fulfill({
            json: {
                code: 200,
                msg: '登录成功',
                data: {
                    token: 'token',
                    userCard:{
                        userId: 1,
                    }
                }
            }
        })

        // route.abort('failed')

    })
    await page.route(URL.user.userInfo, async route => {
        route.fulfill({
            json: {
                code: 200,
                msg: '获取用户信息成功',
                data: {
                    userId: 1,
                    name: 'test',
                    phone: '13877788888',
                    loginPassword:null

                }
            }
        })

    })

    await page.goto(URL.frontend)

    const loginButton = page.getByRole('button', { name: '登录/注册' })
    await loginButton.click()
    await page.getByRole('link', { name: '去登录' }).click();
    await page.getByPlaceholder('请输入手机号码').click();
    await page.getByPlaceholder('请输入手机号码').fill('13877788888');
    await page.getByPlaceholder('请输入密码').fill('123123bb');
    await page.getByLabel('我已阅读并同意《用户协议与服务条款》').check()
    const loginAction = page.getByRole('button', { name: '登 录' })
    await loginAction.click()
    await page.waitForTimeout(3000)
   
    const token = await page.evaluate(()=>window.localStorage.getItem('token'))
    expect(token).toBe('token')



})