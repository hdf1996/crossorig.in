const UI = {
  nodes: {
    mainSection: document.querySelector('.main-section'),
    secondarySection: document.querySelector('.how-it-works'),
    corsItForm: document.querySelector('.cors-it'),
    corsItContent: document.querySelector('#corsit-content'),
    yourDomain: document.querySelector('#your-domain'),
    btnWhatsApp: document.querySelector('.btn-whatsapp'),
  },
  showSection(section) {
    if(section === 'main') {
      this.nodes.secondarySection.classList.add('see-ya');

      setTimeout(() => {
        this.nodes.mainSection.classList.remove('bye');
        this.nodes.secondarySection.classList.remove('hello');
      }, 500)
    }
    else if(section === 'secondary') {
      this.nodes.mainSection.classList.add('bye');
  
      this.nodes.secondarySection.classList.add('hello');
      this.nodes.secondarySection.classList.remove('see-ya');
    }
  }
};

// Copy-Example (Handler).
const copyToClipboardAnimation = function(btn) {
  btn.classList.add('copied');
  
  setTimeout(() => {
    btn.classList.remove('copied');
  }, 1000)
};

const highlightTextOfNode = function(element) {
  // https://stackoverflow.com/a/11128179

  let node = document.querySelector(element);    

  if (document.body.createTextRange) { // ms
      const range = document.body.createTextRange();

      range.moveToElementText(node);
      range.select();
  } else if (window.getSelection) { // moz, opera, webkit
      const selection = window.getSelection();            
      const range = document.createRange();

      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
  }
};

const copyToClipboard = function(selector) {
  return (event) => {
    const node = document.querySelector(selector);
    const btn = event.target;

    highlightTextOfNode(selector);
  
    if (document.selection) { 
        const range = document.body.createTextRange();
  
        range.moveToElementText(node);
        range.select().createTextRange();
        document.execCommand("Copy");

        copyToClipboardAnimation(btn); 
  
    } else if (window.getSelection) {
      const range = document.createRange();
  
      range.selectNode(node);
      window.getSelection().addRange(range);
      document.execCommand("Copy");
  
      copyToClipboardAnimation(btn);
    }
  }
};

// Copy-Example (eventListener).
UI.nodes.secondarySection
        .querySelector('.btn-copy')
        .addEventListener('click', copyToClipboard('#example-text'));

// Form (eventListener).
UI.nodes.corsItForm.addEventListener('submit', (e) => {
  e.preventDefault();

  function addProtocol(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    return url;
  }

  UI.nodes.secondarySection
          .querySelector('#your-domain')
          .textContent = addProtocol(UI.nodes.corsItContent.value.trim());

  
  UI.nodes.secondarySection
            .querySelectorAll('.solid-text, .shadow-text')
            .forEach(x => x.textContent = 'Loading');

  UI.nodes.secondarySection
            .querySelector('.example-title')
            .classList.toggle('off', true);

  UI.showSection('secondary');
});


// How it works (eventListener).
UI.nodes.mainSection
        .querySelector('.btn-how-it-works')
        .addEventListener('click', 
() => {
  UI.showSection('secondary');

  UI.nodes.secondarySection
    .querySelectorAll('.solid-text, .shadow-text')
    .forEach(x => x.textContent = 'How it works');
});


// Go Back (eventListener).
UI.nodes.secondarySection
        .querySelector('.go-back')
        .addEventListener('click', 
() => {
  UI.showSection('main');
});

// WhastApp (eventListener)
UI.nodes.secondarySection
        .querySelector('.btn-whatsapp')
        .addEventListener('click', 
(e) => {
  const btn = e.target;
  const currentCode = UI.nodes.secondarySection
                        .querySelector('#example-text')
                        .innerText;

  btn.setAttribute('href', `whatsapp://send?text=${currentCode}`);
});