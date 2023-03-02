// all data load
const loadAllData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    showAllData(data.data.tools);
}

// show all data

const showAllData=(data)=>{
    const cardContainer = document.getElementById('card-container');
    data.forEach(item => {
        const {name, image, published_in,features} = item;
        console.log(item);
        cardContainer.innerHTML +=`
        <div class="col">
                      <div class="card h-100 p-3">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="">
                          <h5 class="my-3 fs-4 fw-bold">Feature</h5>
                          <ol>
                            <li>${features[0]}</li>
                            <li>${features[1]}</li>
                            <li>${features[2]}</li>
                          </ol>
                          <hr>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h2 class="my-3 fs-4 fw-bold">${name}</h2>
                                <div class="d-flex">
                                    <span class="me-2 cal-icon"><i class="fa-solid fa-calendar-days"></i></span><p class="data">${published_in}</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa-solid fa-arrow-right-long text-danger p-3 rounded-circle pointer-event" id="show-details"></i>
                            </div>
                        </div>
                      </div>
                    </div>
        ` 
    });
}

// const features=(feature)=>{
//     console.log(feature);
// }

// loadAllData function call
loadAllData();