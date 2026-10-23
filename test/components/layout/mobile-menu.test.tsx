import { fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "@/components/layout/mobile-menu";

describe("MobileMenu", () => {
  it("opens the navigation menu and closes after selecting a link", () => {
    render(<MobileMenu navigation={[{ label: "Courses", href: "/courses" }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Courses" }));
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull();
  });
});
