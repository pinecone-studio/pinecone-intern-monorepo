import Link from 'next/link';

export const ProfileOrStory = ({ hasStory, urlWhenHasStory, urlWhenNoStory, children }: { hasStory: boolean; urlWhenHasStory: string; urlWhenNoStory: string; children: React.ReactNode }) => {
  if (hasStory) {
    return <Link href={urlWhenHasStory}>{children}</Link>;
  }
  return <Link href={urlWhenNoStory}>{children}</Link>;
};
