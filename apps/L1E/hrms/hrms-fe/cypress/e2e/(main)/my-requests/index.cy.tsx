import { interceptGraphql } from 'cypress/utils/intercept-graphql';

describe('My Requests Page', () => {
  it('should render the RequestStory component with correct dates', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    interceptGraphql({
      state: 'success',
      operationName: 'GetEmployeeById',
      data: {
        data: {
          getEmployeeById: {
            _id: '677b83734fba809002930cc5',
            email: 'dash.altanshagai48@gmail.com',
            jobTitle: 'software',
            username: 'shagai12345',
            adminStatus: true,
            remoteLimit: 5,
            paidLeaveLimit: 5,
            freeLimit: 5,
            employeeStatus: 'Employee',
            updatedAt: 'Tue Jan 14 2025 15:29:44 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: '2010',
            __typename: 'Employee',
          },
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'GetRequestsByEmployee',
      data: {
        data: {
          getRequestsByEmployee: [
            {
              _id: '67863616321d42cd8275fba0',
              employeeId: {
                _id: '677b83734fba809002930cc5',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'software',
                username: 'shagai12345',
                adminStatus: true,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Tue Jan 14 2025 15:29:44 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: '2010',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'jvk@gmail.com',
                jobTitle: 'senior',
                username: 'jvk',
                adminStatus: true,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Lead',
                updatedAt: 'Wed Jan 15 2025 16:27:16 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'PAID_LEAVE',
              requestType: 'PENDING',
              selectedDay: 'Wed Jan 15 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'token oruulj iew',
              reasonRefuse: '',
              startTime: '09:00',
              endTime: '17:00',
              updatedAt: 'Tue Jan 14 2025 18:01:58 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Tue Jan 14 2025 18:01:58 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
          ],
        },
      },
    });
    cy.visit('my-requests');
    cy.get('[data-cy=my-requests-page]').should('be.visible');
    cy.get('[data-cy=request-story]').should('be.visible');
    cy.contains('Зайнаас ажиллах').should('be.visible');
    cy.contains('Чөлөө').should('be.visible');
    const todayDay = new Date().getDate();
    cy.get('[data-cy=date-picker]').click();
    cy.get('[data-cy=calendar-content]').contains(todayDay).click();
  });
  it('should redirect to login page if token is missing', () => {
    cy.window().then((window) => {
      window.localStorage.removeItem('token');
    });

    cy.visit('/my-requests');
    cy.url().should('include', '/login');
  });
  it('should find and click the button with selected=true, value=12, and name="day"', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });

    cy.visit('/my-requests');
    cy.get('[data-cy=date-picker]').click();
    cy.get('button[aria-selected="true"]:first').should('be.visible').click();
    cy.get('body').type('{esc}');
  });
});
