// Ambil elemen dari HTML
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const totalSpan = document.getElementById('totalTodos');
const completedSpan = document.getElementById('completedTodos');

// Load todos dari LocalStorage saat halaman dibuka
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Fungsi menambah todo
function addTodo() {
    const text = input.value.trim();
    
    if (text === "") {
        alert("Masukkan tugas dulu!");
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    input.value = "";
    saveAndRender();
}

// Fungsi hapus todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}

// Fungsi toggle selesai/belum
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveAndRender();
}

// Simpan ke LocalStorage dan render ulang
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Render semua todo ke HTML
function renderTodos() {
    list.innerHTML = "";
    
    let completedCount = 0;
    
    todos.forEach(todo => {
        if (todo.completed) completedCount++;
        
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <span class="todo-text" onclick="toggleTodo(${todo.id})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        
        list.appendChild(li);
    });

    // Update stats
    totalSpan.textContent = `Total: ${todos.length}`;
    completedSpan.textContent = `Selesai: ${completedCount}`;
}

// Biar bisa tekan Enter untuk add todo
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});