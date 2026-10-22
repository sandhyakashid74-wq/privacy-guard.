function analyzeTerms() {
    const terms = document
        .getElementById("terms")
        .value
        .toLowerCase();

    const result = document.getElementById("result");

    if (terms.trim() === "") {
        result.innerHTML = "Please paste Terms & Conditions first.";
        return;
    }

    let score = 0;
    let warnings = [];

    const checks = [
        {
            phrases: [
                "personal data",
                "personal information",
                "collect your data",
                "information about you",
                "user data"
            ],
            points: 30,
            type: "high",
            title: "Personal information may be collected.",
            why: "Your information may be collected, stored or processed."
        },
        {
            phrases: [
                "third party",
                "third parties",
                "marketing partners",
                "share your data",
                "shared with advertisers",
                "share your information",
                "provided to marketing"
            ],
            points: 30,
            type: "high",
            title: "Your data may be shared with other organizations.",
            why: "Other companies or partners may receive your information."
        },
        {
            phrases: [
                "location",
                "whereabouts",
                "where you are",
                "where you go",
                "physical movements"
            ],
            points: 15,
            type: "medium",
            title: "Your location may be monitored or collected.",
            why: "Location information can reveal places you visit."
        },
        {
            phrases: [
                "advertising",
                "advertisements",
                "targeted ads",
                "personalized ads",
                "marketing purposes"
            ],
            points: 10,
            type: "medium",
            title: "Your information may be used for advertising.",
            why: "Information may be used to personalize marketing."
        },
        {
            phrases: [
                "track",
                "tracking",
                "tracked",
                "monitored",
                "monitor your activity",
                "online behavior",
                "online activity"
            ],
            points: 15,
            type: "medium",
            title: "Your online activity may be monitored.",
            why: "Your activity may be observed to understand your behavior."
        }
    ];

    for (const check of checks) {
        const matched = check.phrases.some(phrase =>
            terms.includes(phrase)
        );

        if (matched) {
            score += check.points;

            warnings.push(`
                <div class="risk ${check.type}">
                    <b>${check.type === "high" ? "🔴 HIGH RISK:" : "🟠 MEDIUM RISK:"}
                    ${check.title}</b>
                    <p>Why risky? ${check.why}</p>
                </div>
            `);
        }
    }

    score = Math.min(score, 100);

    let level;
    let recommendation;

    if (score >= 70) {
        level = "🔴 HIGH PRIVACY RISK";
        recommendation = "Review these Terms carefully before accepting.";
    } else if (score >= 40) {
        level = "🟠 MEDIUM PRIVACY RISK";
        recommendation = "Check the Privacy Policy and app permissions.";
    } else if (score > 0) {
        level = "🟡 LOW PRIVACY RISK";
        recommendation = "Read the highlighted risks before accepting.";
    } else {
        level = "🟢 NO MATCHING RISKS DETECTED";
        recommendation = "Review the complete Privacy Policy before accepting.";
    }

    result.innerHTML = `
        <h3>Privacy Guard Analysis</h3>
        <h2>Privacy Risk Score: ${score}/100</h2>
        <div class="score-bar">
            <div class="score-fill" style="width: ${score}%"></div>
        </div>
        <h3>${level}</h3>
        <h3>🚨 Trap Finder</h3>
        ${
            warnings.length
                ? warnings.join("")
                : "<p>No matching risk phrases were detected. This does not guarantee the terms are safe.</p>"
        }
        <h3>💡 What should you do?</h3>
        <p>${recommendation}</p>
    `;
}

function clearResult() {
    document.getElementById("terms").value = "";
    document.getElementById("result").innerHTML = "";
}