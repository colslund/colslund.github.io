const amountSelect = document.getElementById('amount')
const amounts = [...Array(100).keys()].map(x => x + 1)
const addAmountOption = (val) => {
    const opt = document.createElement('option')
    opt.value = val
    opt.innerText = val
    amountSelect.appendChild(opt)
}
amounts.forEach(addAmountOption)

const localStorageKey = 'log'

const getLogStr = () => {
    return localStorage.getItem(localStorageKey) ?? '{}'
}

const getLog = () => {
    return JSON.parse(getLogStr())
}

const getLogStrFormatted = () => {
    return JSON.stringify(getLog(), null, 2)
}

const addLog = (entry) => {
    const key = Date.now()
    const log = getLog()
    log[key] = entry
    localStorage.setItem(localStorageKey, JSON.stringify(log))
}

const typeSelect = document.getElementById('type')
const addLogButton = document.getElementById('addLog')
addLogButton.addEventListener('click', () => {
    const amount = parseInt(amountSelect.value)
    const type = typeSelect.value
    addLog({ type, amount })
})

const output = document.getElementById('output')
const displayLogButton = document.getElementById('displayLog')
displayLogButton.addEventListener('click', () => {
    output.innerText = getLogStrFormatted()
})

const downloadButton = document.getElementById('download')
downloadButton.addEventListener('click', () => {
    const logStr = getLogStrFormatted()
    const blob = new Blob([logStr], {
        type: "application/json",
    });

    const filename = `log_${Date.now()}.json`
    const aElement = document.createElement('a');
    aElement.setAttribute('download', filename);
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
})