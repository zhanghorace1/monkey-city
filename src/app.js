import { sm_access_token } from '../../secrets.js';

document.getElementById('fetchButton').addEventListener('click', async () => {
    getAllSurveyIds()
});



async function getAllSurveyIds() {
    try {
        const response = await fetch("https://api.surveymonkey.com/v3/surveys", {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${sm_access_token}`
    }
  });
    const data = await response.json();
        let survey_ids = data.data.map(item => Number(item.id))
        console.log("survey ids", survey_ids)
        getSurveyDetails(survey_ids);
    } catch (error) {
        console.error('Error fetching Survey Monkey data:', error);
    }
}


// async function getSurveyDetails(surveyIds) {
//     console.log("inside getSurveyDetails", surveyIds)
//     const surveyDetails = [];

//     for (const id of surveyIds) {
//         try {
//             const response = await fetch(`https://api.surveymonkey.com/v3/surveys/${id}/details`, {
//                 "method": "GET",
//                 "headers": {
//                     "Accept": "application/json",
//                     "Authorization": `Bearer ${sm_access_token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 surveyDetails.push({
//                     title: data.title,
//                     date_created: data.date_created,
//                     analyze_url: data.analyze_url,
//                     has_important_question: isStringInObject(importantQuestion, data)
//                 });
//             } else {
//                 console.error(`Error fetching details for survey ID ${id}:`, response.statusText);
//             }
//         } catch (error) {
//             console.error(`Error fetching details for survey ID ${id}:`, error);
//         }
//     }
//     console.log("surveyDetails", surveyDetails)
//     populateTable(surveyDetails) ;

//     // populateTable(dumData)
// }

async function getSurveyDetails(surveyIds) {
    console.log("inside getSurveyDetails", surveyIds);

    const fetchSurveyDetail = async (id) => {
        try {
            const response = await fetch(`https://api.surveymonkey.com/v3/surveys/${id}/details`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${sm_access_token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    title: data.title,
                    date_created: data.date_created,
                    analyze_url: data.analyze_url,
                    has_important_question: isStringInObject(importantQuestion, data)
                };
            } else {
                console.error(`Error fetching details for survey ID ${id}:`, response.statusText);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching details for survey ID ${id}:`, error);
            return null;
        }
    };

    const surveyDetailsPromises = surveyIds.map(id => fetchSurveyDetail(id));
    const surveyDetails = await Promise.all(surveyDetailsPromises);

    const filteredSurveyDetails = surveyDetails.filter(detail => detail !== null);

    console.log("surveyDetails", filteredSurveyDetails);
    populateTable(filteredSurveyDetails);
}

const importantQuestion =  "Stay connected with us for a source of inspiration and impact! Check the box below to be added to our newsletter and receive engaging content featuring incredible collaborations between nonprofits, volunteers, and companies. You may unsubscribe at any time."

function isStringInObject(targetString, obj) {
    const objectString = JSON.stringify(obj);
    return objectString.includes(targetString);
}

function populateTable(data) {
    const tableBody = document.getElementById("surveyTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear any existing rows
    
    data.forEach(item => {
      const row = document.createElement("tr");
      
      row.innerHTML = `
        <td>${item.title}</td>
        <td>${new Date(item.date_created).toLocaleDateString()}</td>
        <td><a href="${item.analyze_url}" target="_blank">View</a></td>
        <td>${item.has_important_question ? "Yes" : "No"}</td>
      `;
      
      tableBody.appendChild(row);
    });
  }

  const dumData = [
    {
        "title": "Unum January 2025 Flash Consulting Event – Skills Survey",
        "date_created": "2024-10-25T13:50:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/cgm4Gxf6A1dqUKGqbQaZmwhMY5VcmwjhkrHQEaXrOgo_3D",
        "has_important_question": false
    },
    {
        "title": "Macquarie February 2025 Pro Bono Marathon - Skills Survey",
        "date_created": "2024-10-31T17:16:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/ejMzGvlyCZ4yyycmDYADNwbvydexQ4oK3DmQZERNVsw_3D",
        "has_important_question": false
    },
    {
        "title": "Corporate End of Project - JPMorgan Chase",
        "date_created": "2024-09-06T17:58:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/KRpoAXDtTJWTv78L1W5tWaJvWmX5W7O1H7AAAhApxew_3D",
        "has_important_question": false
    },
    {
        "title": "Nonprofit End of Project - JPMorgan Chase",
        "date_created": "2024-09-11T13:53:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/S60zXWWsZpfM3EKwh65TTPanIpr_2FAgDM_2B5CzFPHtddQ_3D",
        "has_important_question": false
    },
    {
        "title": "Nonprofit Feedback - Fidelity EI&O 2024 Projects",
        "date_created": "2024-12-16T17:01:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/d2tkO48ni9XUtuEBJusYuh_2FyqvPk2hFadcAM3c0ONvU_3D",
        "has_important_question": true
    },
    {
        "title": "Unum Flash Consulting Event January 2025 - Nonprofit Evaluation",
        "date_created": "2024-12-19T19:46:00",
        "analyze_url": "https://www.surveymonkey.com/analyze/lFTB_2B3_2BfU_2B3hfXjnhFNBQ_2B0IJAJdKGMYjQYvKOa9tyU_3D",
        "has_important_question": false
    }
]