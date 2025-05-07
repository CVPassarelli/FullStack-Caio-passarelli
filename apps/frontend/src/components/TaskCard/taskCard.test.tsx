import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "./index";
import { ITask } from "../../../../interfaces/task";

describe("TaskCard", () => {
  const mockTask: ITask = {
    id: 1,
    title: "Create component",
    description: "Build the task card component",
    assigne: "Caio",
    completed: false,
  };

  it("should render the title, description, and assignee", () => {
    render(<TaskCard card={mockTask} onClick={() => {}} />);

    expect(screen.getByText(/Create component/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Build the task card component/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Caio/i)).toBeInTheDocument();
  });

  it("should render 'Done' if the task is not completed", () => {
    render(<TaskCard card={mockTask} onClick={() => {}} />);
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });

  it("should render 'Ready for dev' if the task is completed", () => {
    render(
      <TaskCard card={{ ...mockTask, completed: true }} onClick={() => {}} />
    );
    expect(screen.getByText(/Ready for dev/i)).toBeInTheDocument();
  });

  it("should call onClick with the task ID when the card is clicked", () => {
    const handleClick = jest.fn();
    render(<TaskCard card={mockTask} onClick={handleClick} />);

    const cardElement = screen.getByText(/Create component/i);
    fireEvent.click(cardElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
