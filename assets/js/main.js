const agregarTareaButton = document.querySelector('#agregarTarea');
const input = document.querySelector('#input');
const tareaList = document.querySelector('#Tarea');
const tareaCantidad = document.querySelector('#cantidadTareas');
const tareasCompletadas = document.querySelector('#tareasRealizadas');

const tareasIniciales = [
    { text: 'Llamar a mi ex', checked: false },
    { text: 'Estudiar Javascript', checked: false },
    { text: 'Hacer arroz', checked: false }
];




window.addEventListener('load', (event) => {
    let totalTareas = 0;
    let completadasTareas = 0;
    let tareaID = 1; 
    function actualizarContadores() {
        tareaCantidad.textContent = totalTareas;
        tareasCompletadas.textContent = completadasTareas;
    }
    function crearTarea(text, id, checked) {
        const li = document.createElement('li');
        const idTarea = document.createElement('span');
        idTarea.textContent = `${id} - `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;
        checkbox.addEventListener('change', (event) => {
          if (event.target.checked) {
              completadasTareas++;
          } else {
              completadasTareas = (completadasTareas > 0) ? completadasTareas - 1 : 0;
          }
          actualizarContadores();
      });
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
          if (checkbox.checked && completadasTareas > 0) {
              completadasTareas--;
          }
          totalTareas--;
          tareaList.removeChild(li);
          actualizarContadores();
      });
        li.appendChild(idTarea);
        li.appendChild(checkbox);
        li.appendChild(eliminarBtn);
        li.appendChild(document.createTextNode(text));
        return li;
    }
    function agregarTarea(text, checked) {
        const nuevaTarea = crearTarea(text, tareaID, checked);
        tareaList.appendChild(nuevaTarea);
        totalTareas++;
        tareaID++;
        actualizarContadores();
    }
    tareasIniciales.forEach(tarea => {
        agregarTarea(tarea.text, tarea.checked);
    });
    agregarTareaButton.addEventListener('click', () => {
        const tareaText = input.value.trim();
        if (tareaText !== '') {
            agregarTarea(tareaText, false);
            input.value = '';
        }
    });


    actualizarContadores();
});




