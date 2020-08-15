const inp = document.querySelector(".inp");
const btn = document.querySelector(".btn");

btn.addEventListener('click', count);




function makeArr(value){
    let arr = [];

    for (let i = 0; i < value.length; i++)
    {
        let str = "";
        if (i == 0 && value[i] == '+')
            i++;
        if ((value[i] == '-' && i != 0) || value[i] == '+' || value[i] == '*'
            || value[i] == '/' || value[i] == '(' || value[i] == ')')
            arr.push(value[i]);
        else if ((value[i] >= '0' && value[i] <= '9') || (i == 0 && value[i] == '-' ))
        {
            if (i == 0 && value[i] == '-' )
            {
                str += '-';
                i++;
            }
            while (value[i] >= '0' && value[i] <= '9')
            {
                str += value[i];
                i++;
            }
            arr.push(str);
            i--;
        }
    }
    console.log(arr)
    return (arr);
}

function calc(a, b, op)
{
    let result;

    switch(op)
    {
        case '+':
            result = a + b
            break;
        case '-':
            result = a - b
            break;
        case '*':
            result = a * b
            break;
        case '/':
            result = a / b
            break;
    }
    return (result);
}

function count()
{
    let stackNum = [];
    let stackOp = []
    let arr = makeArr(inp.value);
    let prior = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    for (let i = 0; i < arr.length; i++)
    {

        if (prior[arr[i]] <= prior[stackOp[stackOp.length-1]] || arr[i] == ')')
        {
            if (prior[arr[i]] <= prior[stackOp[stackOp.length-1]])
            {
                let b = parseInt(stackNum.pop());
                let a = parseInt(stackNum.pop());

                stackNum.push(calc( a, b, stackOp.pop()));
                stackOp.push(arr[i]);
            }
            else if (arr[i] == ')')
            {
                while (stackOp[stackOp.length -1] != '(')
                {
                    let b = parseInt(stackNum.pop());
                    let a = parseInt(stackNum.pop());
                    
                    stackNum.push(calc( a, b, stackOp.pop()));
                }
                stackOp.pop();
            }
        }
        else if (arr[i] == '+' || arr[i] == '-' || arr[i] == '*' || arr[i] == '/' || arr[i] == '(')
            stackOp.push(arr[i]);
        else
            stackNum.push(arr[i]);
    }
    while (stackOp.length != 0)
    {
        let b = parseInt(stackNum.pop());
        let a = parseInt(stackNum.pop());
        
        stackNum.push(calc( a, b, stackOp.pop()));
    }
    console.log(stackNum);
}