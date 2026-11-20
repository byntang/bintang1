document.addEventListener("DOMContentLoaded", function () {

    const formPendaftaran = document.getElementById("formPendaftaran");
    const inputNama = document.getElementById("nama");
    const inputPassword = document.getElementById("password");
    const errorPassword = document.getElementById("errorPassword");
    const selectJurusan = document.getElementById("jurusan");

    inputPassword.addEventListener("input", function () {
        const jumlahHuruf = inputPassword.value.length;

        if (jumlahHuruf > 0 && jumlahHuruf < 8) {
            errorPassword.textContent = "⚠️ Password kurang panjang (" + jumlahHuruf + "/8 karakter)";
            errorPassword.style.color = "#dc2626";
            inputPassword.style.borderColor = "#dc2626";
        } else if (jumlahHuruf >= 8) {
            errorPassword.textContent = "✅ Password sudah aman";
            errorPassword.style.color = "#16a34a";
            inputPassword.style.borderColor = "#16a34a";
        } else {
            errorPassword.textContent = "";
            inputPassword.style.borderColor = "#cbd5e1";
        }
    });

    formPendaftaran.addEventListener("submit", function (event) {

        if (inputPassword.value.length < 8) {
            alert("Gagal Mendaftar! Password wajib minimal 8 karakter.");
            event.preventDefault();
            inputPassword.focus();
            return;
        }

        const jurusanDipilih = selectJurusan.options[selectJurusan.selectedIndex].text;

        const yakin = confirm(
            "Cek kembali data pendaftaranmu:\n\n" +
            "Nama    : " + inputNama.value + "\n\n" +
            "Jurusan  : " + jurusanDipilih + "\n\n" +
            "Klik OK jika data sudah benar."
        );

        if (!yakin) {
            event.preventDefault();
        }
    });

    formPendaftaran.addEventListener("reset", function () {
        errorPassword.textContent = "";
        inputPassword.style.borderColor = "#cbd5e1";
    });

    const semuaKotak = document.querySelectorAll("input, select, textarea");

    semuaKotak.forEach(function (kotak) {

        kotak.addEventListener("focus", function () {
            if (kotak.type !== "radio" && kotak.type !== "checkbox") {
                kotak.style.transform = "scale(1.01)";
            }
        });

        kotak.addEventListener("blur", function () {
            kotak.style.transform = "scale(1)";
        });

    });

    // --- SCRIPT POPOVER PROFIL ---
    const btnProfil = document.getElementById("btnProfil");
    const profilePopover = document.getElementById("profilePopover");
    const profileContainer = document.querySelector(".profile-menu-container");
    const popoverIframe = document.querySelector(".popover-iframe");

    if (popoverIframe) {
        popoverIframe.setAttribute("scrolling", "no");
    }

    function sesuaikanTinggiPopover() {
        if (!popoverIframe || !profilePopover.classList.contains("is-open")) {
            return;
        }

        requestAnimationFrame(function () {
            try {
                const doc = popoverIframe.contentDocument || (popoverIframe.contentWindow && popoverIframe.contentWindow.document);
                if (doc && doc.body) {
                    doc.documentElement.style.overflow = "hidden";
                    doc.body.style.overflow = "hidden";
                    popoverIframe.style.height = "auto";
                    const tinggiKonten = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
                    if (tinggiKonten > 0) {
                        popoverIframe.style.height = tinggiKonten + "px";
                    }
                }
            } catch (err) {
                popoverIframe.style.height = "540px";
            }
        });
    }

    function setPopoverState(isOpen) {
        profilePopover.classList.toggle("is-open", isOpen);
        btnProfil.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
            sesuaikanTinggiPopover();
        }
    }

    if (popoverIframe) {
        popoverIframe.addEventListener("load", sesuaikanTinggiPopover);
    }

    window.addEventListener("resize", sesuaikanTinggiPopover);

    btnProfil.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = !profilePopover.classList.contains("is-open");
        setPopoverState(isOpen);
    });

    document.addEventListener("click", function (event) {
        if (!profileContainer.contains(event.target)) {
            setPopoverState(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && profilePopover.classList.contains("is-open")) {
            setPopoverState(false);
        }
    });

});
