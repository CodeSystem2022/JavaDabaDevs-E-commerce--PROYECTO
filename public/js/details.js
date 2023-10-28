let params = new URLSearchParams(document.location.search)
let id = params.get("id")

const details_container = document.getElementById("card-details")

while (details_container.firstChild) { 
    details_container.removeChild(details_container.firstChild); } //Borrar datos

let asyncDetails = async function () {
    try {																					

        const response = await fetch(apiUrl);									
        const dataRetr = await response.json().then(apiEvents => {
            let filteredEvent = apiEvents.events.filter(info => info._id == id)
            eventDetails = filteredEvent[0]

            let assintanceOrEstimated = eventDetails.hasOwnProperty("assistance") ? 
            "<span class='cap-conf'>Estimated:</span>  ".concat(`${eventDetails.assistance}`): 
            "<span class='cap-conf'>Assistance:</span>: ".concat(`${eventDetails.estimate}`);

            let categoriesArray = [...categorySetGenerator2(apiEvents)]
            let colorStyle = colorStyles[categoriesArray.indexOf(eventDetails.category) % colorStyles.length]																																													//COMMENT THIS LINE FOR COLORED ANIMATION	

            let withColors = JSON.parse(sessionStorage.getItem("colors")) === true;
            colorStyle = (withColors ? colorStyle : "default");

            let detailsContent = `
		    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center " id="details">
		    <div class="d-flex flex-column details-shadow-${colorStyle}" id="details-image">
			<img src="${eventDetails.image}" alt="${eventDetails.name}"	class="img-fluid">
			<h4 class="card-category mt-2 text-center">${eventDetails.category}</h4>
		    </div>
		    <div class="details-shadow-${colorStyle}" id="details-info">

			<div class="d-flex justify-content-between px-4 py-2" id="details-head">
				<h3 class="card-title">${eventDetails.name}</h3>
				<h3 class="italic">$${eventDetails.price}</h3>
			</div>

			<div class="px-4 px-md-2" id="details-date-place">

				<p class="m-1">
					<small class="text-muted">Date: ${eventDetails.date}</small>
				</p>
				
				<p class="m-1">
					<small class="text-muted">Place: ${eventDetails.place}</small>
				</p>
			</div>
			
			<div class="px-3 px-md-2 py-0 details-shadow-${colorStyle}" id="details-description">
				<p class="details-text">
				${eventDetails.description}
				</p>
			</div>
			<div class="px-3 px-md-2 flex-row flex-md-column" id="details-footer">
				<p class="my-0 ms-2">
					<span class="cap-conf">Capacity:</span> ${eventDetails.capacity}
				</p>
				<p class="my-0 ms-2">
					${assintanceOrEstimated}
			</div>
			</p>
		</div>
	</div>`

            details_container.innerHTML = detailsContent

        })
    } catch (error) {
        console.log(error)
        details_container.innerHTML = `<div class="d-flex flex-column"> <p class="text-center" style="color:white;font-size:3rem;">An error ocurred!</p>
		<p class="text-center" style="color:white;font-size:2rem;">Try in another moment</p></div>`
    }
}
asyncDetails();		
