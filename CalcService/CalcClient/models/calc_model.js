Phase = {
    Item1Wait: 0,       // 1つ目の数の入力待ち
    Item1Input: 1,      // 1つ目の数の入力中
    Item2Wait: 2,       // 2つ目の数の入力待ち
    Item2Input: 3,      // 2つ目の数の入力中
    Result: 4           // 計算結果表示中
}

class CalcModel {
    displayText;
    operationText;
    #phaseState;
    #item1;
    #item2;
    #operator;
    #result;

    constructor() {
        this.Clear();
    }
    #UpdateDisplay() {
        switch (this.#phaseState) {
            case Phase.Item1Wait:
                this.operationText = "(# ^ω^)＜ Are you ready?";
                this.displayText = "0";
                break;
            case Phase.Item1Input:
                this.operationText = "(# ^ω^)＜ 早くしる";
                this.displayText = this.#item1;
                break;
            case Phase.Item2Wait:
                this.operationText = "(# ﾟДﾟ)＜ " + this.#item1 + this.#operator;
                this.displayText = this.#item1;
                break;
            case Phase.Item2Input:
                this.operationText = "(# ﾟДﾟ)＜ " + this.#item1 + this.#operator;
                this.displayText = this.#item2;
                break;
            case Phase.Result:
                this.operationText = "(・∀・)＜ " + this.#item1 + this.#operator + this.#item2 + "=";
                this.displayText = this.#result;
                break;
            default:
                break;
        }
    }
    #ConcatNumber(source, number) {
        if (source.length >= 8) {
            return source;
        }
        if (number == ".") {
            let index = source.indexOf(".");
            if (index >= 0) {
                return source;
            }
        }
        if (source == "0") {
            if (number == ".") {
                return "0.";
            }
            else {
                return number;
            }
        }
        return source + number;
    }
    #ToRealString(source) {
        let temp = source.toFixed(7);
        return String(Math.floor(temp));
    }
    #Operate() {
        let temp = "";
        switch (this.#operator) {
            case '+':
                temp = this.#ToRealString(Number(this.#item1) + Number(this.#item2));
                break;
            case '-':
                temp = this.#ToRealString(Number(this.#item1) - Number(this.#item2));
                break;
            case '*':
                temp = this.#ToRealString(Number(this.#item1) * Number(this.#item2));
                break;
            case '/':
                temp = this.#ToRealString(Number(this.#item1) / Number(this.#item2));
                break;
            default:
                break;
        }
        if(temp.length > 9)
        {
            temp = "Overflow";
        }
        this.#result = temp;
    }
    #ApplyRate(rate) {
        this.#item2 = (rate * 0.01).toFixed(2);
        this.#operator = "*";
        this.#Operate();
    }
    SetNumber(number) {
        switch (this.#phaseState) {
            case Phase.Item1Wait:
                this.#item1 = this.#ConcatNumber("0", number);
                this.#phaseState = Phase.Item1Input;
                break;
            case Phase.Item1Input:
                this.#item1 = this.#ConcatNumber(this.#item1, number);
                break;
            case Phase.Item2Wait:
                this.#item2 = this.#ConcatNumber("0", number);
                this.#phaseState = Phase.Item2Input;
                break;
            case Phase.Item2Input:
                this.#item2 = this.#ConcatNumber(this.#item2, number);
                break;
            case Phase.Result:
                this.Clear();
                this.#item1 = this.#ConcatNumber("0", number);
                this.#phaseState = Phase.Item1Input;
                break;
            default:
                break;
        }
        this.#UpdateDisplay();
    }
    SetOperator(operator) {
        switch (this.#phaseState) {
            case Phase.Item1Wait:
                this.#operator = operator;
                this.#phaseState = Phase.Item2Wait;
                break;
            case Phase.Item1Input:
                this.#operator = operator;
                this.#phaseState = Phase.Item2Wait;
                break;
            case Phase.Item2Wait:
                this.#operator = operator;
                break;
            case Phase.Item2Input:
                this.#Operate();
                this.#item1 = this.#result;
                this.#operator = operator;
                this.#phaseState = Phase.Item2Wait;
                break;
            case Phase.Result:
                this.#item1 = this.#result;
                this.#operator = operator;
                this.#phaseState = Phase.Item2Wait;
                break;
            default:
                break;
        }
        this.#UpdateDisplay();
    }
    Clear() {
        this.#item1 = "0";
        this.#item2 = "0";
        this.#operator = "+";
        this.#result = "0";
        this.#phaseState = Phase.Item1Wait;
        this.#UpdateDisplay();
    }
    Equal() {
        switch (this.#phaseState) {
            case Phase.Item1Wait:
                break;
            case Phase.Item1Input:
                break;
            case Phase.Item2Wait:
                break;
            case Phase.Item2Input:
                this.#Operate();
                this.#phaseState = Phase.Result;
                break;
            case Phase.Result:
                this.#item1 = this.#result;
                this.#Operate();
                break;
            default:
                break;
        }
        this.#UpdateDisplay();
    }
    Rate(rate) {
        switch (this.#phaseState) {
            case Phase.Item1Wait:
                break;
            case Phase.Item1Input:
                this.#ApplyRate(rate);
                this.#phaseState = Phase.Result;
                break;
            case Phase.Item2Wait:
                this.#ApplyRate(rate);
                this.#phaseState = Phase.Result;
                break;
            case Phase.Item2Input:
                this.#Operate();
                this.#item1 = this.#result;
                this.#ApplyRate(rate);
                this.#phaseState = Phase.Result;
                break;
            case Phase.Result:
                this.#item1 = this.#result;
                this.#ApplyRate(rate);
                break;
            default:
                break;
        }
        this.#UpdateDisplay();
    }
    Action(command, param) {
        switch(command) {
            case 'Number':
                this.SetNumber(param);
                break;
            case 'Operator':
                this.SetOperator(param);
                break;
            case 'Clear':
                this.Clear();
                break;
            case 'Equal':
                this.Equal();
                break;
            case 'Rate':
                this.Rate(param);
                break;
            default:
                break;
        }
    }
}

var calcModel = new CalcModel();

module.exports = calcModel;
