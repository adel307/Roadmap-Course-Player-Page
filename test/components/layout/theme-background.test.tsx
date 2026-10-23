import { render } from "@testing-library/react";
import { ThemeBackground } from "@/components/layout/theme-background";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeBackground", () => {
  it("uses the active dark theme background", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "dark" });
    const { container } = render(<ThemeBackground />);
    expect(container.firstChild).toHaveStyle({
      backgroundImage: expect.stringContaining("BG-dark.jpg"),
    });
  });
});
