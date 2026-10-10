const answers = {
    // Здесь находятся ответы и данные от ответа. Вот так: ключ - это первый класс button; значение - [ответы по порядку(1 задание, 2 задание ...)]
    print: [2, 0, "0,3,5", 1],
    oper: ["2,3,6,7,8,10", 5, "1,4,5", 5, "1,3,4,6,8,9,11", 5],
    typeConv: ["0,3,6,9,11,13,16,17", 5, "0,3,5,7", 2, 4, 0, 2],
    cycles: ["2,4", 2, 4, 2, 2, "0,2,5", "3,5", 1, 2, 0, 3],
    funcStr: [0, 2, 2, 1, 3, 1, 0, "1,3,6,8", 2, "1,5", 3, "1,4,5,8,10,12"],
    classOOP: [1, 2, 0, 2, "0,2,5,6,8", 2, 2, 0, 3, 1, 3, 3, 0, 4],
    fileExc: [2, "1,2,5,7", 5, 1, 2, 3, 2, 0, 1, 2]
};

const buttons = document.querySelectorAll("button.answer");

const get1 = (butt) => {
    let buttClass = butt.classList[0]; // Хранит первый класс нажатой кнопки
    let saves = 0; // Хранит число правильных отвеченных заданий
    let doc = butt.parentElement;
    let h4 = doc.querySelector(`h4.${buttClass}`); // Хранит объект основной строки в модуле

    if (!h4) {
        h4 = document.createElement("h4");
        h4.classList.add(buttClass);
        doc.appendChild(h4);
        doc.style.paddingBottom = "0.01%";
    }

    let answModules = answers[buttClass]; // Хранит список ответов на задания
    let forms = doc.querySelectorAll(`form`); // Хранит все формы модуля
    for (let i = 0; i < forms.length; i++) {
        let form = forms[i];
        let answer = answModules[i];
        let labels = form.children;
        let inputs = [];
        for (let el of labels) {
            inputs.push(el.firstElementChild);
        }
        if (inputs[0].type === "radio") {
            for (let i2 = 0; i2 < labels.length; i2++) {
                let label = labels[i2];
                let input = label.firstElementChild;
                let save = input.checked;
                if (save) {
                    if (answer === i2) {
                        saves++;
                        break;
                    }
                }
            }
        } else {
                let cont = [];
                for (let i3 = 0; i3 < inputs.length; i3++) {
                    let input = inputs[i3];
                    let save = input.checked;
                    if (save) {
                        cont.push(i3);
                    }
                }
                cont = cont.join(",");
                if (cont === answer) {
                    saves++;
                }
            }
    }
    if (saves === answModules.length || h4.innerHTML === "Все задания верны!") {
        h4.innerHTML = "Все задания верны!";
    } else{
        h4.innerHTML = `Отвечено на ${saves}/${answModules.length} правильно. Осталось ${answModules.length - saves}.`;
    }
}

buttons.forEach(function(button) {
    let div = button.parentElement;
    let classDiv = div.classList;
    if (classDiv.length === 0) {
        classDiv.add(button.classList[0]);
    }
    button.addEventListener("click", function() {get1(button);});
});

let divs = document.querySelectorAll(".main > ol > div");

divs.forEach(function(div){
    // Подставляет якорьные ссылки в навигационную панель
    div.setAttribute("id", div.classList[0]);
    let nameId = div.id;
    let navigation = document.querySelector(".moduls > ol");
    let li = document.createElement("li");
    let link = document.createElement("a");

    let textMainH2 = document.querySelector(`div#${nameId} > li > h2`).textContent;
    link.setAttribute("href", `#${nameId}`);
    link.textContent = textMainH2;

    li.appendChild(link);
    navigation.appendChild(li);
});

let forms = document.querySelectorAll(`.main > ol > div > form`);
forms.forEach(function(form, index){
    let radios = form.querySelectorAll("input[type='radio']");
    radios.forEach(radio => {
        radio.name = "q" + index;
    });
});