export const clearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    document
      .querySelectorAll("textarea")
      .forEach((textarea) => (textarea.value = ""));
  };