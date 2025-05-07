import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./index";

describe("Modal", () => {
  it("should not render when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render title and children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Close Test">
        <div>Content</div>
      </Modal>
    );

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
