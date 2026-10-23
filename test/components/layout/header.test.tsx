import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme: jest.fn() }),
}));

describe("Header", () => {
  it("renders the site brand and primary course navigation", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Roadmap home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Start learning/i })).toHaveAttribute(
      "href",
      "/courses",
    );
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });
});
