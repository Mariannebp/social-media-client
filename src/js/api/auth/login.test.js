import { login } from "./login";
import { index } from "../../storage/localstorage.test";

const EMAIL = "test@noroff.no";
const BAD_EMAIL = "bad@email.no";
const PASSWORD = "Password1";
const TOKEN = "a1b2c43d4";

const profile = {
  name: "Marianne",
  email: EMAIL,
};

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 201,
    statusText: "OK",
    json: () => Promise.resolve({ ...profile, TOKEN }),
  });
}

function fetchFailure() {
  return Promise.resolve({
    ok: false,
    status: 404,
    statusText: "Not Found",
  });
}

describe("login", () => {
  it("Returns a valid token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const result = await login(EMAIL, PASSWORD);
    expect(EMAIL).toMatch("@noroff.no");
    expect(PASSWORD).toMatch("Password1");
    expect(result.TOKEN).toEqual(TOKEN);
  });
  it("throws an error when provided credentials are NOT valid", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(login(BAD_EMAIL, PASSWORD)).rejects.toThrow("Not Found");
  });
});
