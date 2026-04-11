import { useState } from "react";
import {
    requestAccountDeletion,
    updateAccountEmail,
    updateAccountPassword,
} from "../../api/auth.js";
import { useAuth } from "../hooks/useAuth.js";

export default function AccountSettings() {
    const { user } = useAuth();

    const [newEmail, setNewEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [deletionLoading, setDeletionLoading] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearStatus = () => {
        setError(null);
        setSuccess(null);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        clearStatus();

        if (!newEmail.trim() || !emailPassword) {
            setError("Enter a new email and your current password.");
            return;
        }

        setEmailLoading(true);
        const { error: updateError } = await updateAccountEmail(
            emailPassword,
            newEmail.trim(),
        );
        setEmailLoading(false);

        if (updateError) {
            setError(updateError.message);
            return;
        }

        setNewEmail("");
        setEmailPassword("");
        setSuccess("Email updated successfully.");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        clearStatus();

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Fill in all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        setPasswordLoading(true);
        const { error: updateError } = await updateAccountPassword(
            currentPassword,
            newPassword,
        );
        setPasswordLoading(false);

        if (updateError) {
            setError(updateError.message);
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess("Password updated successfully.");
    };

    const handleDeletionRequest = async () => {
        clearStatus();

        const confirmed = window.confirm(
            "Are you sure you want to request account deletion?",
        );

        if (!confirmed) {
            return;
        }

        setDeletionLoading(true);

        const { error: requestError } = await requestAccountDeletion();

        setDeletionLoading(false);

        if (requestError) {
            setError(requestError.message);
            return;
        }

        setSuccess("Deletion request sent. We will review it shortly.");
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="mb-2 text-left">Account</h2>
                <p className="text-sm text-text-secondary">
                    Update your email or password.
                </p>
            </div>

            {error ? <p className="form-error">{error}</p> : null}
            {success ? (
                <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {success}
                </p>
            ) : null}

            <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-left text-xl">Change email</h3>
                <form
                    onSubmit={handleEmailSubmit}
                    className="grid gap-4 sm:grid-cols-2"
                >
                    <div className="sm:col-span-2">
                        <label className="form-label" htmlFor="current-email">
                            Current email
                        </label>
                        <input
                            className="form-input"
                            id="current-email"
                            value={user?.email ?? ""}
                            readOnly
                            type="email"
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="new-email">
                            New email
                        </label>
                        <input
                            className="form-input"
                            id="new-email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            type="email"
                            placeholder="New email"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="email-password"
                        >
                            Current password
                        </label>
                        <input
                            className="form-input"
                            id="email-password"
                            value={emailPassword}
                            onChange={(e) => setEmailPassword(e.target.value)}
                            type="password"
                            placeholder="Current password"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={emailLoading}
                        >
                            {emailLoading ? "Updating..." : "Update email"}
                        </button>
                    </div>
                </form>
            </section>

            <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-left text-xl">Change password</h3>
                <form
                    onSubmit={handlePasswordSubmit}
                    className="grid gap-4 sm:grid-cols-2"
                >
                    <div className="sm:col-span-2">
                        <label
                            className="form-label"
                            htmlFor="current-password"
                        >
                            Current password
                        </label>
                        <input
                            className="form-input"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type="password"
                            placeholder="Current password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="new-password">
                            New password
                        </label>
                        <input
                            className="form-input"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="New password"
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="confirm-password"
                        >
                            Confirm new password
                        </label>
                        <input
                            className="form-input"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={passwordLoading}
                        >
                            {passwordLoading
                                ? "Updating..."
                                : "Change password"}
                        </button>
                    </div>
                </form>
            </section>

            <section className="rounded-lg border border-error-200 bg-error-50 p-5">
                <h3 className="mb-2 text-left text-xl text-error-700">
                    Delete account
                </h3>
                <p className="mb-2 text-sm text-error-700">
                    Send a deletion request and we will handle the removal
                    manually.
                </p>
                <p className="mb-3 text-sm text-error-700 underline underline-offset-1">
                    If you regret your decision, please contact our support team
                    <b> immediately</b> at 012-345-6789.
                </p>
                <p className="mb-4 text-xs text-error-700 italic">
                    Please note that we cannot guarantee cancelation of deletion
                    requests once the process is initiated. Act quickly if you
                    change your mind!
                </p>

                <button
                    type="button"
                    onClick={handleDeletionRequest}
                    className="rounded-md bg-error-700 px-4 py-2.5 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={deletionLoading}
                >
                    {deletionLoading
                        ? "Sending..."
                        : "Request account deletion"}
                </button>
            </section>
        </div>
    );
}
