import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:9998/api/v1/', // API 基础地址
    timeout: 50000, // 请求超时时间 50s
    withCredentials: false, // 允许携带 cookies
    headers: { // 添加请求头
        'Content-Type': 'application/json', // 设置内容类型
    }
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.error('请求错误:', error)
        if (error.response) {
            const { status } = error.response
            if (status === 401) {
                console.error('未授权，请登录')
            } else if (status === 403) {
                console.error('没有权限')
            } else if (status === 500) {
                console.error('服务器错误')
            }
        }
        return Promise.reject(error)
    }
)


export default service
