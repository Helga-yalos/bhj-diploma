/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor(URL){
    this.URL = '/user';
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', `${user}`);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.getItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (err,response) => {
    if (response.success) {
      User.setCurrent({id: response.user.id, name: `${response.user.name}`});
    } else {
      User.unsetCurrent();
      throw err;
    }
  }) {
    const xhr = createRequest({
      url: this.URL + '/current',
     // data,
      responseType: 'json',
      method: 'GET',
    });
    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    /* if (response.success){
       User.setCurrent({id: response.user.id, name: `${response.user.name}`});
      } else {
        User.unsetCurrent();
        throw err;
      }
    } ) {*/
    const xhr = createRequest({
      url: this.URL + '/login',
      //data,
      responseType: 'json',
      method: 'POST',
      callback(err, response) {
        if (response.success){
       User.setCurrent({id: response.user.id, name: `${response.user.name}`});
      } else {
        User.unsetCurrent();
        throw err;
      }
      }
    });
    callback(err,response);
    console.log(xhr);
    return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {  
    let xhr = createRequest({
        url: '/user/register',
        responseType: 'json',
        method: 'POST',
        callback(err,response) {
           if (xhr.response.success){
      console.log(xhr.response.success);
      User.setCurrent({id: response.user.id, name: `${data.user.name}`});
    } /*else {
      throw err;//response.error.email || response.error.password
   }*/
        }
    })
   
    return xhr;

  }
  

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => (err, response) => {
    if (response.success){
      User.unsetCurrent();
    } 
  }) {
    const xhr = createRequest({
      url: this.URL + '/logout',
      //data,
      responseType: 'json',
      method: 'POST'
    })
    return xhr;
  }
}
