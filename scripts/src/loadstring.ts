// Loadstring script - Dynamic code execution utility
// This script provides a utility to dynamically load and execute code strings

/**
 * Simulates a loadstring function similar to Lua's loadstring
 * Executes a code string dynamically
 */
function loadstring(code: string): Function | null {
  try {
    // Create a new function from the code string
    const dynamicFunction = new Function(code);
    return dynamicFunction;
  } catch (error) {
    console.error("Error loading string:", error);
    return null;
  }
}

/**
 * Executes a loaded function with optional arguments
 */
function executeLoadedCode(fn: Function | null, ...args: any[]): any {
  if (fn === null) {
    console.error("Cannot execute null function");
    return null;
  }
  
  try {
    return fn(...args);
  } catch (error) {
    console.error("Error executing loaded code:", error);
    return null;
  }
}

// Example usage
const codeString = `
  const greeting = "Hello from loadstring!";
  console.log(greeting);
  return greeting;
`;

const loadedFunction = loadstring(codeString);
const result = executeLoadedCode(loadedFunction);

console.log("Script result:", result);

export { loadstring, executeLoadedCode };
