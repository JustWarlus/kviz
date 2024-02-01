const buttons = document.querySelectorAll('.btn')
let number_qustion = 1
let true_cout = 0
const number = () => {

    document.querySelector("h1").textContent = number_qustion + '/25'
    if (number_qustion == 26) {
        document.querySelector("h1").textContent = "Конец"
    }
}

buttons.forEach((item) => {

    item.addEventListener('click', (event) => {
        const kviz = event.target.closest('.kviz')
        const res_true = kviz.dataset.res
        let res = ''
        const value = Array.from(kviz.querySelectorAll('input[name="1"]'))
        for (const f of value) {
            if (f.checked) {
                res = f.value
            }
        }
        if (res) {
            for (const f of value) {
                if (f.checked) {
                    f.closest('.answer-item').classList.add("false")
                }
                if (f.value == res_true) { f.closest('.answer-item').classList.add("true") }
                if (f.checked) {
                    if (f.value == res_true) {
                        true_cout++
                        document.querySelector('.final').textContent = true_cout + ' правильных ответов из 25'
                    }
                }
            }


            if (kviz.querySelector(".btn").textContent == 'Next') {
                kviz.querySelector('audio').pause()
                document.querySelector(`.kviz.k${number_qustion}`).classList.add('remove')
                document.querySelector(`.kviz.k${number_qustion + 1}`).classList.remove('remove')
                number_qustion++
                number()
            } else {
                kviz.querySelector('audio').currentTime = +kviz.dataset.secund;
                kviz.querySelector('audio').play()
                kviz.querySelector('.btn').textContent = 'Next'
            }
        }
    })
})

document.querySelector(".start-btn").addEventListener("click", function () {
    const elements = document.querySelectorAll('.promo > div, span.last');
    document.querySelector(".start-btn").classList.add('remove');

    function showElement(index) {
        if (index >= elements.length) {
            setTimeout(() => {
                document.querySelector('.promo').classList.add('remove');
                const instructionBlock = document.querySelector('.instruction');
                if (instructionBlock.classList.contains('remove')) {
                    instructionBlock.classList.remove('remove');
                }
            }, 4000);
            return;
        }

        elements[index].style.opacity = 1;

        setTimeout(() => showElement(index + 1), 2000);
    }

    showElement(0);
});

document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.instruction').classList.add('remove')
    document.querySelector('.kviz.k1').classList.remove('remove')
})