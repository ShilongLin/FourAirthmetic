{

    /*
    定义构造真分数的函数，规定分子分母都是正整数类型且不为0
    */
    function True_Faction(molecule, denominator) {
        // molecule为分子，denominator为分母
        // 获取又值（比如1又3分之2的1）
        // - 获取整数
        // - 分子改成比分母小的数
        this.integer = parseInt(molecule / denominator);
        molecule -= this.integer * denominator;

        // 寻找公约数
        if (molecule == 0) {
            denominator = 1;
        } else {
            let flag = 1;
            while (flag == 1) {
                let sum;
                for (let i = 0; i <= molecule; i++) {
                    if (molecule % i == 0 && denominator % i == 0) {
                        sum = i;
                    }
                }
                if (sum == 1) {
                    flag = 0;
                } else {
                    molecule = molecule / sum;
                    denominator = denominator / sum;
                }
            }
        }


        this.molecule = molecule;
        this.denominator = denominator;
    }

    /*
    定义一个表达式数据结构的构造函数
    */
    function Expression(Array_ExpresstionString, answer) {
        this.Array_ExpresstionString = Array_ExpresstionString;
        this.answer = answer;
    }

    /*
    为一个表达式做返回格式化公式
    */
    Expression.prototype.getExpressionString = function () {
        let ExpressionString = '';
        for (let i = 0; i < this.Array_ExpresstionString.length; i++) {
            ExpressionString += this.Array_ExpresstionString[i].toString();
        }
        return ExpressionString;
    }

    /*
    为真分数的构造函数原型添加toString方法
    */
    True_Faction.prototype.toString = function () {
        if (this.molecule == 0 && this.integer != 0) {
            return this.integer;
        } else if (this.molecule != 0 && this.integer == 0) {
            return this.molecule + '/' + this.denominator;
        } else if (this.molecule != 0 && this.integer != 0) {
            return this.integer + '`' + this.molecule + '/' + this.denominator;
        }
    }

    function Four_Airthmetic(n, r) {
        this.n = n;
        this.r = r;
        let expressions = [];
        for (let i = 0; i < n; i++) {
            expressions[i] = this.getOneAirthmetic();
        }
        this.expressions = expressions;
    }

    // 获取所有的式子字符串(mode=1时为innerHtml模式)
    Four_Airthmetic.prototype.getAllAirthmeticString = function (mode) {
        let temp;
        if (mode == 1) {
            temp = '</br>';
        } else temp = '\n';
        let AllAirthmeticString = '';
        for (let i = 0; i < this.n; i++) {
            AllAirthmeticString += '(' + (i + 1) + ') ' + this.expressions[i].getExpressionString() + temp;
        }
        return AllAirthmeticString;
    }

    // 获取所有式子的答案字符串
    Four_Airthmetic.prototype.getAllanswerString = function (mode) {
        let temp;
        if (mode == 1) {
            temp = '</br>';
        } else temp = '\n';
        let AllanswerString = '';
        for (let i = 0; i < this.n; i++) {
            AllanswerString += '(' + (i + 1) + ') ' + this.expressions[i].answer + temp;
        }
        return AllanswerString;
    }

    Four_Airthmetic.prototype.getOneAirthmetic = function () {
        // 生成数学字符的数目
        let Number_MathSign = Math.floor(Math.random() * 3 + 1);

        // 生成随机字符数目的队列
        // - 0,1,2,3分别代表+，-，×，/
        let Array_char = ['+', '-', '×', '÷'];
        let Array_MathSign = new Array(Number_MathSign);
        for (let i = 0; i < Number_MathSign; i++) {
            let flag = Math.floor(Math.random() * 4);
            Array_MathSign[i] = Array_char[flag];
        }

        // 生成随机
        let Array_Number = new Array(Number_MathSign + 1);
        for (let i = 0; i < Number_MathSign + 1; i++) {
            let flag = Math.floor(Math.random() * 2);
            if (flag == 0) {
                Array_Number[i] = new True_Faction(Math.floor(Math.random() * (this.r - 1) + 1), 1);
            } else {
                Array_Number[i] = new True_Faction(Math.floor(Math.random() * (this.r - 1) + 1), Math.floor(Math.random() * (this.r - 1) + 1));
            }
        }

        // 随机生成括号
        let Array_ExpresstionString = [];

        Array_ExpresstionString.push(Array_Number[0]);
        for (let i = 0; i < Number_MathSign; i++) {
            Array_ExpresstionString.push(Array_MathSign[i]);
            Array_ExpresstionString.push(Array_Number[i + 1]);
        }
        if (Number_MathSign == 2) {
            let flag = Math.floor(Math.random() * 2);
            if (flag == 0) {
                Array_ExpresstionString.splice(2, 0, "(");
                Array_ExpresstionString.push(')');
            }
        } else if (Number_MathSign == 3) {
            let flag = Math.floor(Math.random() * 6);
            if (flag == 0) {
                Array_ExpresstionString.splice(2, 0, '(');
                Array_ExpresstionString.push(')');
            }
            else if (flag == 1) {
                Array_ExpresstionString.splice(2, 0, '(', '(');
                Array_ExpresstionString.splice(7, 0, ')');
                Array_ExpresstionString.push(')');
            }
            else if (flag == 2) {
                Array_ExpresstionString.splice(2, 0, '(');
                Array_ExpresstionString.splice(5, 0, '(');
                Array_ExpresstionString.push(')');
                Array_ExpresstionString.push(')');
            }
        }

        let Array_x = [];
        for (let i = 0; i < Array_ExpresstionString.length; i++) {
            Array_x.push(Array_ExpresstionString[i]);
        }

        let answer = getAnswerFromExpresstion(Array_x);
        let expression = new Expression(Array_ExpresstionString, answer);

        if (answer == null) {
            return this.getOneAirthmetic();
        } else return expression;

    }

    // 创建包含括号时的表达式的算法
    let getAnswerFromExpresstion = function (Array_ExpresstionString) {
        for (let i = 0; i < Array_ExpresstionString.length; i++) {
            if (Array_ExpresstionString[i] == '(') {
                for (let j = Array_ExpresstionString.length - 1; j >= 0; j--) {
                    if (Array_ExpresstionString[j] == ')') {
                        let x = getAnswerFromExpresstion(Array_ExpresstionString.splice(i + 1, j - i - 1))
                        if (x == null) {
                            return null;
                        }
                        Array_ExpresstionString.splice(2, 2, x);
                    }
                }
            }
        }
        for (let i = 0; i < Array_ExpresstionString.length;) {
            if (Array_ExpresstionString[i] == '×') {
                let a = (Array_ExpresstionString[i - 1].integer * Array_ExpresstionString[i - 1].denominator + Array_ExpresstionString[i - 1].molecule) * (Array_ExpresstionString[i + 1].integer * Array_ExpresstionString[i + 1].denominator + Array_ExpresstionString[i + 1].molecule);
                let b = (Array_ExpresstionString[i - 1].denominator) * (Array_ExpresstionString[i + 1].denominator);
                let newnumber = new True_Faction(a, b);
                Array_ExpresstionString.splice(i - 1, 3, newnumber);
                i--;
            } else if (Array_ExpresstionString[i] == '÷') {
                let a = (Array_ExpresstionString[i - 1].integer * Array_ExpresstionString[i - 1].denominator + Array_ExpresstionString[i - 1].molecule) * (Array_ExpresstionString[i + 1].denominator);
                let b = (Array_ExpresstionString[i - 1].denominator) * (Array_ExpresstionString[i + 1].integer * Array_ExpresstionString[i + 1].denominator + Array_ExpresstionString[i + 1].molecule);
                let newnumber = new True_Faction(a, b);
                Array_ExpresstionString.splice(i - 1, 3, newnumber);
                i--;
            }
            i++;
        }
        for (let i = 0; i < Array_ExpresstionString.length;) {
            if (Array_ExpresstionString[i] == '+') {
                let a = ((Array_ExpresstionString[i - 1].integer * Array_ExpresstionString[i - 1].denominator + Array_ExpresstionString[i - 1].molecule) * (Array_ExpresstionString[i + 1].denominator)) + ((Array_ExpresstionString[i + 1].integer * Array_ExpresstionString[i + 1].denominator + Array_ExpresstionString[i + 1].molecule) * (Array_ExpresstionString[i - 1].denominator));
                let b = (Array_ExpresstionString[i - 1].denominator) * (Array_ExpresstionString[i + 1].denominator);
                let newnumber = new True_Faction(a, b);
                Array_ExpresstionString.splice(i - 1, 3, newnumber);
            } else if (Array_ExpresstionString[i] == '-') {
                let a = ((Array_ExpresstionString[i - 1].integer * Array_ExpresstionString[i - 1].denominator + Array_ExpresstionString[i - 1].molecule) * (Array_ExpresstionString[i + 1].denominator)) - ((Array_ExpresstionString[i + 1].integer * Array_ExpresstionString[i + 1].denominator + Array_ExpresstionString[i + 1].molecule) * (Array_ExpresstionString[i - 1].denominator));
                let b = (Array_ExpresstionString[i - 1].denominator) * (Array_ExpresstionString[i + 1].denominator);

                if (a <= 0) {
                    return null;
                } else {
                    let newnumber = new True_Faction(a, b);
                    Array_ExpresstionString.splice(i - 1, 3, newnumber);
                }
            }
            i++;
        }
        let answer = Array_ExpresstionString[0];
        return answer;
    }
}