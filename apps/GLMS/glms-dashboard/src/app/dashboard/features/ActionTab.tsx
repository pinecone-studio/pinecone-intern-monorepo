import { useMemo } from 'react';
import {
  useGetApprovedChallengesQuery,
  useGetArchiveChallengesQuery,
  useGetDraftChallengesQuery,
  usePublishChallengeByIdMutation,
  useArchiveChallengeByIdMutation,
  useDeleteChallengeByIdMutation,
  Course,
  useGetCoursesQuery,
} from '@/generated';
import { toast } from 'react-toastify';
import { Tabs } from './Tabs';
import { ChallengeType } from '../page';
import { Courses } from '../_components';
import { EmptyIcon } from '../../../../public/assets/EmptyIcon';
import Loading from '../../../components/Loading';
import { useRouter } from 'next/navigation';

const ActionTab = ({ actionTab }: { actionTab: string }) => {
  const { data: getApprovedChallengesData, refetch: getApprovedChallengesRefetch } = useGetApprovedChallengesQuery();
  const { data: getArchiveChallengesData, refetch: getArchiveChallengesRefetch } = useGetArchiveChallengesQuery();
  const { data: getDraftChallengesData, refetch: getDraftChallengesRefetch } = useGetDraftChallengesQuery();
  const [publishChallengeById] = usePublishChallengeByIdMutation();
  const [archiveChallengeById] = useArchiveChallengeByIdMutation();
  const [deleteChallengeById] = useDeleteChallengeByIdMutation();
  const { data, loading } = useGetCoursesQuery();

  const router = useRouter();

  const publishChallenge = async (challengeId: string) => {
    await publishChallengeById({
      variables: {
        challengeId,
      },
    });
    toast.success('амжилттай ', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
    });
    await getDraftChallengesRefetch();
    await getApprovedChallengesRefetch();
  };

  const archiveChallenge = async (challengeId: string) => {
    await archiveChallengeById({
      variables: {
        challengeId,
      },
    });
    toast.success('амжилттай ', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
    });
    await getArchiveChallengesRefetch();
    await getApprovedChallengesRefetch();
  };

  const deleteChallenge = async (challengeId: string) => {
    await deleteChallengeById({
      variables: {
        challengeId,
      },
    });
    toast.success('амжилттай ', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
    });
    await getDraftChallengesRefetch();
    await getArchiveChallengesRefetch();
  };

  const filteredCourses = useMemo(() => {
    return data?.getCourses.filter((course: Course) => actionTab === course.status);
  }, [data, actionTab]);

  if (loading) return <Loading />;

  const handleCourseClick = (id: string | null | undefined) => {
    localStorage.setItem('courseID', `${id}`);
    router.push(`/${id}`);
  };

  const handleActionTab = () => {
    switch (actionTab) {
      case 'Сорил':
        return <Tabs lessonData={getApprovedChallengesData?.getApprovedChallenges as ChallengeType[]} onClick={archiveChallenge} actionType="Архив" />;
      case 'Сорилийн ноорог':
        return <Tabs lessonData={getDraftChallengesData?.getDraftChallenges as ChallengeType[]} onClick={publishChallenge} actionType="Сорил" />;
      case 'Сорилийн архив':
        return <Tabs lessonData={getArchiveChallengesData?.getArchiveChallenges as ChallengeType[]} onClick={deleteChallenge} actionType="Устгах" />;
      default:
        return (
          <div className="mr-auto ml-auto flex w-[85%] max-w-[1440px] m-auto">
            <div className="flex flex-wrap box-border h-full w-full">
              {filteredCourses?.map((course, index) => (
                <div className="relative" key={index}>
                  <div data-cy="courseClick" className="mt-8 mr-8" onClick={() => handleCourseClick(course.id)}>
                    <Courses id={course.id} thumbnail={course.thumbnail} title={course.title} description={course.description} />
                  </div>
                </div>
              ))}
              {filteredCourses?.length === 0 && (
                <div className="m-auto mt-[5%]">
                  <EmptyIcon />
                </div>
              )}
            </div>
          </div>
        );
    }
  };
  return <div>{handleActionTab()}</div>;
};

export default ActionTab;
