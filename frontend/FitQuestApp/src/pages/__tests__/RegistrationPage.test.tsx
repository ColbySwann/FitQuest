
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import axios from "axios";
import RegistrationPage from "../RegistrationPage.tsx";
import {beforeEach, describe, expect} from "vitest";
import {userEvent} from "@testing-library/user-event";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RegistrationPage", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        mockedAxios.post.mockReset();
    });

    it('should render all input fields and button', () => {
        render(<RegistrationPage />);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /register/i})).toBeInTheDocument();
    });

    it('should show validation errors for empty field', async () => {
        render(<RegistrationPage />);
        fireEvent.click(screen.getByRole("button", {name: /register/i}));

        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password must be at least/i)).toBeInTheDocument();
    });

    it("submits valid form data", async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { message: "OK" } });

        render(<RegistrationPage />);

        // simulate real typing — RHF listens to 'input' events
        await userEvent.type(screen.getByLabelText(/username/i), "Hero");
        await userEvent.type(screen.getByLabelText(/email/i), "hero@test.com");
        await userEvent.type(screen.getByLabelText(/password/i), "strongpass");

        // click submit
        await userEvent.click(screen.getByRole("button", { name: /register/i }));

        // wait for axios call
        await waitFor(() =>
            expect(mockedAxios.post).toHaveBeenCalledWith(
                "http://localhost:8080/api/users",
                expect.objectContaining({
                    username: "Hero",
                    email: "hero@test.com",
                    password: "strongpass",
                })
            )
        );
    });

    it("shows alert on registration failure", async () => {
        vi.spyOn(window, "alert").mockImplementation(() => {
        });
        mockedAxios.post.mockRejectedValueOnce({
            response: {data: {message: "Registration Failed"}},
        });

        render(<RegistrationPage/>);
        await userEvent.type(screen.getByLabelText(/username/i), "Hero");
        await userEvent.type(screen.getByLabelText(/email/i), "hero@test.com");
        await userEvent.type(screen.getByLabelText(/password/i), "strongpass");

        await userEvent.click(screen.getByRole("button", {name: /register/i}));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Registration failed/i));
        });
    });

})