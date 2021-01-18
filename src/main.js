import program from 'commander';

import create from './create'; // 项目创建

let actionMap = {
    // 项目创建
    create: {
        description: '创建一个新的项目', // 描述
        usages: [// 使用方法
            'ydj-cli create ProjectName'
        ],
        alias: 'c' // 命令简称
    },
}

Object.keys(actionMap).forEach(action => {

    if (actionMap[action].options) {
        Object.keys(actionMap[action].options).forEach(option => {
            let obj = actionMap[action].options[option];
            program.option(obj.flags, obj.description, obj.defaultValue);
        })
    }

    program
        .command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(() => {
            switch (action) {
                // 到这里具体命令实现逻辑还空缺，我们先打日志，看下命令处理情况
                case 'create':
                    create(...process.argv.slice(3));
                    break;
                default:
                    break;
            }
        })
});

// 项目版本
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);

/**
 * ydj-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
    program.outputHelp();
}