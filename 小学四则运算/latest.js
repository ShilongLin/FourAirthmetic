{
    /*
    * js说明 
    * 页面响应脚本
    */
    window.onload = function () {
        // 声明必须的参数
        let n_number;
        let r_number;
        const fs = require('fs');


        // 获取必要信息
        let config_n_r = document.getElementById('config_n_r');
        let config_url = document.getElementById('config_url');
        let n = document.getElementById('n');
        let r = document.getElementById('r');
        let airthmeticString = document.getElementById('airthmeticString');
        let answerString = document.getElementById('answerString');


        // 设置按钮监听器
        config_n_r.onclick = function () {
            let reg = /^[0-9]+$/;
            if (reg.test(n.value) && reg.test(r.value)) {
                n_number = parseInt(n.value);
                r_number = parseInt(r.value);
                let four_Airthmetic = new Four_Airthmetic(n_number, r_number);
                airthmeticString.innerHTML = four_Airthmetic.getAllAirthmeticString(1);
                answerString.innerHTML = four_Airthmetic.getAllanswerString(1);
                // 生成答案题目文件和答案文件
                // 目录在本文件根目录的data文件中
                let flag = 0;
                let index = 1;
                while (flag == 0) {
                    fs.writeFile('/data/Exercises' + index + '.txt', four_Airthmetic.getAllAirthmeticString(), function (err) {
                        if (err == null) {
                            fs.writeFile('/data/Answers' + index + '.txt', four_Airthmetic.getAllanswerString, function (err) {
                            })
                            flag = 1;
                        } else index++;
                    })
                }
            } else {
                alert('您输入的数字不规范，请重新输入!');
                n_number = null;
                r_number = null;
            }
        }


        // 构建题目和答案

        // 对比答案
    }
}