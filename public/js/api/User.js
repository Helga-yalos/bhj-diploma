/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
 
  static URL = '/user';
    //this.url = new URL('/user', 'http://localhost:8000/');
  
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log(user);
    localStorage['user'] = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f){
    
    return createRequest({
      url: this.URL + '/current',
      data,
      responseType: 'json',
      method: 'GET',
      callback: (error, response) => {
        if (response.success) {
          this.setCurrent(response.user);
          callback(error,response);
          } else {
          this.unsetCurrent();
          console.log(error);
          }
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    
    return createRequest({
      url: this.URL + '/login',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (error, response) => {
        console.log(response);
        if (response.success){
       this.setCurrent(response.user);
       callback(error, response);
      } else {
        User.unsetCurrent();
        throw err;
      }
      }
    }); 
  }
  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) { 
      return createRequest({
        data,
        url: this.URL + '/register',
        //url:`${this.URL}/register`,
        responseType: 'json',
        method: 'POST',
        callback: (error, response) => {
          console.log(response);
          if (error) {
            console.log(error);
          } else {
          // if (response.success){
                  this.setCurrent(response.user);
                  //callback(error, response);
            }  
              callback(error, response);
              console.log(response);
          
          }
           
    })
  }
  

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f) {
   
    return createRequest({
      url: this.URL + '/logout',
      data,
      responseType: 'json',
      method: 'POST',
      callback: (error,response) => {
        if (response.success){
          this.unsetCurrent();
        } 
      }
    })
   
  }
}
