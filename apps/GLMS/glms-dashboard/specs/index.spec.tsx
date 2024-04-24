import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../GLMS/glms-dashboard/src/theme';
import Course from '../src/app/dashboardOtherLab/_components/Course';

describe('Course />', () => {
  it('passes smoke test', () => {
    render(
      <ThemeProvider theme={theme}>
        <Course image="/js.png" title="html" information="lessons" lessonCount={3} />
      </ThemeProvider>
    );
  });
});
