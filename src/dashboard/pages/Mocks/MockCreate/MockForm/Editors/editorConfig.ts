import * as monaco from "monaco-editor";

// // --- Monaco Editor Global Configuration ---
// // Configure JavaScript language services for basic intellisense and API restrictions

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    // allowUmdGlobalAccess: false,
    // allowUnreachableCode: false,
    // noUnusedLocals: false,
    // noUnusedParameters: false,
    allowJs: true,
    alwaysStrict: true,
    checkJs: true,
});

// const restrictedApiDefs = `
// /** @deprecated fetch is not allowed in this environment. Use provided utilities if available. */

// `;

// monaco.languages.typescript.javascriptDefaults.addExtraLib(
//     restrictedApiDefs,
//     "ts:filename/restricted-globals.d.ts", // Virtual path for the definition file
// );

monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false, // Enable semantic validation (catches usage of undefined vars)
    noSyntaxValidation: false, // Enable syntax error checking
});
// // --- End Monaco Editor Global Configuration ---
