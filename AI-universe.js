// all data load
const spinner = document.getElementById('spinner');
let allData;
const loadAllData = async() =>{
    spinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    allData = data.data.tools;
    showAllData(allData.slice(0,6));
}

// show all data

const showAllData=(data)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const seeMore = document.getElementById('sew-more');
    const dataLength = data.length;
    // see more button hide and display
    if(dataLength < 6){
        seeMore.classList.add('d-none');
    }else if(dataLength === 6){
        seeMore.classList.remove('d-none');
    }else{
        seeMore.classList.add('d-none')
    }
    data.forEach(item => {
        const {id, name, image, published_in,features} = item;
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
                                <i class="fa-solid fa-arrow-right-long text-danger p-3 rounded-circle pointer-event" id="show-details" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="(loadModalData('${id}'))"></i>
                            </div>
                        </div>
                      </div>
                    </div>
        ` 
    });
    spinner.classList.add('d-none')
}

// load modal data
const modalSpinner = document.getElementById('modal-spinner')
const loadModalData=async(id)=>{
    modalSpinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    showModalData(data.data);
}

const hide = document.querySelector('.hidden');

function nullSolve(nul){
    console.log(nul);
    console.log(hide);
}

// let featureContainer;

// show all modal data
const showModalData = (data)=>{
    console.log(data);
    const {image_link,description,pricing,input_output_examples,accuracy,features,integrations} = data;
    
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
    modalContainer.innerHTML = `
    <div class="col">
      <div class="card h-100 modal-card-bg">
        <div class="card-body">
          <h5 class="card-title fw-bold fs-4">${description}</h5>
          <div class="d-lg-flex justify-content-between justify-items-center gap-lg-4 text-center">
          <div class="col d-block w-lg-25 mb-2 p-4 bg-white rounded fw-bold text-success text-center"><span>
            ${pricing == null ? "not available" :  pricing[0].price === "0" || pricing[0].price === "No cost"? "Free of cost" : pricing[0].price}
          </span><br> <span>${pricing == null ? "" :  pricing[0].plan === "0" || pricing[0].plan === "Free"? "Basic" : pricing[0].plan}</span>
          </div>
          <div class="col d-block w-lg-25 mb-2 p-4 bg-white rounded fw-bold text-warning text-center"><span>
            ${pricing == null ? "not available" :  pricing[1].price === "0" || pricing[1].price === "No cost"? "Free of cost" : pricing[1].price}
          </span><br> <span>${pricing == null ? "" :  pricing[1].plan === "0" || pricing[1].plan === "Free"? "Basic" : pricing[1].plan}</span>
          </div>
          <div class="col d-block w-lg-25 mb-2 p-4 bg-white rounded text-danger fw-bold text-center"><span>
            ${pricing == null ? "not available" :  pricing[2].price === "0" || pricing[2].price === "No cost"? "Free of cost" : pricing[2].price}
          </span><br> <span>${pricing == null ? "" :  pricing[2].plan === "0" || pricing[1].plan === "Free"? "Basic" : pricing[2].plan}</span>
          </div>
          </div>
          <div class="d-lg-flex gx-lg-3 justify-content-between">
            <div>
              <h5 class="my-3 fs-4 fw-bold">Feature</h5>
                <ul id="feature-container">
                </ul>
            </div>
            <div>
              <h5 class="my-3 fs-4 fw-bold">Integrations</h5>
              <ul>
                <li>int</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="${image_link[0]}" class="card-img-top" alt="...">
        <button class="btn btn-danger border-0 position-absolute top-0 my-2" style="right: 8px; " id="hide">${accuracy.score == null  ?  'not available': accuracy.score + '% accuracy'}</button>
        <div class="card-body">
          <h5 class="card-title fw-bold fs-4">${input_output_examples == null ? "not available" : input_output_examples[0].input}</h5>
          <p class="moda-desc fs-6">${input_output_examples == null ? "not available" : input_output_examples[0].output}</p>
        </div>
      </div>
    </div>
    `
    modalSpinner.classList.add('d-none');

    
    // hide accuracy button
    if(accuracy.score == null){
        const hide = document.getElementById('hide');
        hide.classList.add('d-none')
     }
    //  dynamic feature
     const featureContainer = document.getElementById('feature-container');
     showFeatureData(features, featureContainer);
     function showFeatureData(features,featureContainer){
         for(const feature in features){
            const item = (features[feature].feature_name);
            featureContainer.innerHTML +=`
            <li>${item}</li>
            `
        }
     }
    }