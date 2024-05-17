'use client';

export const InputLabel = ({ title }: { title: string }) => {
  return (
    <div data-testid="input-label-test-id" data-cy="input-label-cy-id" className="text-lg non-italic font-semibold leading-6 text-[#121316]">
      {title}
    </div>
  );
};
