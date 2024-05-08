'use client';

export const Title = ({ title }: { title: string }) => {
  return (
    <div data-testid="content-title-id" className="text-lg non-italic font-semibold leading-6 text-[#121316]">
      {title}
    </div>
  );
};
