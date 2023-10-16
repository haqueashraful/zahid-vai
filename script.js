var menuIcon = document.querySelector('#menu-icon');
var navbar = document.querySelector('.nav-item');


menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}


const cursor = document.getElementById('cursor');
var timeout;
document.addEventListener('mousemove' , function(e){
   let x = e.clientX;
    let y = e.clientY;
cursor.style.left = x + "px";
cursor.style.top = y + "px";
cursor.style.display = "block";

function mouseStopped(){
    cursor.style.display = "none"
}
timeout = setTimeout(mouseStopped, 1000);
});


//navText color

// const toggleButtons = document.querySelectorAll('.toggle-info');
//   let cheak = 0;
// toggleButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         if( cheak ==0){

//         }
//     });
// });
// const toggleButtons = document.querySelectorAll('.toggle-info');

// toggleButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const details = button.previousElementSibling;
//         details.style.display = details.style.display === 'none' ? 'block' : 'none';
//         button.textContent = details.style.display === 'none' ? 'See Details' : 'Hide Details';
//     });
// });


//student information

const ApiUrl = ('studenInfo.json');
const selectStudent = document.getElementById('selectStudent');
const StudentInfo = document.getElementById('studentInfo-box');
const modalBox = document.getElementById('modalBox');
let modalContent = document.getElementById('modalContent');
let Closebtn = document.getElementById('popupClose');


fetch(ApiUrl)
.then(response => response.json())
.then(datas => {
    for (let data of datas){
        let option = document.createElement('option');
         option.value = data.id;
         option.textContent = data.name;
         selectStudent.appendChild(option);
    }
});

function StudentAllInfo(studentId){
    fetch(`${ApiUrl}`)
    .then(response =>  response.json())
    .then(data => {
        const student = data.find(s => s.id == studentId);
        console.log(student);
        let studentData =  `
        <img class="studentImg" src="${student.img}" alt="Photo Nai">
        <h2>${student.name}</h2>
        <button  onclick="showModal()">See details</button>
        `;
        StudentInfo.innerHTML = studentData;

        //modalcontent
         let studentDetails = `
         <p>Name: ${student.name}</p>
         <p>Id Number: ${student.id}</p>
        <p>Age: ${student.age}</p>
        <p>Department: ${student.major}</p>
        <p>CGPA: ${student.grade}</p>
        `;
        modalContent.innerHTML = studentDetails;
    })
};
selectStudent.addEventListener('change', function(){
    let selectStudentId = selectStudent.value;
    StudentAllInfo(selectStudentId);
}
);
function showModal(){
    modalBox.style.display="block";
}
Closebtn.addEventListener('click',function(){
    modalBox.style.display = 'none';
});

