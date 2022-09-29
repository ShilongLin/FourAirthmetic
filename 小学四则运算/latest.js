{
    /*
    * js说明 
    * 页面响应脚本
    */
    window.onload = function () {
        // 声明必须的参数
        let n_number;
        let r_number;


        // 获取必要信息
        let config_n_r = document.getElementById('config_n_r');
        let config_url = document.getElementById('config_url');
        let n = document.getElementById('n');
        let r = document.getElementById('r');
        let airthmeticString = document.getElementById('airthmeticString');
        let answerString = document.getElementById('answerString');



        config_n_r.onclick = function () {
            let reg = /^[0-9]+$/;
            if (reg.test(n.value) && reg.test(r.value)) {
                n_number = parseInt(n.value);
                r_number = parseInt(r.value);
                let four_Airthmetic = new Four_Airthmetic(n_number, r_number);
                airthmeticString.innerHTML = four_Airthmetic.getAllAirthmeticString();
                answerString.innerHTML = four_Airthmetic.getAllanswerString();
                console.log(four_Airthmetic);
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