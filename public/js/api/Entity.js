/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor(URL){
  this.URL = '';
}
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = (err, response) => { }) {
      const xhr = createRequest({
      url: this.URL,
      data, 
      responseType: 'json', 
      method: 'GET', 
      callback: (err, response) 
  });
      return xhr;
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let modifiedData = Object.assign({ _method: 'PUT' }, data );
    const xhr = createRequest({
      url: this.URL,
      modifiedData,
      responseType: 'json',
      method: 'POST',
    });
    return xhr;
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    const xhr = createRequest({
      url: this.URL,
      data,
      responseType: 'json',
      method: 'GET',
    });
    return xhr;
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
    // ... добавляем id и _method к data
    console.log( data ); // { mail: 'ivan@biz.pro', _method: 'DELETE', id: 21 }
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({_method: 'DELETE', id: `${id}`});
    const xhr = createRequest({
      url: this.URL,
      modifiedData,
      responseType: 'json',
      method: 'POST',
    })
    return xhr;
  }
}
/*let entity = new Entity();
console.log( entity.URL ); */