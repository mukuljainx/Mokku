import type { FieldErrors } from "react-hook-form";

/**
 * Recursively traverses the FieldErrors object to find the first error message.
 * @param errors - The FieldErrors object from react-hook-form.
 * @returns The first error message string found, or null.
 */
const findFirstErrorMessage = (errors: FieldErrors): string | null => {
    for (const key in errors) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = errors[key] as any;

        if (!error) {
            continue;
        }

        // If the error has a message property, return it.
        if (typeof error.message === "string") {
            return error.message;
        }

        // it's an object
        if (typeof error === "object" && !Array.isArray(error)) {
            const firstError = Object.values(error)[0];
            if (firstError) {
                return findFirstErrorMessage(firstError as FieldErrors);
            }
        }

        if (Array.isArray(error)) {
            const firstError = error[0];
            if (firstError) {
                return findFirstErrorMessage(firstError);
            }
        }
    }

    return null;
};

export const getFormError = ({
    apiError,
    formError,
    inputError,
}: {
    formError: FieldErrors<Partial<unknown>>;
    apiError?: string;
    inputError?: boolean;
}) => {
    if (apiError) {
        return apiError;
    }

    if (inputError) {
        return "Please fix the URL field error.";
    }

    const message = findFirstErrorMessage(formError);
    if (message) {
        return message;
    }

    // Fallback message if no specific error message is found.
    if (Object.keys(formError).length > 0) {
        return "Form has errors. Please check all fields.";
    }

    return null;
};
