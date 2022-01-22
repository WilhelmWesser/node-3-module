document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(()=> {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id

        const newData = prompt("Введите новое название")
        if (newData !== null) {
            edit(id, newData).then(() => {
                event.target.closest('li').children[0].outerText = newData
            })
        }

    }
})

async function edit(id, newContent) {
    await fetch(`/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({newContent})
    })
}

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}