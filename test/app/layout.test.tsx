import { renderToStaticMarkup } from "react-dom/server";
import RootLayout from "@/app/layout";

jest.mock("@/components/layout/header", () => ({
  Header: () => <header>Site header</header>,
}));
jest.mock("@/components/layout/footer", () => ({
  Footer: () => <footer>Site footer</footer>,
}));
jest.mock("@/components/layout/theme-background", () => ({
  ThemeBackground: () => <div data-testid="theme-background" />,
}));
jest.mock("@/app/providers", () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("RootLayout", () => {
  it("wraps page content in the document and shared site layout", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main>Page content</main>
      </RootLayout>,
    );
    expect(markup).toContain('<html lang="en"');
    expect(markup).toContain("Site header");
    expect(markup).toContain("Page content");
    expect(markup).toContain("Site footer");
  });
});
