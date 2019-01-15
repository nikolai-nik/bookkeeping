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

    'period' : [
        {type: 'required', message: 'Period is required'}
    ],

    'date': [
        {type: 'required', message: 'Date is required'}
    ],

    'name' : [
        {type: 'required', message: 'Name is required'}
    ],

    'item': [
        {type: 'required', message: 'Item is required'}
    ],

    'ammount' : [
        {type: 'required', message: 'Ammount is required'},
        {type: 'pattern', message: 'Numbers only'}
    ],
    
    'project' : [
        {type: 'required', message: 'Project is required'}
    ],

    'exrate' : [
        {type: 'required', message: 'Exchange rate is required'}
    ],

    'prate' : [
        {type: 'required', message: 'Pay rate rate is required'}
    ],




}