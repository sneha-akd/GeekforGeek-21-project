export const loadState = () => {
  try {
    if (typeof window === "undefined") return undefined;

    const serializedState = localStorage.getItem("appState");
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state:", error);
    localStorage.removeItem("appState"); // 🔥 auto-fix
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem("appState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state:", error);
  }
};
