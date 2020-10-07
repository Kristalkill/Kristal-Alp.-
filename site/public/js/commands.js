async function commands() {
  let response = await fetch('/api/commands');
  let pages = await response.json();
  let neededhead = [
    'name',
    'aliases',
    'description',
    'usage',
    'public',
    'nsfw',
  ]; // Массив заголовков, который нам нужен.

  let tr = document.getElementById('tr');
  let responsel = await fetch('/api/language');
  const language = await responsel.json();
  console.log(language.add);
  if (tr) {
    let pages1 = [];
    for (let k1 in pages) {
      // Отсортируем массив по категориям для удобства.
      if (!pages1[pages[k1].category]) {
        pages1[pages[k1].category] = [];
      }
      let name = pages[k1].name;
      console.log(name);
      pages[k1].usage = language[name].command.usage;
      pages[k1].description = language[name].command.description;
      pages1[pages[k1].category].push(pages[k1]);
    }

    for (let k in pages1) {
      // Перебираем все значения страниц
      let newth = document.createElement('th'); // Создаём th
      let newtd = document.createElement('td'); // Создаём td
      let input = document.createElement('input'); // Создаём кнопку
      input.type = 'button'; // Задаём тип кнопки
      input.className = 'buttons';
      input.id = 'buttons'; // Задаём класс, если нужно
      input.value = k; // В поле input вставляем значение из категории
      newtd.appendChild(input); // Добавляем input в td
      newth.appendChild(newtd); // Добавляем td в th
      tr.appendChild(newth); // Добавляем th в tr, который у нас уже существует.

      input.addEventListener('click', function (e) {
        // Начинаем слушать каждый input на нажатие
        e.preventDefault(); // убираем стандартный функционал кнопки
        let table = document.getElementById('table'); // Получаем вторую таблицу, в которую будем вносить данные
        table.innerHTML = ''; // Очищаем её.
        let checkhead = document.getElementById('headtr'); // Проверяем есть ли уже такой элемент на странице или нет
        if (!checkhead) {
          // Если нет, то создаём.
          let headtr = document.createElement('tr'); // Создаём tr для заголовков
          headtr.id = 'headtr';
          headtr.class = 'headtr'; // Проставляем id для поиска
          if (pages1[k][0]) {
            // Выводим заголовки
            for (let k4 in pages1[k][0]) {
              if (neededhead.indexOf(k4) != -1) {
                // Проверяем находится ли элемент в списке needle
                let headtd = document.createElement('th'); // создаём td
                headtd.innerText = k4;
                headtr.appendChild(headtd); // Добавляем td в tr
              }
            }
          }
          table.appendChild(headtr);
        }
        for (let k2 in pages1[k]) {
          // Для каждого элемента
          let headtr = document.createElement('tr'); // Создаём tr
          let newtr1 = document.createElement('tr'); // Создаём tr
          for (let k3 in pages1[k][k2]) {
            if (neededhead.indexOf(k3) != -1) {
              // Проверяем находится ли элемент в списке needle
              let newtd1 = document.createElement('td'); // создаём td
              newtd1.innerText = pages1[k][k2][k3]; // добавляем в него текст значения
              newtr1.appendChild(newtd1); // Добавляем td в tr
            }
          }
          table.appendChild(newtr1); // Добавляем tr в нашу таблицу.
        }
      });
    }
  }
}
