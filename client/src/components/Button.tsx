import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  const getButtonStyle = () => {
    switch (label) {
      case "Delete":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "Update":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "Add":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "Completed":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded focus:outline-none ${getButtonStyle()}`}
    >
      {label}
    </button>
  );
};

export default Button;
