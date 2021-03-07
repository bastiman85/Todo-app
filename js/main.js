let items = document.querySelector(".items");
const leftSpan = document.querySelector(".left span");
let remove = document.querySelectorAll(".remove");
let select = document.querySelectorAll(".items label");
let checkboxes = document.querySelectorAll("input[type='checkbox']");
const taskInput = document.querySelector(".new-item input");
const template = document.querySelector("template");
const clear = document.querySelector(".clear");

let left = 5;
let itemCount = 6;

// checkUnchecked();

function setLeft() {
   leftSpan.textContent = left;
   // localStorage.setItem("left", left);
}

setLeft();

function update() {
   for (var i = 0; i < select.length; i++) {
      select[i].addEventListener(
         "click",
         function (e) {
            if (e.target.classList == "remove") {
               e.target.addEventListener("click", removeParents, true);
            } else if (e.currentTarget.previousElementSibling.checked) {
               left++;
               setLeft();
            } else {
               left--;
               setLeft();
            }
         },
         true
      );
   }
}

update();

// function checkUnchecked() {
//    for (var i = 0; i < checkboxes.length; i++) {
//       if (checkboxes[i].checked) {
//       } else {
//          left++;
//       }
//       setLeft();
//    }
// }

function removeParents(e) {
   if (e.currentTarget.parentNode.previousElementSibling.checked) {
      console.log(e.currentTarget);
      e.currentTarget.removeEventListener("click", removeParents, true);
      e.currentTarget.parentNode.parentNode.remove();
      // e.currentTarget.parentNode.previousElementSibling.remove();
      // e.currentTarget.parentNode.remove();
   } else {
      e.currentTarget.removeEventListener("click", removeParents, true);
      e.currentTarget.parentNode.parentNode.remove();
      left--;
      setLeft();
   }
}

function addTask(task) {
   let content = template.content.cloneNode(true);
   let label = content.querySelector("label");
   let input = content.querySelector("input");
   label.innerHTML = "<span class='select'></span>" + task + "<span class='remove'></span>";
   input.value = task;
   itemCount++;
   input.name = "item-" + itemCount;
   input.id = "item-" + itemCount;
   label.htmlFor = "item-" + itemCount;

   items.appendChild(content);
   left++;
   items = document.querySelector(".items");
   remove = document.querySelectorAll(".remove");
   select = document.querySelectorAll(".items label");

   select[select.length - 1].addEventListener(
      "click",
      function (e) {
         if (e.target.classList == "remove") {
            e.target.addEventListener("click", removeParents, true);
         } else if (e.currentTarget.previousElementSibling.checked) {
            left++;
            setLeft();
         } else {
            left--;
            setLeft();
         }
      },
      true
   );

   setLeft();
   taskInput.value = "";

   // return clone;
}

taskInput.addEventListener("keypress", function (e) {
   if (e.key === "Enter") {
      addTask(taskInput.value);
   }
});

function clearAll() {
   for (var i = 0; i < select.length; i++) {
      if (select[i].previousElementSibling.checked) {
         // select[i].previousElementSibling.remove();
         select[i].parentNode.remove();
      }
   }
   select = document.querySelectorAll(".items label");
}

clear.addEventListener("click", clearAll);

function filterActive() {
   checkboxes = document.querySelectorAll("input[type='checkbox']");
   for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
         checkboxes[i].parentNode.style.display = "none";
         // checkboxes[i].style.display = "none";
      } else {
         checkboxes[i].parentNode.style.display = "block";
         // checkboxes[i].style.display = "inline-block";
      }
   }
   document.querySelector(".active").classList.remove("active");
   document.querySelector(".unfinished").classList.add("active");
   checkboxes = document.querySelectorAll("input[type='checkbox']");
}

document.querySelector(".unfinished").addEventListener("click", filterActive);

function filterComplete() {
   checkboxes = document.querySelectorAll("input[type='checkbox']");
   for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
         checkboxes[i].parentNode.style.display = "block";
         // checkboxes[i].style.display = "inline-block";
      } else {
         checkboxes[i].parentNode.style.display = "none";
         // checkboxes[i].style.display = "none";
      }
   }
   document.querySelector(".active").classList.remove("active");
   document.querySelector(".completed").classList.add("active");
   checkboxes = document.querySelectorAll("input[type='checkbox']");
}

document.querySelector(".completed").addEventListener("click", filterComplete);

function filterAll() {
   checkboxes = document.querySelectorAll("input[type='checkbox']");
   for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].parentNode.style.display = "block";
      // checkboxes[i].style.display = "inline-block";
   }
   document.querySelector(".active").classList.remove("active");
   document.querySelector(".all").classList.add("active");
   checkboxes = document.querySelectorAll("input[type='checkbox']");
}

document.querySelector(".all").addEventListener("click", filterAll);
