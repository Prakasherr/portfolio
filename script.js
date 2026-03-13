// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
var mobileToggle = document.getElementById('mobileToggle');
var mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', function () {
  var isOpen = mobileMenu.classList.toggle('open');
  mobileToggle.textContent = isOpen ? '✕' : '☰';
});

mobileMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    mobileToggle.textContent = '☰';
  });
});

// ===== TYPING ANIMATION =====
var roles = ['Frontend Developer', 'Data Analyst', 'UI/UX Designer', 'Web Developer'];
var roleIdx = 0;
var charIdx = 0;
var deleting = false;
var typingEl = document.getElementById('typingText');

function typeStep() {
  var current = roles[roleIdx];

  if (!deleting && charIdx === current.length) {
    setTimeout(function () {
      deleting = true;
      typeStep();
    }, 1500);
    return;
  }

  if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    typeStep();
    return;
  }

  charIdx += deleting ? -1 : 1;
  typingEl.textContent = current.slice(0, charIdx);
  setTimeout(typeStep, deleting ? 40 : 80);
}

typeStep();

// ===== SKILLS =====
var skills = [
  { name: 'HTML', level: 95 },
  { name: 'CSS / ', level: 90 },
  { name: 'JavaScript', level: 80 },
  { name: 'Python', level: 85 },
  { name: 'SQL', level: 80 },
  { name: 'Java', level: 75 },
  { name: 'Power BI', level: 80 },
  { name: 'Microsoft office', level: 70 },
  { name: 'UI/UX Design', level: 75 }
  
];

var skillContainer = document.getElementById('skillBars');

skills.forEach(function (skill) {
  skillContainer.innerHTML +=
    '<div class="skill-bar-label"><span>' + skill.name + '</span><span>' + skill.level + '%</span></div>' +
    '<div class="skill-track"><div class="skill-fill animate-progress" style="width:' + skill.level + '%"></div></div>';
});

// ===== TOAST =====
function showToast(message, type) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast ' + type;

  setTimeout(function () {
    toast.classList.add('show');
  }, 10);

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('formName').value.trim();
  var email = document.getElementById('formEmail').value.trim();
  var message = document.getElementById('formMessage').value.trim();

  if (!name) {
    showToast('Please enter your name.', 'error');
    return;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  if (!message) {
    showToast('Please enter a message.', 'error');
    return;
  }

  emailjs.send("service_wxbic1m","template_sotjmsh",{
      name: name,
      email: email,
      message: message
  })
  .then(function(response) {

      showToast("Message sent successfully!", "success");
      document.getElementById("contactForm").reset();

  }, function(error) {

      showToast("Failed to send message.", "error");

  });

});