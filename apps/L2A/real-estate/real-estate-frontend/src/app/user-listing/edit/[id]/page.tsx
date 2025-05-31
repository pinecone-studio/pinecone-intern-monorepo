'use client';

import PreviewSection from '../_components/PreviewSection';
import BuildingInfoSection from '../_components/BuildingInfoSection';
import GeneralInfoSection from '../_components/GeneralInfoSection';
import ImagesSection from '../_components/ImagesSection';
import LocationSection from '../_components/LocationSection';

const Page = () => {
  return (
    <div className="bg-[#F9F9F9] py-10 px-5 sm:px-8 md:px-10" data-cy="edit-page">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full max-w-[728px] space-y-6">
          <div data-cy="general-info-section">
            <GeneralInfoSection />
          </div>
          <div data-cy="images-section">
            <ImagesSection />
          </div>
          <div data-cy="location-section">
            <LocationSection />
          </div>
          <div data-cy="building-info-section">
            <BuildingInfoSection />
          </div>
        </div>
        <PreviewSection /> 
      </div>
    </div>
  );
};

export default Page;
