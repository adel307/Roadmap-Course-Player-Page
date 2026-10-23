import { render, screen } from "@testing-library/react";
import { Providers } from "@/app/providers";

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("Providers", () => {
  it("renders the application inside the theme provider", () => {
    render(
      <Providers>
        <p>Application content</p>
      </Providers>,
    );
    expect(screen.getByTestId("theme-provider")).toContainElement(
      screen.getByText("Application content"),
    );
  });
});
