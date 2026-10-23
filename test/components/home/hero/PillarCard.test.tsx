import { Code2 } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { PillarCard } from "@/components/home/hero/PillarCard";

describe("PillarCard", () => {
  it("renders the supplied title and description", () => {
    render(
      <PillarCard
        title="Build"
        description="Practice with real projects."
        icon={Code2}
        variant="mobile"
      />,
    );
    expect(screen.getByRole("heading", { name: "Build" })).toBeInTheDocument();
    expect(screen.getByText("Practice with real projects.")).toBeInTheDocument();
  });
});
