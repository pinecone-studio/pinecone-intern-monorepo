import React from 'react';
import { render } from '@testing-library/react';
import { EmploymentInfo } from '../../src/app/employee-details/_components';

describe('employmentInfo', () => {
  const props = {
    position: 'Дизайнер',
    department: 'Хөгжүүлэлтийн хэлтэс',
    dateofEmployment: '2023-03-09',
    timeWorked: '1',
    state: 'Үндсэн ажилтан',
  };
  it('should render employmentInfo components', () => {
    const { container } = render(
      <EmploymentInfo position={props.position} department={props.department} dateofEmployment={props.dateofEmployment} timeWorked={props.timeWorked} state={props.state} />
    );
    expect(container).toBeDefined();
  });
});
