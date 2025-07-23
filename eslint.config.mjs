import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Start with your original imports
const baseConfigs = compat.extends("next/core-web-vitals", "next/typescript");

// Create a final config that disables all rules
const eslintConfig = [
    // Import the base configurations first
    ...baseConfigs,
    // Then override with all rules disabled
    {
        // In flat config, we use files instead of ignorePatterns
        files: ["**/*.{js,jsx,ts,tsx}"],
        // This disables all rules that were imported
        rules: Object.fromEntries(
            // Get all rule names from the base configs
            Object.keys(
                baseConfigs.reduce((allRules, config) => {
                    return { ...allRules, ...(config.rules || {}) };
                }, {})
            ).map((rule) => [rule, "off"])
        ),
    },
    // Add any specific rules you want to enable
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            // Example: Enable only these specific rules
            // "react/jsx-key": "error",
            // "@typescript-eslint/no-explicit-any": "warn",
            // Uncomment and add any rules you want to enable
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];

export default eslintConfig;
