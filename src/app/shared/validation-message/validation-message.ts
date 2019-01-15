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

    'period': [
        { type: 'required', message: 'Period is required' }
    ],

    'date': [
        { type: 'required', message: 'Date is required' }
    ],

    'name': [
        { type: 'required', message: 'Name is required' }
    ],

    'item': [
        { type: 'required', message: 'Item is required' }
    ],

    'ammount': [
        { type: 'required', message: 'Ammount is required' },
        { type: 'pattern', message: 'Numbers only' }
    ],

    
    'project' : [
        {type: 'required', message: 'Project is required'}
    ],

    'exchangeRate' : [
        {type: 'required', message: 'Exchange rate is required'}
    ],

    'payRate' : [
        {type: 'required', message: 'Pay rate rate is required'}
    ],

    'nameProject': [
        { type: 'required', message: 'Name project is required' }
        
    ],
    
    'incomeUSD': [
        { type: 'required', message: 'Revenue in US dollars is required' },
        { type: 'pattern', message: 'Numbers only' }
    ],
    'bankFees': [
        { type: 'required', message: 'Bank fees is required' },
        { type: 'pattern', message: 'Numbers only' }
    ],
    'paymentUpwork': [
        { type: 'required', message: 'Payment Upwork is required' },
        { type: 'pattern', message: 'Numbers only' }  
    ],
    'paymentUpworkSelect' : [
        { type: 'required', message: 'Payment Sel Upwork is required' }  
    ],
    'cashing': [
        { type: 'required', message: 'Cashing Upwork is required' },
        { type: 'pattern', message: 'Numbers only' } 
    ],
    'cashingSelect': [
        { type: 'required', message: 'Cashing Sel Upwork is required' }  
    ],
    'taxes': [
        { type: 'required', message: 'Taxes is required' },
        { type: 'pattern', message: 'Numbers only' }  
    ],
    'taxesSelect': [
        { type: 'required', message: 'Taxes Sel is required' }  
    ],





}