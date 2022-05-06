class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	//Чтобы добавлять цифры на экран
	appendNumber(number) {
		//Чтобы ограничть количество '.'
		if (number === '.' && this.currentOperand.includes('.')) return
		//Этим мы сделали, чтобы числа шли одним за одним!
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}
	//Выбор опервции (+ - * ÷)
	chooseOperation(operation) {
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute()
		}
		//При выполнении операции у нас чистился экран
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current)) return
		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	//Обновлять значения на экране
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand
		if (this.operation != null) {
			//При выполнении матем. действий цифры шли вверх
			this.previousOperandTextElement.innerText =
				`${this.previousOperand} ${this.operation}`
		} else {
			this.previousOperandTextElement.innerText = ''
		}
	}
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//При клике выводились цифры
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButtons.addEventListener('click', button => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})