/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
	constructor(element) {
		super(element);

	}
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
  	console.log(options);
  	const userRegister = User.register(options, (err,response) => {});
  		console.log(userRegister.response);//null Получается, что результата работы User.register нет.
  		if (userRegister.response[success]) {
  			//сбрасывает форму - не понимаю, что использовать
  			App.setState('user-logged');
  			const element = App.getModal('register');
      		element.close();
      		console.log(response);
  	};
  		
  	}
  }

