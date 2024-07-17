// 打包时用到的插件
// 项目打包时候的自定义插件

import { ChildProcess, spawn } from "child_process";

import os from 'os'

import fs from 'fs'


// 思路 ： 先等vite 打完包，然后再执行 electron的打包动作
// 因为，electron 打包是需要用到 vue 打包之后的 index.html 文件的
export const ElectronBuildPlugin = () => {
    return {
        name: 'electron-build-plugin',
        closeBundle() {
            console.log('vite-vue 打包完成');

            // 先把之前的打包的文件删除
            const dirFlag = fs.existsSync('out');
            if (dirFlag) {
                console.log('plugins-build : out目录 存在，先删除');
                fs.rmSync('out', { recursive: true });
            } else {
                console.log('plugins-build : out目录 不存在');
            }

            // 下面执行命令进行electron的打包
            const platform = os.platform();

            if (platform === 'win32') {
                console.log('当前运行环境是 Windows');
                // windows 上需要执行这种方式
                spawn('npm.cmd', ['run', 'make'], { stdio: 'inherit' });
            } else if (platform === 'darwin') {
                console.log('当前运行环境是 Mac');
                // Mac上可以执行这种方式
                spawn('npm', ['run', 'make'], { stdio: 'inherit' });
            } else {
                console.log('其他平台 : ', platform, '【暂不支持打包】');
            }
        },
    };
};

export default ElectronBuildPlugin;
