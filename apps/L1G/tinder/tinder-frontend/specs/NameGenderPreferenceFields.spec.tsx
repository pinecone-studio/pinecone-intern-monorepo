import '@testing-library/jest-dom';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from '@/components/schema/ProfileFormSchema';
import { NameGenderPreferenceFields } from '@/components/NameGenderPreferenceFields';
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderWithForm = () => {
  const Wrapper = () => {
    const methods = useForm({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
        name: "",
        genderPreference: "",
      },
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <NameGenderPreferenceFields control={methods.control} />
        </form>
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe("NameGenderPreferenceFields", () => {
  it("renders name input and gender select", () => {
    renderWithForm();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Gender Preference/i })).toBeInTheDocument();
  });

  it("allows typing into the name input", async () => {
    renderWithForm();
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    await user.type(nameInput, "Alice");
    expect(nameInput.value).toBe("Alice");
  });
  // it("allows selecting a gender preference", async () => {
  // renderWithForm();
  // const user = userEvent.setup();

  // // open the select
  // const select = screen.getByRole("combobox", { name: /Gender Preference/i });
  // await user.click(select);

  // // make sure options are visible
  // const options = screen.getAllByRole("option");
  // expect(options).toHaveLength(3);

  // // select Female
  // const femaleOption = screen.getByTestId("option-female");
  // await user.click(femaleOption);

  // // check value is updated
  // expect(screen.getByRole("combobox", { name: /Gender Preference/i })).toHaveTextContent("Female");
// });

});
