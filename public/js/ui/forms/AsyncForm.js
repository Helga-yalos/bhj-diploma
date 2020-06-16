/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    
    if (this.element == '') {
      throw new Error('Ошибка');
    } 
    this.element = element;
    this.registerEvents();
    
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', () => {
      event.preventDefault();
      this.submit();
    })

  }

  /**
   * Преобразует данные формы в объект вида
   * {entries = formData.entries();

for (let item of entries) {
  const key = item[ 0 ],
    value = item[ 1 ];
  console.log( `${key}: ${value}` );
}
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData(this.element);
    let modifiedData = {};
    let entries = formData.entries();
    for (let [key, value] of entries) {
      modifiedData[key] = value;
    }
    console.log(modifiedData);
    return modifiedData;
  /* const input = Array.from(this.element.querySelectorAll('input'));
    let data = {};
    console.log(data);
    for (let i = 0; i < input.length; i ++) {
        data[`${input[i].name}`] = `${input[i].value} `;
    }
    console.log(data);
    return data;*/

}

  onSubmit(options)  {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
   // this.onSubmit(this.getData());
    this.onSubmit({'data' : this.getData()});
  }
}
