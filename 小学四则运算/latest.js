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
        config_n_r.onclick = function () {
            if (parseInt(n.value) <= 0) {
                alert('您输入的数字不规范，请重新输入！');
            } else n_number = parseInt(n.value);
        }


        // 构建题目和答案

        // 对比答案
    }
}