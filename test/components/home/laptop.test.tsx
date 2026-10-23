import { render, screen } from "@testing-library/react";
import LaptopApp from "@/components/home/laptop";

jest.mock("@react-three/fiber", () => ({
  Canvas: () => <div data-testid="three-canvas" />,
  useFrame: jest.fn(),
}));
jest.mock("@react-three/drei", () => ({
  Environment: () => null,
  RoundedBox: () => null,
  Text: () => null,
  useTexture: jest.fn(),
}));
jest.mock("three", () => ({}));

describe("LaptopApp", () => {
  it("creates the 3D canvas without requiring WebGL in the test environment", () => {
    render(<LaptopApp />);
    expect(screen.getByTestId("three-canvas")).toBeInTheDocument();
  });
});
