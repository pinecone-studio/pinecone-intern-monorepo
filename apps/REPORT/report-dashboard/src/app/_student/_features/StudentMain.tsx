import { StudentButton } from '../_components';

export const StudentMain = () => {
  return (
    <div>
      <div data-cy="Student-Main">hello from Student main with</div>
      <StudentButton text={'Student button'} />
    </div>
  );
};
