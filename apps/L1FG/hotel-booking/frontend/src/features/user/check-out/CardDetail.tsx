import { Input } from '@/components/ui/input';
import { CountryDropdown } from './CountryDropdown';
import { whosCheckingIn } from '@/features/user/check-out/GuestInfoSection';

type WhosCheckingInProps = {
  whosCheckingInData: whosCheckingIn;
};

export const CardDetail = ({whosCheckingInData} : WhosCheckingInProps) => {

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Name on card
          </label>
          <Input id="firstName" className="w-full" value={whosCheckingInData.formData.nameOnCard} onChange={(e) => whosCheckingInData.setFormData({nameOnCard : e.target.value })} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Number on card
          </label>
          <Input id="firstName" className="w-full" value={whosCheckingInData.formData.numberOnCard} onChange={(e) => whosCheckingInData.setFormData({numberOnCard: e.target.value })} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="middleName" className="text-sm font-medium">
              Expiration date
            </label>
            <Input id="middleName" placeholder="MM/YY" className="w-full"  />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Security code
            </label>
            <Input id="lastName" placeholder="CVV" className="w-full" value={whosCheckingInData.formData.securityCode} onChange={(e) => whosCheckingInData.setFormData({ securityCode: parseInt(e.target.value)})} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Country
          </label>
          <CountryDropdown placeholder="Hong Kong" defaultValue='Mongolia' onChange={(selectedCountry) => whosCheckingInData.setFormData({country : selectedCountry.name})} />
        </div>
      </div>
    </div>
  );
};
