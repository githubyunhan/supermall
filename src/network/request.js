import axios from 'axios'

export function request(config) {

  /*1.创建axios实例,并设置该对象内部的全局配置*/
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  /*2.axios的拦截器*/
  /*请求拦截*/
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })

  /*响应拦截*/
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })

  /*3.发送真正的网络请求*/
  return instance(config)
}

export function request1(config,success,failure) {

  /*1.创建axios实例,并设置该对象内部的全局配置*/
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000'
  })

  /*2.发送真正网络请求,config类型是对象，success和failure类型是函数;
  如果只是对请求的结果进行打印，则success和failure可以省略不写；
  若需要对请求对来的数据进行处理，则需要通过回调函数，将其数据保存展示到前端界面上*/
  instance(config)
    .then(res=>success(res))
    .catch(res=>failure(res))
}

export function request2(config) {

  /*将基本配置baseConfig(l类型为对象)、success和failure封装到config对象里*/
  const instance1 = axios.create({
    baseURL: 'http://123.207.32.32:8000'
  })

  instance1(config.baseConfig)
    .then(res=>config.success(res))
    .catch(res=>config.failure(res))
}

export function request3(config) {
  return new Promise((resolve,reject) => {

    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000'
    })

    /*通过使用Promise；resolv，rejecte等效于success和failure*/
    instance(config)
      .then(res=>resolve(res))
      .catch(res=>reject(res))
  })
}
