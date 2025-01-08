let counter = 0

const post = async () => {
    counter++
    if (counter < 5) {

        return Promise.resolve({ err: false, data: 1 })
    } else {
        return Promise.resolve({ err: false, data: 2 })
    }
}

new Promise((resolve, reject) => {
    const timeoutJob = async () => {

        try {
            const res = await post("",{}, true)
            if (res.err) {
                isPolling.value = false
                return reject()
            }

            const fulfilled = res.data === 2
            if (fulfilled) {
                const unfreezeRes = await post("", {})

                if (unfreezeRes.err) {
                    return reject()
                } else {
                    return resolve(unfreezeRes.data)
                }
            } else {
                setTimeout(timeoutJob, 3000)
            }

       
        } catch (error) {
            reject(error)
        }
    }

    timeoutJob()
})
    .then((data) => {
        // Handle success
        console.log('then', data)
    })
    .catch((error) => {
        console.log('catch', error)
    })
    .finally(() => {
        console.log('finally')
    })