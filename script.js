// --- LOGIN HANDLING CONTROLLER ---
const loginForm = document.getElementById('studentLoginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rollNumber = document.getElementById('rollNumber').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Basic Mock validation (Accepts Roll Number and any password containing '123')
        if (rollNumber !== "" && password.includes("123")) {
            localStorage.setItem('activeStudentRoll', rollNumber);
            window.location.href = 'dashboard.html'; // Redirect to dashboard page
        } else {
            document.getElementById('loginError').innerText = "Invalid Credentials! (Hint: Use '123' in password)";
        }
    });
}

// --- DASHBOARD HANDLING CONTROLLER ---
const displayRoll = document.getElementById('displayRoll');
if (displayRoll) {
    const studentRoll = localStorage.getItem('activeStudentRoll') || "Student";
    displayRoll.innerText = studentRoll;

    // Attendance Values (Classes Attended / Total Classes)
    const totalClasses = 160;
    const attendedClasses = 128; // Change this to 100 to test below 75% logic!

    // Calculate percentage dynamically
    const attendancePercentage = Math.round((attendedClasses / totalClasses) * 100);
    
    const percentageText = document.getElementById('overallPercentage');
    const statusCard = document.getElementById('statusCard');
    const statusMessage = document.getElementById('statusMessage');

    percentageText.innerText = attendancePercentage;

    // Verify 75% Threshold Constraint
    if (attendancePercentage >= 75) {
        statusCard.classList.add('safe-status');
        statusMessage.innerText = "Safe! Your attendance is above the required 75% threshold.";
    } else {
        statusCard.classList.add('danger-status');
        statusMessage.innerText = "Alert! Your attendance is below 75%. You are shortage of attendance.";
    }

    // Logout Functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('activeStudentRoll');
        window.location.href = 'index.html';
    });
}