document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    const audienceContent = {
        teachers: {
            icon: "✎",
            kicker: "FOR TEACHERS",
            title: "Teach with more ease and impact.",
            text: "Bring lessons to life, share materials in a tap, and understand how every learner is progressing.",
            list: ["Ready-to-use teaching resources", "Simple class progress overview", "Easy content sharing"]
        },
        students: {
            icon: "✦",
            kicker: "FOR STUDENTS",
            title: "Learn your way, at your pace.",
            text: "Explore lessons, take on fun challenges, and build confidence with every small win.",
            list: ["Interactive, bite-sized lessons", "Rewards that keep you motivated", "Learning available anytime"]
        },
        parents: {
            icon: "⌂",
            kicker: "FOR PARENTS",
            title: "Stay close to every milestone.",
            text: "See what your child is learning and celebrate progress together, without the guesswork.",
            list: ["Clear learning updates", "Trusted educational content", "A better home learning routine"]
        }
    };

    const audienceTabs = document.querySelectorAll(".audience-tab");
    audienceTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const content = audienceContent[tab.dataset.audience];
            audienceTabs.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            document.querySelector("#audienceIcon").textContent = content.icon;
            document.querySelector("#audienceKicker").textContent = content.kicker;
            document.querySelector("#audienceTitle").textContent = content.title;
            document.querySelector("#audienceText").textContent = content.text;
            document.querySelector("#audienceList").innerHTML = content.list
                .map((item) => `<li>✓ ${item}</li>`)
                .join("");
        });
    });

    const form = document.querySelector("#leadForm");
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        message.className = "form-message";

        if (!form.checkValidity()) {
            message.textContent = "Please complete all fields and agree to receive updates.";
            message.classList.add("error");
            form.reportValidity();
            return;
        }

        const firstName = form.elements.firstName.value.trim();
        message.textContent = `You’re on the list, ${firstName}! Watch your inbox for Abiva updates.`;
        message.classList.add("success");
        form.reset();
    });

    document.querySelector("#year").textContent = new Date().getFullYear();
});
