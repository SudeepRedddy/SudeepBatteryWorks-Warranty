document.getElementById('batteryType').addEventListener('change', function () {
    var motorcycleOptions = document.getElementById('motorcycleOptions');
    var automotiveOptions = document.getElementById('automotiveOptions');

    motorcycleOptions.style.display = 'none';
    automotiveOptions.style.display = 'none';

    if (this.value === 'motorcycle') {
        motorcycleOptions.style.display = 'block';
    } else if (this.value === 'automotive') {
        automotiveOptions.style.display = 'block';
    }
});

document.getElementById('batteryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var date = document.getElementById('date').value;
    var batteryType = document.getElementById('batteryType').value;
    var model = batteryType === 'motorcycle' ? document.getElementById('motorcycleModel').value : document.getElementById('automotiveModel').value;
    var modalResult = document.getElementById('modalResult');
    
    var warrantyInfo = getWarrantyInfo(model, date);

    modalResult.innerHTML = `
        <h2>Warranty Information</h2>
        <p>Date: ${formatDate(date)}</p>
        <p>Battery Type: ${batteryType.charAt(0).toUpperCase() + batteryType.slice(1)}</p>
        <p>Model: ${model.replace(/([A-Z])/g, ' $1').trim()}</p>
        <h3>Months Completed: ${warrantyInfo.monthsCompleted}</h3>
        <h4>${warrantyInfo.message}</h4>
    `;

    // Show the modal
    var modal = document.getElementById('warrantyModal');
    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    document.getElementsByClassName('close')[0].onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


function getWarrantyInfo(model, purchaseDate) {
    const today = new Date();
    const purchase = new Date(purchaseDate);
    const diffTime = Math.abs(today - purchase);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    const warranties = {
        exideXplore: [
            { months: 24, message: "Free of cost Replacement" },
            { months: 27, message: "PRO RATA : 50 % Discount" },
            { months: 30, message: "PRO RATA : 45 % Discount" },
            { months: 33, message: "PRO RATA : 40 % Discount" },
            { months: 36, message: "PRO RATA : 30 % Discount" },
            { months: 39, message: "PRO RATA : 25 % Discount" },
            { months: 42, message: "PRO RATA : 20 % Discount" },
            { months: 48, message: "PRO RATA : 15 % Discount" }
        ],
        exideEpiq: [
            { months: 42, message: "Free of cost Replacement" },
            { months: 45, message: "PRO RATA : 40 % Discount" },
            { months: 48, message: "PRO RATA : 35 % Discount" },
            { months: 51, message: "PRO RATA : 30 % Discount" },
            { months: 60, message: "PRO RATA : 25 % Discount" },
            { months: 72, message: "PRO RATA : 20 % Discount" },
            { months: 77, message: "PRO RATA : 15 % Discount" }
        ],
        exideMatrix: [
            { months: 36, message: "Free of cost Replacement" },
            { months: 39, message: "PRO RATA : 40 % Discount" },
            { months: 42, message: "PRO RATA : 35 % Discount" },
            { months: 45, message: "PRO RATA : 30 % Discount" },
            { months: 48, message: "PRO RATA : 25 % Discount" },
            { months: 51, message: "PRO RATA : 20 % Discount" },
            { months: 72, message: "PRO RATA : 15 % Discount" }
        ],
        exideMileage: [
            { months: 30, message: "Free of cost Replacement" },
            { months: 33, message: "PRO RATA : 40 % Discount" },
            { months: 36, message: "PRO RATA : 35 % Discount" },
            { months: 39, message: "PRO RATA : 30 % Discount" },
            { months: 42, message: "PRO RATA : 25 % Discount" },
            { months: 45, message: "PRO RATA : 20 % Discount" },
            { months: 60, message: "PRO RATA : 15 % Discount" }
        ],
        exideEezy: [
            { months: 24, message: "Free of cost Replacement" },
            { months: 27, message: "PRO RATA : 40 % Discount" },
            { months: 30, message: "PRO RATA : 35 % Discount" },
            { months: 33, message: "PRO RATA : 30 % Discount" },
            { months: 36, message: "PRO RATA : 25 % Discount" },
            { months: 39, message: "PRO RATA : 20 % Discount" },
            { months: 48, message: "PRO RATA : 15 % Discount" }
        ],
        exideXpress: [
            { months: 24, message: "Free of cost Replacement" },
            { months: 27, message: "PRO RATA : 50 % Discount" },
            { months: 30, message: "PRO RATA : 45 % Discount" },
            { months: 33, message: "PRO RATA : 35 % Discount" },
            { months: 36, message: "PRO RATA : 25 % Discount" },
            { months: 39, message: "PRO RATA : 20 % Discount" },
            { months: 42, message: "PRO RATA : 15 % Discount" }
        ],
        exideJaikisan: [
            { months: 24, message: "Free of cost Replacement" },
            { months: 27, message: "PRO RATA : 50 % Discount" },
            { months: 30, message: "PRO RATA : 45 % Discount" },
            { months: 33, message: "PRO RATA : 35 % Discount" },
            { months: 36, message: "PRO RATA : 25 % Discount" },
            { months: 39, message: "PRO RATA : 20 % Discount" },
            { months: 42, message: "PRO RATA : 15 % Discount" }
        ],
        exideDrive: [
            { months: 18, message: "Free of cost Replacement" },
            { months: 21, message: "PRO RATA : 50 % Discount" },
            { months: 24, message: "PRO RATA : 45 % Discount" },
            { months: 27, message: "PRO RATA : 35 % Discount" },
            { months: 30, message: "PRO RATA : 25 % Discount" },
            { months: 33, message: "PRO RATA : 20 % Discount" },
            { months: 36, message: "PRO RATA : 15 % Discount" }
        ],
        exideRide: [
            { months: 12, message: "Free of cost Replacement" },
            { months: 18, message: "PRO RATA : 35 % Discount" },
            { months: 24, message: "PRO RATA : 20 % Discount" }
        ],
        exideEko: [
            { months: 24, message: "Free of cost Replacement" }
        ],
        exideMileageIss: [
            { months: 30, message: "Free of cost Replacement" },
            { months: 33, message: "PRO RATA : 40 % Discount" },
            { months: 36, message: "PRO RATA : 35 % Discount" },
            { months: 39, message: "PRO RATA : 30 % Discount" },
            { months: 42, message: "PRO RATA : 25 % Discount" },
            { months: 45, message: "PRO RATA : 20 % Discount" },
            { months: 60, message: "PRO RATA : 15 % Discount" }
        ]
    };

    const warranty = warranties[model];
    let warrantyMessage = "Warranty expired";
    for (let i = 0; i < warranty.length; i++) {
        if (diffMonths <= warranty[i].months) {
            warrantyMessage = warranty[i].message;
            break;
        }
    }

    return {
        message: warrantyMessage,
        monthsCompleted: diffMonths
    };
}

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}
