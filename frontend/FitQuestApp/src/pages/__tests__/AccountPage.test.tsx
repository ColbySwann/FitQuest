import {beforeEach, vi} from "vitest";
import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import AccountPage from "../AccountPage.tsx";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider, useAuth} from "../../context/AuthContext.tsx";
import {act} from "react";


vi.mock("axios");
// @ts-ignore
const mockedAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
}

vi.mock('./useAuth', () => ({
    useAuth: vi.fn(() => ({ user: {username: 'mockedUser'}})),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

const testUser = {username: "HelloWorld", email: "helloWorld@gmail.com", password: "password"};


describe("AccountPage", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue("testuser");
    });

    it('should state loading in username not found in storage', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {id: 1, username: "testuser", email: "test@example.com", password: "secret"},
        });

            render(
                    <BrowserRouter>
                        <AccountPage/>
                    </BrowserRouter>
            );

            expect(screen.getByText(/loading/i)).toBeInTheDocument();

            expect(await screen.findByText(/Account Info/i)).toBeInTheDocument();

    });


    it('should load create a form field in the page when a logged in user visits tab', async () => {
        mockedAxios.get = vi.fn().mockResolvedValueOnce({
            data: {testUser}
        });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <AccountPage/>
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => screen.getByText(/Account Info/i));

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    });


    it('should call axios get to pull account info', async () => {
        mockedAxios.get.mockResolvedValueOnce({data: {testUser}});

        await act(async () => {
            render(
                <AuthProvider>
                    <BrowserRouter>
                        <AccountPage/>
                    </BrowserRouter>
                </AuthProvider>
            );
        })

        // await flushPromises();

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalled();
        });

        const usernameInput = await screen.findByLabelText(/username/i);
        const emailInput = await screen.findByLabelText(/email/i);

        await waitFor(() => {
            expect(usernameInput).toHaveValue("HelloWorld")
            expect(emailInput).toHaveValue("helloWorld@gmail.com");
        })


    });


})