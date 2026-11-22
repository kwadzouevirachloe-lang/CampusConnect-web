
// ==========================================
// CAMPUSCONNECT : GESTION DES FONCTIONNALITES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. APERCU DES IMAGES SELECTIONNEES
    // ======================================

    const uploadInputs = document.querySelectorAll("[data-image-upload]");

    uploadInputs.forEach((input) => {
        input.addEventListener("change", (event) => {

            const files = Array.from(event.target.files || []);
            const section = input.closest(".upload-section");
            const previewGrid = section
                ? section.querySelector("[data-preview-grid]")
                : null;

            if (!previewGrid) return;

            files.forEach((file) => {

                if (!file.type.startsWith("image/")) return;

                const imageUrl = URL.createObjectURL(file);
                const preview = document.createElement("div");
                preview.className = "preview-item";

                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = file.name;

                preview.appendChild(image);
                previewGrid.appendChild(preview);
            });
        });
    });


    // ======================================
    // 2. BASE DE DONNEES DE RECHERCHE
    // ======================================

    const campusData = [

        {
            title: "Faculté des sciences et technologies",
            description: "Informations sur les formations scientifiques et informatiques.",
            keywords: "informatique technologie programmation développement réseau",
            link: "facultes.html"
        },

        {
            title: "FTIC",
            description: "Découvrez les formations en informatique et en développement web.",
            keywords: "informatique électronique télécommunication ordinateur logiciel programmation javascript html css",
            link: "facultes.html"
        },

        {
            title: "FSSRI",
            description: "Informations sur les études en gestion et administration.",
            keywords: "sciences sociales comptabilité économie journalisme",
            link: "facultes.html"
        },

         {
            title: "FSTPSR",
            description: "Informations sur les formations en diaconie et réligion.",
            keywords: "sciences réligieuses religion bible culte",
            link: "facultes.html"
        },

         {
            title: "FSS",
            description: "Informations sur les études en médécine.",
            keywords: "santé infirmerie microbiologie pédiatrie chirugie",
            link: "facultes.html"
        },

        {
            title: "Bibliothèque universitaire",
            description: "Espace de lecture, de recherche et de consultation des documents.",
            keywords: "bibliothèque livres lecture documentation recherche",
            link: "services.html"
        },

        {
            title: "Service informatique",
            description: "Assistance et accompagnement informatique des étudiants.",
            keywords: "informatique assistance ordinateur internet technique",
            link: "services.html"
        },

        {
            title: "Service de scolarité",
            description: "Informations sur les inscriptions et les démarches administratives.",
            keywords: "scolarité inscription étudiant dossier frais documents",
            link: "services.html"
        },

        {
            title: "Journées portes ouvertes",
            description: "Découvrez les activités et les présentations de l'université.",
            keywords: "portes ouvertes visite découverte université",
            link: "evenements.html"
        },

        {
            title: "Conférences universitaires",
            description: "Retrouvez les conférences et rencontres organisées sur le campus.",
            keywords: "conférence rencontre débat événement",
            link: "evenements.html"
        },

        {
            title: "Activités universitaires",
            description: "Découvrez les activités organisées au sein de l'université.",
            keywords: "activités campus sport culture étudiant événement",
            link: "evenements.html"
        },

        {
            title: "À propos de CampusConnect",
            description: "Découvrez la plateforme et ses objectifs.",
            keywords: "à propos présentation plateforme campus université",
            link: "apropos.html"
        }

    ];


    // ======================================
    // 3. FONCTION POUR NORMALISER LES MOTS
    // ======================================

    function normaliser(texte) {
        return texte
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }


    // ======================================
    // 4. ELEMENTS DE LA BARRE DE RECHERCHE
    // ======================================

    const searchInput = document.getElementById("campusSearch");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");
    const searchMessage = document.getElementById("searchMessage");


    // Vérifier que les éléments existent sur la page

    if (!searchInput || !searchButton || !searchResults) {
        return;
    }


    // ======================================
    // 5. FONCTION DE RECHERCHE
    // ======================================

    function effectuerRecherche() {

        const recherche = normaliser(searchInput.value);

        searchResults.innerHTML = "";

        if (recherche === "") {
            searchMessage.textContent =
                "Veuillez saisir un mot-clé pour effectuer une recherche.";
            return;
        }

        const mots = recherche.split(/\s+/);

        const resultats = campusData.filter((element) => {

            const contenu = normaliser(
                element.title + " " +
                element.description + " " +
                element.keywords
            );

            return mots.every(mot => contenu.includes(mot));
        });


        // Affichage du nombre de résultats

        if (resultats.length === 0) {
            searchMessage.textContent =
                "Aucun résultat trouvé pour : " + searchInput.value;

            return;
        }

        searchMessage.textContent =
            resultats.length + " résultat(s) trouvé(s).";


        // Affichage des résultats

        resultats.forEach((element) => {

            const card = document.createElement("div");
            card.className = "search-result-card";

            const title = document.createElement("h3");
            title.textContent = element.title;

            const description = document.createElement("p");
            description.textContent = element.description;

            const link = document.createElement("a");
            link.href = element.link;
            link.textContent = "Voir les informations →";

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);

            searchResults.appendChild(card);
        });
    }


    // ======================================
    // 6. EVENEMENTS DE RECHERCHE
    // ======================================

    searchButton.addEventListener("click", effectuerRecherche);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            effectuerRecherche();
        }
    });

});
