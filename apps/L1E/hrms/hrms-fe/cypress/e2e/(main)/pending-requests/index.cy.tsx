import { interceptGraphql } from 'cypress/utils/intercept-graphql';
/* eslint-disable max-lines */
describe('pending page', () => {
  it('Should render requestform page', () => {
    interceptGraphql({
      state: 'success',
      operationName: 'GetAllRequests',
      data: {
        data: {
          getAllRequests: [
            {
              _id: '677639b431fdcddd826fc17c',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'jvk23@gmail.com',
                jobTitle: 'senior',
                username: 'jvk23',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Lead',
                updatedAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'FREE',
              requestType: 'PENDING',
              selectedDay: 'Sat Jan 25 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'asdgadsfg',
              reasonRefuse: '',
              startTime: '08:00',
              endTime: '09:00',
              updatedAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
            {
              _id: '67778f5e9e8555792ea10b88',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'Amgalan@gmail.com',
                jobTitle: 'senior',
                username: 'Amgalan',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Fri Jan 10 2025 19:20:54 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:59 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'PAID_LEAVE',
              requestType: 'PENDING',
              selectedDay: 'Thu Jan 23 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'sadfgdasgs',
              reasonRefuse: '',
              startTime: '00:00',
              endTime: '24:00',
              updatedAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
          ],
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'Mutation',
      data: {
        data: {
          updateRequest: null,
        },
      },
    });
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonApprove]').click();
    cy.get('[data-cy=approve-modal]').click();
  });
  it('Should render requestform page', () => {
    interceptGraphql({
      state: 'success',
      operationName: 'GetAllRequests',
      data: {
        data: {
          getAllRequests: [
            {
              _id: '677639b431fdcddd826fc17c',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'jvk23@gmail.com',
                jobTitle: 'senior',
                username: 'jvk23',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Lead',
                updatedAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'FREE',
              requestType: 'PENDING',
              selectedDay: 'Sat Jan 25 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'asdgadsfg',
              reasonRefuse: '',
              startTime: '08:00',
              endTime: '09:00',
              updatedAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
            {
              _id: '67778f5e9e8555792ea10b88',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'Amgalan@gmail.com',
                jobTitle: 'senior',
                username: 'Amgalan',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Fri Jan 10 2025 19:20:54 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:59 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'PAID_LEAVE',
              requestType: 'PENDING',
              selectedDay: 'Thu Jan 23 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'sadfgdasgs',
              reasonRefuse: '',
              startTime: '00:00',
              endTime: '24:00',
              updatedAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
          ],
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'Mutation',
      data: {
        data: {
          updateRequest: null,
        },
      },
    });
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonApprove]').click();
    cy.get('[data-cy=reject-modal]').click();
  });
  it('Should render requestform page', () => {
    interceptGraphql({
      state: 'success',
      operationName: 'GetAllRequests',
      data: {
        data: {
          getAllRequests: [
            {
              _id: '677639b431fdcddd826fc17c',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'jvk23@gmail.com',
                jobTitle: 'senior',
                username: 'jvk23',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Lead',
                updatedAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'FREE',
              requestType: 'PENDING',
              selectedDay: 'Sat Jan 25 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'asdgadsfg',
              reasonRefuse: '',
              startTime: '08:00',
              endTime: '09:00',
              updatedAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
            {
              _id: '67778f5e9e8555792ea10b88',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'Amgalan@gmail.com',
                jobTitle: 'senior',
                username: 'Amgalan',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Fri Jan 10 2025 19:20:54 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:59 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'PAID_LEAVE',
              requestType: 'PENDING',
              selectedDay: 'Thu Jan 23 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'sadfgdasgs',
              reasonRefuse: '',
              startTime: '00:00',
              endTime: '24:00',
              updatedAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
          ],
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'Mutation',
      data: {
        data: {
          updateRequest: null,
        },
      },
    });
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonReject]').click();
    cy.get('[data-cy=areaButton]').type('test');
    cy.get('[data-cy=refuse-modal-button]').click();
  });
  it('Should render requestform page', () => {
    interceptGraphql({
      state: 'success',
      operationName: 'GetAllRequests',
      data: {
        data: {
          getAllRequests: [
            {
              _id: '677639b431fdcddd826fc17c',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'jvk23@gmail.com',
                jobTitle: 'senior',
                username: 'jvk23',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Lead',
                updatedAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:37 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'FREE',
              requestType: 'PENDING',
              selectedDay: 'Sat Jan 25 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'asdgadsfg',
              reasonRefuse: '',
              startTime: '08:00',
              endTime: '09:00',
              updatedAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Thu Jan 02 2025 15:01:08 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
            {
              _id: '67778f5e9e8555792ea10b88',
              employeeId: {
                _id: '676e6e4007d5ae05a35cda9e',
                email: 'dash.altanshagai48@gmail.com',
                jobTitle: 'junior',
                username: 'shagai',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Mon Jan 13 2025 11:45:43 GMT+0000 (Coordinated Universal Time)',
                createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              leadEmployeeId: {
                _id: '676e6dd407d5ae05a35cda84',
                email: 'Amgalan@gmail.com',
                jobTitle: 'senior',
                username: 'Amgalan',
                adminStatus: false,
                remoteLimit: 5,
                paidLeaveLimit: 5,
                freeLimit: 5,
                employeeStatus: 'Employee',
                updatedAt: 'Fri Jan 10 2025 19:20:54 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Fri Dec 27 2024 17:05:59 GMT+0800 (Ulaanbaatar Standard Time)',
                __typename: 'Employee',
              },
              requestStatus: 'PAID_LEAVE',
              requestType: 'PENDING',
              selectedDay: 'Thu Jan 23 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
              reason: 'sadfgdasgs',
              reasonRefuse: '',
              startTime: '00:00',
              endTime: '24:00',
              updatedAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              createdAt: 'Fri Jan 03 2025 15:18:54 GMT+0800 (Ulaanbaatar Standard Time)',
              __typename: 'Request',
            },
          ],
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'Mutation',
      data: {
        data: {
          updateRequest: null,
        },
      },
    });
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonReject]').click();
    cy.get('[data-cy=refuse-modal-button-back]').click();
  });
});
/* eslint-enable max-lines */
