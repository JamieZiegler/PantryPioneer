export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div
            className="flex items-center justify-center p-12"
            role="status"
            aria-label={message}
        >
            <span
                className="h-8 w-8 animate-spin rounded-full border-[3px] border-border border-t-primary"
                aria-hidden="true"
            />
            <span className="sr-only">{message}</span>
        </div>
    );
}
