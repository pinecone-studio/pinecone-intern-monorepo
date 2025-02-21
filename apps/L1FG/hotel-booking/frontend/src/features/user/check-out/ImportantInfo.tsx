
export const ImportantInfo = () =>{
    return (
        <div className="flex flex-col gap-4">
              <h1>Important information</h1>
              <ul className="list-disc pl-5">
                <li className="text-sm font-normal leading-5 text-foreground">
                  Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival. To make arrangements for check-in please contact the property
                  ahead of time using the information on the booking confirmation. If you are planning to arrive after 3:30 PM please contact the property in advance using the information on the
                  booking confirmation.
                </li>
              </ul>
              <p className="text-sm font-normal leading-5 text-foreground">
                By clicking on the button below, I confirm I have read the{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Privacy Statement
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Government Travel Advice
                </a>
                , and have read and accept the{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Rules & Restrictions
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>
                .
              </p>
            </div>
    )
}