document.addEventListener('DOMContentLoaded', function () {
    d3.csv("donnees.csv").then(function(salaires) {
        const salairesParCanton = {};

        // Calculer les totaux et les dénombrements des salaires par canton
        salaires.forEach(salaire => {
            const canton = salaire.Canton;
            const montantSalaire = parseFloat(salaire.Salaire);

            if (!salairesParCanton[canton]) {
                salairesParCanton[canton] = {
                    total: montantSalaire,
                    count: 1
                };
            } else {
                salairesParCanton[canton].total += montantSalaire;
                salairesParCanton[canton].count += 1;
            }
        });

        const mapObject = document.querySelector('.map-object');
        mapObject.addEventListener('load', function() {
            const svgDoc = mapObject.contentDocument;
            const paths = svgDoc.querySelectorAll('path');

            const cantonNameDiv = document.getElementById('canton-name');
            const cantonSalaryDiv = document.getElementById('canton-salary');

            paths.forEach(path => {
                const cantonName = path.getAttribute('name');
                const moyenneSalaire = salairesParCanton[cantonName];

                const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                textElement.setAttribute("x", "50%");
                textElement.setAttribute("y", "50%");
                textElement.setAttribute("text-anchor", "middle");
                textElement.setAttribute("alignment-baseline", "middle");
                textElement.setAttribute("class", "salaire-text");
                if (moyenneSalaire) {
                    textElement.textContent = `Salaire moyen: ${(moyenneSalaire.total/moyenneSalaire.count).toFixed(2)} CHF`;
                } else {
                    textElement.textContent = 'Données non disponibles';
                }

                path.appendChild(textElement);

                path.addEventListener('mouseover', () => {
                    if (moyenneSalaire) {
                        cantonNameDiv.textContent = `Canton: ${cantonName}`;
                        cantonSalaryDiv.textContent = `Salaire moyen: ${(moyenneSalaire.total/moyenneSalaire.count).toFixed(2)} CHF`;
                    } else {
                        cantonNameDiv.textContent = `Canton: ${cantonName}`;
                        cantonSalaryDiv.textContent = 'Données non disponibles';
                    }
                });

                path.addEventListener('mouseout', () => {
                    cantonNameDiv.textContent = '';
                    cantonSalaryDiv.textContent = '';
                });
            });
        });
    });

    d3.csv("salaire_minimum.csv").then(function(infos) {
        const infoParCanton = {};

        // Calculer les totaux et les dénombrements des salaires par canton
        infos.forEach(info => {
            const canton = info.Canton;
            const informations = info.Salaire;
            infoParCanton[canton] = informations
        });

        const mapObject2 = document.querySelector('.map-object2');
        mapObject2.addEventListener('load', function() {
            const svgDoc = mapObject2.contentDocument;
            const paths = svgDoc.querySelectorAll('path');

            const cantonNameDiv = document.getElementById('canton-name');
            const cantonSalaryDiv = document.getElementById('canton-salary');

            paths.forEach(path => {
                const cantonName = path.getAttribute('name');
                const infoSalaire = infoParCanton[cantonName];

                const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                textElement.setAttribute("x", "50%");
                textElement.setAttribute("y", "50%");
                textElement.setAttribute("text-anchor", "middle");
                textElement.setAttribute("alignment-baseline", "middle");
                textElement.setAttribute("class", "salaire-text");
                if (infoSalaire) {
                    textElement.textContent = `Salaire minimal : ${infoSalaire}`;
                } else {
                    textElement.textContent = 'Données non disponibles';
                }

                path.appendChild(textElement);

                path.addEventListener('mouseover', () => {
                    if (infoSalaire) {
                        cantonNameDiv.textContent = `Canton: ${cantonName}`;
                        cantonSalaryDiv.textContent = `Salaire minimal : ${infoSalaire}`;
                    } else {
                        cantonNameDiv.textContent = `Canton: ${cantonName}`;
                        cantonSalaryDiv.textContent = 'Pas de réglementation spéciale = liberté contractuelle';
                    }
                });

                path.addEventListener('mouseout', () => {
                    cantonNameDiv.textContent = '';
                    cantonSalaryDiv.textContent = '';
                });
            });
        });


    });
});


