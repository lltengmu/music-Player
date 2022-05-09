import axios from 'axios'
import qs from 'qs'

//定义错误信息处理函数

const errorHandle = (status,info) => {
  switch(status){
    case 400:
      console.log('语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求')
      break;
    case 401:
        //token：令牌
      onsole.log('服务器认证失败');
      break;
    case 403:
      console.log('服务器已经理解，但是拒绝执行它');
      break;
    case 404:
      console.log('请检查网络请求地址');
      break;
    case 500:
      console.log('服务器出错');
      break;
    case 502:
      console.log('作为网关或者代理工作的服务器尝试执行请求时，从上有服务器接收到无效的响应');
      break
    default:
      console.log(info)
      break
  }
}

const $http = axios.create({
  baseURL:'https://netease-cloud-music-api-delta-smoky.vercel.app/',
  timeout: 5000,
});

// 添加请求拦截器
$http.interceptors.request.use(
  config => {
    if(config.method === 'post'){
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error =>{
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$http.interceptors.response.use(
  response => response.status === 200 ? Promise .resolve(response) : Promise.reject(response),
  error => {
    const { response } = error;
    if(response){
      errorHandle(response.status,response.info)
    }else{
      console.log('请求被中断')
    }
    
  }
);

export default $http;