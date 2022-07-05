const coursesList = document.querySelector(".courses__list")
const submitBtn = document.getElementById("btn")
const resetBtn = document.getElementById("btnReset")

let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
]

submitBtn.addEventListener("click", submitHandler)

resetBtn.addEventListener("click", resetHandler)

// Метод для рендоринга списка
function renderList(arr = []) {
  return arr.forEach(item => {
    const li = `
    <li class="list__item">
      Название - ${item.name} <br/>
      Цена - ${checkNullMin(item.prices)} - ${
      checkNullMax(item.prices) === Infinity
        ? "и больше"
        : checkNullMax(item.prices)
    }
    </li>
  `

    coursesList.insertAdjacentHTML("afterBegin", li)
  })
}

// Функция фильтрации
function filterCourses(courses, userPrice = []) {
  const result = []

  for (let i = 0; i < courses.length; i++) {
    const coursePrice = courses[i].prices

    if (
      checkNullMin(coursePrice) <= checkNullMax(userPrice) &&
      checkNullMax(coursePrice) >= checkNullMin(userPrice)
    ) {
      result.push(courses[i])
    }
  }

  return result
}

// Вспомогательные методы
function checkNullMin(prices) {
  return prices[0] === null ? 0 : prices[0]
}

function checkNullMax(prices) {
  return prices[1] === null ? Infinity : prices[1]
}

function submitHandler() {
  const minValue = parseInt(document.getElementById("min").value)
  const maxValue = parseInt(document.getElementById("max").value)
  const priceUser = [minValue, maxValue]

  const filter = filterCourses(courses, priceUser)

  coursesList.innerHTML = ""

  renderList(filter)
}

function resetHandler() {
  coursesList.innerHTML = ""
  renderList(courses)

  document.getElementById("min").value = document.getElementById("max").value =
    ""
}

renderList(courses)
