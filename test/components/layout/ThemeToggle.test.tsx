import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
  it("changes to light mode when the current theme is dark", () => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "dark", setTheme });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
