import { useState } from "react";

const useToggleForm = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  return { isFormVisible, openForm, closeForm };
};

export default useToggleForm;
