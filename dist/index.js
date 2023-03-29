"use strict";
const comboBox = document.getElementById("record");
const containerElement = document.getElementById("container");
const errormessage = document.createElement("h2");
let Products = [];
let currentcomboValue;
fetch(`https://dummyjson.com/products`)
    .then(res => res.json())
    .then((data) => {
    Products = data.products;
    const numRecords = Products.length;
    for (let i = 0; i < numRecords; i++) {
        const option = document.createElement("option");
        option.value = (i + 1).toString(); // Set the option value to the record number (starting from 1)
        option.text = (i + 1).toString(); // Set the option text to the record number (starting from 1)
        comboBox === null || comboBox === void 0 ? void 0 : comboBox.add(option); // Add the option to the combobox
    }
    comboBox.selectedIndex = 10;
    currentcomboValue = comboBox.value;
    renderTable(currentcomboValue);
}).catch((error) => {
    errormessage.innerHTML = error.message === "Failed to fetch" ? "Please check your internet connection" : "";
    containerElement === null || containerElement === void 0 ? void 0 : containerElement.appendChild(errormessage);
});
comboBox.addEventListener("change", () => {
    renderTable(comboBox.value);
});
function renderTable(limit) {
    containerElement === null || containerElement === void 0 ? void 0 : containerElement.replaceChildren();
    const url = `https://dummyjson.com/products?limit=${limit}`;
    fetch(url)
        .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
        .then((data) => {
        Products = data.products;
        // Table HEADER
        const tableElement = document.createElement("table");
        const headerRow = document.createElement("tr");
        headerRow.style.textAlign = 'left';
        const IdHeader = document.createElement("th");
        IdHeader.innerHTML = "ID";
        const TitleHeader = document.createElement("th");
        TitleHeader.innerHTML = "Title";
        const BrandHeader = document.createElement("th");
        BrandHeader.innerHTML = "Brand";
        const CategoryHeader = document.createElement("th");
        CategoryHeader.innerHTML = "Category";
        const PriceHeader = document.createElement("th");
        PriceHeader.innerHTML = "Price";
        PriceHeader.style.textAlign = 'right';
        const ImageHeader = document.createElement("th");
        ImageHeader.innerHTML = "Image";
        ImageHeader.style.textAlign = 'Center';
        headerRow.appendChild(IdHeader);
        headerRow.appendChild(TitleHeader);
        headerRow.appendChild(BrandHeader);
        headerRow.appendChild(CategoryHeader);
        headerRow.appendChild(PriceHeader);
        headerRow.appendChild(ImageHeader);
        tableElement.appendChild(headerRow);
        for (const product of Products) {
            // Table Detail
            const row = document.createElement("tr");
            const IdCell = document.createElement("td");
            IdCell.innerHTML = product.id;
            const titleCell = document.createElement("td");
            titleCell.innerHTML = product.title;
            const brandCell = document.createElement("td");
            brandCell.innerHTML = product.brand;
            const categoryCell = document.createElement("td");
            categoryCell.innerHTML = product.category;
            const priceCell = document.createElement("td");
            priceCell.innerHTML = product.price.toLocaleString();
            priceCell.style.textAlign = 'right';
            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");
            imageElement.src = product.images[0];
            imageElement.alt = "Not Available";
            imageElement.style.width = "100px";
            imageCell.style.textAlign = 'Center';
            imageCell.appendChild(imageElement);
            row.appendChild(titleCell);
            row.appendChild(IdCell);
            row.appendChild(titleCell);
            row.appendChild(brandCell);
            row.appendChild(categoryCell);
            row.appendChild(priceCell);
            row.appendChild(imageCell);
            tableElement.appendChild(row);
        }
        containerElement === null || containerElement === void 0 ? void 0 : containerElement.appendChild(tableElement);
    }).catch((error) => {
        errormessage.innerHTML = error.message === "Failed to fetch" ? "Please check your internet connection" : "";
        containerElement === null || containerElement === void 0 ? void 0 : containerElement.appendChild(errormessage);
    });
}
;
//# sourceMappingURL=index.js.map