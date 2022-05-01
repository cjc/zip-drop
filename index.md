<script src='zip-drop.umd.js'></script>
<style>
    zip-drop { 
        outline: 3px dashed grey;
        padding: 0.5em;
        margin-bottom:1em;
    }
</style>

<zip-drop>
    <h3>zip-drop</h3>
    <ul>
        <li>Wraps any content</li>
        <li>No UI impact by default</li>
        <li>Show hover effect when files dragged over, but can readily be styled to indicate dropzone</li>
        <li>Unzips any zip files in drag payload and fires <code>dropFiles</code> event</li>
    </ul>
</zip-drop>


<table>
<thead><tr><th>Filename</th><th>Size</th></tr></thead>
<tbody id="output">
</tbody>
</table>

<script>
    let output = document.querySelector('#output');
    document.querySelector('zip-drop').addEventListener('dropFiles', function (ev) {
        output.innerHTML = '';
        ev.detail.forEach((f) => {
            output.innerHTML += `<tr><td>${f.name}</td><td>${f.body.length} bytes</td></tr>\n`;
        });
    });
    
</script>

<hr>
<h2>Source</h2>

```html
<zip-drop>
    <h3>zip-drop</h3>
    <ul>
        <li>Wraps any content</li>
        <li>No UI impact by default</li>
        <li>Show hover effect when files dragged over, but can readily be styled to indicate dropzone</li>
        <li>Unzips any zip files in drag payload and fires <code>dropFiles</code> event</li>
    </ul>
</zip-drop>


<table>
<thead><tr><th>Filename</th><th>Size</th></tr></thead>
<tbody id="output">
</tbody>
</table>

<script>
    let output = document.querySelector('#output');
    document.querySelector('zip-drop').addEventListener('dropFiles', function (ev) {
        output.innerHTML = '';
        ev.detail.forEach((f) => {
            output.innerHTML += `<tr><td>${f.name}</td><td>${f.body.length} bytes</td></tr>\n`;
        });
    });
    
</script>
```
