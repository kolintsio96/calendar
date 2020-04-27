const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
let leftArrow = document.querySelector('.arrows__left'),
    rightArrow = document.querySelector('.arrows__right'),
    todayButton = document.querySelector('.today__btn'),
    calendarWrap = document.querySelector('.calendar-content__wrap'),
    openAdd =  document.querySelector('.btn.add'),
    popupAdd = document.querySelector('.popup__add'),
    closeAdd = popupAdd.querySelector('.popup__close'),
    formAdd = document.querySelector('.form-add'),
    addField = formAdd.querySelector('.form-add__field'),
    searchField = document.querySelector('.search__field'),
    searchPopup = document.querySelector('.search-result'),
    resultList = document.querySelector('.search-result__list'),
    searchArr = [];

let daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // повертає кількість днів в місяці
}
let createBlockDay = (data, weekDay = true, today = false, event = false) => {
    let block = document.createElement('div'),
        day = `<span class="calendar-content__day">${data.day}</span>
               <div class="calendar-content__info">
                    <h4 class="calendar-content__title">${data.time?data.time:''}</h4>
                    <p class="calendar-content__desc">${data.desc?data.desc:''}</p>
               </div>
               <button class="calendar-content__delete" data-year="${calendarWrap.dataset.year}" data-month="${calendarWrap.dataset.month}" data-day="${data.day}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100px" height="100px">
                        <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"/>
                    </svg>
                </button>`;

    if(today){
        block.classList.add('today'); // додає клас для відображення сьогоднішнього дня
    }else if(event){
        block.classList.add('active'); // додає клас для блоків, які містять події
    }
    if(weekDay){ // при побудові календаря, провіряється блок повинен бути пустий чи з датою
        block.innerHTML = day; // додає блок з датою
    }else{
        block.classList.add('none'); // додає пустий було
    }

    block.classList.add('calendar-content__block');
    block.style.height = calendarWrap.offsetWidth/7 + 'px'; // задає висоту блоку, щоб блоки були квадратні

    calendarWrap.appendChild(block); // вставляє блок в календар

    block.addEventListener('click', function (e) { // видалення події з календаря
        let target = e.target;
        if(target.classList.contains('calendar-content__delete') || target.tagName == 'svg' || target.tagName == 'path'){
            let object = JSON.parse(window.localStorage.getItem('events')); // отрмання обєкту подій з localStorage
            delete object[calendarWrap.dataset.year][calendarWrap.dataset.month][data.day]; // видалення події з обєкту
            window.localStorage.setItem('events', JSON.stringify(object)); // записування в localStorage новий обєкт
            createCalendar(parseInt(calendarWrap.dataset.year), parseInt(calendarWrap.dataset.month)); // перемальовування календаря
        }
    })
}
let createCalendar = (year,month) => {
    let monthDays = daysInMonth(year, month+1), // кількість днів в місяці
        weekDay = new Date(year, month, 1).getDay() == 1?0:new Date(year, month, 1).getDay() == 0?6:new Date(year, month, 1).getDay()-1, // вертає день тижня з якого починається місяці
        fullDate = `${monthNames[month]} ${year}`, // текстове поле з місяцем і роком
        storage = JSON.parse(window.localStorage.getItem('events')), // отримання подій з localStorage
        today,
        object = {};
    document.querySelector('.arrows__date').innerText = fullDate;
    if(storage.hasOwnProperty(year)){
        if(storage[year].hasOwnProperty(parseInt(month))){
            object = storage[year][month]; // обєкт подій на один місяць
        }
    }

    calendarWrap.innerHTML = ''
    calendarWrap.dataset.year = year;
    calendarWrap.dataset.month = month;
    if(new Date().getFullYear() == year && new Date().getMonth() == month){ // провірка чи вибраний місяць відповідає сьогоднішньому місяцю і року
        today = new Date().getUTCDate()
    }else{
        today = false;
    }
    for(let i = 0; i < weekDay; i++){
        let data = {};
            createBlockDay(data, false); // створення пустих блоків
    }
    for(let i = 0; i < monthDays; i++){
        let data = {
            day: i + 1,
            time: object[i+1]?object[i+1].time:'',
            desc: object[i+1]?object[i+1].event:''
        };
        if(today == i+1){ // провірка чи блок відповідає сьогоднішньому дню
            createBlockDay(data, true, true);
        }else if(object[i+1]){ // провірка чи є події на день
            createBlockDay(data, true, false, true);
        }else {
            createBlockDay(data); // створення звичайного блоку календаря
        }


    }

    leftArrow.dataset.year = month == 0?year-1:year; // присвоєння параметру року для лівої кнопки
    rightArrow.dataset.year = month == 11?year+1:year; // присвоєння параметру року для правою кнопки
    leftArrow.dataset.month = month - 1; // присвоєння параметру місяця для лівої кнопки
    rightArrow.dataset.month = month + 1; // присвоєння параметру місяця для правої кнопки

    updateSearchArr(); // оновлення масиву для пошуквого поля
}
let initCalendar = ()=>{
    if(!window.localStorage.getItem('events')){
        window.localStorage.setItem('events', JSON.stringify({})); // створення пустого обєкту в localStorage при першому вході
    }
    createCalendar(new Date().getFullYear(), new Date().getMonth()); // створення календаря на сьогоднішній день
}
let updateSearchArr = ()=>{
    let data = JSON.parse(window.localStorage.getItem('events')); // отримання даних подій з localStorage
    searchArr = [];
    for(let year in data){
        for(let month in data[year]){
            for(let day in data[year][month]){
                data[year][month][day]['month'] = month;
                data[year][month][day]['day'] = day;
                data[year][month][day]['year'] = year;
                searchArr.push(data[year][month][day]); // додавання обєкту події в масив результату пошуку
            }
        }
    }
}
let showSearchResult = (data) =>{
    let month = monthNames[data.month], // отримання індексу місяця
        resultItem = `
                          <h4 class="search-result__title">${data.event}</h4>
                          <p class="search-result__date">${data.day} ${month?month.toLowerCase():''}</p>
                                `,
        resultBlock = document.createElement('li');
        resultBlock.innerHTML = resultItem;
        resultBlock.classList.add('search-result__item');
        resultList.appendChild(resultBlock);
    resultBlock.addEventListener('click',(e)=>{
        searchPopup.classList.remove('active');
        createCalendar(parseInt(data.year), parseInt(data.month)); // створення місяця з даною подією
    })
}
initCalendar(); // ініціалізація календаря

leftArrow.addEventListener('click', (e)=>{ // перехід на попередній місяця
    let month = leftArrow.dataset.month == -1?11:leftArrow.dataset.month,
        year = leftArrow.dataset.year;
    createCalendar(parseInt(year), parseInt(month), {});
})
rightArrow.addEventListener('click', (e)=>{  // перехід на наступний місяця
    let month = rightArrow.dataset.month == 12?0:rightArrow.dataset.month,
        year = rightArrow.dataset.year;
    createCalendar(parseInt(year), parseInt(month), {});
})
todayButton.addEventListener('click', (e)=>{  // перехід на сьогоднішній місяця
    createCalendar(new Date().getFullYear(), new Date().getMonth(), {});
})
openAdd.addEventListener('click',(e)=>{ //відкрити попап для додавання події
    popupAdd.classList.toggle('active');
    addField.value = '';
    formAdd.classList.remove('err')
})
closeAdd.addEventListener('click',(e)=>{
    popupAdd.classList.remove('active');
    formAdd.classList.remove('err')
    addField.value = '';
})
formAdd.addEventListener('submit',(e)=>{ // додання події в календар
    e.preventDefault();
    let data = addField.value, // значення поля
        dataArr = data.match(/^(\d{1,2} [\s\wА-Яа-я]+) ?,? {1,}?(\d?\d:\d?\d) {0,}?,? {0,}?([\d?\s?\w?А-Я?а-я \,\.\!\?]+)/); // масив з полями дати, часу і події

    if(!dataArr){ // провірка чи коректно введені дані
        formAdd.classList.add('err')
        return false;
    }else{
        formAdd.classList.remove('err')
    }

    let dateArr = dataArr[1].split(' '), // масив з значеннями дня і назви місяця
        charMonth = dateArr[1].toLowerCase() != 'мая'?dateArr[1].slice(0,3):'май',
        timeArr = dataArr[2].split(":"), // масив з значеннями години і хвилини
        description = dataArr[3], // опис події
        year = calendarWrap.dataset.year,
        storage = JSON.parse(window.localStorage.getItem('events')),
        monthName = monthNames.filter(month=>{return month.toLowerCase().indexOf(charMonth.toLowerCase())>-1}), // фільтр масиву місяців по введеному місяці
        month = monthNames.indexOf(monthName[0])!= -1?monthNames.indexOf(monthName[0]):-1, // індекс місяця
        monthDays = daysInMonth(year, month+1); // кількість днів в місяці
    if(parseInt(dateArr[0]) < 1 || // провірка чи введена дата не менше 1 числа
       parseInt(dateArr[0]) > 31 || // провірка чи введена дата не більша 31 числа
       month == -1 || // провірка чи вірно вказаний місяць
       parseInt(timeArr[0]) < 0 || // провірка години
       parseInt(timeArr[0]) > 24 || // провірка години
       parseInt(timeArr[1]) > 59 || // провірка хвилин
       parseInt(timeArr[1]) < 0 || // провірка хвилини
       description.length <  1 || // провірка чи не пустий опис
       (parseInt(timeArr[0]) == 24 && parseInt(timeArr[1]) > 0) || // провірка чи не введено хвилин при 24 годині
       parseInt(dateArr[0]) > monthDays ){ // чпровірка чи число не більше ніж кількість днів в місяці
        formAdd.classList.add('err')
        return false;
    }

    if (!storage.hasOwnProperty(year)){
        storage[year] = {};
        storage[year][month] = {};
        storage[year][month][parseInt(dateArr[0])] = {};
        storage[year][month][parseInt(dateArr[0])]['event'] = description;
        storage[year][month][parseInt(dateArr[0])]['time'] = dataArr[2];
    }else {
        if(!storage[year].hasOwnProperty(month)){
            storage[year][month] = {};
            storage[year][month][parseInt(dateArr[0])] = {};
            storage[year][month][parseInt(dateArr[0])]['event'] = description;
            storage[year][month][parseInt(dateArr[0])]['time'] = dataArr[2];
        }else {
            if(!storage[year][month].hasOwnProperty(dateArr[0])){
                storage[year][month][parseInt(dateArr[0])] = {};
                storage[year][month][parseInt(dateArr[0])]['event'] = description;
                storage[year][month][parseInt(dateArr[0])]['time'] = dataArr[2];
            }else {
                if(!storage[year][month][dateArr[0]].hasOwnProperty('event')){
                    storage[year][month][parseInt(dateArr[0])]['event'] = description;
                    storage[year][month][parseInt(dateArr[0])]['time'] = dataArr[2];
                }else {
                    storage[year][month][parseInt(dateArr[0])]['event'] = description;
                    storage[year][month][parseInt(dateArr[0])]['time'] = dataArr[2];
                }
            }
        }
    } // формування обєкту в localStorage

    addField.value = '';
    window.localStorage.setItem('events', JSON.stringify(storage)); //додання обєкту в localStorage
    createCalendar(parseInt(year), parseInt(month)); // ренднрінг календаря

})
searchField.addEventListener('input', (e)=>{ // введення в поле пошуку
    let value = e.target.value.toLowerCase(), // отрмтання значення поля
        res = searchArr.filter((date)=>{
            return date.event.toLowerCase().indexOf(value) > -1 // фільтр масиву всіх подій по введеному значенню
        })
        resultList.innerHTML = '';
        if(res.length == 0 || value == ''){
            searchPopup.classList.remove('active') // відобреження списку подій
        }else{
            searchPopup.classList.add('active')
        }
        res.forEach(el=>{
            showSearchResult(el); // рендерінг подій
        })

})