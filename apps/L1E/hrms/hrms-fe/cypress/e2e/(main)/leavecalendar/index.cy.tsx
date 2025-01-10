import { interceptGraphql } from "cypress/utils/intercept-graphql";

describe('leavecalendarpage',()=>{
  
    it (`should render leavecalendarpage`,()=>{
      interceptGraphql({
        state: 'success',
        operationName: 'GetAllRequests',
        data: {
          data:{
            getAllRequests: [
              {
                _id: '677249a6197305d06f1db185',
                employeeId: '676e6e4007d5ae05a35cda9e',
                leadEmployeeId: '676e6dec07d5ae05a35cda8a',
                requestStatus: '',
                requestType: 'PENDING',
                reason: 'remote test',
                reasonRefuse: '',
                selectedDay: new Date(),
                startTime: '00:00',
                endTime: '24:00',
                updatedAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
              },
              {
                _id: '6772551fa009a9bf378d99eb',
                employeeId: '676e6e4007d5ae05a35cda9e',
                leadEmployeeId: '676e6de507d5ae05a35cda88',
                requestStatus: 'FREE',
                requestType: 'PENDING',
                reason: 'dfgadgsdfg',
                reasonRefuse: '',
                selectedDay: new Date(),
                startTime: '09:00',
                endTime: '10:00',
                updatedAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
              },
            ]
          }
        },
      });
      cy.visit(`/leave-calendar`)
      cy.get('[data-cy=leave-calendar-page]').should('be.visible')
      cy.get('[data-cy=request-button]').click()
      cy.get('[data-cy=request-form-page]').should('be.visible')
    })
    it (`should render leavecalendarpage`,()=>{
      interceptGraphql({
        state: 'success',
        operationName: 'GetAllRequests',
        data: {
          data: {
            getAllRequests: [
              {
                _id: '677249a6197305d06f1db185',
                employeeId: '676e6e4007d5ae05a35cda9e',
                leadEmployeeId: '676e6dec07d5ae05a35cda8a',
                requestStatus: '',
                requestType: 'PENDING',
                reason: 'remote test',
                reasonRefuse: '',
                selectedDay: new Date(),
                startTime: '00:00',
                endTime: '24:00',
                updatedAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
              },
              {
                _id: '6772551fa009a9bf378d99eb',
                employeeId: '676e6e4007d5ae05a35cda9e',
                leadEmployeeId: '676e6de507d5ae05a35cda88',
                requestStatus: 'FREE',
                requestType: 'PENDING',
                reason: 'dfgadgsdfg',
                reasonRefuse: '',
                selectedDay: new Date(),
                startTime: '09:00',
                endTime: '10:00',
                updatedAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
                createdAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
              },
            ]
          },
        },
      });
      cy.visit(`/leave-calendar`)
      cy.get('[data-cy=leave-calendar-page]').should('be.visible')
      cy.get('[data-cy=data-0]').should('be.visible')
      cy.get('[data-cy=matched-data-0]').should('be.visible')
    })
})
