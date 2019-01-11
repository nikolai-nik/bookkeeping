export const validation_messages = {
    'userEmail': [
        { type: 'required', message: 'Username is required.' },
				 { type: 'pattern', message: 'Email Is incorect: example@org.com' },
    ],
    'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be 4 or more symbols.' },
				{ type: 'maxlength', message: 'Password must be 12 or more symbols.' },
    ],
    

}