"use strict";

// weather.ts 파일에서 함수들을 가져옴
import {fetchWeatherAndUpdateUI} from './components/weather.js';

// 버튼 클릭 시 위치 정보를 가져오는 함수
// 버튼 클릭 시 위치 정보를 가져오는 함수


// 페이지가 로드되었을때
// 1 날씨 API연결 후 작업
// 2 LocalStorage에서 Name 데이터가있다면 Name입력박스 hidden하고 해당 이름을 taskBox에 보여준다 
document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherAndUpdateUI();
    const nameDisplay = document.getElementById('namePrompt') as HTMLDivElement;
    const inputBox = document.getElementById('inputNameBox') as HTMLDivElement;

    const inputTaskBox = document.getElementById('inputTaskBox') as HTMLDivElement;
    const taskInput = document.getElementById('taskInput');
    const taskBox = document.getElementById('taskBox');

    const savedName = localStorage.getItem('name');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; 
    console.log(savedTasks);

    if (savedName) {
        
        inputBox.classList.toggle('hidden');
        inputTaskBox.classList.toggle('hidden');
        nameDisplay.textContent = `Welcome ${savedName}`;
      console.log("값 있음");
      if(savedTasks){
        savedTasks.forEach((item) => {
            console.log(item);
            const insertHTML = `
            <div class="taskItem">
                <input type="checkbox">
                <p>${item}</p>
                <i id="deleteTask" class="fa-solid fa-circle-xmark"></i>
            </div>
            `;            

            taskBox?.insertAdjacentHTML("beforeend",insertHTML);
            
            ////////////////////////////////
        });
    }
    else{
        console.log("저장된 Task 없음");
    }
    } else {
      console.log('값 없음');
    }

    
})
function deleteTask(index) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.splice(index, 1); // 배열에서 항목 삭제
    localStorage.setItem('tasks', JSON.stringify(savedTasks)); // localStorage 업데이트
}
// 시간데이터형식을 가공
const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// 시계를 업데이트하는 함수
const updateClock = () => {
    const now = new Date();
    const timeString = formatTime(now);
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = timeString;
        console.log(timeString);
    }
};

// 페이지가 로드될 때 시계를 초기화하고, 1초마다 시계를 업데이트하는 인터벌을 설정
window.addEventListener('load', () => {
    updateClock();
    setInterval(updateClock, 1000);
});


// 엔터키를 눌렀을때
// 1. Name 입력하는 곳에 데이터가있으면
// 2. Task 입력하는 곳에 데이터가 있으면
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('nameInput') as HTMLInputElement;
        const inputBox = document.getElementById('inputNameBox') as HTMLDivElement;
        
        const namePrompt = document.getElementById('namePrompt') as HTMLDivElement;

        const taskInput = document.getElementById('taskInput') as HTMLInputElement;
        const inputTaskBox = document.getElementById('inputTaskBox') as HTMLDivElement;
        const taskBox = document.getElementById('taskBox') as HTMLDivElement;

        if (input && input.value) {
                inputBox.classList.add('hidden');
                inputTaskBox.classList.remove('hidden');
                namePrompt.textContent = `Welcome ${input.value}`;
                console.log("로컬스토리지 @@")
                localStorage.setItem('name', input.value);
                console.log(localStorage.getItem('name'));
                
        }
        if(taskInput && taskInput.value){
            console.log(`할일 - ${taskInput.value}`);
              
            const insertHTML = `
            <div class="taskItem">
                <input type="checkbox">
                <p>${taskInput.value}</p>
                <i id="deleteTask" class="fa-solid fa-circle-xmark"></i>
            </div>
            `;             

            taskBox?.insertAdjacentHTML("beforeend",insertHTML)

            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            savedTasks.push(taskInput.value); // savedTasks 배열에 추가
            localStorage.setItem('tasks', JSON.stringify(savedTasks)); // localStorage에 문자열로 저장


            taskInput.value = "";
        }
    }
});

// taskitem에 delete버튼 누르면 해당 task 삭제
document.addEventListener('click', (event) => {
    console.log(event.target)
    const target = event.target as HTMLElement;
    if (target.id === 'deleteTask') {
        console.log("흠들어오냐")
        const taskItem = target.closest('.taskItem');
        if (taskItem) {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; 

            const taskToFind = taskItem.querySelector('p').textContent;

            console.log(taskToFind);
            const index = savedTasks.indexOf(taskToFind);
            if (index !== -1) {
            alert(`Task "${taskToFind}" is at index ${index}.`);
            savedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(savedTasks)); // localStorage 업데이트
            } else {
            alert(`Task "${taskToFind}" not found.`);
            }

            taskItem.remove();
        }
    }
  });

// 헤더 클릭하면 url들어가기
document.getElementById('header').addEventListener('click', function() {
    window.location.href = 'https://www.weather.go.kr/w/index.do';
});