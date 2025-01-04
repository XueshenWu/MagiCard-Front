// function withParams(url, params) {
//     const searchParams = new URLSearchParams();

//     for (const [key, value] of params) {
//         searchParams.append(key, value);
//     }

//     const queryString = searchParams.toString();
//     return queryString ? `${url}?${queryString}` : url;
// }

// const url = 'http://localhost:3000/api/v1/user'
// const params = [['c', '1'], ['b', '2']]
// console.log(withParams(url, params)) // 'http://localhost:3000/api/v1/user?c=1&b=2'


const timestamp = new Date("2025-01-04 08:50:33").getTime();

console.log(timestamp)