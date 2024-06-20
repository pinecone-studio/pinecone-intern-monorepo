type TStepperProps = {
    currentStep: number;
    numberOfSteps: number;

}

export const Stepper = ({ currentStep, numberOfSteps }:TStepperProps) => {
    let number = 1;
  
    return (
      <div className="w-[530px] flex flex-col items-center">
        <div className="flex items-center mt-2">
          {Array.from({ length: numberOfSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                  index <= currentStep ? "bg-black text-white" : "bg-gray-300"
                }`}
              >
                {number++}
              </div>
              {index < numberOfSteps - 1 && (
                <div
                  className={`w-[180px] h-1 rounded-full ${
                    index <= currentStep - 1 ? "bg-black text-white" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full px-6 *:w-20 *:text-center">
          <p>Ирц</p>
          <p>Сэдэв</p>
          <p>Хянах</p>
        </div>
      </div>
    );
  }