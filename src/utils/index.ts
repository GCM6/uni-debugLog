
export const isWindow = (windowLike: unknown): windowLike is Window => {
    return windowLike instanceof Window
}
