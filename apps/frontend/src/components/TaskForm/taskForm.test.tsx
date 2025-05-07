import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskForm as TaskFormComponent } from "./index";
import { ITask } from "../../../../interfaces/task";

jest.mock("../../services", () => ({
  createTask: jest.fn(() => Promise.resolve()),
  updateTask: jest.fn(() => Promise.resolve()),
  deleteTask: jest.fn(() => Promise.resolve()),
}));

// Mocks para funções de callback
const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

// Mock de usuários disponíveis
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Props padrão para os testes
const defaultProps = {
  isEditing: false,
  assigneUsers: users,
  onClose: mockOnClose,
  onSuccess: mockOnSuccess,
  onError: mockOnSuccess,
};

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    render(<TaskFormComponent {...defaultProps} />);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    render(<TaskFormComponent {...defaultProps} />);
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText(/title must contain/i)).toBeInTheDocument();
      expect(screen.getByText(/description must contain/i)).toBeInTheDocument();
      expect(screen.getByText(/assignee is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    render(<TaskFormComponent {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "This is a valid description" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Alice" },
    });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("shows Save and Delete buttons when editing", () => {
    const mockTask: Partial<ITask> = {
      id: 1,
      title: "Edit Task",
      description: "Edit description",
      assigne: "Alice",
      completed: false,
    };

    render(
      <TaskFormComponent
        {...defaultProps}
        isEditing={true}
        initialValues={mockTask}
      />
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<TaskFormComponent {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
