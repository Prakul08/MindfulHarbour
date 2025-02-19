// Alerts
function phoneAlert() {
    alert("We are currently available only via email. Phone support will be accessible after a certain period. Stay tuned!"); }

function notif() {
    alert("The data is recieved by our team.")}

// Menu icon Click
document.querySelector('.bi-list').addEventListener('click', function() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Height Adjustment
function adjustBodyMargin() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        document.body.style.marginTop = navbar.offsetHeight + "px";
    }
}

window.addEventListener("load", adjustBodyMargin);
window.addEventListener("resize", adjustBodyMargin);

// Video
function openVideo() {
    window.open("https://www.youtube.com/watch?v=inpok4MKVLM", "popup", "width=800,height=450");
}

// Book
function showBook(url) {
    let viewer = document.getElementById("bookViewer");
    let container = document.getElementById("viewerContainer");
    viewer.src = url;
    container.style.display = "block";
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");

    let toggleButton = document.querySelector(".toggle-btn");

    if (document.body.classList.contains("dark-mode")) {
        toggleButton.textContent = "🌕 Light Mode";
    } else {
        toggleButton.textContent = "🌗 Dark Mode";
    }
}

// Contact
const scriptURL = 'https://script.google.com/macros/s/AKfycbwSr-gbk5yAMgHLvMzDJHgTLkNX8hrdK2H3l13cGzs8Yjb1Irl7EOPLAfXpMfm7LSDgiw/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e=> {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
    })

// Yoga
var images = document.querySelectorAll(".image");

images.forEach(function(image) {
    image.addEventListener("click", function() {
        var contentId = image.getAttribute("data-content");

        document.querySelectorAll(".content").forEach(function(content) {
            content.style.display = "none";
        });

        document.getElementById(contentId).style.display = "block";
    });
});