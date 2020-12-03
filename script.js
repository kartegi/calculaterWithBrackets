const inp = document.querySelector(".operation");
const countIt = document.querySelector(".btn6");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".remove");
const btns = document.querySelectorAll(".btn")

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        inp.value += btn.innerText
    })
})

remove.addEventListener('click', () => {
    inp.value = inp.value.slice(0, -1)
})


clear.addEventListener('click', () => {
    inp.value = ""
})



countIt.addEventListener('click', count);



// Converting input value to array and filtering bad value

function strToArr(value){
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
            while ((value[i] >= '0' && value[i] <= '9') || value[i] == '.')
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

// Basic calculatar

function calculator(a, b, op)
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

// I created this function to make count function smaller
// it does calculation till the certane point which is represented
// as condition variable

function goTrhoughCalc(stackOp, stackNum, condition, op)
{

	while (eval(condition))
	{
        if (stackOp.length === 0)
            break;
		let b = Number(stackNum.pop());
		let a = Number(stackNum.pop());
		
		stackNum.push(calculator( a, b, stackOp.pop()));

		if (op)
		{
			stackOp.push(op);
			break;
		}
	}
}

// Count function is main one in this programme
// I use polish notation and stack to solve the
// brackets problem

function count()
{
	//stack for operands
	let stackNum = [];
	//stack for operators
    let stackOp = []
	let inputValue = strToArr(inp.value);
	// math operators priority
    const prior = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    for (let i = 0; i < inputValue.length; i++)
    {
		// if operator at which our cicle pointing has bigger priority
		// then the operator that is in our stackOp we make calculation
        if (prior[inputValue[i]] <= prior[stackOp[stackOp.length-1]] || inputValue[i] == ')')
        {
            if (prior[inputValue[i]] <= prior[stackOp[stackOp.length-1]])
            {
				goTrhoughCalc(stackOp, stackNum, "true", inputValue[i]);
            }
            else if (inputValue[i] == ')')
            {
				goTrhoughCalc(stackOp, stackNum, "stackOp[stackOp.length -1] != '('", false);
                stackOp.pop();
            }
        }
        else if (inputValue[i] == '+' || inputValue[i] == '-' || inputValue[i] == '*' || inputValue[i] == '/' || inputValue[i] == '(')
            stackOp.push(inputValue[i]);
        else
            stackNum.push(inputValue[i]);
    }
    goTrhoughCalc(stackOp, stackNum, "stackOp.length != 0", false);
    inp.value = stackNum.join('')
}