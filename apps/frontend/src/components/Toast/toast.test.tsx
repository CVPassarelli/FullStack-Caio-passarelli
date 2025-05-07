import { render, screen, fireEvent, getByText } from "@testing-library/react";
import { Toast } from "./index";

describe("Modal", () => {
  it("should render component", () => {
    const mockToastyMessage = {
      message: "Error",
      statusCode: 500,
      showToast: true,
    };
    render(<Toast {...mockToastyMessage} />);
    const message = screen.getByTestId("toast");
    expect(message).toBeInTheDocument();
  });

  it("should not show default message", () => {
    render(<Toast />);
    const toast = screen.queryByTestId("toast");
    expect(toast).not.toBeInTheDocument();
  });

  it("should not show message", () => {
    const mockToastyMessage = {
      message: "Error",
      statusCode: 500,
    };
    render(<Toast {...mockToastyMessage} />);
    const toast = screen.queryByTestId("toast");
    expect(toast).not.toBeInTheDocument();
  });
});
