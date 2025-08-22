import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { MyProfileForm } from "@/components/MyProfileForm";
import { UpdateProfileDocument, GetAllInterestsDocument } from "@/generated";
import '@testing-library/jest-dom';


// 🔹 Fake user data
const mockUser = {
  id: "123",
  name: "Test User",
  email: "test@example.com",
  gender: "Male",
  birthDate: "2000-01-01",
  genderPreferences: "Female",
  bio: "Hello world",
  interests: ["1"], // Include one interest to test MultiSelect
  profession: "Engineer",
  schoolWork: "MUST",
};

// 🔹 Backend fake interests query response
const mockInterestsResponse = {
  request: {
    query: GetAllInterestsDocument,
  },
  result: {
    data: {
      getAllInterests: [
        { _id: "1", interestName: "Music" },
        { _id: "2", interestName: "Sports" },
      ],
    },
  },
};

// 🔹 Profile update mutation fake response
const mockUpdateProfileResponse = {
  request: {
    query: UpdateProfileDocument,
    variables: {
      updateProfileId: mockUser.id,
      name: mockUser.name,
      bio: "Updated bio",
      dateOfBirth: "2000-01-01",
      genderPreferences: mockUser.genderPreferences,
      profession: mockUser.profession,
      schoolWork: mockUser.schoolWork,
      images: [],
      interests: ["1", "2"], // Updated interests after selection
    },
  },
  result: {
    data: {
      updateProfile: {
        id: mockUser.id,
      },
    },
  },
};

// 🔹 Error response for mutation failure
const mockErrorResponse = {
  request: {
    query: UpdateProfileDocument,
    variables: {
      updateProfileId: mockUser.id,
      name: mockUser.name,
      bio: mockUser.bio,
      dateOfBirth: "2000-01-01",
      genderPreferences: mockUser.genderPreferences,
      profession: mockUser.profession,
      schoolWork: mockUser.schoolWork,
      images: [],
      interests: ["1"],
    },
  },
  error: new Error("Failed to update profile"),
};

describe("MyProfileForm", () => {
  // Spy on console to verify logs
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

  beforeEach(() => {
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("renders form fields correctly", async () => {
    render(
      <MockedProvider mocks={[mockInterestsResponse]} addTypename={false}>
        <MyProfileForm user={mockUser} />
      </MockedProvider>
    );

    // Wait for interests to load
    await waitFor(() => {
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
    });

    // Check form fields
    expect(screen.getByLabelText("Name")).toHaveValue("Test User");
    expect(screen.getByLabelText("Email")).toHaveValue("test@example.com");
    expect(screen.getByLabelText("Bio")).toHaveValue("Hello world");
    expect(screen.getByLabelText("Profession")).toHaveValue("Engineer");
    expect(screen.getByLabelText("School")).toHaveValue("MUST");
    expect(screen.getByLabelText("Gender Preference")).toHaveTextContent("Female");

    // Check MultiSelect rendering
    const multiSelectTrigger = screen.getByTestId("multi-select-trigger");
    expect(multiSelectTrigger).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument(); // Initial interest from mockUser
  });

  it("submits updated profile with new interest", async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider
        mocks={[mockInterestsResponse, mockUpdateProfileResponse]}
        addTypename={false}
      >
        <MyProfileForm user={mockUser} />
      </MockedProvider>
    );

    // Wait for form to render
    await waitFor(() => {
      expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    });

    // Update bio field
    const bioInput = screen.getByLabelText("Bio");
    await user.type(bioInput, "Updated bio");

    // Update interests by selecting "Sports"
    const multiSelectTrigger = screen.getByTestId("multi-select-trigger");
    await user.click(multiSelectTrigger); // Open popover
    const sportsOption = await screen.findByText("Sports");
    await user.click(sportsOption); // Select "Sports"

    // Submit form
    const button = screen.getByRole("button", { name: /update profile/i });
    await user.click(button);

    // Verify button text changes to "Updating..."
    await waitFor(() => {
      expect(button).toHaveTextContent("Updating...");
    });

    // Verify mutation was called and completed
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Profile updated:"),
        expect.objectContaining({
          updateProfile: expect.objectContaining({ id: mockUser.id }),
        })
      );
    });

    // Verify button text reverts after mutation completes
    await waitFor(() => {
      expect(button).toHaveTextContent("Update Profile");
    });
  });

  it("shows error when mutation fails", async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider
        mocks={[mockInterestsResponse, mockErrorResponse]}
        addTypename={false}
      >
        <MyProfileForm user={mockUser} />
      </MockedProvider>
    );

    // Wait for form to render
    await waitFor(() => {
      expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    });

    // Submit form
    const button = screen.getByRole("button", { name: /update profile/i });
    await user.click(button);

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Failed to update profile")).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Update failed:",
        expect.any(Error)
      );
    });

    // Verify button text reverts after error
    await waitFor(() => {
      expect(button).toHaveTextContent("Update Profile");
    });
  });
});