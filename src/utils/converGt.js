export const convertGt = (value) => {
    return {
        captchaId: value.captcha_id,
        lotNumber: value.lot_number,
        captchaOutput: value.captcha_output,
        passToken: value.pass_token,
        genTime: value.gen_time,
    }
}