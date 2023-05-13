//Function calculates grade points GP!
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
 // FUnction Ends here !! 

  let counter = 1;
  
// FUnction Adds new course tab each time button pressed !!
  function addCourse() {
    let addNew = document.createElement("form");
    addNew.classList.add("add_new", `key-${counter}`);
    const course_name = `
    <form class="add_new key-${counter}">
      <input type="text" placeholder="Course Code" class="courses key-${counter}" required>
          <input type="number" placeholder="Credit Unit" class="credit-units key-${counter}" required>
          <input type="number"  class="marks" placeholder="Marks" key-${counter}" required>
    </form>
    `;
    addNew.innerHTML = course_name;
    document.getElementById("course-wrapper").appendChild(addNew);
    counter++;
  }
// FUnction Ends here !!

// FUnction Removes new course tab each time button pressed !!
  function removeCourse() {
    let mainForm = document.querySelector("form.add_new");
    if(!mainForm){
        // alert("No Courses Added by You till yet");
        //mainForm=document.querySelector("form.course-wrapper");
        let forms = document.getElementsByTagName('form');
        for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
        }
    }
    mainForm.remove();
  }
// FUnction Ends Here !!



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
    let totalUnits = 0;
    let totalcourses=0;
    GRADESSELECT.forEach((e) => {
    //   let GRADES = parseInt(e.value);
    //   const selectedIndex = e.selectedIndex;
    //   const selectedGrade = GRADES[selectedIndex];
    //   const gradeValue = selectedGrade.text.toUpperCase();
    //   listOfGrades.push(gradeValue);
        const gradeValue = parseInt(e.value);
        listOfGrades.push(gradeValue);
    });
   // console.log(listOfGrades);
  
    UNIT.forEach((e) => {
      const unitValue = parseInt(e.value);
      if(unitValue <0 || unitValue > 4){
        return;
      }
      totalUnits += unitValue;
      totalcourses++;
      listOfUnits.push(unitValue);
    });
    //console.log(listOfUnits);
  
    let CGP = 0;
  
    for (let i = 0; i < listOfUnits.length; i++) {
      CGP += gradeCalc(listOfGrades[i], listOfUnits[i]);
    }
    const gpa = CGP / totalUnits;
   showLastParagraph();
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
  
  function resetForm() {
    let forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }
  
  function showLastParagraph() {
    var lastParagraph = document.querySelector('.lastp');
    lastParagraph.style.display = 'block';
    setTimeout(function() {
        lastParagraph.classList.add('show');
      }, 500);
  }
  