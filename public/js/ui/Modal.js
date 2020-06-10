/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (this.element == ''){
      throw new Error('Ошибка');
    }
    this.registerEvents();
}
  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const dismissModal = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));
    for (let i = 0; i < dismissModal.length; i ++) {
      dismissModal[i].addEventListener('click', (event) =>{
        event.preventDefault();
        this.onClose(event);
      });
      this.unregisterEvents();     
    }
  
}
  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
   // e.preventDefault();
    this.close();
    //return false;
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const dismissModal = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));
    for (let i = 0; i < dismissModal.length; i ++) {
      dismissModal[i].removeEventListener('click',(event)); 
  }
}
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
  //  return window.getComputedStyle(this.element).getPropertyValue('display: block');
    this.element.style.display = 'block';
    //console.log(this.element.style);
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = '';
  }
}


//const qwe = document.querySelectorAll('[data-dismiss="modal"]');
//console.log(qwe);