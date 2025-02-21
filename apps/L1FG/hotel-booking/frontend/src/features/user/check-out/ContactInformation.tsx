import { Input } from '@/components/ui/input';
import { whosCheckingIn } from '@/features/user/check-out/GuestInfoSection';

type WhosCheckingInProps = {
  whosCheckingInData: whosCheckingIn;
};

export const ContactInformation = ({whosCheckingInData} : WhosCheckingInProps) => {


  const countryCodes = [
    { code: '+976', country: 'Mongolia' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+7', country: 'Russia' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
  ];

  const renderSelectOption = (code: string, country: string, isPlaceholder = false) => {
    if (isPlaceholder) {
      return code;
    }
    return `${code} ${country}`;
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <Input id="email" type="email" className="w-full" value={whosCheckingInData.formData.email} onChange={(e) => whosCheckingInData.setFormData({email: e.target.value })} />
          <p className="text-sm text-gray-600">Your confirmation email goes here</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone number
          </label>
          <div className="flex gap-2">
            <select value={whosCheckingInData.formData.phoneCountry} onChange={(e) => whosCheckingInData.setFormData({phoneCountry: e.target.value })} className="border rounded-md max-w-[88px] px-2 py-2 bg-white">
              {countryCodes.map(({ code, country }) => (
                <option key={code} value={code}>
                  {whosCheckingInData.formData.phoneCountry === code ? renderSelectOption(code, '', true) : renderSelectOption(code, country)}
                </option>
              ))}
            </select>
            <Input
              id="phoneNumber"
              type="tel"
              className="w-full"
              value={whosCheckingInData.formData.phoneNumber}
              onChange={(e) => whosCheckingInData.setFormData({ phoneNumber: e.target.value })}
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
