const localStorageKey = 'to-do-list'

function validateIfExistsTask() 
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")//gera um array
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() 
{
    //alert('teste')
    let input = document.getElementById('input-new-task');
    input.style.border = ''

    //validation
    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir')
    }
    else if(validateIfExistsTask())
    {
        alert("Já existe uma task com essa descrição")
    }
    else 
    {
        //increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")//gera um array
        values.push({
            name: input.value
        })
        //console.log(values)
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")//gera um array

    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']}<button onclick='removeItem("${values[i]['name']}")' id='btn-ok'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`
    }
}

function removeItem(data) 
{
    //console.log(data)
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")//gera um array
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()