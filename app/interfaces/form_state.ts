type FormState<T, D = undefined> = {
    success: boolean;
    errors?: T,
    message?: string,
    data?: D
}