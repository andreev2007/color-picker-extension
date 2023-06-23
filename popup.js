const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
colorGrid.style.display = 'none';

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async(injectionResults) => {
        const [data] = injectionResults;
        if (data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorGrid.style.display = 'inline-block';
            colorValue.innerText = color;
        }
        console.log(injectionResults);
    })
})

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {

    }
}