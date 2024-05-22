'use client';

export const JobRecruitTabs = () => {
  return (
    <div className="flex px-6">
      <div role="tablist" className="tabs tabs-bordered">
        <input
          data-testid="adtab"
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-[#3F4145] focus:text-[#121316] focus:font-semibold tracking-tight text-sm h-12 whitespace-nowrap"
          aria-label="Зар"
          checked
        />
        <input
          data-testid="offertab"
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-[#3F4145] focus:text-[#121316] focus:font-semibold tracking-tight text-sm h-12 whitespace-nowrap"
          aria-label="Ирсэн өргөдөл"
        />
      </div>
    </div>
  );
};
