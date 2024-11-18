
document.getElementById('voteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const votersCount = parseInt(document.getElementById('votersCount').value);
    const phone = document.getElementById('phone').value;
    const issueAdjustments = Array.from(document.getElementsByClassName('issue')).map(input => parseFloat(input.value));

    if (!validatePhone(phone)) {
        showError("Please enter a valid phone number (e.g., 123-456-7890).");
        return;
    }

    if (isNaN(votersCount) || votersCount <= 0) {
        showError("Please enter a valid number of voters.");
        return;
    }

    if (issueAdjustments.some(isNaN) || issueAdjustments.some(adjust => adjust <= 0)) {
        showError("All issue adjustments must be positive numbers.");
        return;
    }

    const adjustment = applyAdvancedVotingFormula(votersCount, issueAdjustments);
    showSuccess(`Adjusted Votes: ${adjustment.toFixed(2)}`);
});

/**
 * Recursive function to apply voting adjustments based on multiple issues.
 */
function applyAdvancedVotingFormula(voters, adjustments) {
    if (adjustments.length === 0) return voters;

    const adjustment = adjustments[0];
    const remainingAdjustments = adjustments.slice(1);
    return applyAdvancedVotingFormula(voters * adjustment, remainingAdjustments);
}

/**
 * Adds a new issue adjustment field.
 */
function addIssue() {
    const issuesContainer = document.getElementById('issuesContainer');
    const newIssue = document.createElement('input');
    newIssue.type = 'number';
    newIssue.className = 'issue';
    newIssue.placeholder = 'Issue Adjustment (e.g., 0.95)';
    newIssue.required = true;
    issuesContainer.appendChild(newIssue);
    issuesContainer.appendChild(document.createElement('br'));
}

/**
 * Validates phone numbers based on a simple pattern.
 */
function validatePhone(phone) {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // Example: 123-456-7890
    return phonePattern.test(phone);
}

/**
 * Show success message in UI.
 */
function showSuccess(message) {
    const results = document.getElementById('results');
    results.textContent = message;
    results.className = 'success';
}

/**
 * Show error message in UI.
 */
function showError(message) {
    const results = document.getElementById('results');
    results.textContent = message;
    results.className = 'error';
}
