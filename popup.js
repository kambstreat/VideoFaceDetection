document.getElementById('screenshotButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: takeScreenshot,
    });
  });
  
  function takeScreenshot() {
    const video = document.querySelector('video');
    if (video.paused) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = image;
      a.download = 'screenshot.png';
      a.click();
    } else {
      alert('Please pause the video before taking a screenshot.');
    }
  }
  