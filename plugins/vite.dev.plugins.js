// 开发环境的自定义插件

import { loadEnv } from 'vite';
import { spawn } from 'child_process';
import electron from 'electron';
import fs from 'fs';
import path from 'path';

// 自定义的插件的逻辑
const ElectronDevPlugin = () => {
    return {
        name: 'electron-dev-plugin',
        //配置服务的钩子
        configureServer(server) {
            server.httpServer?.on('listening', () => {
                // 核心1 ： 获取vue3的服务地址
                let addressInfo = server.httpServer?.address();
                const devUrl = `http://localhost:${addressInfo.port}`;
                console.log('plugins-dev : 服务的完整地址 ： ', devUrl);

                // 核心2 ：加载测试环境的环境变量
                let envParams = loadEnv('development', path.resolve(process.cwd(), './environmentconfig'));
                console.log('plugins-dev : 获取的环境变量 ： ', envParams.VITE_ENV);

                // 核心3 ： 进程传参，发送到electron的进程中
                let electronProcess = spawn(electron, ['electron/electronMain.js', devUrl], { stdio: 'inherit' });
                console.log('plugins-dev : electronProcess : ', electronProcess.pid);

                // 扩展功能 ： 增加 electron 的热启动功能
                fs.watch('electron', () => {
                    console.log('plugins-dev : electron 目录中的文件发生改变了');
                    electronProcess.kill();
                    electronProcess = spawn(electron, ['electron/electronMain.js', devUrl], { stdio: 'inherit' });
                });
            });
        }
    };
};

module.exports = { ElectronDevPlugin };
