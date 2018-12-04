chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'createNotes') {
    console.log('note is created')
    document.body.innerHTML +=`<dialog style="height:40%">
           <iframe id="noteFetcher"style="height:100%"></iframe>
           <div style="position:absolute; top:0px; left:5px;">  
             <button>x</button>
           </div>
           </dialog>`;
  const dialog = document.querySelector("dialog");
  dialog.showModal();
  }
})

const iframe = document.getElementById("noteFetcher");  
iframe.src = chrome.extension.getURL("index.html");
iframe.frameBorder = 0;

dialog.querySelector("button").addEventListener("click", () => {
  dialog.close();
});