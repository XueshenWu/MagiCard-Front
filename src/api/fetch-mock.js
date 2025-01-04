export default async (url, { method, headers, body }) => {
    return await new Promise((resolve) => {
        setTimeout(() => {

            console.log(`
                ------------------------------
                fetch-mock
                url: ${url}
                method: ${method}
                headers: ${JSON.stringify(headers)}
                body: ${body}
                ------------------------------
                `)
            resolve({
                json: async () => ({
                    code: 200,
                    data:{
                        token:"mock-token"
                    }
                })
            })
        }, 100)
    })
}