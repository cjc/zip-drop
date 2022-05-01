const promisify = (func) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (err, res) => err ? reject(err) : resolve(res));
    });
  }
}

import {unzip as unzipCb, strFromU8} from 'fflate';
const unzip = promisify(unzipCb);

export class ZipDrop extends HTMLElement {
  constructor() {
    super();
    this.files = [];
  }

  async connectedCallback() {
    this.insertAdjacentHTML('beforebegin',/*html*/`<style>zip-drop {display:block;} zip-drop.over {outline: 3px dashed green;}</style>`);

    this.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      this.classList.add('over');
    });

    this.addEventListener('dragleave', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.classList.remove('over');
    });

    this.addEventListener('drop', async function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.classList.remove('over');
      let files = Array.from(ev.dataTransfer.items).filter(dti => dti.kind == "file").map( dti => dti.getAsFile());

      for(var i=0;i<files.length;i++) {
        let contents = await files[i].arrayBuffer();
        if (files[i].type == "application/x-zip-compressed") {
          let innards = await unzip(new Uint8Array(contents));
          Object.keys(innards).forEach((k) => {
            this.files.push({name:k,body:innards[k]});
          });
        } else {
          this.files.push({name:files[i].name,body:new Uint8Array(contents)});
        }
      }

      this.dispatchEvent(new CustomEvent('dropFiles', {detail: this.files}));
    });

    document.addEventListener('drop', async function(ev) {
      ev.preventDefault();
    });
    document.addEventListener('dragover', async function(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'none';
    });
  }

  asText(ab) {
    return strFromU8(ab);
  }
}
