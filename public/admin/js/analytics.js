window.addEventListener('DOMContentLoaded', function () {
    const orders = [];
    const confirOrders = [];
    var periode = 14;
    const lables = getDateLabels(periode);
    function getDateLabels(count) {
        const labels = [];

        const currentDate = new Date();

        // Déplacez la date actuelle d'un mois en arrière
        // currentDate.setMonth(currentDate.getMonth());

        for (let i = 0; i < count; i++) {
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const label = `${month}/${day}`; // Combine month and day
            labels.unshift(label); // Add the label to the beginning of the array
            currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
        }
        return labels;
    }

    function createDataOrder(data, labels) {


        for (const label of labels) {
            const matchingEntry = data.find(entry => entry.date === label);
            if (matchingEntry) {
                orders.push(matchingEntry.totalOrders);
                confirOrders.push(matchingEntry.totalConfirmedOrders);
            } else {
                orders.push(0);
                confirOrders.push(0);
            }
        }

    }

    const ordersVisitsChart = document.getElementById('ordersVisitsChart');

    fetch('./getChartData', {
        method: 'GET',
    })
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Convertir la réponse en JSON
            } else {
                throw new Error('La requête a échoué avec le statut ' + response.status);
            }
        })
        .then(data => {
            console.log(data);
            createDataOrder(data, lables);
            new Chart(ordersVisitsChart, {
                type: 'line',
                data: {
                    labels: lables,
                    datasets: [{
                        label: 'Order',
                        data: orders,
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'confirm sales',
                        data: confirOrders,
                        fill: false,
                        tension: 0.1
                    }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
})