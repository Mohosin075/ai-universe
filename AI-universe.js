// all data load
const loadAllData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    showAllData(data.data.tools);
}

// show all data

const showAllData=(data)=>{
    console.log(data);
}

// loadAllData function call
loadAllData();