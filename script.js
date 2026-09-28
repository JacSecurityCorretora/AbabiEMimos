/* =========================================
   ABABI & MIMOS — CONFIGURAÇÃO + INTERAÇÕES
   ========================================= */

// CONFIGURAÇÕES GERAIS
const CONFIG = {
  whatsapp: "5511996628267",

// Mensagem padrão enviada ao clicar nos botões.
  whatsappMessage: "Olá! Vi o catálogo da Ababi & Mimos e gostaria de saber mais."
};

// INICIALIZAÇÃO DA PÁGINA

document.addEventListener("DOMContentLoaded", () => {
// CONFIGURA TODOS OS BOTÕES DO WHATSAPP
  const whatsappLinks = document.querySelectorAll(".js-whatsapp");

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  whatsappLinks.forEach((link) => {
    link.href = whatsappUrl;
  });

// ATUALIZA O ANO DO RODAPÉ
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

// MENU MOBILE
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(opened));
    });

    nav.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

// ANIMAÇÕES DE ENTRADA
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

// SOMBRA DINÂMICA DO CABEÇALHO
  const header = document.querySelector(".header");
  const updateHeader = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10
      ? "0 10px 35px rgba(73,45,35,.07)"
      : "none";
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
});
