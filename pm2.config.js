module.exports = {
  apps: [
    {
      name: 'rainbow-server',
      script: './dist/main.js',
      // exec_mode: 'cluster', // 启动集群模式
      // instances: 'max', // 启动进程数量，可开启多进程
      max_memory_restart: '300M', // 内存达到阈值之后重启应用
      exp_backoff_restart_delay: 100, // 指数退避重启延迟
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
