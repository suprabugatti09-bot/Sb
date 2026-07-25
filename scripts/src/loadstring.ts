// Loadstring script - Execute dynamic Lua-like code
// This script provides loadstring functionality to execute code dynamically

/**
 * Loadstring function - Loads and executes code from a string
 * Similar to Lua's loadstring but for TypeScript/JavaScript
 */
function loadstring(code: string): any {
  try {
    // Create and immediately execute the function
    const result = new Function(code)();
    return result;
  } catch (error) {
    console.error("Error executing loadstring:", error);
    return null;
  }
}

// Example 1: Simple execution
console.log("=== Example 1: Simple Execution ===");
loadstring(`
  console.log("Hello! Ejecutado desde loadstring");
`);

// Example 2: Return values
console.log("\n=== Example 2: Return Values ===");
const result1 = loadstring(`
  console.log("Calculando suma...");
  const suma = 5 + 3;
  console.log("Resultado:", suma);
  return suma;
`);
console.log("Retornado:", result1);

// Example 3: Variable access
console.log("\n=== Example 3: Variable Access ===");
const myData = { nombre: "Script", version: 1.0 };
loadstring(`
  console.log("Datos:", ${JSON.stringify(myData)});
  console.log("Script ejecutado correctamente");
`);

// Example 4: Complex execution with loops
console.log("\n=== Example 4: Complex Execution ===");
loadstring(`
  console.log("Ejecutando bucle desde loadstring:");
  for (let i = 1; i <= 3; i++) {
    console.log("Iteración", i);
  }
`);

// Example 5: Function definition and execution
console.log("\n=== Example 5: Function Definition ===");
loadstring(`
  function saludar(nombre) {
    console.log("¡Hola " + nombre + "!");
    return "Saludando a " + nombre;
  }
  console.log(saludar("Desarrollador"));
`);

export { loadstring };
