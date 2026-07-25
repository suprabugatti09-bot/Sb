function loadstring(code: string): any {
  try {
    const result = new Function(code)();
    return result;
  } catch (error) {
    console.error("Error executing loadstring:", error);
    return null;
  }
}

loadstring(`console.log("Hola mundo")`);

export { loadstring };
