 function gradeCalc(marks, unit) {
        if (marks >= 80 && marks<=100) {
        return 4 * unit;
        } else if (marks >= 76 && marks<80) {
        return 3.8 * unit;
        } else if (marks >=72 && marks<76) {
        return 3.5 * unit;
        } else if (marks >=68 && marks<72) {
        return 3 * unit;
        } else if (marks >=64 && marks<68) {
        return 2.8 * unit;
        } else if (marks >=60 && marks<64) {
        return 2.5 * unit;
        }else if (marks >=55 && marks<60) {
            return 2 * unit;
        }else if(marks >=50 && marks<55){
            return 1*unit
        }else{
            return 0*unit;
        }
    }
  
// Delete the course form row
function deleteCourse(iconElement) {
  const courseForm = iconElement.parentNode;
  courseForm.remove();
}

  let counter = 1;
  
// FUnction Adds new course tab each time button pressed !!
function addCourse() {
    let addNew = document.createElement("form");
    addNew.classList.add("add_new", `key-${counter}`);
  
    const course_name = `
      <input type="text" placeholder="Course" class="courses key-${counter}">
      <input type="number" placeholder="Credits" class="credit-units key-${counter}" required  oninput="validateCredits(this)">
      <input type="number" class="marks key-${counter}" placeholder="Marks" required oninput="validateMarks(this)"> 
      <span class="delete-icon" onclick="deleteCourse(this)">&#10006</span>
    `;
    addNew.innerHTML = course_name;
    document.getElementById("course-wrapper").appendChild(addNew);
    counter++;
  }

  
function removeCourse() {
    let mainForm = document.getElementsByTagName("form");
    let numberOfForms = mainForm.length-1;

  if (numberOfForms === 0) {
    alert("No Courses Added by You yet.");
  } else {
    let lastForm = mainForm[numberOfForms - 1];
    lastForm.remove();
    counter--;
  }
  }



  /**
   * @description calculates GPA 
   */
  const reports = [];  
  function calcCgpa() {
    const CGPAPARAGRAPH = document.getElementById("cgpa-calc");
    const GRADESSELECT = document.querySelectorAll("input.marks");
    const UNIT = document.querySelectorAll("input.credit-units");
  
    const courseReport = {};
  
    const listOfGrades = [];
    const listOfUnits = [];
    let currentCredits = 0;
    let totalcourses=0;
    GRADESSELECT.forEach((e) => {
        const gradeValue = parseInt(e.value);
        listOfGrades.push(gradeValue);
    });
    UNIT.forEach((e) => {
      const unitValue = parseInt(e.value);
      if(unitValue <0 || unitValue > 4){
        return;
      }
      currentCredits += unitValue;
      totalcourses++;
      listOfUnits.push(unitValue);
    });
    let gradePoints = 0;
    for (let i = 0; i < listOfUnits.length; i++) {
      gradePoints += gradeCalc(listOfGrades[i], listOfUnits[i]);
    }
     const gpa=gradePoints/currentCredits;
    
    let currentGpa=parseFloat( document.querySelector('input.current-cgpa').value);
    let previousCredits= parseInt(document.querySelector('input.current-credits').value);
    if(currentGpa){
        if(gpa){
            let cgpa=(gpa*currentCredits)+(currentGpa*previousCredits);
            let totalCredits=currentCredits+previousCredits
            if(currentGpa>4){
                document.querySelector('input.current-cgpa').style.borderColor='red';
                cgpa=0;
            }
            cgpa=cgpa/totalCredits;
            if(cgpa>0){
                CGPAPARAGRAPH.textContent = "Total CGPA " + cgpa.toFixed(2);
                let para=document.getElementById("cgpa-calc");
                para.innerHTML+=`<p><small> For ` + totalCredits + ` Credit Hours </small></p>`;
                lastp=document.querySelector('.lastp');
                lastp.style.backgroundColor= 'green'; 
                let buttonElement = lastp.querySelector('button');
                buttonElement.style.display = 'inline-block';
            }
            else{
                CGPAPARAGRAPH.textContent = "Enter Correct details under each option to calculate your cgpa"; 
                lastp=document.querySelector('.lastp');
                lastp.style.backgroundColor= 'red'; 
                let buttonElement = lastp.querySelector('button');
                buttonElement.style.display = 'none';
            }
            console.log(cgpa);
            console.log(totalCredits);
        }
        else{
            CGPAPARAGRAPH.textContent = "Enter Your current Semester Data to calculate cgpa"; 
            lastp=document.querySelector('.lastp');
            lastp.style.backgroundColor= 'red'; 
            let buttonElement = lastp.querySelector('button');
            buttonElement.style.display = 'none';
        }
        
    }
    else{
        if (gpa >= 0){
            CGPAPARAGRAPH.textContent = "Total GPA " + gpa.toFixed(2);
            let para=document.getElementById("cgpa-calc");
            para.innerHTML+=`<p><small> For ` + totalcourses + ` courses </small></p>`;
            lastp=document.querySelector('.lastp');
            lastp.style.backgroundColor= 'green'; 
            let buttonElement = lastp.querySelector('button');
            buttonElement.style.display = 'inline-block';
          } else {
            CGPAPARAGRAPH.textContent = "Enter Correct details under each option to calculate your gpa"; 
            lastp=document.querySelector('.lastp');
            lastp.style.backgroundColor= 'red'; 
            let buttonElement = lastp.querySelector('button');
            buttonElement.style.display = 'none';
          }
    }
    
    //let gpa = calculatedGpa / currentCredits; //calculated GPA
    

    
    showLastParagraph();

    
  }
  
  function resetForm() {
    location.reload();
  }
  
  function showLastParagraph() {
    var lastParagraph = document.querySelector('.lastp');
    lastParagraph.style.display = 'block';
    setTimeout(function() {
        lastParagraph.classList.add('show');
      }, 500);
  }
  function showcgpaForm() {
    var cgpaForm = document.querySelector('.form-2');
    cgpaForm.style.display = 'block';
    setTimeout(function() {
        cgpaForm.classList.add('show');
      }, 500);
    let gpaButton=document.getElementById('calculate');
    gpaButton.innerText='Calculate CGPA'
    let showCgpaButton=document.querySelector('.show-gpa-button');
    showCgpaButton.style.display='none';
  }
  function validateMarks(input) {
    const value = input.value;
    const number = parseFloat(value);

    if (isNaN(number) || number < 0) {
        input.value = 0;
    } else if (number > 100) {
        input.value = Math.min(number, 100);
    }
}

 function validateCredits(input) {
    const value = input.value;
    const number = parseInt(value);

    if (isNaN(number) || number < 1) {
        input.value = 1;
    } else if (number > 4) {
        input.value = Math.min(number, 4);
    }
}
  function validateTotalCredits(input){
    //const input=document.querySelector('.credit-units');
    const value = input.value;
    const number = parseInt(value);
    if (isNaN(number) || number > 200) {
      input.value = Math.min(number, 200);
    }
  }
  function validateCGPA(input){
    //const input=document.querySelector('.credit-units');
    const value = input.value;
    const number = parseInt(value);
    if (isNaN(number) || number > 4) {
      input.value = Math.min(number, 4);
    }
  }

  function displayModal(message) {
    const modal = document.getElementById("custom-modal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
  
  // Function to close the custom modal
  function closeModal() {
    const modal = document.getElementById("custom-modal");
    modal.style.display = "none";
  }
  
  // Attach the contextmenu event listener
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    displayModal("Want to how I did this? Message me at 03103197716");
  });
