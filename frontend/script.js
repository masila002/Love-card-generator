const API_BASE_URL = '/api';

document.getElementById('cardForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const occasion = document.getElementById('occasion').value;
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const textColor = document.getElementById('textColor').value;

    // Show loading, hide error
    showLoading();
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/generate-card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                gender,
                occasion,
                textColor
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate card');
        }

        // Display preview
        const preview = document.getElementById('preview');
        preview.innerHTML = `
            <img src="${data.imageBase64}" alt="Generated Card" style="max-width: 517px; max-height: 303px; width: auto; height: auto; display: block; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        `;
        preview.style.background = 'transparent';
        preview.style.border = 'none';
        preview.style.padding = '0';

        // Show download button
        document.getElementById('downloadBtn').style.display = 'block';
        document.getElementById('downloadBtn').onclick = () => {
            downloadCard(data.imageBase64);
        };

    } catch (error) {
        showError(error.message);
        console.error('Full error:', error);
    } finally {
        hideLoading();
    }
});

function downloadCard(base64Data) {
    const a = document.createElement('a');
    a.href = base64Data;
    a.download = 'love-card.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}
