import { render, screen } from "@testing-library/react";
import { Loader } from "./index";

describe("Loader", () => {
  it("should render loader when true", () => {
    render(<Loader loading={true} />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("should render loader when false", () => {
    render(<Loader loading={false} />);
    const spinner = screen.queryByRole("status");
    expect(spinner).not.toBeInTheDocument();
  });
});
