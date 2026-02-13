export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="loading-spinner" role="status" aria-label={message}>
            <span className="sr-only">{message}</span>
        </div>
    )
}