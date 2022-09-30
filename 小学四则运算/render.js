{
    const fs = require('fs')
    const readline = require('readline');

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
        let uploadFile = document.querySelector('.uploadFile');
        let textArea = document.querySelector('#resultString');
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

                fs.writeFile('./resources/Exercises.txt', four_Airthmetic.getAllAirthmeticString(), 'utf-8', function (err) {
                    console.log(err);
                });

                fs.writeFile('./resources/Answer.txt', four_Airthmetic.getAllanswerString(), 'utf-8', function (err) {
                    console.log(err);
                });

            } else {
                alert('您输入的数字不规范，请重新输入!');
                n_number = null;
                r_number = null;
            }
        }

        const content = document.querySelector('.uploadFile');
        // 阻止默认行为
        content.ondragenter = content.ondragover=content.ondragleave = ()=>{
            return false;
        }
        let user = [];
        let ans = [];
        content.ondrop = (e)=>{
            let path = e.dataTransfer.files[0].path;



            let rl = readline.createInterface({
                input: fs.createReadStream(path)
            })
            rl.on('line', line => {
                console.log(line);
                user.push(line)
            })
            let rt = readline.createInterface({
                input: fs.createReadStream('./resources/Answer.txt')
            })
            rt.on('line', line => {
                console.log(line);
                ans.push(line);
            })
            uploadFile.innerHTML = '文件已上传';
            console.log(user,ans);
            console.log(uploadFile);
        }


        config_url.onclick = function () {
            let res = '';
            let cor = [];
            let wor = [];
            for(let i =0;i<user.length;i++){
                let index = user[i].indexOf(')');
                console.log(`index`,index);
                if(user[i].slice(index+1) == ans[i].slice(index+1)) {
                    cor.push(i+1);
                }else {
                    wor.push(i+1);
                }
            }
            
            res+=`Correct: ${cor.length}(${cor.join(',')})` + '\n'
            res+=`Wrong: ${wor.length}(${wor.join(',')})`
            fs.writeFile('./resources/Grade.txt',res,function(err){console.log(err);});
            user.length =0;
            ans.length=0;
            textArea.innerHTML = `Correct: ${cor.length}(${cor.join(',')})` + '</br>' +`Wrong: ${wor.length}(${wor.join(',')})`;
        }

        // 构建题目和答案

        // 对比答案
    }
}