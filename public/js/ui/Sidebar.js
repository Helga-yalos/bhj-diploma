/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sideBarBurger = document.querySelector('.sidebar-toggle');
    const sideBarBody = document.querySelector('.sidebar-mini');
    //console.log(sideBarBurger, sideBarBody);
    sideBarBurger.addEventListener('click', () =>{
      sideBarBody.classList.toggle('sidebar-open');
      sideBarBody.classList.toggle('sidebar-collapse');
    })

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerBtn = document.querySelector('.menu-item_register');
    let element;
    registerBtn.addEventListener('click', () => {
      event.preventDefault();
      element = App.getModal('register');
      element.open();
    })
    const loginBtn = document.querySelector('.menu-item_login');
    loginBtn.addEventListener('click', () => {
      event.preventDefault();
      element = App.getModal('login');
      element.open();
    })
    const exitBtn = document.querySelector('menu-item_logout');
    if (exitBtn != null) {
      exitBtn.addEventListener('click', () => {
        event.preventDefault();
        User.logout(User.current(), response = () => {
          if (response.success) {
            App.setState('init');
          }
        });
      })
    }
  }
    
      
  

  

}
