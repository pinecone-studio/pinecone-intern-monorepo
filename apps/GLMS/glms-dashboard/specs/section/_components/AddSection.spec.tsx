import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {CreateSectionDocument} from "../../../src/generated"
import { act, fireEvent, render } from '@testing-library/react';
import AddSection from "../../../src/app/section/_components/AddSection"
import React from 'react';


const createSectionMock : MockedResponse = {
    request: {
        query:CreateSectionDocument,
        variables:{
            title : "html",
            description : "html intro",
        }
    },
    result: {
        data : {
            createSection : {
                id:"1",
                title:"html",
                description:"html intro",
            },
        },
    },
};

describe ('Create section component ', () => {
 it ('Should render AddSectionComponent' , () => {
    const { getByTestId } = render(
        <MockedProvider mocks={[createSectionMock]} addTypename={false}>
          <AddSection />
        </MockedProvider>
      );
    expect(getByTestId('add-section-component')).toBeDefined();

    const titleInput = getByTestId("add-section-title-input").getElementsByTagName('input')[0];
    const descriptionInput = getByTestId("add-section-description-input").getElementsByTagName('input')[0];
    const handleBtn = getByTestId("add-section-handle-btn");

    act(() => {
        fireEvent.change(titleInput , {target : {value : "html"}})
        fireEvent.change(descriptionInput , {target : {value : "html intro"}})
        fireEvent.click(handleBtn)
    })
 })
})