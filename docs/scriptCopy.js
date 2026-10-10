const answers = {
    // Здесь находятся ответы и данные от ответа. Вот так: ключ - это первый класс button; значение - [ответы по порядку(1 задание, 2 задание ...)]
    print: [2, 0, "0,3,5", 1],
    oper: ["2,3,6,7,8,10", 5, "1,4,5", 5, "1,3,4,6,8,9,11", 5]
};

const buttons = document.querySelectorAll("button.answer");

const get1 = (butt) => {
    let button = butt.classList[0]; // Хранит первый класс нажатой кнопки
    let saves = 0; // Хранит число правильных отвеченных заданий
    let h4 = document.querySelector(`h4.${button}`); // Хранит объект основной строки в отделе
    let print = answers[button]; // Хранит список ответов на задания
    let doc = document.querySelectorAll(`div.${button} form`); // Хранит весь отдел
    for (let i = 0; i < doc.length; i++) {
        let form = doc[i];
        let answer = print[i];
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
    if (saves === print.length || h4.innerHTML === "Все задания верны!") {
        h4.innerHTML = "Все задания верны!";
    } else {
        h4.innerHTML = `Отвечено на ${saves}/${print.length} правильно. Осталось ${print.length - saves}.`;
    }
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {get1(button);});
});

let divs = document.querySelectorAll(".main > ol > div");
divs.forEach(function(div){
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