const bill = document.getElementById('bill')
const allTip = document.querySelectorAll('.tip-percent > div')
const customTip = document.getElementById('tip-custom')
const people = document.getElementById('people')
const totalTip = document.querySelector('.tip-price')
const total = document.querySelector('.total-price')

const hide = document.querySelector('.hide')
const reset = document.querySelector('.reset')

let billValue = ''
let tipValue = ''
let peopleValue = ''

evaluate()
getBillPerPerson()
getNbrOfPeople()
selectTip()

function getBillPerPerson() {
    bill.addEventListener('input', () => {
        billValue = parseFloat(bill.value)
        calcul()
    })
}

function getNbrOfPeople() {
    people.addEventListener('input', () => {
        if (parseFloat(people.value) <= 0) {
            hide.classList.remove('hide') // show
            people.style.border = '2.5px solid hsl(22, 77%, 52%)'
        }
        else {
            hide.classList.add('hide') // hide
            people.style.border = 'none'
        }
        peopleValue = parseFloat(people.value)
        calcul()
    })
}

function selectTip() {
    allTip.forEach(oneTip => {
        oneTip.addEventListener('click', e => {
            allTip.forEach(el => {
                el.classList.remove('active')
            })
            oneTip.classList.add('active')

            const str = e.target.textContent
            const myTip = str.substring(0, str.length - 1)
            tipValue = parseFloat(myTip) / 100
            calcul()
        })
    })
    customTip.addEventListener('input', e => {
        allTip.forEach(el => {
            el.classList.remove('active')
        })
        const customAmount = e.target.value
        tipValue = parseFloat(customAmount / 100)
        calcul()
    })
}

function calcul() {
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let totalPerPerson = ((billValue * tipValue) + billValue) / peopleValue;

        totalTip.textContent = tipAmount.toFixed(2);
        total.textContent = totalPerPerson.toFixed(2);
    }
}

function evaluate() {
    bill.addEventListener('keyup', () => {
        activeResetBtn()
    })
    people.addEventListener('keyup', () => {
        activeResetBtn()
    })
}

function activeResetBtn() {
    if ((billValue !== '') || (tipValue !== '') || (peopleValue !== '')) {
        reset.classList.remove('forbidden')
    } else {
        reset.classList.add('forbidden')
    }
}

function resetBtn() {
    reset.addEventListener('click', () => {
        billValue = ''
        tipValue = ''
        peopleValue = ''
        activeResetBtn()
    })
}