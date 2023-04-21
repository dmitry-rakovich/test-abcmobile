const app = document.querySelector('.app')

export function printLoading() {
    app.innerHTML = `
    <section class="loading">
    <div class="loading-wrapper">
    <div class="loading-bar" style="width: 100%"></div>
    </div>
    <h2>Обработка результатов</h2>
    <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <p>Определение стиля мышления..............................................</p>
    </section>
    `
    setTimeout(printResult, 2000)
}

function printResult() {
    app.innerHTML = `
    
    <section class="result">
      <h2 class="upper-case">ваш результат рассчитан</h2>
      <p><span class="underline">Вы относитесь к 3%</span> респондентов, чей уровень интеллекта более чем на 
        15 пунктов отличается от среднего в большую или меньшую сторону! </p>
      <p class="upper-case color-green">Скорее получите свой результат!</p>
      <p class="upper-case protection">
        В целях защиты персональных 
        данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона
      </p>
      <p class="color-green">Звоните скорее, запись доступна всего <span class="timer">10.00</span> минут</p>
      <button class="call-button bold" value="https://swapi.dev/api/people/1/">
        <img src="/src/assets/images/call.svg" alt="">
        <span>Позвонить и прослушать результат</span>
      </button>
    </section>
    `
    toggleHeader('finish')
    handleCall()
}

export function toggleHeader (str) {
  if(str === 'start') {
    document.querySelector('.header-title').innerHTML = `
    <img src="/src/assets/images/brain-blue.svg" width="40" height="40">
    <span class="upper-case">тест на определеніе iq</span>
    `
  } else {
    document.querySelector('.header-title').innerHTML = `
    <img src="/src/assets/images/brain-blue.svg" width="40" height="40">
    <span class="upper-case">готово!</span>
    `
  }
}

function handleCall() {
  document.querySelector('.call-button').addEventListener('click', (e) => getResponse(e))
}
async function getResponse(e) {
  document.querySelector('.call-button').disabled = true
  const regex = /^https:\/\/.*$/;
  const response = await fetch(e.target.value)
  const data = await response.json()
 
  for (let key in data) {
    if(Array.isArray(data[key])) {
      data[key].map(item => {
        return(
          e.target.insertAdjacentHTML('afterend', `<div class="response">${key}: <button title="по клику ниже отобразится результат запроса на сервер" class="link" value="${item}">${item}</button></div>`)
        )
      })
    } else if(regex.test(data[key])) {
      e.target.insertAdjacentHTML('afterend', `<div class="response">${key}:  <button title="по клику ниже отобразится результат запроса на сервер" class="link" value="${data[key]}">${data[key]}</button></div>`)
    } else e.target.insertAdjacentHTML('afterend', `<p><span>${key}</span>: <span>${data[key]}</span></p>`)
    
  }
  document.querySelectorAll('.link').forEach(item => item.addEventListener('click', (e) => getResponse(e)))
}
