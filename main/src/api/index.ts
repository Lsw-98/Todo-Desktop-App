// 后端路径
const localServer = 'http://127.0.0.1:3000'

const api = (url: string) => {
  return fetch(localServer + url).then(response => response.json())
}

const getApi = (url: string, data: any) => {
  const queryString = Object.entries(data).map(item => `${item[0]}=${item[1]}`)
  return fetch(localServer + url + `?${queryString}`).then(response => response.json())
}

const postApi = (url: string, data: any) => {
  return fetch(localServer + url, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
}

export { api, getApi, postApi } 
