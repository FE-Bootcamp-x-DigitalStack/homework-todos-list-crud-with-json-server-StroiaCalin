(async function init() {
    const todos = await server.getTodos();

    ui.renderTodos(todos);

    //SUBMIT
    const form = document.querySelector('#form-new-item');
    form.addEventListener('submit', async (event) => {
        const input = document.querySelector('[data-new-item]').value;
        if (input) {
            const newTodo = {
                title: input,
                done: false,
            };
            try {
                const addedTodo = await server.addTodo(newTodo);
                ui.renderTodos(addedTodo);
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    });

    // DELETE
    dom.todosList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const todoId = event.target.getAttribute('data-id');
            try {
                await server.deleteTodo(todoId);
                ui.removeTodoFromUI(todoId);
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    });
    
      // UPDATE
      dom.todosList.addEventListener('change', async (event) => {
        if (event.target.type === 'checkbox') {
            const todoId = event.target.id; 
            const isChecked = event.target.checked;

            try {
                await server.updateTodo({ done: isChecked }, todoId);
                console.log(`Todo ${todoId} updated: done = ${isChecked}`);
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        }
    });
})();
