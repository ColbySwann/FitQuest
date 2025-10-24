import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import LoginPage from "../LoginPage";
import {AuthProvider} from "../../context/AuthContext.tsx";


vi.mock("axios");
// @ts-ignore
const mockedAxios = axios as unknown as vi.Mocked<typeof axios>;


const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("LoginPage", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        mockNavigate.mockReset();
    });

    it("shows validation messages when fields are empty", async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </AuthProvider>
        );

        await userEvent.click(screen.getByRole("button", { name: /login/i }));

        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Password must be at least/i)).toBeInTheDocument();
    });

    it("submits valid credentials and navigates to dashboard", async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { message: "OK" } });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </AuthProvider>
        );

        await userEvent.type(screen.getByLabelText(/username/i), "superHero");
        await userEvent.type(screen.getByLabelText(/password/i), "strongpass");

        await userEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                "http://localhost:8080/api/users/login",
                expect.objectContaining({
                    username: "superHero",
                    password: "strongpass",
                })
            );
        });

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
});
